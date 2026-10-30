import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/tools";

export const metadata = { title: "Terms of Use" };

const LAST_UPDATED = "29 September 2026";
const DOMAIN = SITE_URL.replace("https://", "");

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Terms of Use</span>
      </nav>

      <div className="card p-6 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Terms of Use</h1>
        <p className="text-muted mt-1.5">Last updated: {LAST_UPDATED}</p>
        <hr className="my-6 border-line" />

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-extrabold mb-2">1. About this service</h2>
            <p className="text-muted">
              {DOMAIN} (&ldquo;the Site&rdquo;) is run by {SITE_NAME} and offers free online tools for estimating UK income tax,
              National Insurance, Stamp Duty and other tax-related figures. By using the Site, you&apos;re agreeing to
              these Terms of Use.
            </p>
            <p className="text-muted mt-3">If you don&apos;t agree with any part of these terms, please don&apos;t use the Site.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">2. Not financial or tax advice</h2>
            <div className="rounded-xl p-4" style={{ background: "color-mix(in srgb, #d97706 10%, var(--surface))", border: "1px solid color-mix(in srgb, #d97706 30%, var(--border))" }}>
              <p style={{ color: "#92400e" }}>
                Every result our calculators produce is an estimate. They&apos;re here for general information only,
                and none of it is financial, tax or legal advice.
              </p>
            </div>
            <p className="text-muted mt-3">
              Our calculators are built around published UK tax rates and thresholds, but what you actually owe can
              differ because of your own circumstances — things like pension contributions, benefits in kind, your
              specific tax code, multiple income sources, self-employment, or a ruling from HMRC that applies just to you.
            </p>
            <p className="text-muted mt-3">Always check important figures with a qualified accountant or tax adviser before acting on them.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">3. Accuracy of information</h2>
            <p className="text-muted">
              We try to keep our rates and thresholds aligned with the latest HMRC publications, but we can&apos;t
              promise the Site is always accurate, complete, up to date, or right for your particular situation.
            </p>
            <p className="text-muted mt-3">
              Tax rules change often. Always double-check important figures directly with{" "}
              <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GOV.UK</a> or a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">4. Limitation of liability</h2>
            <p className="text-muted">
              To the fullest extent the law allows, {SITE_NAME} and the people behind it are not liable for any loss
              or damage — direct, indirect, incidental or otherwise — arising from your use of, or reliance on, the
              information or calculations on this Site.
            </p>
            <p className="text-muted mt-3">
              That includes any financial loss that comes from acting on an estimated figure produced by one of our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">5. Permitted use</h2>
            <p className="text-muted mb-2">You&apos;re welcome to use the Site for your own personal, non-commercial purposes. Please don&apos;t:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li>Scrape, copy or republish our calculator logic or written content without asking us first</li>
              <li>Use the Site in a way that could overload, damage or disrupt it</li>
              <li>Try to gain unauthorised access to any part of the Site</li>
              <li>Use bots or automated tools to submit forms or interact with the Site at scale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">6. Intellectual property</h2>
            <p className="text-muted">
              The calculator logic, written content, design and branding on this Site belong to {SITE_NAME} and are
              protected by copyright. Please don&apos;t reproduce or redistribute them without our written permission.
            </p>
            <p className="text-muted mt-3">
              Where we offer a calculator as an embeddable widget for other sites, that use is allowed under the
              terms shown alongside that specific widget.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">7. Third-party links</h2>
            <p className="text-muted">
              The Site may link out to third-party sites — GOV.UK and other official or informational sources, for
              example. We don&apos;t control those sites and aren&apos;t responsible for their content, accuracy or privacy
              practices, and a link is not an endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">8. Advertising and funding</h2>
            <p className="text-muted">
              The Site is currently free to use and does not display third-party advertising. If that changes in
              future, we&apos;ll update this page and our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> to explain what&apos;s shown and how it&apos;s targeted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">9. Changes to these terms</h2>
            <p className="text-muted">
              We may update these Terms of Use from time to time. The &ldquo;last updated&rdquo; date at the top of this
              page will always reflect the latest version, and continuing to use the Site after a change means you
              accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">10. Governing law</h2>
            <p className="text-muted">
              These Terms of Use are governed by the laws of England and Wales, and any dispute arising from them
              falls under the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>
        </div>

        <hr className="my-8 border-line" />
        <p className="text-sm text-muted">
          Questions about these terms? <Link href="/contact" className="text-accent hover:underline">Contact Us</Link> or see our{" "}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>. You can also email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
