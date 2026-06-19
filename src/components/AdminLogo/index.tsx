'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const AdminLogo: React.FC = () => {
  const pathname = usePathname()
  if (pathname === '/admin') return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1D4ED8 0%, #1e40af 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontSize: 7, fontWeight: 900, letterSpacing: 1 }}>TADA</span>
      </div>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--theme-text)' }}>TADA CMS</div>
        <div style={{ fontSize: 8, color: 'var(--theme-elevation-500)' }}>Gulf Province, PNG</div>
      </div>
    </div>
  )
}

export default AdminLogo
