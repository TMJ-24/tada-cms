import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// One-time endpoint to bootstrap the first super admin.
// Disabled automatically once any super_admin exists.
export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Refuse if a super_admin already exists
    const existing = await payload.find({
      collection: 'users',
      where: { role: { equals: 'super_admin' } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { error: 'A super admin already exists. Use the admin panel to manage users.' },
        { status: 403 },
      )
    }

    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'name, email and password are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const user = await payload.create({
      collection: 'users',
      data: { name, email, password, role: 'super_admin' },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, id: user.id, email: user.email, role: (user as any).role })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
