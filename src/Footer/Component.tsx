import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  let footerData: Awaited<ReturnType<ReturnType<typeof getCachedGlobal>>> | null = null
  try {
    footerData = await getCachedGlobal('footer', 1)()
  } catch {
    // DB not yet initialised (first build) — render with empty nav
  }

  const navItems = footerData?.navItems || []

  const defaultFooterLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Programs', href: '/what-we-do' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Media & News', href: '/media-news' },
    { label: 'Documents', href: '/documents' },
    { label: 'Join TADA', href: '/join' },
    { label: 'Contact Us', href: '/contact-us' },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      {/* Main footer */}
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link className="flex items-center mb-4" href="/">
            <Logo />
          </Link>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Serving the Toaripi people of Gulf Province, Papua New Guinea — building stronger
            villages, empowering communities, and creating opportunity for the next generation.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Navigation
          </h3>
          <nav className="flex flex-col gap-3">
            {navItems.length > 0
              ? navItems.map(({ link }, i) => {
                  return <CMSLink className="text-white/70 hover:text-white text-sm" key={i} {...link} />
                })
              : defaultFooterLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
          </nav>
        </div>

        {/* Contact snippet */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-white/60">
            <p>Level 5, Deloitte Tower</p>
            <p>Port Moresby, Papua New Guinea</p>
            <a href="mailto:exec@tada.org.pg" className="hover:text-white transition-colors block">
              exec@tada.org.pg
            </a>
            <a href="tel:+67530000000" className="hover:text-white transition-colors block">
              +675 300 0000
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} Toaripi Atutemori Development Association. All rights reserved.
          </p>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
