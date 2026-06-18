import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { authenticated } from '../../access/authenticated'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  access: {
    read: authenticated,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'priority', 'audience', 'publishedAt'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Important', value: 'important' },
        { label: 'Urgent', value: 'urgent' },
      ],
    },
    {
      name: 'audience',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Members', value: 'all' },
        { label: 'Executive Only', value: 'executive' },
        { label: 'Village Reps Only', value: 'village_rep' },
      ],
    },
    {
      name: 'targetVillages',
      type: 'select',
      hasMany: true,
      options: VILLAGE_OPTIONS,
      label: 'Target Villages (leave blank for all)',
    },
    { name: 'publishedAt', type: 'date', required: true, label: 'Publish Date' },
    { name: 'expiresAt', type: 'date', label: 'Expiry Date (optional)' },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      label: 'Pin to top of dashboard',
    },
  ],
  timestamps: true,
}
