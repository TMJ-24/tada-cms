import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdminExecutiveOrRep } from '../../access/isAdminExecutiveOrRep'

export const Programs: CollectionConfig = {
  slug: 'programs',
  access: {
    read: isAdminExecutiveOrRep,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'stage', 'participants'],
    description: 'Business and economic development programs for the Toaripi community.',
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
            { label: 'Fisheries', value: 'fisheries' },
            { label: 'Agriculture', value: 'agriculture' },
            { label: 'Tourism', value: 'tourism' },
            { label: 'Retail & Trade', value: 'trade' },
            { label: 'Finance & Microfinance', value: 'finance' },
            { label: 'Skills & Trades', value: 'skills' },
            { label: 'Technology', value: 'technology' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'stage',
          type: 'select',
          required: true,
          defaultValue: 'concept',
          options: [
            { label: 'Concept', value: 'concept' },
            { label: 'Planning', value: 'planning' },
            { label: 'Design', value: 'design' },
            { label: 'Active', value: 'active' },
            { label: 'Registered', value: 'registered' },
            { label: 'Scaling', value: 'scaling' },
            { label: 'Completed', value: 'completed' },
          ],
        },
      ],
    },
    {
      name: 'participants',
      type: 'number',
      label: 'Number of Participants',
      defaultValue: 0,
    },
    {
      name: 'targetParticipants',
      type: 'number',
      label: 'Target Participants',
    },
    {
      name: 'fundingSource',
      type: 'text',
      label: 'Funding Source',
    },
    {
      name: 'fundingAmount',
      type: 'text',
      label: 'Funding Amount (e.g. K 50,000)',
    },
    { name: 'description', type: 'textarea' },
  ],
  timestamps: true,
}
