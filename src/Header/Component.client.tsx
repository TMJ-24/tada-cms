'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ChevronDown, LayoutDashboard, Lock, LogOut, Search, User } from 'lucide-react'
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

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, currentUser }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await fetch('/api/users/logout', { method: 'POST' })
    // Also clear our custom cookie
    document.cookie = 'tada-exec-token=; Max-Age=0; path=/'
    router.push('/')
    router.refresh()
  }

  return (
    <header
      className="sticky top-0 z-20 w-full border-b border-border bg-background/95 backdrop-blur-sm"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4 flex items-center justify-between relative">
        {/* Logo — left */}
        <Link href="/" className="shrink-0">
          <Logo loading="eager" priority="high" />
        </Link>

        {/* Nav — absolutely centred (desktop only) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <HeaderNav data={data} />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <Link
            href="/search"
            aria-label="Search"
            className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
          >
            <Search size={18} />
          </Link>

          {/* Authenticated user menu OR login button */}
          {currentUser ? (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={13} className="text-primary" />
                </div>
                <span className="font-medium max-w-[100px] truncate">{currentUser.name || 'User'}</span>
                <ChevronDown size={14} className={cn('transition-transform', menuOpen && 'rotate-180')} />
              </button>

              {menuOpen && (
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
                  <Link
                    href="/exec/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/exec/login"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Lock size={14} />
              Executive Login
            </Link>
          )}

          {/* Mobile nav */}
          <div className="md:hidden">
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
