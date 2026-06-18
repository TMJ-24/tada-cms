import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Shield } from 'lucide-react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Executive Login — TADA',
}

export default async function ExecLoginPage() {
  // Already logged in? Skip the login page
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
    } catch {
      // ignore, show login form
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-card px-4 py-12">
      <div className="w-full max-w-md">

        {/* Single unified card */}
        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">

          {/* Card header */}
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

          {/* Access levels footer */}
          <div className="px-8 pb-7 border-t border-border pt-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Access Levels
            </p>
            <div className="space-y-2">
              {[
                { role: 'Super Admin', desc: 'Full access — users, data & site content' },
                { role: 'Executive', desc: 'Manage population, projects, initiatives & programs' },
                { role: 'Village Rep', desc: 'View all data, edit own village records' },
              ].map((r) => (
                <div key={r.role} className="flex items-start gap-2">
                  <span className="shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary mt-0.5">
                    {r.role}
                  </span>
                  <span className="text-xs text-muted-foreground">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Back to TADA website
          </Link>
        </p>
      </div>
    </div>
  )
}
