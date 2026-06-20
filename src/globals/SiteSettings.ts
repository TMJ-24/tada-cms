import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'Global organisation identity, contact details, and homepage content.',
  },
  fields: [
    {
      name: 'maintenanceMode',
      type: 'checkbox',
      label: 'Maintenance Mode',
      defaultValue: false,
      admin: {
        description: 'When enabled, visitors see a maintenance page instead of the site.',
        position: 'sidebar',
      },
    },
    {
      type: 'collapsible',
      label: 'Organisation Identity',
      fields: [
        {
          name: 'motto',
          type: 'text',
          label: 'Motto',
          defaultValue: 'Look Back, Give Back',
          admin: { description: 'Displayed in the hero section and footer.' },
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          defaultValue:
            'Serving the Toaripi people of Gulf Province, Papua New Guinea — building stronger villages, empowering communities, and creating opportunities for the next generation.',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Hero Slide — First Slide',
      fields: [
        {
          name: 'heroHeadline',
          type: 'text',
          label: 'Headline',
          defaultValue: 'Toaripi Atutemori Development Association',
        },
        {
          name: 'heroSubtext',
          type: 'textarea',
          label: 'Subtext',
          defaultValue:
            'Formed to address the challenges faced by our villages, strengthen our communities, and create lasting opportunities for the Toaripi people.',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Organisation Statistics',
      fields: [
        {
          name: 'villageCount',
          type: 'text',
          label: 'Villages Count',
          defaultValue: '8',
        },
        {
          name: 'memberCount',
          type: 'text',
          label: 'Community Members',
          defaultValue: '1,813',
        },
        {
          name: 'activeProjectCount',
          type: 'text',
          label: 'Active Projects',
          defaultValue: '12+',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Contact Email',
          defaultValue: 'exec@tada.org.pg',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+675 300 0000',
        },
        {
          name: 'officeAddress',
          type: 'text',
          label: 'Office Address Line 1',
          defaultValue: 'Level 5, Deloitte Tower',
        },
        {
          name: 'officeAddressLine2',
          type: 'text',
          label: 'Office Address Line 2',
          defaultValue: 'Port Moresby, Papua New Guinea',
        },
        {
          name: 'physicalAddress',
          type: 'text',
          label: 'Physical / Village Address',
          defaultValue: 'Gulf Province, Papua New Guinea',
        },
        {
          name: 'responseTime',
          type: 'text',
          label: 'Response Time Note',
          defaultValue:
            'The Executive Committee aims to respond to all enquiries within 3–5 business days.',
        },
      ],
    },
  ],
}
