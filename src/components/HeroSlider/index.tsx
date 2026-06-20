'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    image: 'https://picsum.photos/seed/papua-gulf-village/1600/900',
    tag: 'Gulf Province, Papua New Guinea',
    title: 'Toaripi Atutemori Development Association',
    sub: 'Formed to address the challenges faced by our villages, strengthen our communities, and create lasting opportunities for the Toaripi people.',
  },
  {
    image: 'https://picsum.photos/seed/gulf-coast-png/1600/900',
    tag: 'Community Development',
    title: 'Building Stronger Villages',
    sub: 'Infrastructure, clean water, sanitation, and public services that transform everyday life across all eight Toaripi villages.',
  },
  {
    image: 'https://picsum.photos/seed/toaripi-youth-edu/1600/900',
    tag: 'Education & Youth',
    title: 'Empowering the Next Generation',
    sub: 'Scholarships, skills training, and leadership programs ensuring Toaripi youth lead the future of Gulf Province.',
  },
  {
    image: 'https://picsum.photos/seed/png-agriculture-fish/1600/900',
    tag: 'Agriculture & Fisheries',
    title: 'Sustainable Livelihoods',
    sub: 'Supporting food security, cooperative farming, and fishing programs that lift incomes across Toaripi communities.',
  },
]

type Props = {
  motto?: string
}

export function HeroSlider({ motto = 'Look Back, Give Back' }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [next, paused])

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ minHeight: '90vh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(15,30,80,0.72) 0%, rgba(15,30,80,0.55) 60%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1,
        }}
      />

      {/* Text content */}
      <div className="container relative py-28 md:py-44 pb-24" style={{ zIndex: 2 }}>
        <div className="max-w-3xl">
          {/* Motto ribbon */}
          <p
            className="text-white/60 text-sm font-medium italic mb-4"
            style={{ letterSpacing: '0.02em' }}
          >
            &ldquo;{motto}&rdquo;
          </p>

          <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-5">
            {slides[current].tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl leading-relaxed">
            {slides[current].sub}
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

      {/* Dots */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2.5"
        style={{ zIndex: 3 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: 6,
              width: i === current ? 32 : 6,
              borderRadius: 99,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.38)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
