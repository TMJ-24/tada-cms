import type { Metadata } from 'next'
import { Download, FileText, Shield, TrendingUp, BookOpen, Megaphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documents — TADA',
  description: 'Official documents, reports, and resources from the Toaripi Atutemori Development Association.',
}

const documents = [
  {
    category: 'governance',
    title: 'TADA Constitution & By-Laws',
    desc: 'The foundational governance document of the Toaripi Atutemori Development Association.',
    year: 2023,
    version: 'v2.1',
    public: true,
    icon: Shield,
  },
  {
    category: 'annual_report',
    title: 'Annual Report 2025',
    desc: 'Full program and financial report for the 2025 financial year, presented at the 2025 AGM.',
    year: 2025,
    version: 'Final',
    public: true,
    icon: TrendingUp,
  },
  {
    category: 'annual_report',
    title: 'Annual Report 2024',
    desc: 'Program and financial report for the 2024 financial year.',
    year: 2024,
    version: 'Final',
    public: true,
    icon: TrendingUp,
  },
  {
    category: 'financial',
    title: 'Audited Financial Statements 2025',
    desc: 'Independently audited financial statements for the year ended 31 December 2025.',
    year: 2025,
    version: 'Final',
    public: true,
    icon: FileText,
  },
  {
    category: 'minutes',
    title: 'AGM 2025 — Meeting Minutes',
    desc: 'Signed minutes from the 2025 Annual General Meeting held at Uritai Village.',
    year: 2025,
    version: 'Signed',
    public: true,
    icon: BookOpen,
  },
  {
    category: 'minutes',
    title: 'Executive Committee Minutes — Q1 2026',
    desc: 'Minutes from the January–March 2026 executive committee meetings.',
    year: 2026,
    version: 'Draft',
    public: false,
    icon: BookOpen,
  },
  {
    category: 'policy',
    title: 'Scholarship Program Policy',
    desc: 'Eligibility criteria, selection process, and obligations for the TADA Scholarship Program.',
    year: 2024,
    version: 'v1.3',
    public: true,
    icon: BookOpen,
  },
  {
    category: 'program',
    title: 'Toaripi Fishing Cooperative Prospectus',
    desc: 'Business prospectus for the newly registered Toaripi Fishing Cooperative.',
    year: 2026,
    version: 'v1.0',
    public: true,
    icon: FileText,
  },
  {
    category: 'governance',
    title: 'TADA Strategic Plan 2025–2030',
    desc: 'Five-year strategic plan outlining goals, priorities, and key performance indicators.',
    year: 2025,
    version: 'Approved',
    public: true,
    icon: Megaphone,
  },
]

const categoryLabel: Record<string, string> = {
  governance: 'Governance',
  annual_report: 'Annual Report',
  financial: 'Financial',
  minutes: 'Meeting Minutes',
  policy: 'Policy',
  program: 'Program',
  other: 'Other',
}

const categoryColor: Record<string, string> = {
  governance: 'bg-blue-100 text-blue-700',
  annual_report: 'bg-green-100 text-green-700',
  financial: 'bg-amber-100 text-amber-700',
  minutes: 'bg-purple-100 text-purple-700',
  policy: 'bg-teal-100 text-teal-700',
  program: 'bg-orange-100 text-orange-700',
  other: 'bg-muted text-muted-foreground',
}

const categories = ['All', 'Governance', 'Annual Report', 'Financial', 'Meeting Minutes', 'Policy', 'Program']

export default function DocumentsPage() {
  const publicDocs = documents.filter((d) => d.public)

  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative py-20 mb-16 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-documents/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Resources</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Document Library</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Official TADA documents — governance frameworks, annual reports, financial statements, meeting minutes, and program resources.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors">
              {c}
            </span>
          ))}
        </div>

        {/* Documents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {publicDocs.map((doc) => (
            <div key={doc.title} className="group flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <doc.icon size={18} className="text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[doc.category]}`}>
                    {categoryLabel[doc.category]}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold mb-1.5 leading-snug">{doc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{doc.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{doc.year}</span>
                  <span>·</span>
                  <span>{doc.version}</span>
                </div>
                <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                  <Download size={12} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="rounded-xl bg-card border border-border p-6 flex items-start gap-4">
          <Shield size={20} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Executive-only documents</p>
            <p className="text-sm text-muted-foreground">
              Some documents — including internal financial working papers and draft meeting minutes — are restricted to executive committee members and village representatives.{' '}
              <a href="/exec/login" className="text-primary font-semibold hover:underline">Log in to the Executive Portal</a> to access restricted documents.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
