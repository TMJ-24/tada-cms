import React from 'react'

const collections = [
  { label: 'Pages', slug: 'pages', icon: '📄', desc: 'Static site pages' },
  { label: 'Posts', slug: 'posts', icon: '✍️', desc: 'Blog & news posts' },
  { label: 'Programs', slug: 'programs', icon: '📋', desc: 'TADA programs & initiatives' },
  { label: 'Events', slug: 'events', icon: '📅', desc: 'Upcoming community events' },
  { label: 'Projects', slug: 'projects', icon: '🔧', desc: 'Development projects' },
  { label: 'Initiatives', slug: 'initiatives', icon: '🎯', desc: 'Strategic initiatives' },
  { label: 'Members', slug: 'members', icon: '👤', desc: 'TADA membership registry' },
  { label: 'Population', slug: 'population', icon: '🏘️', desc: 'Village population data' },
  { label: 'Announcements', slug: 'announcements', icon: '📢', desc: 'Public notices & alerts' },
  { label: 'Gallery', slug: 'gallery', icon: '🖼️', desc: 'Photo galleries' },
  { label: 'Documents', slug: 'documents', icon: '📁', desc: 'Policies & reports' },
  { label: 'Financials', slug: 'financials', icon: '💰', desc: 'Financial records' },
  { label: 'Meeting Minutes', slug: 'meeting-minutes', icon: '📝', desc: 'Executive meeting notes' },
  { label: 'Media', slug: 'media', icon: '🖼️', desc: 'Uploaded files & images' },
  { label: 'Categories', slug: 'categories', icon: '🏷️', desc: 'Content categories' },
  { label: 'Users', slug: 'users', icon: '👥', desc: 'Admin user accounts' },
]

const globals = [
  { label: 'Site Settings', slug: 'site-settings', icon: '⚙️', desc: 'Motto, contact info, stats' },
  { label: 'Header', slug: 'header', icon: '🗂️', desc: 'Navigation menu' },
  { label: 'Footer', slug: 'footer', icon: '📌', desc: 'Footer links & info' },
]

const BeforeDashboard: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>

      {/* Welcome header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D4ED8 0%, #1e3a8a 100%)',
        borderRadius: 14,
        padding: '28px 32px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              🌿
            </div>
            <div>
              <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                TADA Content Management
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0, marginTop: 2 }}>
                Toaripi Atutemori Development Association · Gulf Province, PNG
              </p>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: '10px 0 0', fontStyle: 'italic' }}>
            &ldquo;Look Back, Give Back&rdquo;
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 8, padding: '8px 16px',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}
        >
          View Website →
        </a>
      </div>

      {/* Quick access — globals */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--theme-elevation-500)',
          marginBottom: 10,
        }}>
          Globals
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {globals.map(g => (
            <a
              key={g.slug}
              href={`/admin/globals/${g.slug}`}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px',
                background: 'var(--theme-bg)',
                border: '1px solid var(--theme-elevation-100)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1 }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--theme-text)', marginBottom: 2 }}>
                  {g.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>
                  {g.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick access — collections */}
      <div>
        <p style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--theme-elevation-500)',
          marginBottom: 10,
        }}>
          Collections
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {collections.map(c => (
            <a
              key={c.slug}
              href={`/admin/collections/${c.slug}`}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px',
                background: 'var(--theme-bg)',
                border: '1px solid var(--theme-elevation-100)',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--theme-text)', marginBottom: 2 }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>
                  {c.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}

export default BeforeDashboard
