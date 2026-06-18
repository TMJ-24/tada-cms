import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    read: () => true,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'category', 'year', 'public'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Governance', value: 'governance' },
        { label: 'Annual Report', value: 'annual_report' },
        { label: 'Financial Statement', value: 'financial' },
        { label: 'Meeting Minutes', value: 'minutes' },
        { label: 'Policy', value: 'policy' },
        { label: 'Program Document', value: 'program' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'year', type: 'number' },
    { name: 'description', type: 'textarea' },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicly accessible (uncheck for exec-only)',
    },
    { name: 'version', type: 'text', label: 'Version (e.g. v1.2)' },
  ],
  timestamps: true,
}
