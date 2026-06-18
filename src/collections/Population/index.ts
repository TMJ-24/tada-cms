import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrExecutive } from '../../access/isAdminOrExecutive'
import { villageRepScopedRead, villageRepScopedWrite } from '../../access/isAdminExecutiveOrRep'
import { VILLAGE_OPTIONS } from '../../utilities/villages'

export const Population: CollectionConfig = {
  slug: 'population',
  access: {
    read: villageRepScopedRead,
    create: isAdminOrExecutive,
    update: villageRepScopedWrite,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'village',
    defaultColumns: ['village', 'year', 'totalPopulation', 'households'],
    description: 'Village population census data for all Toaripi communities.',
  },
  fields: [
    {
      name: 'village',
      type: 'select',
      required: true,
      options: VILLAGE_OPTIONS,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      defaultValue: 2026,
      admin: { description: 'Census year' },
    },
    {
      type: 'row',
      fields: [
        { name: 'totalPopulation', type: 'number', label: 'Total Population', required: true },
        { name: 'households', type: 'number', label: 'Households' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'maleCount', type: 'number', label: 'Male' },
        { name: 'femaleCount', type: 'number', label: 'Female' },
        { name: 'childrenUnder15', type: 'number', label: 'Children Under 15' },
      ],
    },
    {
      name: 'youthCount',
      type: 'number',
      label: 'Youth (15–35)',
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Any notes or observations about this census record.' },
    },
  ],
  timestamps: true,
}
