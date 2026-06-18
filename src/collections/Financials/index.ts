import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { authenticated } from '../../access/authenticated'

export const Financials: CollectionConfig = {
  slug: 'financials',
  access: {
    read: authenticated,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'type', 'category', 'amount', 'date'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Description' },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expenditure', value: 'expenditure' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Membership Fees', value: 'membership' },
        { label: 'Donations', value: 'donations' },
        { label: 'Grants', value: 'grants' },
        { label: 'Fundraising', value: 'fundraising' },
        { label: 'Project Expenditure', value: 'project' },
        { label: 'Administration', value: 'admin' },
        { label: 'Programs', value: 'programs' },
        { label: 'Salaries', value: 'salaries' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'amount', type: 'number', required: true, label: 'Amount (PGK)' },
    { name: 'date', type: 'date', required: true },
    { name: 'financialYear', type: 'text', label: 'Financial Year (e.g. 2026)' },
    { name: 'reference', type: 'text', label: 'Reference / Receipt Number' },
    { name: 'project', type: 'text', label: 'Related Project (if applicable)' },
    { name: 'notes', type: 'textarea' },
    { name: 'attachment', type: 'upload', relationTo: 'media', label: 'Receipt / Invoice' },
  ],
  timestamps: true,
}
