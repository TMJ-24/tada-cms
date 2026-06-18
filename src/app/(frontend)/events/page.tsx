import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Events — TADA',
  description: 'Upcoming and past events from the Toaripi Atutemori Development Association.',
}

const events = [
  {
    title: 'TADA Annual General Meeting 2026',
    category: 'meeting',
    status: 'upcoming',
    date: '2026-06-27',
    displayDate: 'Saturday, 27 June 2026',
    time: '9:00 AM',
    location: 'Kukipi Village Community Hall',
    village: 'Kukipi',
    description: 'The 2026 AGM — all community members and village representatives are invited. Key items include program reviews, financial reports, and election of village reps.',
  },
  {
    title: 'Annual Toaripi Cultural Festival 2026',
    category: 'cultural',
    status: 'upcoming',
    date: '2026-08-15',
    displayDate: '15–17 August 2026',
    time: 'All day',
    location: 'Hamuhamu Village Grounds',
    village: 'Hamuhamu',
    description: 'Three days of cultural celebrations themed "Roots and Future" — traditional dance, food, craft markets, and a youth leadership forum.',
  },
  {
    title: 'TADA Scholarship Awards Ceremony',
    category: 'education',
    status: 'upcoming',
    date: '2026-07-10',
    displayDate: 'Friday, 10 July 2026',
    time: '10:00 AM',
    location: 'Uritai Village',
    village: 'Uritai',
    description: 'Official ceremony to present 2026 scholarships to the 12 recipients from across our eight villages.',
  },
  {
    title: 'Fishing Cooperative First Board Elections',
    category: 'business',
    status: 'upcoming',
    date: '2026-07-05',
    displayDate: 'Sunday, 5 July 2026',
    time: '2:00 PM',
    location: 'Lelefiru Village',
    village: 'Lelefiru',
    description: 'Inaugural meeting and board elections for the newly registered Toaripi Fishing Cooperative. All 47 founding member households are urged to attend.',
  },
  {
    title: 'Mobile Health Clinic — Mirivase & Lalapipi',
    category: 'health',
    status: 'upcoming',
    date: '2026-07-20',
    displayDate: '20–21 July 2026',
    time: '8:00 AM',
    location: 'Mirivase & Lalapipi Villages',
    village: 'Mirivase',
    description: 'Follow-up mobile health clinic visiting the two villages that requested additional screenings after the March campaign.',
  },
  {
    title: 'Kukipi-Isapeape Road Project Site Inspection',
    category: 'community',
    status: 'upcoming',
    date: '2026-07-15',
    displayDate: 'Wednesday, 15 July 2026',
    time: '7:00 AM',
    location: 'Kukipi Village (meeting point)',
    village: 'Kukipi',
    description: 'Monthly site inspection by the TADA Infrastructure Committee. Village reps and interested members are welcome to join.',
  },
]

const categoryLabel: Record<string, string> = {
  meeting: 'AGM / Meeting',
  cultural: 'Cultural',
  health: 'Health',
  education: 'Education',
  community: 'Community',
  business: 'Business',
  sports: 'Sports',
  other: 'Other',
}

const categoryColor: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-700',
  cultural: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  education: 'bg-purple-100 text-purple-700',
  community: 'bg-green-100 text-green-700',
  business: 'bg-amber-100 text-amber-700',
  sports: 'bg-teal-100 text-teal-700',
  other: 'bg-muted text-muted-foreground',
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function DateBadge({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr)
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary text-primary-foreground shrink-0">
      <span className="text-xs font-semibold opacity-80 uppercase">{months[d.getMonth()]}</span>
      <span className="text-2xl font-black leading-none">{d.getDate()}</span>
    </div>
  )
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === 'upcoming')
  const past = events.filter((e) => e.status === 'completed')

  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative py-20 mb-16 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-events/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Community Events</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events Calendar</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Stay connected with what is happening across all eight Toaripi villages — AGMs, cultural festivals, health programs, and community gatherings.
            </p>
          </div>
        </div>
      </section>

      <div className="container">

        {/* Upcoming */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <span className="text-sm text-muted-foreground">{upcoming.length} events</span>
          </div>
          <div className="space-y-4">
            {upcoming.map((event) => (
              <div key={event.title} className="flex gap-5 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                <DateBadge dateStr={event.date} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base leading-snug">{event.title}</h3>
                    <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[event.category]}`}>
                      {categoryLabel[event.category]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {event.displayDate}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {event.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-2">Have an event to add?</h2>
            <p className="opacity-80 text-sm max-w-md">Village representatives and executive members can add events via the admin panel. Contact the secretariat if you need access.</p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <Link href="/exec/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity">
              Executive Login
            </Link>
            <Link href="/contact-us" className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/40 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((event) => (
                <div key={event.title} className="p-5 rounded-xl border border-border bg-card opacity-70">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[event.category]} mb-3 inline-block`}>{categoryLabel[event.category]}</span>
                  <h3 className="font-semibold mb-1 leading-snug">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">{event.displayDate} · {event.location}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
