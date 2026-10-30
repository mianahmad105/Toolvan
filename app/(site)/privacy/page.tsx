import Link from "next/link";
import { ADSENSE_CLIENT_ID, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/tools";

export const metadata = {
  title: "Privacy Policy",
  description: "How Toolvan handles your data, the cookies we and our advertising partners use, and how to control personalised ads.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2 October 2026";

function Row({ cookie, purpose, consent }: { cookie: string; purpose: string; consent: string }) {
  return (
    <tr className="border-t border-line">
      <td className="px-4 py-2.5 font-mono text-xs">{cookie}</td>
      <td className="px-4 py-2.5">{purpose}</td>
      <td className="px-4 py-2.5">{consent}</td>
    </tr>
  );
}

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Privacy Policy</span>
      </nav>

      <div className="card p-6 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
        <p className="text-muted mt-1.5">Last updated: {LAST_UPDATED}</p>
        <hr className="my-6 border-line" />

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-extrabold mb-2">1. Who we are</h2>
            <p className="text-muted">
              {SITE_URL.replace("https://", "")} is a free set of UK tax and salary calculators, run by {SITE_NAME}.
              For the purposes of UK data protection law, {SITE_NAME} is the data controller for any personal data
              collected through this website. We show advertising through Google AdSense, so Google acts as an
              independent data controller for the advertising cookies described in section 3 below.
            </p>
            <p className="text-muted mt-3">
              If you have any questions about this policy, you can reach us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">2. What data we collect</h2>
            <p className="text-muted">
              You don&apos;t need an account to use our calculators, and we don&apos;t ask for personal details to show you a
              result. Every calculation runs entirely in your own browser — the salary, income or other figures you
              type in are never sent to our servers or stored anywhere by us.
            </p>
            <p className="text-muted mt-3">
              The only thing we save in your browser is your light/dark display preference, using your browser&apos;s
              local storage. It stays on your device and is never transmitted to us.
            </p>
            <p className="text-muted mt-3">
              If you choose to contact us through our contact form, the newsletter signup box, or by email, we&apos;ll
              receive whatever you enter — typically your name and/or email address, and the content of your message —
              so that we can reply to you or, for the newsletter box, add you to the list of people we email about tax
              updates. Both forms work by opening an email from your own mail app to us; nothing is submitted to our
              servers first.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">3. Cookies and advertising</h2>
            <p className="text-muted mb-3">Here is what we and our advertising partners currently store in your browser:</p>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-sm min-w-[480px]">
                <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Purpose</th><th className="px-4 py-2.5">Consent needed</th></tr></thead>
                <tbody>
                  <Row cookie="theme" purpose="Remembers whether you last chose light or dark mode" consent="No — strictly necessary, and not a tracking cookie" />
                  {!ADSENSE_CLIENT_ID && (
                    <Row cookie="cookieConsent" purpose="Remembers whether you accepted or rejected our cookie notice" consent="No — strictly necessary, and not a tracking cookie" />
                  )}
                  <Row cookie="Google advertising cookies (e.g. DoubleClick/IDE)" purpose="Set by Google to serve and measure ads, and to limit how many times you see the same ad" consent="Yes — used only for ads, based on your prior visits to this and other sites" />
                  <Row cookie="Other advertising partner cookies" purpose="Google's advertising partners may set their own cookies to support ad delivery and measurement on our pages" consent="Yes — same basis as the Google advertising cookies above" />
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-3">
              We use <b className="text-ink">Google AdSense</b> to show advertising on this site, which helps cover the
              cost of running these free calculators. Google and the third-party vendors it works with use cookies to
              serve ads based on your past visits to this and other websites. Google&apos;s advertising cookies — including
              the DoubleClick cookie — let Google and its partners show you personalised ads based on your visit to this
              site and other sites you&apos;ve visited.
            </p>
            {ADSENSE_CLIENT_ID && (
              <p className="text-muted mt-3">
                If you&apos;re visiting from the UK, the EEA or Switzerland, Google&apos;s own certified consent message
                asks for your choice on these advertising cookies the first time you visit — rather than a cookie
                banner of our own — before any personalised ads are shown, in line with UK and EU rules.
              </p>
            )}
            <p className="text-muted mt-3">
              You can turn off personalised advertising at any time through{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Ads Settings</a>.
              For more detail on how Google uses information when you visit a site that uses its services, see Google&apos;s{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                &ldquo;How Google uses information from sites or apps that use our services&rdquo;
              </a> page.
            </p>
            <p className="text-muted mt-3">
              See our <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link> for the full list of cookies and how to control them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">4. How we use your data</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li>To reply to messages you send us through the contact form or by email</li>
              <li>To remember your display preference between visits, on your own device</li>
            </ul>
            <p className="text-muted mt-3">
              We process contact-form messages on the basis of your consent to be contacted, and your display
              preference as a strictly necessary part of running the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">5. Third parties</h2>
            <p className="text-muted">
              We do not sell your personal data. This site is hosted with standard infrastructure providers, who may
              process traffic data (such as IP addresses) purely to serve the website to you — they do not receive the
              figures you enter into a calculator.
            </p>
            <p className="text-muted mt-3">
              Where advertising is shown, Google and its advertising partners may process limited technical data — such
              as your IP address and advertising cookie identifiers — to serve and measure ads, as described in{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google&apos;s partner sites policy</a>.
              This is separate from, and never combined with, the salary or tax figures you type into a calculator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">6. Data retention</h2>
            <p className="text-muted">
              We keep contact-form messages only for as long as needed to resolve your enquiry, then delete them.
              Your display preference stays in your browser until you clear your site data — we never see or store it ourselves.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">7. Your rights under UK GDPR</h2>
            <p className="text-muted mb-2">Where we hold any personal data about you (for example, a message you sent us), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li><b className="text-ink">Access</b> — ask for a copy of the data we hold about you</li>
              <li><b className="text-ink">Rectification</b> — ask us to correct anything that&apos;s inaccurate</li>
              <li><b className="text-ink">Erasure</b> — ask us to delete your data</li>
              <li><b className="text-ink">Restriction</b> — ask us to limit how we use your data</li>
              <li><b className="text-ink">Objection</b> — object to how we&apos;re using your data</li>
              <li><b className="text-ink">Withdraw consent</b> — at any time, where we rely on your consent</li>
            </ul>
            <p className="text-muted mt-3">
              To use any of these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
              You can also complain to the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Information Commissioner&apos;s Office (ICO)</a> if you&apos;re unhappy with how we&apos;ve handled your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">8. Changes to this policy</h2>
            <p className="text-muted">
              We may update this policy from time to time — for example, if we add a new feature that changes what
              data we collect. The &ldquo;last updated&rdquo; date at the top of this page will always reflect the latest
              version, and continuing to use the site after a change means you accept the update.
            </p>
          </section>
        </div>

        <hr className="my-8 border-line" />
        <p className="text-sm text-muted">
          Questions about this policy? <Link href="/contact" className="text-accent hover:underline">Contact Us</Link> or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
