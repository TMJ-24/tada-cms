import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Shield, ArrowLeft } from 'lucide-react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Login — TADA',
}

export default async function ExecLoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('tada-exec-token')
  if (token?.value) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/users/me`,
        { headers: { Authorization: `Bearer ${token.value}` }, cache: 'no-store' },
      )
      if (res.ok) {
        const data = await res.json()
        const role = data?.user?.role
        if (role && ['super_admin', 'executive', 'village_rep'].includes(role)) {
          redirect('/exec/dashboard')
        }
      }
    } catch {}
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-card px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">

          {/* Blue header */}
          <div className="bg-primary px-8 pt-8 pb-6 text-center text-primary-foreground">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mx-auto mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-xl font-bold">TADA Executive Portal</h1>
            <p className="text-sm opacity-70 mt-1">Toaripi Atutemori Development Association</p>
          </div>

          {/* Form body */}
          <div className="px-8 py-7">
            <h2 className="text-base font-semibold mb-1">Sign In</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Restricted to Executive Committee members, Village Representatives, and authorised staff.
            </p>
            <LoginForm />
          </div>

          {/* Back to website — inside the card */}
          <div className="px-8 pb-7 pt-2 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              Back to TADA website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
