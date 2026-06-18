import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DashboardClient } from './DashboardClient'

export default async function ExecDashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('tada-exec-token')

  if (!token?.value) redirect('/exec/login')

  let user: any = null
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/users/me`,
      { headers: { Authorization: `Bearer ${token.value}` }, cache: 'no-store' },
    )
    if (!res.ok) redirect('/exec/login')
    const data = await res.json()
    user = data?.user
  } catch {
    redirect('/exec/login')
  }

  const allowedRoles = ['super_admin', 'executive', 'village_rep']
  if (!user || !allowedRoles.includes(user.role)) redirect('/')

  const payload = await getPayload({ config: configPromise })

  const [
    populationResult,
    projectsResult,
    initiativesResult,
    programsResult,
    eventsResult,
    membersResult,
    minutesResult,
    financialsResult,
    announcementsResult,
  ] = await Promise.all([
    payload.find({ collection: 'population', limit: 50, sort: 'village' }),
    payload.find({ collection: 'projects', limit: 50, sort: '-updatedAt' }),
    payload.find({ collection: 'initiatives', limit: 50, sort: '-updatedAt' }),
    payload.find({ collection: 'programs', limit: 50, sort: '-updatedAt' }),
    payload.find({ collection: 'events', limit: 20, sort: 'date' }),
    payload.find({ collection: 'members', limit: 100, sort: '-createdAt' }),
    payload.find({ collection: 'meeting-minutes', limit: 20, sort: '-date' }),
    payload.find({ collection: 'financials', limit: 100, sort: '-date' }),
    payload.find({ collection: 'announcements', limit: 10, sort: '-publishedAt' }),
  ])

  return (
    <DashboardClient
      population={populationResult.docs as any[]}
      projects={projectsResult.docs as any[]}
      initiatives={initiativesResult.docs as any[]}
      programs={programsResult.docs as any[]}
      events={eventsResult.docs as any[]}
      members={membersResult.docs as any[]}
      minutes={minutesResult.docs as any[]}
      financials={financialsResult.docs as any[]}
      announcements={announcementsResult.docs as any[]}
      userRole={user.role}
      userName={user.name || user.email}
      userVillage={user.village}
    />
  )
}
