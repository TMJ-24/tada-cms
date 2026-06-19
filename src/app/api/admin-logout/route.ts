import { NextResponse } from 'next/server'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://tada.jershmamet.com'
  try {
    await fetch(`${base}/api/users/logout`, { method: 'POST' })
  } catch {}
  const res = NextResponse.redirect(new URL('/admin', base))
  res.cookies.set('payload-token', '', { maxAge: 0, path: '/', httpOnly: true })
  res.cookies.set('tada-exec-token', '', { maxAge: 0, path: '/' })
  return res
}
