import type { CollectionConfig } from 'payload'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { isAdmin } from '../../access/isAdmin'
import { authenticated } from '../../access/authenticated'

export const MeetingMinutes: CollectionConfig = {
  slug: 'meeting-minutes',
  access: {
    read: authenticated,
    create: isAdminOrExecutive,
    update: isAdminOrExecutive,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'meetingType', 'date', 'chair'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Meeting Title' },
    {
      name: 'meetingType',
      type: 'select',
      options: [
        { label: 'Annual General Meeting', value: 'agm' },
        { label: 'Executive Committee Meeting', value: 'executive' },
        { label: 'Village Representative Meeting', value: 'village_rep' },
        { label: 'Special Meeting', value: 'special' },
        { label: 'Sub-committee Meeting', value: 'subcommittee' },
      ],
    },
    { name: 'date', type: 'date', required: true },
    { name: 'location', type: 'text' },
    { name: 'chair', type: 'text', label: 'Chairperson' },
    { name: 'secretary', type: 'text', label: 'Recording Secretary' },
    { name: 'attendees', type: 'textarea', label: 'Attendees (names or count)' },
    { name: 'apologies', type: 'textarea', label: 'Apologies' },
    { name: 'agenda', type: 'textarea', label: 'Agenda Items' },
    { name: 'resolutions', type: 'textarea', label: 'Resolutions / Action Items' },
    { name: 'notes', type: 'textarea', label: 'Full Meeting Notes' },
    { name: 'attachment', type: 'upload', relationTo: 'media', label: 'Signed Minutes PDF' },
  ],
  timestamps: true,
}
