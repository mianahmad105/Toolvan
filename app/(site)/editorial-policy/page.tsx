import Link from "next/link";
import { AlertTriangle, BookOpen, CalendarClock, Mail } from "lucide-react";
import { AUTHOR_NAME, AUTHOR_SLUG, CONTACT_EMAIL, SITE_NAME } from "@/lib/tools";

export const metadata = {
  title: "Editorial Policy",
  description: `How ${SITE_NAME} sources its figures, how often calculators and guides are reviewed, and how corrections are handled.`,
  alternates: { canonical: "/editorial-policy" },
};

const LAST_REVIEWED = "2 October 2026";

export default function EditorialPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Editorial policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold">Editorial Policy</h1>
      <p className="text-muted mt-2">Last reviewed: {LAST_REVIEWED}</p>

      <div className="mt-8 space-y-8 leading-7">
        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><BookOpen size={19} className="text-accent" /> Where our figures come from</h2>
          <p className="text-muted">
            Every rate, threshold and allowance used in a calculator or guide on {SITE_NAME} is taken from a primary
            government source — mainly{" "}
            <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK</a>{" "}
            and HMRC guidance, plus the Scottish Government&apos;s published Budget for the Scottish Income Tax bands
            and the Department for Transport&apos;s published Vehicle Excise Duty tables. We don&apos;t estimate a
            figure, round it for convenience, or copy it from a third-party summary — each one is checked directly
            against the official page, and most calculator and guide pages link out to that source so you can
            check it yourself.
          </p>
          <p className="text-muted mt-3">
            All content is written by {AUTHOR_NAME} — see the{" "}
            <Link href={`/author/${AUTHOR_SLUG}`} className="text-accent underline">author page</Link> for their
            background. There is no outsourced or AI-generated content published without a figure-by-figure check
            against an official source.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><CalendarClock size={19} className="text-accent" /> How often figures are reviewed</h2>
          <p className="text-muted">
            Every calculator and guide is reviewed after each UK Budget, Autumn Statement or Scottish Budget that
            changes a rate or threshold the site relies on. Beyond that, we do a full pass over every calculator's
            figures and worked examples at least once a tax year, ahead of 6 April, to make sure everything matches
            the rates for the new tax year before it begins. The &ldquo;last reviewed&rdquo; or &ldquo;last
            updated&rdquo; date shown on a page reflects the most recent check of that specific page, which is
            sometimes more recent than a full site-wide pass if an individual figure changed in between.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><AlertTriangle size={19} className="text-accent" /> How corrections are handled</h2>
          <p className="text-muted">
            If a reader reports a figure that looks wrong, we check it directly against the relevant GOV.UK or
            HMRC page (or the equivalent Scottish Government or DVLA/DfT source for devolved or vehicle tax figures)
            before making any change. If the report is correct, we fix the figure, update every calculator or guide
            that uses it, re-run the worked examples that depend on it, and update the page&apos;s &ldquo;last
            reviewed&rdquo; date. If we can&apos;t reproduce the issue or the source doesn&apos;t support the
            change, we reply to explain why, rather than making a change without checking it first.
          </p>
          <p className="text-muted mt-3">
            Every calculator result is clearly labelled as an estimate for general guidance, not financial, tax or
            legal advice — see our <Link href="/terms" className="text-accent underline">Terms of Use</Link> for
            the full picture. Anything that affects a real financial decision should always be checked against
            HMRC or a qualified adviser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><Mail size={19} className="text-accent" /> Report an issue</h2>
          <p className="text-muted">
            Think a figure is out of date or incorrect?{" "}
            <Link href="/contact" className="text-accent underline">Contact us</Link> or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">{CONTACT_EMAIL}</a> with the page
            and the figure you think is wrong, and we&apos;ll check it against the official source.
          </p>
        </section>
      </div>
    </div>
  );
}
