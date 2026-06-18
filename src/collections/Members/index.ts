import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    read: isAdminOrExecutive,
    create: () => true, // public membership applications
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['fullName', 'village', 'membershipType', 'status', 'createdAt'],
    useAsTitle: 'fullName',
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', label: 'Phone Number' },
    { name: 'village', type: 'select', options: VILLAGE_OPTIONS, required: true },
    {
      name: 'membershipType',
      type: 'select',
      defaultValue: 'ordinary',
      options: [
        { label: 'Ordinary Member', value: 'ordinary' },
        { label: 'Associate Member', value: 'associate' },
        { label: 'Life Member', value: 'life' },
        { label: 'Honorary Member', value: 'honorary' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    { name: 'occupation', type: 'text' },
    { name: 'currentResidence', type: 'text', label: 'Current Residence / City' },
    { name: 'motivation', type: 'textarea', label: 'Why do you want to join TADA?' },
    { name: 'skills', type: 'textarea', label: 'Skills or expertise you can contribute' },
    { name: 'memberSince', type: 'date', label: 'Member Since (set on approval)' },
    { name: 'notes', type: 'textarea', label: 'Admin Notes (internal only)' },
  ],
  timestamps: true,
}
