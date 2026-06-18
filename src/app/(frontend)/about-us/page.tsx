import type { Metadata } from 'next'
import { CheckCircle, Heart, MapPin, Shield, Star, Target, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — TADA',
  description:
    'Learn about the Toaripi Atutemori Development Association — who we are, our history, mission, and the eight Toaripi villages we serve in Gulf Province.',
}

const villages = [
  { name: 'Lelefiru', desc: 'Located along the Gulf coast, known for its fishing heritage.' },
  { name: 'Hamuhamu', desc: 'A vibrant village with strong agricultural traditions.' },
  { name: 'Kukipi', desc: 'Rich in cultural practices and community spirit.' },
  { name: 'Isapeape', desc: 'Known for its skilled craftsmen and community leaders.' },
  { name: 'Uritai', desc: 'Home to many educators and civil servants serving Gulf Province.' },
  { name: 'Mirivase', desc: 'A growing community with strong youth representation.' },
  { name: 'Lalapipi', desc: 'Renowned for traditional Toaripi customs and ceremonies.' },
  { name: 'Popo', desc: 'A resourceful village with strong ties to the land and sea.' },
]

const values = [
  {
    title: 'Unity',
    desc: 'One people, eight villages — we stand together for the benefit of all Toaripi communities.',
    icon: Users,
  },
  {
    title: 'Integrity',
    desc: 'We manage resources with transparency and accountability to our communities.',
    icon: Shield,
  },
  {
    title: 'Service',
    desc: 'Our leaders serve the people — not for personal gain, but for community progress.',
    icon: Heart,
  },
  {
    title: 'Excellence',
    desc: 'We pursue the highest standards in everything we do for our villages.',
    icon: Star,
  },
]

const executiveCommittee = [
  { name: 'President', role: 'Executive Committee' },
  { name: 'Vice President', role: 'Executive Committee' },
  { name: 'Secretary', role: 'Executive Committee' },
  { name: 'Treasurer', role: 'Executive Committee' },
  { name: 'Village Rep — Lelefiru', role: 'Village Representative' },
  { name: 'Village Rep — Hamuhamu', role: 'Village Representative' },
  { name: 'Village Rep — Kukipi', role: 'Village Representative' },
  { name: 'Village Rep — Isapeape', role: 'Village Representative' },
]

export default function AboutUsPage() {
  return (
    <main className="pb-24">
      {/* Page Hero */}
      <section className="relative py-20 mb-20 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/toaripi-about/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              The Toaripi Atutemori Development Association (TADA) is an organisation formed by and
              for the Toaripi people of Gulf Province, Papua New Guinea. We exist to address the
              challenges facing our villages, empower our communities, and secure a prosperous future
              for the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card border-y border-border py-20 mb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target size={20} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To address the issues faced by Toaripi villages, represent the interests of our
                people, and coordinate development initiatives that improve livelihoods, strengthen
                communities, and create lasting opportunities for all Toaripi people in Gulf
                Province.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Star size={20} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thriving Toaripi villages where every man, woman, and child has access to quality
                services, economic opportunity, and a future filled with hope — while proudly
                carrying forward our culture and identity as the Toaripi people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Villages */}
      <section className="container mb-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin size={18} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Our Eight Villages</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {villages.map((v) => (
            <div key={v.name} className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <h3 className="font-semibold">{v.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-20 overflow-hidden">
        {/* Top: full-width image strip */}
        <div className="grid grid-cols-3 h-64 md:h-80">
          <div className="overflow-hidden">
            <img src="https://picsum.photos/seed/village-coast/600/400" alt="Coastal village" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="overflow-hidden">
            <img src="https://picsum.photos/seed/png-nature/600/400" alt="Gulf Province nature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="overflow-hidden">
            <img src="https://picsum.photos/seed/toaripi-people/600/400" alt="Toaripi village" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Bottom: text + highlight card */}
        <div className="container pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Story</span>
              <h2 className="text-3xl font-bold mb-6">How TADA Was Born</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Toaripi people have called the Gulf Province coastline home for generations. Our
                  eight villages — Lelefiru, Hamuhamu, Kukipi, Isapeape, Uritai, Mirivase, Lalapipi, and
                  Popo — share a common language, culture, and identity that is both unique and precious.
                </p>
                <p>
                  Despite the richness of our heritage, our communities face real challenges: limited
                  access to services, lack of economic opportunities, inadequate infrastructure, and the
                  need for stronger representation. It was from this reality that TADA was born.
                </p>
                <p>
                  Formed by Toaripi sons and daughters who understand these challenges firsthand, TADA
                  brings together community leaders, professionals, and concerned citizens to work
                  collectively toward solutions. We believe that when Toaripi people are united, we can
                  achieve anything.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-xl bg-primary text-primary-foreground p-7">
                <div className="text-4xl font-black mb-1">8</div>
                <div className="text-sm font-semibold opacity-80 mb-5">Villages United</div>
                <div className="text-4xl font-black mb-1">1,813</div>
                <div className="text-sm font-semibold opacity-80 mb-5">Community Members</div>
                <div className="text-4xl font-black mb-1">12+</div>
                <div className="text-sm font-semibold opacity-80">Active Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-y border-border py-20 mb-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-lg border border-border bg-background">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-4 text-center">Executive Committee</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          TADA is governed by an elected Executive Committee representing all eight Toaripi villages.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {executiveCommittee.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-lg border border-border bg-card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users size={20} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold leading-snug">{m.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
