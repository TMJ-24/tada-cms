import type { AccessArgs, Where } from 'payload'

export const isAdminExecutiveOrRep = ({ req: { user } }: AccessArgs): boolean | Where => {
  if (!user) return false
  const u = user as any
  if (['super_admin', 'executive'].includes(u.role)) return true
  if (u.role === 'village_rep') return true
  return false
}

// Village-scoped read: reps only see their own village's records
export const villageRepScopedRead = ({ req: { user } }: AccessArgs): boolean | Where => {
  if (!user) return false
  const u = user as any
  if (['super_admin', 'executive'].includes(u.role)) return true
  if (u.role === 'village_rep' && u.village) {
    return { village: { equals: u.village } }
  }
  return false
}

// Village-scoped write: reps can only edit their own village's records
export const villageRepScopedWrite = ({ req: { user } }: AccessArgs): boolean | Where => {
  if (!user) return false
  const u = user as any
  if (['super_admin', 'executive'].includes(u.role)) return true
  if (u.role === 'village_rep' && u.village) {
    return { village: { equals: u.village } }
  }
  return false
}
