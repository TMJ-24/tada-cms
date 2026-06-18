export type NewsArticle = {
  slug: string
  category: string
  date: string
  title: string
  excerpt: string
  image: string
  content: string[]
}

export const categoryColor: Record<string, string> = {
  Announcement: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Project Update': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Program: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Community: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Health: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Culture: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export const news: NewsArticle[] = [
  {
    slug: 'tada-agm-2026',
    category: 'Announcement',
    date: 'June 12, 2026',
    title: 'TADA Annual General Meeting — All Villages Called to Attend',
    excerpt:
      'The TADA Executive Committee invites all Toaripi community members and village representatives to the Annual General Meeting to be held at Kukipi Village Community Hall.',
    image: 'https://picsum.photos/seed/meeting-hall/1200/600',
    content: [
      'The Toaripi Atutemori Development Association (TADA) hereby gives notice that the 2026 Annual General Meeting (AGM) will be held on Saturday, 27 June 2026 at the Kukipi Village Community Hall, commencing at 9:00 AM.',
      "All Toaripi community members, village representatives, and interested parties are warmly invited and encouraged to attend. The AGM is the most important meeting in our association's calendar — it is where we report back to our communities, review our programs, and set the direction for the year ahead.",
      'Key agenda items include: review of the 2025 Annual Report and financial statements, progress updates on all active development projects and programs, election of village representatives for the 2026-2027 term, approval of the 2026/2027 budget and work plan, and open floor discussion for community members.',
      'Village representatives are requested to submit written reports on behalf of their villages at least one week prior to the AGM. Communities are encouraged to raise any matters of concern through their village representatives ahead of the meeting.',
      'Refreshments will be provided. Community members travelling from Lelefiru, Lalapipi, and Popo villages are advised that TADA will arrange transportation from the Uritai junction — please register with your village representative by 20 June 2026.',
      'For inquiries, contact the TADA Secretariat at exec@tada.org.pg or call +675 300 0000.',
    ],
  },
  {
    slug: 'kukipi-isapeape-road-construction',
    category: 'Project Update',
    date: 'May 28, 2026',
    title: 'Kukipi-Isapeape Road Link: Construction Phase Begins',
    excerpt:
      'After months of advocacy and planning, the road linking Kukipi and Isapeape villages has entered its construction phase.',
    image: 'https://picsum.photos/seed/road-construction/1200/600',
    content: [
      'TADA is pleased to announce that construction has officially commenced on the Kukipi-Isapeape Road Link project — a critical infrastructure initiative that will directly benefit over 460 community members across both villages.',
      'The 4.2-kilometre road has long been a priority for the Toaripi communities. Currently, residents of Isapeape must travel a 38-kilometre detour to access schools, health services, and the market in Kukipi. The new road will reduce this to a direct 12-minute drive.',
      'The project is co-funded by the Gulf Provincial Government and TADA, with a total budget of K1.2 million. TADA contributed K180,000 raised through membership dues, fundraising events, and diaspora contributions over the past two years.',
      'Construction is being carried out by a Gulf Province-based contractor, with a commitment to prioritise local labour. Village men from Kukipi and Isapeape have been given first preference for employment on the project, with an estimated 35 local jobs created during the construction phase.',
      "The project is expected to be completed by October 2026. TADA's Infrastructure Committee will conduct monthly site inspections to ensure quality standards and timeline adherence.",
      'This road is more than infrastructure — it is a lifeline for our people. When our villages are connected, our communities grow stronger together.',
    ],
  },
  {
    slug: 'tada-scholarship-2026',
    category: 'Program',
    date: 'May 10, 2026',
    title: '2026 TADA Scholarship Recipients Announced',
    excerpt:
      'Congratulations to the 12 outstanding students from our eight villages who have been awarded the 2026 TADA Secondary School Scholarships.',
    image: 'https://picsum.photos/seed/scholarship-students/1200/600',
    content: [
      'TADA is proud to announce the recipients of the 2026 Secondary School Scholarship Program. Twelve outstanding students from across our eight Toaripi villages have been selected to receive full scholarship support for the 2026 academic year.',
      'The TADA Scholarship Program was established to ensure that no Toaripi student is denied a quality education due to financial hardship. Each scholarship covers school fees, boarding costs, textbooks, and a monthly stipend for personal expenses.',
      "This year's recipients were selected based on academic excellence, community involvement, and a demonstrated commitment to giving back to their villages. The selection panel included village representatives, educators, and TADA executive members.",
      'Recipients represent Lelefiru (2 students), Hamuhamu (2 students), Uritai (3 students), Popo (2 students), and Lalapipi (3 students) villages. Schools attended include Kikori Secondary School, Kerema Secondary School, and Marianville Secondary School.',
      'TADA encourages all recipients to excel in their studies and to remain connected to their communities. We look forward to welcoming them back as future leaders, professionals, and contributors to the development of the Toaripi people.',
      'Applications for the 2027 scholarship round will open in November 2026. Eligible students must be entering Grade 9 or above and must be endorsed by their village representative. Contact exec@tada.org.pg for further information.',
    ],
  },
  {
    slug: 'toaripi-fishing-cooperative',
    category: 'Community',
    date: 'April 18, 2026',
    title: 'Toaripi Fishing Cooperative Officially Registered',
    excerpt:
      'The Toaripi Fishing Cooperative has been officially registered with the Investment Promotion Authority, opening doors to formal financing and export markets.',
    image: 'https://picsum.photos/seed/fishing-boats/1200/600',
    content: [
      "After nearly 18 months of planning, legal preparation, and community consultation, the Toaripi Fishing Cooperative has been formally registered with Papua New Guinea's Investment Promotion Authority (IPA). This is a landmark milestone for our coastal communities.",
      'The cooperative brings together fishing households from Lelefiru, Hamuhamu, Uritai, and Popo villages — the four Toaripi villages with direct coastline access. A total of 47 fishing households have registered as founding members, with plans to expand membership to inland villages through value-chain participation.',
      "Registration as a formal cooperative entity unlocks significant opportunities previously unavailable to our fishing families. These include access to the National Fisheries Authority's Small-Scale Fisheries Development Fund, eligibility for equipment grants and subsidised fuel programs, ability to enter into formal supply agreements with Port Moresby fish markets and export buyers, and access to microfinance lending from BSP and Nationwide Microbank.",
      'The cooperative will be governed by a board of nine directors — one elected representative per member village, plus five at-large positions. The first board elections will be held at the inaugural cooperative meeting on 5 May 2026.',
      'TADA provided legal and administrative support throughout the registration process, including funding the IPA registration fees and connecting the cooperative with a Port Moresby-based legal firm experienced in cooperative law.',
      'This cooperative is the beginning of a new economic chapter for our coastal villages. When our fishermen are organised, resourced, and connected to markets, our entire community prospers.',
    ],
  },
  {
    slug: 'mobile-health-clinic-2026',
    category: 'Health',
    date: 'March 30, 2026',
    title: 'Mobile Health Clinic Visits All Eight Villages',
    excerpt:
      'TADA partnered with Gulf Province Health Authority to bring a mobile health clinic to all eight Toaripi villages over two weeks in March.',
    image: 'https://picsum.photos/seed/health-clinic/1200/600',
    content: [
      'In March 2026, TADA partnered with the Gulf Province Health Authority (GPHA) to deliver a comprehensive mobile health clinic across all eight Toaripi villages. Over a two-week period from 10-22 March, the clinic team visited Lelefiru, Hamuhamu, Kukipi, Isapeape, Uritai, Mirivase, Lalapipi, and Popo.',
      'A total of 642 community members received health services during the campaign, representing approximately 35% of the total Toaripi village population. Services provided included general health screenings, blood pressure and diabetes testing, maternal and child health checks, immunisations for children under 5, TB screening and referral, eye checks and reading glasses distribution, and basic dental checks.',
      'Thirty-eight community members were identified as requiring urgent referral to Kerema General Hospital. TADA coordinated transport for 12 patients who could not arrange their own travel.',
      'The mobile clinic also delivered a community health education session in each village, covering topics including water and sanitation, nutrition and food security, maternal health, and prevention of non-communicable diseases.',
      'TADA funded the fuel and logistics costs for the clinic vehicles, totalling K14,800. The GPHA provided the medical team, supplies, and medications at no cost to communities.',
      'TADA is in discussions with GPHA to make the mobile health clinic an annual event. We believe that every Toaripi person — regardless of which village they live in — deserves access to quality healthcare close to home.',
    ],
  },
  {
    slug: 'toaripi-cultural-festival-2026',
    category: 'Culture',
    date: 'March 5, 2026',
    title: 'Annual Toaripi Cultural Festival 2026 — Dates Confirmed',
    excerpt: 'The Annual Toaripi Cultural Festival will be held from 15-17 August 2026 at Hamuhamu Village, themed "Roots and Future".',
    image: 'https://picsum.photos/seed/cultural-festival/1200/600',
    content: [
      'TADA is delighted to confirm that the Annual Toaripi Cultural Festival will take place from Friday 15 August to Sunday 17 August 2026 at Hamuhamu Village. This year\'s festival theme is "Roots and Future" — a celebration of who we are and who we are becoming as the Toaripi people.',
      'The Toaripi Cultural Festival is the highlight of our community calendar. It is a time for all eight villages to come together, share our traditions, celebrate our identity, and strengthen the bonds that unite us as one people across Gulf Province.',
      'The three-day program will include traditional dance performances from all eight villages, a Toaripi language and storytelling showcase, traditional food and craft markets, a youth leadership forum, a cultural sports tournament, and an evening cultural concert with Toaripi artists.',
      'All eight villages are encouraged to register their cultural groups and performers by 30 June 2026. Village groups should submit a brief description of their performance, the number of performers, and any equipment or space requirements.',
      'This year\'s festival will also feature a dedicated Youth Pavilion — a space for young Toaripi people to showcase modern creative work inspired by our culture, including art, music, poetry, and short film. Young people aged 15-30 are encouraged to submit entries through their village representative.',
      'The festival is free and open to all Toaripi community members, their families, and invited guests. For registration and enquiries, contact the TADA Cultural Committee at exec@tada.org.pg.',
    ],
  },
]
