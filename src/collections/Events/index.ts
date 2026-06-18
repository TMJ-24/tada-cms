import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { authenticated } from '../../access/authenticated'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'category', 'date', 'village', 'status'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AGM / Meeting', value: 'meeting' },
        { label: 'Cultural Festival', value: 'cultural' },
        { label: 'Health Program', value: 'health' },
        { label: 'Education', value: 'education' },
        { label: 'Community Development', value: 'community' },
        { label: 'Business & Economic', value: 'business' },
        { label: 'Sports', value: 'sports' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    { name: 'date', type: 'date', required: true },
    { name: 'endDate', type: 'date', label: 'End Date (for multi-day events)' },
    { name: 'time', type: 'text', label: 'Time (e.g. 9:00 AM)' },
    { name: 'location', type: 'text', label: 'Venue / Location' },
    { name: 'village', type: 'select', options: VILLAGE_OPTIONS, label: 'Host Village' },
    { name: 'description', type: 'textarea' },
    { name: 'organiser', type: 'text', label: 'Organising Committee / Person' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  timestamps: true,
}
