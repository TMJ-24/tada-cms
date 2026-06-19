import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — TADA',
  description: 'Privacy Policy for the Toaripi Atutemori Development Association website.',
}

export default function PrivacyPage() {
  return (
    <main className="py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Legal</span>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: June 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Who We Are</h2>
            <p>
              The Toaripi Atutemori Development Association (TADA) is a community association representing
              the Toaripi people of Gulf Province, Papua New Guinea. Our website is located at{' '}
              <strong>tada.jershmamet.com</strong>. This Privacy Policy explains how we collect, use, and
              protect your personal information when you use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Contact information</strong> — name, email address, phone number, and village when you submit the Join TADA or Contact Us forms.</li>
              <li><strong>Membership details</strong> — village affiliation, membership type, and residency information provided during registration.</li>
              <li><strong>Usage data</strong> — pages visited and general browsing behaviour through anonymous analytics.</li>
              <li><strong>Account credentials</strong> — email and password for authorised portal users (stored securely and never shared).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Process membership applications and maintain our member directory.</li>
              <li>Respond to enquiries submitted through the Contact Us form.</li>
              <li>Send announcements and updates relevant to TADA members and the Toaripi community.</li>
              <li>Improve our website and services.</li>
              <li>Comply with legal obligations under Papua New Guinea law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Data Sharing</h2>
            <p>
              TADA does not sell, trade, or rent your personal information to third parties. Information
              may be shared only with authorised TADA Executive Committee members for the purposes of
              membership management and community communications, or where required by PNG law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Data Security</h2>
            <p>
              We take reasonable technical measures to protect your personal information, including secure
              HTTPS connections and access-controlled administrative systems. Passwords are stored using
              industry-standard hashing and are never visible to staff.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Cookies</h2>
            <p>
              Our website uses essential session cookies to manage authenticated access to the Executive
              Portal. We do not use advertising or tracking cookies. You may disable cookies in your
              browser, though this will prevent access to the Executive Portal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of personal information
              we hold about you. To make a request, contact us at{' '}
              <a href="mailto:exec@tada.org.pg" className="text-primary hover:underline">exec@tada.org.pg</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to This Policy</h2>
            <p>
              TADA may update this Privacy Policy from time to time. Changes will be published on this
              page with an updated date. Continued use of the website after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Contact</h2>
            <p>
              For privacy-related enquiries, please contact the TADA Secretariat at{' '}
              <a href="mailto:exec@tada.org.pg" className="text-primary hover:underline">exec@tada.org.pg</a>{' '}
              or write to us at Level 5, Deloitte Tower, Port Moresby, Papua New Guinea.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-primary hover:underline font-medium">Terms of Service →</Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
