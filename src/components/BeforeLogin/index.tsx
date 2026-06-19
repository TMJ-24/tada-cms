'use client'
import React, { useEffect, useRef } from 'react'

export default function BeforeLogin() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const parent = ref.current.parentElement
    if (!parent) return

    // Hide Payload logo — it's the element before ours in the DOM
    const logo = ref.current.previousElementSibling as HTMLElement | null
    if (logo) logo.style.display = 'none'

    // Style parent container as a unified card
    Object.assign(parent.style, {
      padding: '0',
      overflow: 'hidden',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
      background: '#fff',
      maxWidth: '420px',
      margin: '0 auto',
    })

    // Style the form section (next sibling = Payload's form)
    const formEl = ref.current.nextElementSibling as HTMLElement | null
    if (formEl) {
      Object.assign(formEl.style, {
        padding: '28px 32px 8px',
      })
    }
  }, [])

  return (
    <div ref={ref}>
      {/* Blue card header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D4ED8 0%, #1e40af 100%)',
        padding: '32px 32px 28px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>TADA Admin Panel</div>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 2 }}>Toaripi Atutemori Development Association</div>
        <div style={{ fontSize: 11, opacity: 0.6 }}>Gulf Province · Papua New Guinea</div>
      </div>

      {/* Sign In heading inside card body */}
      <div style={{ padding: '24px 32px 0' }}>
        <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: '#111' }}>Sign In</p>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 0' }}>
          Authorised TADA administrators only.
        </p>
      </div>
    </div>
  )
}
