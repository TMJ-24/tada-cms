import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react'
import { news, categoryColor } from '../news-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = news.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — TADA`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = news.find((a) => a.slug === slug)
  if (!article) notFound()

  const currentIndex = news.indexOf(article)
  const prev = news[currentIndex - 1] ?? null
  const next = news[currentIndex + 1] ?? null

  const related = news.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 2)

  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative py-20 text-white overflow-hidden mb-12">
        <img src={article.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative z-10">
          <Link href="/media-news" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to News
          </Link>
          <div className="max-w-3xl">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColor[article.category] ?? 'bg-white/20 text-white'}`}>
              <Tag size={11} /> {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{article.title}</h1>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar size={14} />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Article body */}
          <article className="lg:col-span-2">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-5 italic">
              {article.excerpt}
            </p>
            <div className="space-y-5 text-foreground leading-relaxed">
              {article.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="mt-14 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/media-news/${prev.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-colors">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><ArrowLeft size={12} /> Previous</span>
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{prev.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/media-news/${next.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-colors text-right ml-auto w-full">
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">Next <ArrowRight size={12} /></span>
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">{next.title}</span>
                </Link>
              ) : <div />}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Article info */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Article Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[article.category] ?? 'bg-muted text-muted-foreground'}`}>{article.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium">{article.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-medium">TADA Secretariat</span>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/media-news/${r.slug}`} className="group flex gap-3">
                      <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{r.date}</p>
                        <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">{r.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All news CTA */}
            <Link href="/media-news" className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              View All News <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
