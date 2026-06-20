'use client'
import React, { useEffect, useState } from 'react'
import {
  Database, Download, Loader, Power, CheckCircle, AlertCircle, RefreshCw,
} from 'lucide-react'

const btn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', border: 'none', transition: 'opacity 0.15s',
}

export function AdminActions() {
  const [maintenance, setMaintenance] = useState<boolean | null>(null)
  const [toggling, setToggling] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    fetch('/api/globals/site-settings', { credentials: 'include' })
      .then(r => r.json())
      .then(d => setMaintenance(!!d?.maintenanceMode))
      .catch(() => setMaintenance(false))
  }, [])

  const toggleMaintenance = async () => {
    setToggling(true)
    try {
      const next = !maintenance
      const res = await fetch('/api/globals/site-settings', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenanceMode: next }),
      })
      if (res.ok) {
        const d = await res.json()
        setMaintenance(!!d?.doc?.maintenanceMode)
        showToast(next ? 'Maintenance mode ON — site is now hidden from visitors.' : 'Maintenance mode OFF — site is live.')
      } else {
        showToast('Failed to update. Check your permissions.', false)
      }
    } catch {
      showToast('Network error. Try again.', false)
    } finally {
      setToggling(false)
    }
  }

  const downloadBackup = async () => {
    setDownloading(true)
    try {
      const [settings, header, footer] = await Promise.all([
        fetch('/api/globals/site-settings', { credentials: 'include' }).then(r => r.json()),
        fetch('/api/globals/header', { credentials: 'include' }).then(r => r.json()),
        fetch('/api/globals/footer', { credentials: 'include' }).then(r => r.json()),
      ])
      const backup = {
        exportedAt: new Date().toISOString(),
        globals: { 'site-settings': settings, header, footer },
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tada-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      showToast('Backup downloaded — globals exported as JSON.')
    } catch {
      showToast('Backup failed. Try again.', false)
    } finally {
      setDownloading(false)
    }
  }

  const isOn = maintenance === true

  return (
    <div style={{ marginTop: 28 }}>
      <p style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: 'var(--theme-elevation-500)', marginBottom: 10,
      }}>
        System Tools
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>

        {/* Backup Settings */}
        <div style={{
          background: 'var(--theme-bg)',
          border: '1px solid var(--theme-elevation-100)',
          borderRadius: 12, padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Database size={17} color="#1D4ED8" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--theme-text)' }}>Backup Settings</div>
              <div style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>Export globals as JSON</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--theme-elevation-500)', marginBottom: 14, lineHeight: 1.5 }}>
            Downloads a JSON snapshot of Site Settings, Header, and Footer globals for safekeeping or migration.
          </p>
          <button
            onClick={downloadBackup}
            disabled={downloading}
            style={{
              ...btn,
              background: '#1D4ED8', color: '#fff',
              opacity: downloading ? 0.7 : 1,
              width: '100%', justifyContent: 'center',
            }}
          >
            {downloading
              ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Exporting…</>
              : <><Download size={14} /> Download Backup</>
            }
          </button>
        </div>

        {/* Website Maintenance */}
        <div style={{
          background: 'var(--theme-bg)',
          border: `1px solid ${isOn ? '#FCA5A5' : 'var(--theme-elevation-100)'}`,
          borderRadius: 12, padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: isOn ? '#FEF2F2' : 'var(--theme-elevation-50)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Power size={17} color={isOn ? '#DC2626' : 'var(--theme-elevation-500)'} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--theme-text)' }}>Website Maintenance</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                {maintenance === null
                  ? <><Loader size={10} style={{ animation: 'spin 1s linear infinite' }} /><span style={{ fontSize: 11, color: 'var(--theme-elevation-500)' }}>Checking…</span></>
                  : isOn
                    ? <><AlertCircle size={11} color="#DC2626" /><span style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>MAINTENANCE ON</span></>
                    : <><CheckCircle size={11} color="#16A34A" /><span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>Site is LIVE</span></>
                }
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--theme-elevation-500)', marginBottom: 14, lineHeight: 1.5 }}>
            {isOn
              ? 'Visitors currently see a maintenance notice. Toggle off to restore the site.'
              : 'Toggle on to show a maintenance notice to all visitors while you make changes.'}
          </p>
          <button
            onClick={toggleMaintenance}
            disabled={toggling || maintenance === null}
            style={{
              ...btn,
              background: isOn ? '#DC2626' : 'var(--theme-elevation-100)',
              color: isOn ? '#fff' : 'var(--theme-text)',
              opacity: toggling || maintenance === null ? 0.6 : 1,
              width: '100%', justifyContent: 'center',
            }}
          >
            {toggling
              ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Updating…</>
              : isOn
                ? <><Power size={14} /> Turn Off Maintenance</>
                : <><Power size={14} /> Enable Maintenance</>
            }
          </button>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: toast.ok ? '#166534' : '#991B1B',
          color: '#fff', borderRadius: 10, padding: '12px 18px',
          fontSize: 13, fontWeight: 500, maxWidth: 380,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {toast.ok ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
