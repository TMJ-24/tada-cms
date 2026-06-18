import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — TADA',
  description:
    "Get in touch with the TADA Executive Committee. We're here to answer your questions and support the Toaripi community.",
}

const contactDetails = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Toaripi Atutemori Development Association, Gulf Province, Papua New Guinea',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'exec@tada.org.pg',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+675 300 0000',
  },
]

const villages = ['Lelefiru', 'Hamuhamu', 'Kukipi', 'Isapeape', 'Uritai', 'Mirivase', 'Lalapipi', 'Popo']

export default function ContactUsPage() {
  return (
    <main className="pb-24">
      {/* Page Hero */}
      <section className="relative py-20 mb-20 text-white overflow-hidden">
        <img src="https://picsum.photos/seed/tada-contact/1600/700" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest opacity-80 mb-3">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch with TADA</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Whether you are a Toaripi community member, a village representative, a partner
              organisation, or a supporter — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm villages={villages} />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-6">Contact Details</h2>
              <div className="space-y-5">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Villages */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Villages We Serve</h3>
              <div className="flex flex-wrap gap-2">
                {villages.map((v) => (
                  <span
                    key={v}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Response Times</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Executive Committee aims to respond to all enquiries within{' '}
                <span className="font-semibold text-foreground">3–5 business days</span>. For urgent
                village matters, please contact your village representative directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
