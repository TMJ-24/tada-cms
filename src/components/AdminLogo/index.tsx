'use client'
import React from 'react'

export const AdminLogo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '2px 0',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1D4ED8 0%, #1e40af 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: 1,
            fontFamily: 'sans-serif',
          }}
        >
          TADA
        </span>
      </div>
      <div style={{ lineHeight: 1.15 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--theme-text)',
            fontFamily: 'sans-serif',
          }}
        >
          TADA CMS
        </div>
        <div
          style={{
            fontSize: 9,
            color: 'var(--theme-elevation-500)',
            letterSpacing: 0.5,
            fontFamily: 'sans-serif',
          }}
        >
          Toaripi Atutemori Dev. Assoc.
        </div>
      </div>
    </div>
  )
}

export default AdminLogo
