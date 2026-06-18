export const VILLAGES = [
  'Lelefiru',
  'Hamuhamu',
  'Kukipi',
  'Isapeape',
  'Uritai',
  'Mirivase',
  'Lalapipi',
  'Popo',
] as const

export type Village = (typeof VILLAGES)[number]

export const VILLAGE_OPTIONS = VILLAGES.map((v) => ({ label: v, value: v }))
