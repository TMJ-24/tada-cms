'use client'
import React, { useEffect, useRef } from 'react'

export default function AfterLogin() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const parent = ref.current.parentElement
    if (!parent) return
    // Ensure bottom of card has padding
    Object.assign(parent.style, { paddingBottom: '0' })
  }, [])

  return (
    <div
      ref={ref}
      style={{
        padding: '16px 32px 24px',
        borderTop: '1px solid #f3f4f6',
        marginTop: 16,
        textAlign: 'center',
      }}
    >
      <a
        href="/"
        style={{
          fontSize: 13,
          color: '#6b7280',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#111')}
        onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
      >
        ← Back to TADA website
      </a>
    </div>
  )
}
