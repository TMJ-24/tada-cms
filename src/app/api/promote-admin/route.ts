import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// Emergency endpoint to promote a user to super_admin.
// Protected by a secret key. Disable or delete this file after first use.
// Usage: POST /api/promote-admin  { "email": "...", "secret": "tada-bootstrap-2026" }
export async function POST(req: Request) {
  try {
    const { email, secret } = await req.json()

    const BOOTSTRAP_SECRET = process.env.PROMOTE_ADMIN_SECRET ?? 'tada-bootstrap-2026'
    if (secret !== BOOTSTRAP_SECRET) {
      return NextResponse.json({ error: 'Invalid secret key.' }, { status: 403 })
    }

    if (!email) {
      return NextResponse.json({ error: 'email is required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    if (result.totalDocs === 0) {
      return NextResponse.json({ error: `No user found with email: ${email}` }, { status: 404 })
    }

    const user = result.docs[0]!
    const updated = await payload.update({
      collection: 'users',
      id: user.id,
      data: { role: 'super_admin' },
      overrideAccess: true,
    })

    return NextResponse.json({
      success: true,
      id: updated.id,
      email: updated.email,
      role: (updated as any).role,
      message: 'User promoted to super_admin. You can now log in to the Executive Portal.',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
