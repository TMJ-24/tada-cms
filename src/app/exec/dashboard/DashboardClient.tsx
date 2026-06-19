'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight, BarChart3, Bell, BookOpen, Briefcase, Calendar,
  DollarSign, FileText, Home, LogOut, MapPin, PlusCircle,
  Shield, TrendingDown, TrendingUp, Users,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { logoutAction } from '../login/actions'

type Tab = 'overview' | 'population' | 'projects' | 'initiatives' | 'programs' | 'members' | 'minutes' | 'financials' | 'announcements'

interface Props {
  population: any[]
  projects: any[]
  initiatives: any[]
  programs: any[]
  events: any[]
  members: any[]
  minutes: any[]
  financials: any[]
  announcements: any[]
  userRole: string
  userName: string
  userVillage?: string
}

const statusColor: Record<string, string> = {
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  planning: 'bg-amber-100 text-amber-700',
  on_hold: 'bg-orange-100 text-orange-700',
  cancelled: 'bg-red-100 text-red-700',
  active: 'bg-green-100 text-green-700',
  upcoming: 'bg-blue-100 text-blue-700',
  registered: 'bg-green-100 text-green-700',
  design: 'bg-purple-100 text-purple-700',
  concept: 'bg-orange-100 text-orange-700',
  scaling: 'bg-teal-100 text-teal-700',
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  inactive: 'bg-muted text-muted-foreground',
  normal: 'bg-muted text-muted-foreground',
  important: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
  income: 'bg-green-100 text-green-700',
  expenditure: 'bg-red-100 text-red-700',
}

const roleLabel: Record<string, string> = {
  super_admin: 'Super Admin',
  executive: 'Executive Committee',
  village_rep: 'Village Representative',
  member: 'Member',
}

