import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Download, FileText, Megaphone } from 'lucide-react'
import { news, categoryColor } from './news-data'

export const metadata: Metadata = {
  title: 'Media & News — TADA',
  description:
    'Latest news, announcements, and updates from the Toaripi Atutemori Development Association and the eight Toaripi villages of Gulf Province.',
}

const resources = [
  { title: 'TADA Constitution & By-Laws', desc: 'Governance framework for the association.', icon: FileText },
  { title: 'Annual Report 2025', desc: 'Full financial and program report.', icon: Download },
  { title: 'Community Notice Board', desc: 'Official notices and announcements.', icon: Megaphone },
]

export default function MediaNewsPage() {
  return (
    <main className="pb-24">
      {/* Page Hero */}
      <section className="relative py-20 mb-20 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-news/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Media &amp; News</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Village News &amp; Announcements</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Stay up to date with the latest news, project updates, and announcements from TADA and
              the Toaripi communities of Gulf Province.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mb-16">
        <Link href={`/media-news/${news[0].slug}`} className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-56 lg:h-auto min-h-[280px] overflow-hidden">
              <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className={`self-start inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColor[news[0].category]}`}>
                {news[0].category} · Featured
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{news[0].title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar size={14} />
                <span>{news[0].date}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{news[0].excerpt}</p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                Read Full Article <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* News Grid */}
      <section className="container mb-24">
        <h2 className="text-2xl font-bold mb-8">Recent Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(1).map((article) => (
            <Link
              key={article.slug}
              href={`/media-news/${article.slug}`}
              className="group rounded-lg border border-border bg-card flex flex-col overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColor[article.category] ?? 'bg-muted text-muted-foreground'}`}>
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar size={12} />
                  <span>{article.date}</span>
                </div>
                <h3 className="font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Read more <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-card border-y border-border py-20">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Community Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div key={r.title} className="p-6 rounded-lg border border-border bg-background flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <r.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
                  <button className="text-sm text-primary font-semibold hover:underline">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
