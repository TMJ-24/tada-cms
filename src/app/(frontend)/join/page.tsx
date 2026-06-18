import type { Metadata } from 'next'
import { CheckCircle, Shield, Users, Star, Heart } from 'lucide-react'
import { JoinForm } from './JoinForm'

export const metadata: Metadata = {
  title: 'Join TADA — Toaripi Atutemori Development Association',
  description: 'Become a member of TADA and contribute to the development of the Toaripi people of Gulf Province.',
}

const benefits = [
  { icon: Users, title: 'Community Voice', desc: 'Have a say in decisions that affect your village and the Toaripi people.' },
  { icon: Star, title: 'Scholarship Access', desc: 'Member families gain priority access to TADA scholarship programs.' },
  { icon: Heart, title: 'Health Programs', desc: 'Priority access to TADA-organised health clinics and awareness programs.' },
  { icon: Shield, title: 'Legal & Advocacy', desc: 'Benefit from TADA\'s advocacy on land rights, services, and representation.' },
]

const membershipTypes = [
  { type: 'Ordinary Member', fee: 'K50 / year', desc: 'Open to all Toaripi people from the eight villages.' },
  { type: 'Associate Member', fee: 'K30 / year', desc: 'For Toaripi descendants and supporters outside the eight villages.' },
  { type: 'Life Member', fee: 'K500 once', desc: 'Lifetime membership for long-term commitment to TADA.' },
]

export default function JoinPage() {
  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative py-20 mb-16 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-join/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Membership</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join TADA</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Become part of the movement to build stronger Toaripi villages. Every member strengthens our voice, our programs, and our future.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-2">Membership Application</h2>
              <p className="text-muted-foreground text-sm mb-8">Fill in the form below and the TADA Executive Committee will review your application within 7 days.</p>
              <JoinForm />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Benefits */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold mb-4">Member Benefits</h3>
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <b.icon size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{b.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership types */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-bold mb-4">Membership Types</h3>
              <div className="space-y-4">
                {membershipTypes.map((m) => (
                  <div key={m.type} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold">{m.type}</p>
                      <span className="text-xs font-bold text-primary">{m.fee}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-primary text-primary-foreground p-6">
              <CheckCircle size={20} className="mb-3 opacity-80" />
              <p className="font-semibold mb-1">Questions?</p>
              <p className="text-sm opacity-80 mb-3">Contact the TADA Secretariat for help with your application.</p>
              <a href="mailto:exec@tada.org.pg" className="text-sm font-semibold underline">exec@tada.org.pg</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
