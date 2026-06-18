import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdminExecutiveOrRep } from '../../access/isAdminExecutiveOrRep'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: isAdminExecutiveOrRep,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'progress'],
    description: 'Community development projects across Toaripi villages.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Infrastructure', value: 'infrastructure' },
            { label: 'Economic', value: 'economic' },
            { label: 'Health & Sanitation', value: 'health' },
            { label: 'Education', value: 'education' },
            { label: 'Energy', value: 'energy' },
            { label: 'Agriculture', value: 'agriculture' },
            { label: 'Social', value: 'social' },
            { label: 'Environment', value: 'environment' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'planning',
          options: [
            { label: 'Planning', value: 'planning' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'On Hold', value: 'on_hold' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
        },
      ],
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: { description: 'Completion percentage (0–100)' },
    },
    {
      type: 'row',
      fields: [
        { name: 'budget', type: 'text', label: 'Budget (e.g. K 280,000)' },
        { name: 'lead', type: 'text', label: 'Lead Organisation' },
      ],
    },
    {
      name: 'villages',
      type: 'select',
      hasMany: true,
      options: [{ label: 'All Villages', value: 'all' }, ...VILLAGE_OPTIONS],
      admin: { description: 'Villages this project serves.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', type: 'date', label: 'Start Date' },
        { name: 'targetDate', type: 'date', label: 'Target Completion' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
