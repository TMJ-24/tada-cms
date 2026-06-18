'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  let data: any = null
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        cache: 'no-store',
      },
    )
    data = await res.json()
    if (!res.ok || !data.token) {
      return { error: 'Invalid email or password. Please try again.' }
    }
  } catch {
    return { error: 'Unable to connect. Please try again later.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('tada-exec-token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  // Redirect based on role
  const role = data.user?.role
  const allowedRoles = ['super_admin', 'executive', 'village_rep']
  if (!role || !allowedRoles.includes(role)) {
    return {
      error:
        'Your account does not have executive access. Your current role is "' +
        (role ?? 'unknown') +
        '". Contact the TADA secretariat to request access, or use the Admin Panel to update your role.',
    }
  }

  redirect('/exec/dashboard')
}
