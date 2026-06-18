import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Fish,
  Flower2,
  Heart,
  Home,
  Leaf,
  ShoppingBag,
  Sprout,
  Users,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Programs — TADA',
  description:
    "TADA's programs for the Toaripi people — community development, business opportunities, education, health, agriculture, and cultural initiatives in Gulf Province.",
}

const programs = [
  {
    title: 'Toaripi Fishing Cooperative',
    desc: "Establishing a community-owned fishing cooperative to improve income, share equipment, and connect our fishermen to better markets across Gulf Province and Port Moresby.",
    icon: Fish,
    category: 'Business',
    status: 'Active',
  },
  {
    title: 'Village Market Development',
    desc: 'Creating structured village markets where our people can sell produce, handicrafts, and local goods — building local trade and supplementing household incomes.',
    icon: ShoppingBag,
    category: 'Business',
    status: 'Active',
  },
  {
    title: 'Microfinance & Small Business Fund',
    desc: 'Providing small loans and business development support to entrepreneurs in our villages — from trade stores to poultry farming and sago processing.',
    icon: Briefcase,
    category: 'Business',
    status: 'Planning',
  },
  {
    title: 'Gulf Eco-Tourism Initiative',
    desc: 'Developing eco-tourism experiences that showcase the natural beauty and rich culture of the Toaripi coastline, creating sustainable income for our communities.',
    icon: Flower2,
    category: 'Business',
    status: 'Planning',
  },
  {
    title: 'Secondary School Scholarship Program',
    desc: "Providing annual scholarships to outstanding students from our eight villages to attend secondary school and tertiary institutions, investing in the next generation of Toaripi leaders.",
    icon: BookOpen,
    category: 'Education',
    status: 'Active',
  },
  {
    title: 'Youth Skills & Trades Training',
    desc: 'Partnering with TVET institutions to provide carpentry, electrical, plumbing, and ICT training to Toaripi youth — equipping them for employment and entrepreneurship.',
    icon: Zap,
    category: 'Education',
    status: 'Active',
  },
  {
    title: 'Village Infrastructure Projects',
    desc: 'Coordinating and advocating for roads, water supply, sanitation, and community buildings across all eight Toaripi villages through government partnerships.',
    icon: Home,
    category: 'Development',
    status: 'Active',
  },
  {
    title: 'Community Health Support',
    desc: 'Organising health awareness campaigns, supporting village health clinics, and advocating for improved maternal and child health services in Toaripi communities.',
    icon: Heart,
    category: 'Health',
    status: 'Active',
  },
  {
    title: 'Agriculture & Food Security',
    desc: 'Introducing improved farming techniques, crop diversification, and tools to Toaripi farmers — strengthening food security and creating surplus for sale.',
    icon: Sprout,
    category: 'Agriculture',
    status: 'Active',
  },
  {
    title: 'Women\'s Empowerment Group',
    desc: 'Supporting Toaripi women through savings groups, skills training, and leadership development — recognising women as essential drivers of village progress.',
    icon: Users,
    category: 'Community',
    status: 'Active',
  },
  {
    title: 'Cultural Preservation Program',
    desc: 'Documenting Toaripi language, customs, and traditions and hosting the Annual Toaripi Cultural Festival to celebrate our identity and pass it to future generations.',
    icon: Leaf,
    category: 'Culture',
    status: 'Active',
  },
  {
    title: 'Youth Leadership Program',
    desc: 'Identifying and mentoring young Toaripi leaders through workshops, community projects, and exposure to governance — building the next generation of representatives.',
    icon: Users,
    category: 'Education',
    status: 'Active',
  },
]

const categoryColors: Record<string, string> = {
  Business: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Education: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Development: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Health: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Agriculture: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Community: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Culture: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Planning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function ProgramsPage() {
  return (
    <main className="pb-24">
      {/* Page Hero */}
      <section className="relative py-20 mb-20 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-programs/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Our Programs</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Building Opportunity for Our People</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              TADA runs programs across six pillars — business, education, community development,
              health, agriculture, and culture — all designed to create real, lasting improvement in
              the lives of Toaripi people across our eight villages.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="container mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-lg border border-border bg-card flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon size={20} className="text-primary" />
                </div>
                <div className="flex gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[p.category] ?? 'bg-muted text-muted-foreground'}`}
                  >
                    {p.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status] ?? 'bg-muted text-muted-foreground'}`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Get Involved */}
      <section className="bg-card border-y border-border py-20 mb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">How to Participate</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              All Toaripi community members are welcome to participate in our programs. Village
              representatives can register their community members, and individuals can express
              interest directly to the Executive Committee.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {['Register your village', 'Attend community meetings', 'Apply for programs'].map(
                (step, i) => (
                  <div key={step} className="p-4 rounded-lg border border-border bg-background">
                    <div className="text-2xl font-bold text-primary/30 mb-2">0{i + 1}</div>
                    <p className="font-medium text-sm">{step}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="bg-primary text-primary-foreground rounded-xl p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interested in a Program?</h2>
            <p className="opacity-80">
              Contact the TADA Executive Committee to learn how your village can benefit.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