function prettify(val: string = '') {
  return val.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function EmptyState({ label, href }: { label: string; href: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
      <PlusCircle size={32} className="mx-auto mb-3 text-muted-foreground/40" />
      <p className="font-medium mb-1">No {label} yet</p>
      <p className="text-sm text-muted-foreground mb-4">Add records via the admin panel.</p>
      <Link href={href} target="_blank" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline">
        Open Admin Panel <ArrowUpRight size={14} />
      </Link>
    </div>
  )
}

function MiniBar({ value, max, color = 'bg-primary' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-muted rounded-full h-2">
        <div className={`${color} rounded-full h-2 transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
    </div>
  )
}

export function DashboardClient({
  population, projects, initiatives, programs,
  events, members, minutes, financials, announcements,
  userRole, userName, userVillage,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const canEdit = ['super_admin', 'executive'].includes(userRole)

  const totalPop = population.reduce((s, v) => s + (v.totalPopulation || 0), 0)
  const totalHH = population.reduce((s, v) => s + (v.households || 0), 0)
  const activeProjects = projects.filter((p) => p.status === 'in_progress').length
  const completedProjects = projects.filter((p) => p.status === 'completed').length
  const activePrograms = programs.filter((p) => ['active', 'registered', 'scaling'].includes(p.stage)).length
  const pendingMembers = members.filter((m) => m.status === 'pending').length
  const activeMembers = members.filter((m) => m.status === 'active').length
  const totalIncome = financials.filter((f) => f.type === 'income').reduce((s, f) => s + (f.amount || 0), 0)
  const totalExpenditure = financials.filter((f) => f.type === 'expenditure').reduce((s, f) => s + (f.amount || 0), 0)
  const balance = totalIncome - totalExpenditure
  const pinnedAnnouncements = announcements.filter((a) => a.pinned)

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'population', label: 'Population', icon: Users, count: population.length },
    { id: 'projects', label: 'Projects', icon: TrendingUp, count: projects.length },
    { id: 'initiatives', label: 'Initiatives', icon: BookOpen, count: initiatives.length },
    { id: 'programs', label: 'Programs', icon: Briefcase, count: programs.length },
    { id: 'members', label: 'Members', icon: Users, count: members.length },
    { id: 'minutes', label: 'Minutes', icon: FileText, count: minutes.length },
    { id: 'financials', label: 'Financials', icon: DollarSign, count: financials.length },
    { id: 'announcements', label: 'Announcements', icon: Bell, count: announcements.length },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-primary text-primary-foreground hidden lg:flex flex-col">
        <div className="p-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="opacity-70" />
            <span className="font-bold text-sm tracking-wide">TADA PORTAL</span>
          </div>
          <p className="text-xs opacity-50 truncate">{roleLabel[userRole] ?? userRole}</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                activeTab === tab.id
                  ? 'bg-primary-foreground/15 text-primary-foreground'
                  : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10')}>
              <span className="flex items-center gap-2.5"><tab.icon size={14} />{tab.label}</span>
              {tab.count !== undefined && (
                <span className={cn('text-xs px-1.5 py-0.5 rounded-full', activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-primary-foreground/10')}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 space-y-0.5 border-t border-primary-foreground/10">
          {canEdit && (
            <Link href="/admin" target="_blank"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              <ArrowUpRight size={14} /> Admin Panel
            </Link>
          )}
          <Link href="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            <Home size={14} /> Back to Website
          </Link>
          <form action={logoutAction}>
            <button type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Executive Dashboard</h1>
            <p className="text-xs text-muted-foreground">{userName}{userVillage ? ` · ${userVillage}` : ''} · <span className="font-medium">{roleLabel[userRole] ?? userRole}</span></p>
          </div>
          {canEdit && (
            <Link href="/admin" target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <ArrowUpRight size={12} /> Admin Panel
            </Link>
          )}
        </header>

        {pinnedAnnouncements.length > 0 && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 space-y-1">
            {pinnedAnnouncements.map((a) => (
              <div key={a.id} className="flex items-start gap-2">
                <Bell size={14} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-800"><span className="font-semibold">{a.title}:</span> {a.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile tabs */}
        <div className="lg:hidden flex overflow-x-auto gap-1 px-4 py-3 border-b border-border">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground')}>
              <tab.icon size={11} />{tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6 pb-12 overflow-auto">

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : '—', sub: `${totalHH} households`, icon: Users, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Active Projects', value: activeProjects.toString(), sub: `${completedProjects} completed`, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
                  { label: 'Active Members', value: activeMembers.toString(), sub: `${pendingMembers} pending`, icon: Users, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Net Balance', value: balance > 0 ? `K${balance.toLocaleString()}` : '—', sub: `K${totalIncome.toLocaleString()} income`, icon: DollarSign, color: balance >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50' },
                ].map((card) => (
                  <div key={card.label} className="bg-card rounded-xl border border-border p-5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                      <card.icon size={16} />
                    </div>
                    <div className="text-2xl font-bold mb-0.5">{card.value}</div>
                    <div className="text-xs font-medium mb-0.5">{card.label}</div>
                    <div className="text-xs text-muted-foreground">{card.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold mb-5">Project Status Breakdown</h3>
                  {projects.length === 0 ? <p className="text-sm text-muted-foreground">No projects yet.</p> : (
                    <div className="space-y-4">
                      {['in_progress', 'planning', 'completed', 'on_hold', 'cancelled'].map((status) => {
                        const count = projects.filter((p) => p.status === status).length
                        return (
                          <div key={status}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium">{prettify(status)}</span>
                              <span className="text-muted-foreground">{count} / {projects.length}</span>
                            </div>
                            <MiniBar value={count} max={projects.length}
                              color={status === 'completed' ? 'bg-green-500' : status === 'cancelled' ? 'bg-red-400' : 'bg-primary'} />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold mb-5">Financial Summary</h3>
                  {financials.length === 0 ? <p className="text-sm text-muted-foreground">No financial records yet.</p> : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                        <div className="flex items-center gap-2"><TrendingUp size={16} className="text-green-600" /><span className="text-sm font-medium text-green-800">Total Income</span></div>
                        <span className="font-bold text-green-700">K{totalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-center gap-2"><TrendingDown size={16} className="text-red-600" /><span className="text-sm font-medium text-red-800">Total Expenditure</span></div>
                        <span className="font-bold text-red-700">K{totalExpenditure.toLocaleString()}</span>
                      </div>
                      <div className={cn('flex items-center justify-between p-3 rounded-lg border', balance >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100')}>
                        <span className={cn('text-sm font-semibold', balance >= 0 ? 'text-blue-800' : 'text-orange-800')}>Net Balance</span>
                        <span className={cn('font-black text-lg', balance >= 0 ? 'text-blue-700' : 'text-orange-700')}>K{Math.abs(balance).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold">Upcoming Events</h3>
                  {canEdit && <Link href="/admin/collections/events/create" target="_blank" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"><PlusCircle size={12} /> Add</Link>}
                </div>
                {events.length === 0 ? <p className="text-sm text-muted-foreground">No events scheduled.</p> : (
                  <div className="space-y-3">
                    {events.slice(0, 5).map((e) => (
                      <div key={e.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                        <Calendar size={16} className="text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{e.title}</p>
                          <p className="text-xs text-muted-foreground">{e.location}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{e.date ? new Date(e.date).toLocaleDateString('en-PG') : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── POPULATION ── */}
          {activeTab === 'population' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Village Population</h2>
                {canEdit && <Link href="/admin/collections/population/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Record</Link>}
              </div>
              {population.length === 0 ? <EmptyState label="population records" href="/admin/collections/population/create" /> : (
                <div className="bg-card rounded-lg border border-border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 text-left">
                        {['Village', 'Population', 'Households', 'Male', 'Female', 'Under 15', 'Youth', 'Year'].map((h) => (
                          <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {population.map((v, i) => (
                        <tr key={v.id} className={cn('border-b border-border last:border-0', i % 2 === 0 ? '' : 'bg-muted/10')}>
                          <td className="px-4 py-3 font-medium">{v.village}</td>
                          <td className="px-4 py-3 font-bold">{(v.totalPopulation ?? 0).toLocaleString()}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.households ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.maleCount ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.femaleCount ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.childrenUnder15 ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.youthCount ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{v.year}</td>
                        </tr>
                      ))}
                      {population.length > 1 && (
                        <tr className="bg-primary/5 border-t-2 border-border font-bold">
                          <td className="px-4 py-3">TOTAL</td>
                          <td className="px-4 py-3">{totalPop.toLocaleString()}</td>
                          <td className="px-4 py-3">{totalHH}</td>
                          <td colSpan={5} />
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ── PROJECTS ── */}
          {activeTab === 'projects' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Development Projects</h2>
                {canEdit && <Link href="/admin/collections/projects/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Project</Link>}
              </div>
              {projects.length === 0 ? <EmptyState label="projects" href="/admin/collections/projects/create" /> : (
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id} className="bg-card rounded-lg border border-border p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-semibold">{p.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{Array.isArray(p.villages) ? p.villages.join(' · ') : ''}{p.lead ? ` · ${p.lead}` : ''}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 flex-wrap">
                          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', statusColor[p.status] ?? 'bg-muted text-muted-foreground')}>{prettify(p.status)}</span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{prettify(p.category)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Progress</span><span>{p.progress ?? 0}%</span></div>
                          <div className="bg-muted rounded-full h-2">
                            <div className={cn('rounded-full h-2', p.progress >= 100 ? 'bg-green-500' : 'bg-primary')} style={{ width: `${p.progress ?? 0}%` }} />
                          </div>
                        </div>
                        {p.budget && <div className="shrink-0 text-right"><p className="text-xs text-muted-foreground">Budget</p><p className="font-semibold text-sm">{p.budget}</p></div>}
                      </div>
                      {p.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── INITIATIVES ── */}
          {activeTab === 'initiatives' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Community Initiatives</h2>
                {canEdit && <Link href="/admin/collections/initiatives/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Initiative</Link>}
              </div>
              {initiatives.length === 0 ? <EmptyState label="initiatives" href="/admin/collections/initiatives/create" /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initiatives.map((init) => (
                    <div key={init.id} className="bg-card rounded-lg border border-border p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-semibold leading-snug">{init.name}</h3>
                        <span className={cn('shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full', statusColor[init.status] ?? 'bg-muted text-muted-foreground')}>{prettify(init.status)}</span>
                      </div>
                      {init.description && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{init.description}</p>}
                      {(init.beneficiaries ?? 0) > 0 && (
                        <div className="flex items-center gap-1.5"><Users size={13} className="text-primary" /><span className="text-sm font-semibold">{init.beneficiaries.toLocaleString()}</span><span className="text-xs text-muted-foreground">beneficiaries</span></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── PROGRAMS ── */}
          {activeTab === 'programs' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Business &amp; Development Programs</h2>
                {canEdit && <Link href="/admin/collections/programs/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Program</Link>}
              </div>
              {programs.length === 0 ? <EmptyState label="programs" href="/admin/collections/programs/create" /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((prog) => (
                    <div key={prog.id} className="bg-card rounded-lg border border-border p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div><h3 className="font-semibold">{prog.name}</h3><span className="text-xs text-muted-foreground">{prettify(prog.category)}</span></div>
                        <span className={cn('shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full', statusColor[prog.stage] ?? 'bg-muted text-muted-foreground')}>{prettify(prog.stage)}</span>
                      </div>
                      {prog.description && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{prog.description}</p>}
                      <div className="flex items-center gap-4 flex-wrap">
                        {(prog.participants ?? 0) > 0 && (
                          <div className="flex items-center gap-1.5"><Users size={13} className="text-primary" /><span className="text-sm font-semibold">{prog.participants}</span><span className="text-xs text-muted-foreground">{prog.targetParticipants ? `/ ${prog.targetParticipants} target` : 'participants'}</span></div>
                        )}
                        {prog.fundingAmount && <span className="text-xs text-muted-foreground">Funding: <strong>{prog.fundingAmount}</strong></span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── MEMBERS ── */}
          {activeTab === 'members' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Member Directory</h2>
                {pendingMembers > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{pendingMembers} pending review</span>}
              </div>
              {members.length === 0 ? <EmptyState label="members" href="/admin/collections/members" /> : (
                <div className="bg-card rounded-lg border border-border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 text-left">
                        {['Name', 'Village', 'Type', 'Status', 'Residence', 'Applied'].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m, i) => (
                        <tr key={m.id} className={cn('border-b border-border last:border-0', i % 2 === 0 ? '' : 'bg-muted/10')}>
                          <td className="px-4 py-3"><p className="font-medium">{m.fullName}</p><p className="text-xs text-muted-foreground">{m.email}</p></td>
                          <td className="px-4 py-3 capitalize">{m.village}</td>
                          <td className="px-4 py-3 text-muted-foreground">{prettify(m.membershipType ?? '')}</td>
                          <td className="px-4 py-3"><span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', statusColor[m.status] ?? 'bg-muted text-muted-foreground')}>{prettify(m.status ?? '')}</span></td>
                          <td className="px-4 py-3 text-muted-foreground">{m.currentResidence ?? '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ── MEETING MINUTES ── */}
          {activeTab === 'minutes' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Meeting Minutes</h2>
                {canEdit && <Link href="/admin/collections/meeting-minutes/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Minutes</Link>}
              </div>
              {minutes.length === 0 ? <EmptyState label="meeting minutes" href="/admin/collections/meeting-minutes/create" /> : (
                <div className="space-y-4">
                  {minutes.map((m) => (
                    <div key={m.id} className="bg-card rounded-lg border border-border p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold">{m.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Calendar size={11} /> {m.date ? new Date(m.date).toLocaleDateString() : '—'}</span>
                            {m.location && <span className="flex items-center gap-1"><MapPin size={11} /> {m.location}</span>}
                            {m.chair && <span>Chair: {m.chair}</span>}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{prettify(m.meetingType ?? '')}</span>
                      </div>
                      {m.resolutions && (
                        <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Key Resolutions</p>
                          <p className="text-sm leading-relaxed">{m.resolutions}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── FINANCIALS ── */}
          {activeTab === 'financials' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Financial Records</h2>
                {canEdit && <Link href="/admin/collections/financials/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> Add Record</Link>}
              </div>
              {financials.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Income', value: `K${totalIncome.toLocaleString()}`, cls: 'text-green-700 bg-green-50 border-green-100' },
                    { label: 'Total Expenditure', value: `K${totalExpenditure.toLocaleString()}`, cls: 'text-red-700 bg-red-50 border-red-100' },
                    { label: 'Net Balance', value: `K${Math.abs(balance).toLocaleString()}`, cls: balance >= 0 ? 'text-blue-700 bg-blue-50 border-blue-100' : 'text-orange-700 bg-orange-50 border-orange-100' },
                  ].map((s) => (
                    <div key={s.label} className={cn('rounded-xl border p-4 text-center', s.cls)}>
                      <p className="text-2xl font-black">{s.value}</p>
                      <p className="text-xs font-semibold mt-0.5 opacity-80">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {financials.length === 0 ? <EmptyState label="financial records" href="/admin/collections/financials/create" /> : (
                <div className="bg-card rounded-lg border border-border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 text-left">
                        {['Description', 'Type', 'Category', 'Amount (PGK)', 'Date', 'Year'].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {financials.map((f, i) => (
                        <tr key={f.id} className={cn('border-b border-border last:border-0', i % 2 === 0 ? '' : 'bg-muted/10')}>
                          <td className="px-4 py-3 font-medium">{f.title}</td>
                          <td className="px-4 py-3"><span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', statusColor[f.type] ?? 'bg-muted text-muted-foreground')}>{prettify(f.type)}</span></td>
                          <td className="px-4 py-3 text-muted-foreground">{prettify(f.category ?? '')}</td>
                          <td className={cn('px-4 py-3 font-semibold', f.type === 'income' ? 'text-green-700' : 'text-red-700')}>
                            {f.type === 'expenditure' ? '-' : '+'}K{(f.amount ?? 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{f.date ? new Date(f.date).toLocaleDateString() : '—'}</td>
                          <td className="px-4 py-3 text-muted-foreground">{f.financialYear ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ── ANNOUNCEMENTS ── */}
          {activeTab === 'announcements' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Announcements</h2>
                {canEdit && <Link href="/admin/collections/announcements/create" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><PlusCircle size={15} /> New Announcement</Link>}
              </div>
              {announcements.length === 0 ? <EmptyState label="announcements" href="/admin/collections/announcements/create" /> : (
                <div className="space-y-4">
                  {announcements.map((a) => (
                    <div key={a.id} className={cn('rounded-xl border p-5', a.priority === 'urgent' ? 'border-red-200 bg-red-50' : a.priority === 'important' ? 'border-amber-200 bg-amber-50' : 'bg-card border-border')}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {a.pinned && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">Pinned</span>}
                          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', statusColor[a.priority] ?? 'bg-muted text-muted-foreground')}>{prettify(a.priority)}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{prettify(a.audience)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ''}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{a.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

        </div>
      </div>
    </div>
  )
}
