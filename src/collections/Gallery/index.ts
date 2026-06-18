import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: () => true,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'village', 'year', 'category'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Community Event', value: 'community' },
        { label: 'Cultural Festival', value: 'cultural' },
        { label: 'Development Project', value: 'project' },
        { label: 'Health Program', value: 'health' },
        { label: 'Education', value: 'education' },
        { label: 'Village Life', value: 'village' },
        { label: 'Leadership', value: 'leadership' },
      ],
    },
    { name: 'village', type: 'select', options: VILLAGE_OPTIONS },
    { name: 'year', type: 'number', min: 2000, max: 2100 },
    { name: 'caption', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Feature on homepage gallery' },
  ],
  timestamps: true,
}
