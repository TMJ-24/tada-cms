import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery — TADA',
  description: 'Photo gallery from TADA events, village life, and community programs across the eight Toaripi villages.',
}

const photos = [
  { id: 1, seed: 'tada-g1', title: 'AGM 2025 — Kukipi Village', category: 'community', village: 'Kukipi', year: 2025, span: 'col-span-2 row-span-2' },
  { id: 2, seed: 'tada-g2', title: 'Cultural Festival Opening', category: 'cultural', village: 'Hamuhamu', year: 2025, span: '' },
  { id: 3, seed: 'tada-g3', title: 'Scholarship Recipients 2025', category: 'education', village: 'Uritai', year: 2025, span: '' },
  { id: 4, seed: 'tada-g4', title: 'Road Project Ground-breaking', category: 'project', village: 'Kukipi', year: 2026, span: '' },
  { id: 5, seed: 'tada-g5', title: 'Mobile Health Clinic', category: 'health', village: 'Lelefiru', year: 2026, span: '' },
  { id: 6, seed: 'tada-g6', title: 'Traditional Dance Performance', category: 'cultural', village: 'Lalapipi', year: 2025, span: 'col-span-2' },
  { id: 7, seed: 'tada-g7', title: 'Village Meeting — Popo', category: 'community', village: 'Popo', year: 2025, span: '' },
  { id: 8, seed: 'tada-g8', title: 'Fishing Cooperative Launch', category: 'community', village: 'Lelefiru', year: 2026, span: '' },
  { id: 9, seed: 'tada-g9', title: 'Youth Leadership Forum', category: 'education', village: 'Isapeape', year: 2026, span: '' },
  { id: 10, seed: 'tada-g10', title: 'Agriculture Training Day', category: 'project', village: 'Mirivase', year: 2026, span: '' },
  { id: 11, seed: 'tada-g11', title: 'Community Feast — Hamuhamu', category: 'cultural', village: 'Hamuhamu', year: 2025, span: '' },
  { id: 12, seed: 'tada-g12', title: 'Executive Committee 2025', category: 'leadership', village: 'All', year: 2025, span: 'col-span-2' },
]

const categoryColor: Record<string, string> = {
  community: 'bg-green-100 text-green-700',
  cultural: 'bg-orange-100 text-orange-700',
  project: 'bg-amber-100 text-amber-700',
  health: 'bg-red-100 text-red-700',
  education: 'bg-purple-100 text-purple-700',
  village: 'bg-teal-100 text-teal-700',
  leadership: 'bg-blue-100 text-blue-700',
}

const villages = ['All', 'Lelefiru', 'Hamuhamu', 'Kukipi', 'Isapeape', 'Uritai', 'Mirivase', 'Lalapipi', 'Popo']

export default function GalleryPage() {
  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative py-20 mb-16 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-gallery/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Photo Gallery</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Communities in Pictures</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              A visual record of life, progress, and celebration across the eight Toaripi villages of Gulf Province.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Village filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {villages.map((v) => (
            <span key={v} className="px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors">
              {v}
            </span>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-xl ${photo.span}`}
            >
              <img
                src={`https://picsum.photos/seed/${photo.seed}/800/600`}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColor[photo.category] ?? 'bg-muted text-muted-foreground'}`}>
                  {photo.village}
                </span>
                <p className="text-white text-sm font-semibold leading-snug">{photo.title}</p>
                <p className="text-white/60 text-xs mt-0.5">{photo.year}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Photos are added by the TADA secretariat and village representatives. To submit photos, contact{' '}
          <a href="mailto:exec@tada.org.pg" className="text-primary hover:underline">exec@tada.org.pg</a>.
        </p>
      </div>
    </main>
  )
}
