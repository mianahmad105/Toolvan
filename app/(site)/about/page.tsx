import Link from "next/link";
import { BookOpen, CheckCircle2, Mail, RefreshCw, UserRound } from "lucide-react";
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME } from "@/lib/tools";

export const metadata = {
  title: "About",
  description: "Who builds and maintains Toolvan, why it exists, where the figures come from, and how to get in touch.",
  alternates: { canonical: "/about" },
};

const LAST_REVIEWED = "2 October 2026";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">About {SITE_NAME}</h1>
      <p className="text-muted mt-2">Last reviewed: {LAST_REVIEWED}</p>

      <div className="mt-8 space-y-8 leading-7">
        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><UserRound size={19} className="text-accent" /> Who&apos;s behind this</h2>
          <p className="text-muted">
            I&apos;m {AUTHOR_NAME}, a software developer, and I build and maintain {SITE_NAME} myself — it&apos;s not a
            product of a large company or a finance firm, just one person&apos;s side project that grew into a full set
            of calculators. I&apos;m not a tax adviser or an accountant; what I bring is the engineering side — building
            something fast, clear and free to use — while the actual tax rules come straight from published
            government sources, described below.
          </p>
          <p className="text-muted mt-3">
            I started {SITE_NAME} because the UK tax calculators I kept landing on were cluttered with ads, slow to
            load, or quietly running on last year&apos;s rates. I wanted something that gave a straight answer — your
            take-home pay, your tax band, your Stamp Duty bill — without a wall of pop-ups or a signup form in the
            way. That&apos;s still the goal: no account, nothing you type is sent anywhere, just a number you can trust.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><BookOpen size={19} className="text-accent" /> Where our figures come from</h2>
          <p className="text-muted">
            Every rate, band and threshold used in our calculators is taken from published UK government sources —
            mainly <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK</a> and HMRC guidance, plus the Scottish Government&apos;s published Budget for the
            Scottish Income Tax bands. I don&apos;t estimate or guess a figure: when a Budget, Autumn Statement or Scottish
            Budget changes a threshold, I check it directly against the GOV.UK or HMRC page for that tax, update every
            calculator that uses it, and re-run the worked examples on the site to make sure they still match. Each
            tool links out to its relevant GOV.UK page so you can check the source yourself.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><RefreshCw size={19} className="text-accent" /> How we keep things current</h2>
          <p className="text-muted">
            All calculators on this site are currently built around 2026/27 tax year rates. When HMRC publishes new
            thresholds, we review and update the relevant tool. This About page&apos;s &ldquo;last reviewed&rdquo; date reflects
            the most recent full pass over the site&apos;s figures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><CheckCircle2 size={19} className="text-accent" /> What our calculators are — and aren&apos;t</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted">
            <li>They give a general estimate for a standard tax code and straightforward circumstances</li>
            <li>They run entirely in your browser — nothing you type is sent to us or stored</li>
            <li>They are not financial, tax or legal advice, and can&apos;t account for every personal circumstance</li>
            <li>For anything that affects a real financial decision, always check with HMRC or a qualified adviser</li>
          </ul>
          <p className="text-muted mt-3">See our <Link href="/terms" className="text-accent underline">Terms of Use</Link> for the full picture.</p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><Mail size={19} className="text-accent" /> Found a mistake?</h2>
          <p className="text-muted">
            If a figure looks wrong, or you think a rate is out of date, please tell us — every report gets checked
            against the official source. <Link href="/contact" className="text-accent underline">Contact us</Link> or
            email <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
