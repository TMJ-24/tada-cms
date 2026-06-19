import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — TADA',
  description: 'Terms of Service for the Toaripi Atutemori Development Association website.',
}

export default function TermsPage() {
  return (
    <main className="py-20">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Legal</span>
          <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: June 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the TADA website (<strong>tada.jershmamet.com</strong>), you agree
              to be bound by these Terms of Service. If you do not agree to these terms, please do not
              use this website. These terms apply to all visitors, members, and authorised users of the
              Toaripi Atutemori Development Association digital platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Use of the Website</h2>
            <p>You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the website in any way that breaches Papua New Guinea law or regulation.</li>
              <li>Transmit unsolicited or unauthorised advertising or promotional material.</li>
              <li>Attempt to gain unauthorised access to any part of the website or its systems.</li>
              <li>Submit false, misleading, or fraudulent information in any form or application.</li>
              <li>Impersonate any TADA member, officer, or staff.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Executive Portal Access</h2>
            <p>
              Access to the TADA Executive Portal is restricted to authorised members holding the roles
              of Super Admin, Executive Committee Member, or Village Representative. Credentials are
              issued by the TADA Secretariat and must not be shared. TADA reserves the right to suspend
              or revoke portal access at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Membership Applications</h2>
            <p>
              Submission of a membership application through this website does not guarantee approval.
              All applications are reviewed by the TADA Executive Committee. TADA reserves the right to
              accept or decline any application at its discretion, consistent with its constitution and
              membership policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and images — is the
              property of TADA or its content providers and is protected under applicable copyright law.
              You may not reproduce, distribute, or republish any content without prior written
              permission from TADA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Disclaimer of Warranties</h2>
            <p>
              This website and its content are provided on an &quot;as is&quot; basis without warranties of any
              kind. TADA does not guarantee the accuracy, completeness, or timeliness of information
              published on this website. Community data and project figures are for informational
              purposes and may be subject to revision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, TADA shall not be liable for any direct, indirect,
              incidental, or consequential loss arising from your use of, or inability to use, this
              website or its services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Third-Party Links</h2>
            <p>
              This website may contain links to external websites. TADA is not responsible for the
              content or privacy practices of those sites and does not endorse them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of Papua New Guinea. Any disputes arising
              from use of this website shall be subject to the exclusive jurisdiction of the courts of
              Papua New Guinea.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Changes to Terms</h2>
            <p>
              TADA may revise these Terms at any time by updating this page. Continued use of the
              website after any changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Contact</h2>
            <p>
              Questions about these Terms may be directed to{' '}
              <a href="mailto:exec@tada.org.pg" className="text-primary hover:underline">exec@tada.org.pg</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 text-sm">
          <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy →</Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
