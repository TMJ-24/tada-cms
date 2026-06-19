'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ChevronDown, LayoutDashboard, Lock, LogOut, Menu, Search, User, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
  currentUser: { name?: string; email?: string; role?: string } | null
}

const roleLabel: Record<string, string> = {
  super_admin: 'Super Admin',
  executive: 'Executive',
  village_rep: 'Village Rep',
  member: 'Member',
}

const mobileNavItems = [
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

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, currentUser }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setUserMenuOpen(false)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await fetch('/api/users/logout', { method: 'POST' })
    document.cookie = 'tada-exec-token=; Max-Age=0; path=/'
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <header
        className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur-sm"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop nav — absolutely centred */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <HeaderNav data={data} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search (desktop only) */}
            <Link
              href="/search"
              aria-label="Search"
              className="hidden md:flex p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
            >
              <Search size={18} />
            </Link>

            {/* Desktop: user menu or login */}
            {currentUser ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={13} className="text-primary" />
                  </div>
                  <span className="font-medium max-w-[100px] truncate">{currentUser.name || 'User'}</span>
                  <ChevronDown size={14} className={cn('transition-transform', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-background border border-border rounded-lg shadow-md py-1 z-50">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-xs font-semibold truncate">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                      {currentUser.role && (
                        <span className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          {roleLabel[currentUser.role] ?? currentUser.role}
                        </span>
                      )}
                    </div>
                    <Link href="/exec/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                      <LayoutDashboard size={14} /> Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/exec/login"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Lock size={14} /> Executive Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 md:hidden" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute top-[65px] left-0 right-0 bg-background border-b border-border shadow-xl overflow-y-auto max-h-[calc(100vh-65px)]">
            <nav className="container py-4 flex flex-col gap-1">
              {mobileNavItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    pathname === href
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent',
                  )}
                >
                  {label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-border">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 mb-1">
                      <p className="text-sm font-semibold">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                    <Link
                      href="/exec/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-destructive hover:bg-accent transition-colors"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/exec/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Lock size={18} /> Executive Login
                  </Link>
                )}
              </div>

              <Link
                href="/search"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
              >
                <Search size={18} /> Search
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
