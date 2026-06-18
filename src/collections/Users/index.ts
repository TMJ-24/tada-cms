import type { CollectionConfig, AccessResult } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { authenticated } from '../../access/authenticated'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Allow unauthenticated create so Payload's first-user setup works;
    // also needed for the seed endpoint.
    create: () => true,
    delete: isAdmin,
    read: ({ req: { user } }): AccessResult => {
      if (!user) return false
      const u = user as any
      if (['super_admin', 'executive'].includes(u.role)) return true
      return { id: { equals: u.id } }
    },
    update: ({ req: { user } }): AccessResult => {
      if (!user) return false
      const u = user as any
      if (u.role === 'super_admin') return true
      if (u.role === 'executive') return { role: { not_equals: 'super_admin' } } as any
      return { id: { equals: u.id } }
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'village'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Executive Committee', value: 'executive' },
        { label: 'Village Representative', value: 'village_rep' },
        { label: 'Member', value: 'member' },
      ],
      admin: {
        description: 'Controls what this user can access in the dashboard.',
      },
      // Only super_admin can change the role after creation
      access: {
        create: () => true,
        update: ({ req: { user } }) => (user as any)?.role === 'super_admin',
      },
    },
    {
      name: 'village',
      type: 'select',
      options: VILLAGE_OPTIONS,
      admin: {
        description: 'Required for Village Representatives — limits their data access to this village.',
        condition: (data) => data?.role === 'village_rep',
      },
    },
  ],
  timestamps: true,
}
