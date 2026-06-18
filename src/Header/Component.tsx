import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cookies } from 'next/headers'
import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

export async function Header() {
  let headerData: Awaited<ReturnType<ReturnType<typeof getCachedGlobal>>> | null = null
  try {
    headerData = await getCachedGlobal('header', 1)()
  } catch {
    // DB not yet initialised (first build) — render with empty nav
  }

  // Resolve the current authenticated user from the session cookie
  let currentUser: { name?: string; email?: string; role?: string } | null = null
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('tada-exec-token')
    if (token?.value) {
      const res = await fetch(`${getServerSideURL()}/api/users/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.user) currentUser = data.user
      }
    }
  } catch {
    // not authenticated — silently continue
  }

  return <HeaderClient data={headerData as any} currentUser={currentUser} />
}
