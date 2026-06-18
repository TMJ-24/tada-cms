import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Briefcase, Heart, MapPin, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TADA — Toaripi Atutemori Development Association',
  description:
    'Serving the Toaripi people of Gulf Province, Papua New Guinea — building stronger villages, empowering communities, and creating opportunities for the next generation.',
}

const villages = [
  'Lelefiru',
  'Hamuhamu',
  'Kukipi',
  'Isapeape',
  'Uritai',
  'Mirivase',
  'Lalapipi',
  'Popo',
]

const pillars = [
  {
    title: 'Community Development',
    desc: 'Infrastructure, sanitation, and public services that improve everyday life in our eight villages.',
    icon: Users,
  },
  {
    title: 'Business Opportunities',
    desc: 'Cooperatives, microfinance, and trade programs that bring economic growth to our people.',
    icon: Briefcase,
  },
  {
    title: 'Education & Youth',
    desc: 'Scholarships, skills training, and leadership programs for the next generation of Toaripi leaders.',
    icon: BookOpen,
  },
  {
    title: 'Health & Wellbeing',
    desc: 'Clinic support, health awareness campaigns, and maternal care across all Toaripi communities.',
    icon: Heart,
  },
  {
    title: 'Agriculture & Fisheries',
    desc: 'Sustainable farming and fishing programs that support food security and village livelihoods.',
    icon: TrendingUp,
  },
  {
    title: 'Cultural Preservation',
    desc: 'Celebrating and safeguarding Toaripi identity, language, and traditions for generations to come.',
    icon: MapPin,
  },
]

const stats = [
  { value: '8', label: 'Villages Served' },
  { value: '1,813', label: 'Community Members' },
  { value: '12+', label: 'Active Projects' },
  { value: 'Gulf', label: 'Province, PNG' },
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 md:py-44 text-white overflow-hidden">
        {/* Background image */}
        <img
          src="https://picsum.photos/seed/papua-gulf/1600/900"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-primary/75" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-4">
              Gulf Province, Papua New Guinea
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Toaripi Atutemori Development Association
            </h1>
            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl leading-relaxed">
              Formed to address the challenges faced by our villages, strengthen our communities, and
              create lasting opportunities for the Toaripi people and the next generation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                About TADA <ArrowRight size={18} />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Villages */}
      <section className="bg-card border-b border-border py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Our Villages
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {villages.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden h-72 lg:h-96 shadow-sm border border-border">
              <img
                src="https://picsum.photos/seed/community-png/700/500"
                alt="Toaripi community"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-3">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                United for the Toaripi People
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                TADA was established by Toaripi sons and daughters who believe that our villages deserve
                better — better services, stronger livelihoods, and a brighter future. We work together
                to represent our communities, secure resources, and drive development across all eight
                Toaripi villages in Gulf Province.
              </p>
              <Link href="/about-us" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:underline">
                Learn more about TADA <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What We Focus On</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six pillars that guide everything TADA does for the Toaripi people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="p-6 rounded-lg border border-border bg-card">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <p.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-border bg-background">
                <div className="text-4xl font-bold mb-2 text-primary">{s.value}</div>
                <div className="text-muted-foreground text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-xl p-12 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-3">Get Involved</h2>
              <p className="opacity-80 max-w-md leading-relaxed">
                Whether you&apos;re from one of our villages or a supporter of the Toaripi people —
                reach out and join us in building a better future.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact TADA <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
