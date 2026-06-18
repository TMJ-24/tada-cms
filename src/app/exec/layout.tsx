import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { cn } from '@/utilities/ui'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { Providers } from '@/providers'

import '../(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'Executive Portal — TADA',
  description: 'TADA Executive Committee Portal',
}

export default function ExecLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body className="bg-background text-foreground min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
