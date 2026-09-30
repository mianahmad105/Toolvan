import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/tools";

export const metadata = {
  title: "GDPR Compliance",
  description: "How Toolvan meets its obligations under UK GDPR — what personal data we process, your rights, and how to exercise them.",
  alternates: { canonical: "/gdpr" },
};

const LAST_UPDATED = "30 September 2026";
const DOMAIN = SITE_URL.replace("https://", "");

export default function Gdpr() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">GDPR</span>
      </nav>

      <div className="card p-6 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">GDPR Compliance</h1>
        <p className="text-muted mt-1.5">Last updated: {LAST_UPDATED}</p>
        <hr className="my-6 border-line" />

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-extrabold mb-2">Our approach</h2>
            <p className="text-muted">
              {DOMAIN} is built to need as little of your personal data as possible. Every calculator runs entirely
              in your browser, so the figures you type in are never sent to us. This page explains, specifically,
              how {SITE_NAME} meets its obligations under the UK General Data Protection Regulation (UK GDPR) and
              the Data Protection Act 2018 for the small amount of data we do handle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">What personal data we process</h2>
            <p className="text-muted mb-2">We only ever hold personal data that you choose to give us directly:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li>Your name, email address and message, if you contact us through the contact form or by email</li>
              <li>Your email address, if you sign up for tax-update emails through the newsletter box — kept until you unsubscribe</li>
              <li>A light/dark display preference, stored in your own browser and never sent to us</li>
              <li>Advertising cookie identifiers set by Google and its advertising partners, used to serve and measure ads</li>
            </ul>
            <p className="text-muted mt-3">
              We don&apos;t run our own analytics trackers, and we don&apos;t collect this data ourselves — the advertising
              data above is collected directly by Google and its partners through the cookies described in our{" "}
              <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>, not by us. You can opt out
              of personalised ads at any time through Google Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Our lawful basis for processing</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li><b className="text-ink">Consent</b> — when you send us a message or sign up for tax-update emails, you&apos;re consenting to us using those details for that purpose; and when you accept advertising cookies via our cookie banner</li>
              <li><b className="text-ink">Legitimate interests</b> — keeping the site running securely and reliably, and funding it through advertising</li>
            </ul>
            <p className="text-muted mt-3">We don&apos;t use your data for automated decision-making or profiling.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">How long we keep it</h2>
            <p className="text-muted">
              Contact-form messages are kept only for as long as it takes to resolve your enquiry, then deleted. If you
              sign up for tax-update emails, we keep your address on a simple list for as long as you stay subscribed,
              and remove it as soon as you ask us to. We don&apos;t run a large-scale customer database beyond that.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Where your data is stored</h2>
            <p className="text-muted">
              Our contact messages are handled through standard email and hosting infrastructure. We don&apos;t
              knowingly transfer your personal data outside the UK or EEA; where a service provider does process
              data internationally, it&apos;s only ever under that provider&apos;s own GDPR-compliant safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Your rights</h2>
            <p className="text-muted mb-2">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li><b className="text-ink">Be informed</b> about how your data is used — which is what this page is for</li>
              <li><b className="text-ink">Access</b> a copy of the personal data we hold about you</li>
              <li><b className="text-ink">Rectification</b> of any data that&apos;s inaccurate or incomplete</li>
              <li><b className="text-ink">Erasure</b> of your data, sometimes called the &ldquo;right to be forgotten&rdquo;</li>
              <li><b className="text-ink">Restrict</b> how we process your data</li>
              <li><b className="text-ink">Data portability</b> — receive your data in a portable format</li>
              <li><b className="text-ink">Object</b> to processing based on legitimate interests</li>
              <li><b className="text-ink">Withdraw consent</b> at any time, for anything based on your consent</li>
            </ul>
            <p className="text-muted mt-3">
              To use any of these rights, email <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
              We aim to respond within one month, as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Keeping your data safe</h2>
            <p className="text-muted">
              We only collect what&apos;s described above, keep it for as short a time as possible, and don&apos;t sell it or
              share it with anyone beyond the advertising cookies described on this page and in our{" "}
              <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>. If we ever became aware
              of a data breach affecting your personal data, we would notify the ICO and anyone affected without undue
              delay, as UK GDPR requires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Supervisory authority</h2>
            <p className="text-muted">
              If you&apos;re not satisfied with how we&apos;ve handled your data, you can complain to the UK&apos;s data
              protection regulator, the{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Information Commissioner&apos;s Office (ICO)</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Changes to this page</h2>
            <p className="text-muted">
              We&apos;ll update the &ldquo;last updated&rdquo; date above whenever this page changes. For our full data
              handling practices, see our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>

        <hr className="my-8 border-line" />
        <p className="text-sm text-muted">
          Questions about your data? <Link href="/contact" className="text-accent hover:underline">Contact Us</Link> or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
