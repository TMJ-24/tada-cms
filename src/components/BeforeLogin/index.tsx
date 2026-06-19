import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '0 0 8px',
        borderBottom: '1px solid var(--theme-elevation-100)',
        marginBottom: '24px',
      }}
    >
      {/* TADA emblem */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1D4ED8 0%, #1e40af 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px',
          boxShadow: '0 4px 16px rgba(29,78,216,0.25)',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: 2,
            fontFamily: 'sans-serif',
          }}
        >
          TADA
        </span>
      </div>

      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--theme-text)',
          margin: '0 0 4px',
          fontFamily: 'sans-serif',
        }}
      >
        Toaripi Atutemori Development Association
      </h2>

      <p
        style={{
          fontSize: 12,
          color: 'var(--theme-elevation-500)',
          margin: '0 0 4px',
          fontFamily: 'sans-serif',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        Content Management System
      </p>

      <p
        style={{
          fontSize: 12,
          color: 'var(--theme-elevation-400)',
          margin: 0,
          fontFamily: 'sans-serif',
        }}
      >
        Gulf Province · Papua New Guinea
      </p>
    </div>
  )
}

export default BeforeLogin
