import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdminExecutiveOrRep } from '../../access/isAdminExecutiveOrRep'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Initiatives: CollectionConfig = {
  slug: 'initiatives',
  access: {
    read: isAdminExecutiveOrRep,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'beneficiaries'],
    description: 'Community programs and social initiatives run by TADA.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Education', value: 'education' },
            { label: 'Culture', value: 'culture' },
            { label: 'Health', value: 'health' },
            { label: 'Economic', value: 'economic' },
            { label: 'Agriculture', value: 'agriculture' },
            { label: 'Youth', value: 'youth' },
            { label: 'Women', value: 'women' },
            { label: 'Sports', value: 'sports' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Completed', value: 'completed' },
            { label: 'On Hold', value: 'on_hold' },
          ],
        },
      ],
    },
    {
      name: 'beneficiaries',
      type: 'number',
      label: 'Number of Beneficiaries',
      defaultValue: 0,
    },
    {
      name: 'villages',
      type: 'select',
      hasMany: true,
      options: [{ label: 'All Villages', value: 'all' }, ...VILLAGE_OPTIONS],
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', type: 'date', label: 'Start Date' },
        { name: 'endDate', type: 'date', label: 'End Date' },
      ],
    },
    { name: 'description', type: 'textarea' },
  ],
  timestamps: true,
}
