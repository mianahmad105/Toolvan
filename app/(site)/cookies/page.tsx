import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/tools";

export const metadata = {
  title: "Cookie Policy",
  description: "The cookies Toolvan uses — theme and consent preferences, plus Google advertising cookies — and how to control or turn them off.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "2 October 2026";

function Row({ cookie, purpose, duration }: { cookie: string; purpose: string; duration: string }) {
  return (
    <tr className="border-t border-line">
      <td className="px-4 py-2.5 font-mono text-xs">{cookie}</td>
      <td className="px-4 py-2.5">{purpose}</td>
      <td className="px-4 py-2.5">{duration}</td>
    </tr>
  );
}

export default function Cookies() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Cookie Policy</span>
      </nav>

      <div className="card p-6 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Cookie Policy</h1>
        <p className="text-muted mt-1.5">Last updated: {LAST_UPDATED}</p>
        <hr className="my-6 border-line" />

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-extrabold mb-2">What is a cookie?</h2>
            <p className="text-muted">
              A cookie is a small text file that a website stores in your browser. It can be read back later, either by
              that site or, in the case of a third-party cookie, by the company that set it. Cookies are used for
              things like remembering a preference, keeping you signed in, or — as with advertising cookies — building
              a picture of the sites you&apos;ve visited so ads can be more relevant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Strictly necessary cookies</h2>
            <p className="text-muted mb-3">
              These run the basic functionality of the site and don&apos;t track you. They&apos;re set automatically and
              don&apos;t require consent.
            </p>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-sm min-w-[480px]">
                <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Purpose</th><th className="px-4 py-2.5">Duration</th></tr></thead>
                <tbody>
                  <Row cookie="theme" purpose="Remembers whether you last chose light or dark mode" duration="Until you clear your browser data" />
                  <Row cookie="cookieConsent" purpose="Remembers whether you accepted or rejected our cookie notice" duration="Until you clear your browser data" />
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Advertising cookies</h2>
            <p className="text-muted mb-3">
              We show advertising through Google AdSense to help cover the cost of running these free calculators.
              Google and its advertising partners use cookies to serve ads and measure how they perform, and — where
              you haven&apos;t opted out — to personalise ads based on your visits to this and other sites.
            </p>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-sm min-w-[480px]">
                <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Purpose</th><th className="px-4 py-2.5">Duration</th></tr></thead>
                <tbody>
                  <Row cookie="Google advertising cookies (e.g. DoubleClick/IDE)" purpose="Serves and measures ads, and limits how often you see the same one" duration="Set by Google — typically up to 13 months" />
                  <Row cookie="Other ad-partner cookies" purpose="Set by Google's advertising partners to support ad delivery on our pages" duration="Varies by partner" />
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-3">
              We don&apos;t control what these cookies store or how long they last — that&apos;s set by Google and its
              partners. For the full detail, see Google&apos;s{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                &ldquo;How Google uses information from sites or apps that use our services&rdquo;
              </a> page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">How to control cookies</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted">
              <li>
                <b className="text-ink">Turn off personalised ads:</b> visit{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Ads Settings</a>{" "}
                to opt out of personalised advertising from Google.
              </li>
              <li>
                <b className="text-ink">Opt out with other ad networks:</b> the{" "}
                <a href="https://youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Your Online Choices</a>{" "}
                site lists further opt-outs for other advertising partners.
              </li>
              <li>
                <b className="text-ink">Block cookies in your browser:</b> every major browser lets you block or delete
                cookies, or ask to be notified before one is set, through its settings menu. Blocking all cookies may
                stop some parts of the site working as expected.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2">Changes to this policy</h2>
            <p className="text-muted">
              If the cookies we or our advertising partners use change, we&apos;ll update this page. See our{" "}
              <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> for how we handle personal
              data more generally.
            </p>
          </section>
        </div>

        <hr className="my-8 border-line" />
        <p className="text-sm text-muted">
          Questions about our cookies? <Link href="/contact" className="text-accent hover:underline">Contact Us</Link> or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
