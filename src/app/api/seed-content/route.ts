import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const SECRET = process.env.PROMOTE_ADMIN_SECRET ?? 'tada-bootstrap-2026'

export async function POST(req: Request) {
  const { secret } = await req.json().catch(() => ({ secret: '' }))
  if (secret !== SECRET) return NextResponse.json({ error: 'Invalid secret.' }, { status: 403 })

  const payload = await getPayload({ config: configPromise })

  // ─── POPULATION ────────────────────────────────────────────────────────────
  const villages = [
    { village: 'Lelefiru',  totalPopulation: 220, households: 44, maleCount: 108, femaleCount: 112, childrenUnder15: 72, youthCount: 55 },
    { village: 'Hamuhamu',  totalPopulation: 185, households: 37, maleCount:  91, femaleCount:  94, childrenUnder15: 60, youthCount: 48 },
    { village: 'Kukipi',    totalPopulation: 160, households: 32, maleCount:  79, femaleCount:  81, childrenUnder15: 52, youthCount: 40 },
    { village: 'Isapeape',  totalPopulation: 198, households: 40, maleCount:  97, femaleCount: 101, childrenUnder15: 65, youthCount: 50 },
    { village: 'Uritai',    totalPopulation: 245, households: 49, maleCount: 120, femaleCount: 125, childrenUnder15: 80, youthCount: 62 },
    { village: 'Mirivase',  totalPopulation: 172, households: 34, maleCount:  84, femaleCount:  88, childrenUnder15: 56, youthCount: 43 },
    { village: 'Lalapipi',  totalPopulation: 210, households: 42, maleCount: 103, femaleCount: 107, childrenUnder15: 68, youthCount: 53 },
    { village: 'Popo',      totalPopulation: 323, households: 65, maleCount: 159, femaleCount: 164, childrenUnder15:105, youthCount: 81 },
  ]
  for (const v of villages) {
    await payload.create({ collection: 'population', overrideAccess: true, data: { ...v, year: 2026 } as any })
  }

  // ─── PROJECTS ──────────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'Lelefiru Community Water Supply',
      category: 'infrastructure',
      status: 'in_progress',
      progress: 65,
      budget: 'K 850,000',
      lead: 'John Apea',
      villages: ['Lelefiru', 'Hamuhamu'],
      startDate: '2024-07-01',
      targetDate: '2026-12-31',
      description: 'Construction of a reticulated water supply system serving Lelefiru and Hamuhamu villages. Includes a 50,000L storage tank, 4km of piping, and 6 communal water points.',
    },
    {
      title: 'Toaripi Fisheries Cooperative',
      category: 'economic',
      status: 'in_progress',
      progress: 80,
      budget: 'K 1,200,000',
      lead: 'Mary Kovave',
      villages: ['Uritai', 'Popo', 'Lalapipi'],
      startDate: '2024-01-15',
      targetDate: '2026-06-30',
      description: 'Establishment of a community-owned fishing cooperative with a cold storage facility, two motorised canoes, and direct market linkages to Port Moresby fish markets.',
    },
    {
      title: 'Gulf District Health Clinic Upgrade',
      category: 'health',
      status: 'in_progress',
      progress: 40,
      budget: 'K 2,500,000',
      lead: 'Dr. Samuel Ori',
      villages: ['Kukipi', 'Isapeape', 'Mirivase'],
      startDate: '2025-03-01',
      targetDate: '2027-03-01',
      description: 'Renovation and upgrade of the existing aid post into a functional health centre with a maternity ward, laboratory, and solar power system.',
    },
    {
      title: 'Village Solar Energy Program',
      category: 'energy',
      status: 'planning',
      progress: 15,
      budget: 'K 3,400,000',
      lead: 'Peter Mea',
      villages: ['Lelefiru', 'Hamuhamu', 'Kukipi', 'Isapeape', 'Uritai', 'Mirivase', 'Lalapipi', 'Popo'],
      startDate: '2026-01-01',
      targetDate: '2027-06-30',
      description: 'Installation of solar micro-grid systems in all eight Toaripi villages providing reliable electricity to households and community buildings.',
    },
    {
      title: 'Toaripi Cultural Centre',
      category: 'social',
      status: 'planning',
      progress: 10,
      budget: 'K 1,800,000',
      lead: 'Chief Thomas Haro',
      villages: ['Lelefiru'],
      startDate: '2026-06-01',
      targetDate: '2028-06-01',
      description: 'Construction of a permanent cultural centre to house artefacts, host cultural events, provide space for language documentation, and serve as a community meeting hub.',
    },
    {
      title: 'Community Agriculture Training Program',
      category: 'agriculture',
      status: 'completed',
      progress: 100,
      budget: 'K 320,000',
      lead: 'Grace Heni',
      villages: ['Popo', 'Uritai', 'Lalapipi'],
      startDate: '2023-04-01',
      targetDate: '2024-12-31',
      description: 'A 12-month agricultural training program covering vegetable farming, composting, and market access. Trained 120 farmers across three villages.',
    },
  ]
  for (const p of projects) {
    await payload.create({ collection: 'projects', overrideAccess: true, data: p as any })
  }

  // ─── INITIATIVES ───────────────────────────────────────────────────────────
  const initiatives = [
    {
      name: 'Secondary School Scholarship Fund',
      category: 'education',
      status: 'active',
      beneficiaries: 48,
      villages: ['Lelefiru', 'Hamuhamu', 'Kukipi', 'Isapeape', 'Uritai', 'Mirivase', 'Lalapipi', 'Popo'],
      startDate: '2022-01-01',
      description: 'Provides annual scholarships to high-achieving students from all eight villages to attend secondary schools in Kerema and Port Moresby.',
    },
    {
      name: 'Toaripi Language Documentation',
      category: 'culture',
      status: 'active',
      beneficiaries: 0,
      villages: ['Lelefiru', 'Popo'],
      startDate: '2024-03-01',
      description: 'Collaboration with the University of PNG to document the Toaripi language through oral history recordings, a dictionary, and primary school literacy materials.',
    },
    {
      name: "Women's Business Cooperative",
      category: 'economic',
      status: 'active',
      beneficiaries: 65,
      villages: ['Hamuhamu', 'Kukipi', 'Isapeape', 'Mirivase'],
      startDate: '2023-07-01',
      description: "Empowers Toaripi women through group savings, microloans, and market stall support. Currently 65 active members across four villages.",
    },
    {
      name: 'Youth Sports League',
      category: 'youth',
      status: 'active',
      beneficiaries: 180,
      villages: ['Uritai', 'Lalapipi', 'Popo', 'Lelefiru'],
      startDate: '2025-01-01',
      description: 'Inter-village football and volleyball competitions for youth aged 12–25, promoting physical health, teamwork, and community pride.',
    },
  ]
  for (const i of initiatives) {
    await payload.create({ collection: 'initiatives', overrideAccess: true, data: i as any })
  }

  // ─── PROGRAMS ──────────────────────────────────────────────────────────────
  const programs = [
    {
      name: 'Gulf Fisheries Development Program',
      category: 'fisheries',
      stage: 'active',
      participants: 42,
      targetParticipants: 60,
      fundingSource: 'PNG Fisheries Authority & TADA',
      fundingAmount: 'K 450,000',
      description: 'Training and equipment support for Toaripi fishermen including deep-sea fishing techniques, boat maintenance, and fish preservation methods.',
    },
    {
      name: 'Village Agricultural Cooperative',
      category: 'agriculture',
      stage: 'active',
      participants: 120,
      targetParticipants: 150,
      fundingSource: 'DAL & TADA Members',
      fundingAmount: 'K 280,000',
      description: 'Collective farming program supporting sweet potato, cassava, and vegetable production with shared tools, seeds, and market access.',
    },
    {
      name: 'Digital Literacy & ICT Training',
      category: 'technology',
      stage: 'design',
      participants: 0,
      targetParticipants: 200,
      fundingSource: 'NICTA & DICT PNG',
      fundingAmount: 'K 180,000',
      description: 'Planned program to bring smartphones, tablets, and basic ICT training to Toaripi youth and community leaders across all eight villages.',
    },
    {
      name: 'Village Microfinance Initiative',
      category: 'finance',
      stage: 'planning',
      participants: 0,
      targetParticipants: 100,
      fundingSource: 'BPNG & TADA',
      fundingAmount: 'K 500,000',
      description: 'Establishment of a community-based savings and loan scheme to provide accessible finance for small businesses, school fees, and home improvements.',
    },
  ]
  for (const p of programs) {
    await payload.create({ collection: 'programs', overrideAccess: true, data: p as any })
  }

  // ─── EVENTS ────────────────────────────────────────────────────────────────
  const events = [
    {
      title: 'TADA Annual General Meeting 2026',
      category: 'meeting',
      status: 'upcoming',
      date: '2026-08-15',
      time: '9:00 AM – 4:00 PM',
      location: 'Toaripi Community Hall, Lelefiru Village',
      village: 'Lelefiru',
      organiser: 'TADA Executive Committee',
      description: 'All members and village representatives are invited to the 2026 Annual General Meeting. Agenda includes financial report, project updates, election of office bearers, and adoption of the 2026–2027 work plan.',
    },
    {
      title: 'Toaripi Cultural Festival 2026',
      category: 'cultural',
      status: 'upcoming',
      date: '2026-09-06',
      endDate: '2026-09-07',
      time: '8:00 AM – 8:00 PM',
      location: 'Popo Village Grounds',
      village: 'Popo',
      organiser: 'TADA Cultural Committee',
      description: 'A two-day celebration of Toaripi heritage featuring traditional dance, song, crafts, food, and storytelling. Open to all Toaripi people and their families.',
    },
    {
      title: 'Community Health & Wellness Day',
      category: 'health',
      status: 'upcoming',
      date: '2026-07-12',
      time: '8:00 AM – 3:00 PM',
      location: 'Uritai Village',
      village: 'Uritai',
      organiser: 'TADA Health Sub-Committee',
      description: 'Free health screenings, maternal and child health education, malaria awareness, and dental checks provided by volunteer medical teams from Port Moresby.',
    },
    {
      title: 'Youth Leadership Forum',
      category: 'education',
      status: 'upcoming',
      date: '2026-07-26',
      time: '9:00 AM – 5:00 PM',
      location: 'Hamuhamu Community Centre',
      village: 'Hamuhamu',
      organiser: 'TADA Youth Committee',
      description: 'A one-day leadership forum for young Toaripi men and women aged 18–35. Topics include governance, entrepreneurship, and representing your community.',
    },
    {
      title: 'Village Markets & Trade Fair',
      category: 'business',
      status: 'upcoming',
      date: '2026-08-01',
      time: '7:00 AM – 2:00 PM',
      location: 'Kukipi Village Foreshore',
      village: 'Kukipi',
      organiser: "TADA Women's Business Cooperative",
      description: 'Monthly village markets showcasing produce, handicrafts, smoked fish, and locally made goods from all eight Toaripi villages. Buyers from Kerema are expected.',
    },
    {
      title: '2025 Secondary School Scholarship Handover',
      category: 'education',
      status: 'completed',
      date: '2026-02-10',
      time: '10:00 AM – 12:00 PM',
      location: 'Isapeape Village',
      village: 'Isapeape',
      organiser: 'TADA Education Committee',
      description: 'Handover ceremony for 48 secondary school scholarships awarded to students from all eight Toaripi villages for the 2026 school year.',
    },
  ]
  for (const e of events) {
    await payload.create({ collection: 'events', overrideAccess: true, data: e as any })
  }

  // ─── MEMBERS ───────────────────────────────────────────────────────────────
  const members = [
    { fullName: 'James Kovave', email: 'james.kovave@gmail.com', phone: '+675 7123 4567', village: 'Lelefiru', membershipType: 'ordinary', status: 'active', occupation: 'Fisherman', currentResidence: 'Lelefiru Village, Gulf Province', memberSince: '2022-03-15', motivation: 'I want to see better services and opportunities for my children in Lelefiru.' },
    { fullName: 'Mary Haro', email: 'mary.haro@gmail.com', phone: '+675 7234 5678', village: 'Popo', membershipType: 'life', status: 'active', occupation: 'Teacher', currentResidence: 'Port Moresby, NCD', memberSince: '2021-01-01', motivation: 'As a Toaripi daughter based in POM, I want to give back to my community through education.' },
    { fullName: 'Peter Apea', email: 'peter.apea@gmail.com', phone: '+675 7345 6789', village: 'Uritai', membershipType: 'ordinary', status: 'active', occupation: 'Subsistence Farmer', currentResidence: 'Uritai Village, Gulf Province', memberSince: '2023-06-20', motivation: 'Agriculture development for our villages is my passion.' },
    { fullName: 'Grace Mea', email: 'grace.mea@gmail.com', phone: '+675 7456 7890', village: 'Hamuhamu', membershipType: 'associate', status: 'active', occupation: 'Nurse', currentResidence: 'Kerema, Gulf Province', memberSince: '2024-01-10', motivation: 'Better health outcomes for Toaripi women and children.' },
    { fullName: 'Thomas Ori', email: 'thomas.ori@gmail.com', phone: '+675 7567 8901', village: 'Kukipi', membershipType: 'honorary', status: 'active', occupation: 'Retired Public Servant', currentResidence: 'Port Moresby, NCD', memberSince: '2020-01-01', motivation: 'Founding member committed to Toaripi development since independence.' },
    { fullName: 'Ruth Heni', email: 'ruth.heni@gmail.com', phone: '+675 7678 9012', village: 'Isapeape', membershipType: 'ordinary', status: 'pending', occupation: 'Market Vendor', currentResidence: 'Isapeape Village, Gulf Province', memberSince: '2026-05-01', motivation: 'I want TADA to help us set up a proper market in Isapeape.' },
    { fullName: 'David Lohia', email: 'david.lohia@gmail.com', phone: '+675 7789 0123', village: 'Lalapipi', membershipType: 'ordinary', status: 'active', occupation: 'Carpenter', currentResidence: 'Lalapipi Village, Gulf Province', memberSince: '2023-09-01', motivation: 'Infrastructure for our village — proper roads and buildings.' },
    { fullName: 'Susan Vagi', email: 'susan.vagi@gmail.com', phone: '+675 7890 1234', village: 'Mirivase', membershipType: 'ordinary', status: 'active', occupation: 'Small Business Owner', currentResidence: 'Kerema, Gulf Province', memberSince: '2022-11-15', motivation: "Economic empowerment for Mirivase women through TADA's cooperative." },
  ]
  for (const m of members) {
    await payload.create({ collection: 'members', overrideAccess: true, data: m as any })
  }

  // ─── MEETING MINUTES ───────────────────────────────────────────────────────
  const minutes = [
    {
      title: 'TADA Annual General Meeting 2025',
      meetingType: 'agm',
      date: '2025-08-16',
      location: 'Popo Village Community Hall',
      chair: 'Chief Thomas Haro (President)',
      secretary: 'Grace Heni (Secretary)',
      attendees: '62 members present representing all 8 villages. 12 executive committee members. 3 observers from Gulf Provincial Government.',
      apologies: 'John Kovave (Lelefiru), Mary Lohia (Lalapipi) — both submitted written apologies.',
      agenda: '1. Opening prayer and welcome\n2. Confirmation of 2024 AGM minutes\n3. President\'s report\n4. Secretary\'s report\n5. Treasurer\'s financial report\n6. Village representatives\' reports\n7. Project updates\n8. Election of sub-committee chairs\n9. 2025–2026 work plan adoption\n10. General business\n11. Closing',
      resolutions: '1. Financial report for FY2024-25 accepted unanimously.\n2. K250,000 allocated to water supply project phase 2.\n3. Scholarship fund increased to 48 recipients for 2026.\n4. Cultural festival approved for September 2026 in Popo.\n5. TADA to pursue formal registration with Registrar of Companies by June 2026.\n6. All village reps to submit quarterly reports to executive by 15th of each quarter.',
      notes: 'Meeting opened at 9:15am with prayer by Elder James Vagi. Strong attendance noted. Several members raised concerns about the pace of the health clinic upgrade. Dr. Samuel Ori confirmed contractor delays due to supply chain issues. Next AGM scheduled for August 2026 in Lelefiru.',
    },
    {
      title: 'Executive Committee Meeting — March 2026',
      meetingType: 'executive',
      date: '2026-03-14',
      location: 'Zoom (Virtual)',
      chair: 'Chief Thomas Haro (President)',
      secretary: 'Grace Heni (Secretary)',
      attendees: 'Thomas Haro, Grace Heni, Peter Mea, Mary Kovave, John Apea, David Lohia, Ruth Ori (7 of 9 exec members present).',
      apologies: 'Susan Vagi, James Mea.',
      agenda: '1. Review of AGM resolutions progress\n2. Water supply project update\n3. Scholarship applications review\n4. Cultural festival planning\n5. Financial update\n6. AOB',
      resolutions: '1. Approve K45,000 payment to water supply contractor — Stage 2 earthworks.\n2. Scholarship selection committee to convene by April 15.\n3. Grace Heni appointed as Cultural Festival Coordinator.\n4. Monthly financial reports to be shared with all exec members via WhatsApp group.',
      notes: 'Virtual meeting held via Zoom due to travel constraints. Good internet connection for most participants except David Lohia who joined via mobile data. Next meeting scheduled for June 2026.',
    },
    {
      title: 'Village Representatives Meeting — January 2026',
      meetingType: 'village_rep',
      date: '2026-01-20',
      location: 'Kerema District Office, Meeting Room 2',
      chair: 'Peter Mea (Vice President)',
      secretary: 'Ruth Heni (Assistant Secretary)',
      attendees: 'Village reps from all 8 villages: Tom (Lelefiru), Jacob (Hamuhamu), Sarah (Kukipi), Mark (Isapeape), Philip (Uritai), Hannah (Mirivase), Andrew (Lalapipi), Simon (Popo).',
      apologies: 'None.',
      agenda: '1. Population data collection update\n2. Project progress by village\n3. Membership recruitment drive\n4. Issues and concerns from villages\n5. Communication improvements',
      resolutions: '1. All village reps to complete 2026 population data collection by February 28.\n2. Membership drive to target 200 paid-up members by June 2026.\n3. WhatsApp group established for village reps to share updates weekly.\n4. Uritai rep to follow up on delayed medical supplies for Health Day.',
      notes: 'First face-to-face meeting of village reps in 2026. Positive energy and engagement. Several reps noted improved communication since the TADA app was introduced. Population data collection forms distributed.',
    },
  ]
  for (const m of minutes) {
    await payload.create({ collection: 'meeting-minutes', overrideAccess: true, data: m as any })
  }

  // ─── FINANCIALS ────────────────────────────────────────────────────────────
  const financials = [
    // Income
    { title: 'Annual Membership Fees 2025', type: 'income', category: 'membership', amount: 18500, date: '2025-03-31', financialYear: '2025-2026', reference: 'MBR-2025-001', notes: '185 paid members at K100 each.' },
    { title: 'Gulf Provincial Government Grant', type: 'income', category: 'grants', amount: 250000, date: '2025-07-15', financialYear: '2025-2026', reference: 'GPG-GRANT-007', notes: 'Community development grant for water supply and health projects.' },
    { title: 'Diaspora Donations — Port Moresby Chapter', type: 'income', category: 'donations', amount: 32000, date: '2025-09-01', financialYear: '2025-2026', reference: 'DON-POM-2025', notes: 'Fundraising event at POM. 40 donors.' },
    { title: 'Cultural Festival Gate Proceeds 2024', type: 'income', category: 'fundraising', amount: 8200, date: '2024-09-08', financialYear: '2024-2025', reference: 'FEST-2024-REV', notes: 'Gate fees, stall fees, and canteen proceeds.' },
    { title: 'Fisheries Cooperative Revenue Share', type: 'income', category: 'project', amount: 14500, date: '2025-12-31', financialYear: '2025-2026', reference: 'FISH-CO-Q4', notes: 'Q4 share of cooperative revenue from fish sales.' },
    // Expenditure
    { title: 'Water Supply Project — Stage 1 Payment', type: 'expenditure', category: 'project', amount: 185000, date: '2025-08-01', financialYear: '2025-2026', reference: 'WSP-PAY-001', project: 'Lelefiru Community Water Supply', notes: 'Payment to Tari Constructions Ltd for Stage 1 completion.' },
    { title: 'Scholarship Disbursements 2025', type: 'expenditure', category: 'programs', amount: 96000, date: '2025-02-01', financialYear: '2024-2025', reference: 'SCH-2025-ALL', notes: 'K2,000 per student × 48 students for 2025 school year.' },
    { title: 'Secretariat Administration Costs', type: 'expenditure', category: 'admin', amount: 24000, date: '2025-12-31', financialYear: '2025-2026', reference: 'ADM-FY26-TOT', notes: 'Annual secretariat costs including office rent, phone, stationery.' },
    { title: 'AGM 2025 — Venue & Catering', type: 'expenditure', category: 'admin', amount: 5800, date: '2025-08-16', financialYear: '2025-2026', reference: 'AGM-2025-EXP', notes: 'Venue hire, catering for 80 delegates, printed materials.' },
    { title: "Women's Cooperative Start-up Grant", type: 'expenditure', category: 'programs', amount: 15000, date: '2025-06-01', financialYear: '2024-2025', reference: 'WCO-GRANT-001', notes: 'Initial capital and equipment for the Women\'s Business Cooperative.' },
  ]
  for (const f of financials) {
    await payload.create({ collection: 'financials', overrideAccess: true, data: f as any })
  }

  // ─── ANNOUNCEMENTS ─────────────────────────────────────────────────────────
  const announcements = [
    {
      title: 'AGM 2026 — Save the Date',
      body: 'The TADA Annual General Meeting will be held on Saturday 15 August 2026 at the Toaripi Community Hall in Lelefiru Village. All paid-up members and village representatives are expected to attend. Registration opens at 8:30 AM. Full agenda will be circulated by 1 August. Contact the secretariat to confirm attendance.',
      priority: 'urgent',
      audience: 'all',
      publishedAt: '2026-06-01',
      expiresAt: '2026-08-16',
      pinned: true,
    },
    {
      title: 'Membership Renewal — 2026 Fees Due',
      body: 'Annual membership fees of K100 (Ordinary), K50 (Associate), or K500 (Life) are due by 30 June 2026. Members who have not renewed will not be eligible to vote at the AGM. Pay via bank transfer to TADA BSP Account 1000987654 or in person to your village representative.',
      priority: 'important',
      audience: 'all',
      publishedAt: '2026-05-01',
      expiresAt: '2026-06-30',
      pinned: false,
    },
    {
      title: 'Water Supply Project Update — Stage 2 Commencing',
      body: 'We are pleased to announce that Stage 2 of the Lelefiru Community Water Supply project has commenced. Earth works for the main pipeline from the river intake to the storage tank began on 14 March 2026. Expected completion of Stage 2 is October 2026. Residents near the construction zone should expect temporary disruptions.',
      priority: 'normal',
      audience: 'all',
      publishedAt: '2026-03-20',
      pinned: false,
    },
    {
      title: 'Scholarship Applications Open — 2027 School Year',
      body: 'Applications for the 2027 TADA Secondary School Scholarship are now open. Eligible students must be Toaripi from one of our eight villages, enrolled in Grade 9 or above, and have achieved at least 60% in their previous year. Application forms are available from your village representative. Deadline: 31 August 2026.',
      priority: 'important',
      audience: 'all',
      publishedAt: '2026-06-10',
      expiresAt: '2026-08-31',
      pinned: false,
    },
    {
      title: 'Executive Committee: Q2 Reports Due',
      body: 'All village representatives and sub-committee chairs are reminded that Q2 2026 progress reports are due to the secretariat by 15 July 2026. Reports should cover: membership numbers, project observations, community concerns, and upcoming local events. Submit to secretary@tada.org.pg.',
      priority: 'normal',
      audience: 'executive',
      publishedAt: '2026-06-15',
      expiresAt: '2026-07-15',
      pinned: false,
    },
  ]
  for (const a of announcements) {
    await payload.create({ collection: 'announcements', overrideAccess: true, data: a as any })
  }

  return NextResponse.json({
    success: true,
    seeded: {
      population: villages.length,
      projects: projects.length,
      initiatives: initiatives.length,
      programs: programs.length,
      events: events.length,
      members: members.length,
      meetingMinutes: minutes.length,
      financials: financials.length,
      announcements: announcements.length,
    },
  })
}
