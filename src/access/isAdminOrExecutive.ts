import type { AccessArgs } from 'payload'

export const isAdminOrExecutive = ({ req: { user } }: AccessArgs): boolean => {
  return Boolean(user && ['super_admin', 'executive'].includes((user as any)?.role))
}
