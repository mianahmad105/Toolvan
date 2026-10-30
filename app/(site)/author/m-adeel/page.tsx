import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CheckCircle2, Mail, UserRound } from "lucide-react";
import { GUIDES } from "@/lib/guides";
import { AUTHOR_NAME, AUTHOR_SLUG, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/tools";

export const metadata: Metadata = {
  title: `${AUTHOR_NAME} — Author`,
  description: `${AUTHOR_NAME} builds and maintains ${SITE_NAME}, including every calculator and guide on the site. Read about their background and how the figures are checked.`,
  alternates: { canonical: `/author/${AUTHOR_SLUG}` },
};

export default function AuthorPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: `${SITE_URL}/author/${AUTHOR_SLUG}`,
    jobTitle: "Web developer",
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-ink">Home</Link><span>/</span>
          <Link href="/about" className="hover:text-ink">About</Link><span>/</span>
          <span className="text-ink">{AUTHOR_NAME}</span>
        </nav>

        <div className="flex items-center gap-4">
          <span className="grid place-items-center w-16 h-16 rounded-full bg-accent text-onaccent shrink-0"><UserRound size={28} /></span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{AUTHOR_NAME}</h1>
            <p className="text-muted mt-1">Developer and author at {SITE_NAME}</p>
          </div>
        </div>

        <div className="mt-8 space-y-8 leading-7">
          <section>
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><UserRound size={19} className="text-accent" /> Background</h2>
            <p className="text-muted">
              I&apos;m a web developer from Pakistan who builds finance tools. I created {SITE_NAME} because most of
              the UK tax calculators I came across were confusing to use or cluttered with ads, and I wanted to
              build something fast, clear and free that gave people a straight answer about their own pay and tax.
              I write every calculator and every guide on this site myself — there&apos;s no editorial team or
              outsourced content behind it.
            </p>
            <p className="text-muted mt-3">
              I&apos;m not a tax adviser or an accountant. My background is in software development, and that&apos;s
              the skill I bring to this site: building calculators that are quick to use and genuinely accurate,
              while the tax rules themselves come directly from published government sources rather than guesswork.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><CheckCircle2 size={19} className="text-accent" /> How I check the figures</h2>
            <p className="text-muted">
              Every rate and threshold used across {SITE_NAME} is taken from GOV.UK and HMRC publications, plus the
              Scottish Government&apos;s published Budget for the Scottish Income Tax bands. I review every calculator
              and guide after each Budget or Autumn Statement, checking each figure directly against the relevant
              GOV.UK or HMRC page rather than relying on secondary sources, and I re-run the worked examples on the
              site to make sure they still add up. If a reader reports an error, I check it against the official
              source before making any change — see the{" "}
              <Link href="/editorial-policy" className="text-accent underline">Editorial policy</Link> for the full
              process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><BookOpen size={19} className="text-accent" /> Guides written by {AUTHOR_NAME}</h2>
            <p className="text-muted mb-3">All {GUIDES.length} guides on this site are written and kept up to date by me, including:</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {GUIDES.slice(0, 8).map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="text-accent underline text-sm">{g.title}</Link></li>
              ))}
            </ul>
            <p className="text-muted mt-3"><Link href="/guides" className="text-accent underline">See the full list of guides →</Link></p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2"><Mail size={19} className="text-accent" /> Get in touch</h2>
            <p className="text-muted">
              Spotted a mistake, or want to suggest a calculator or guide?{" "}
              <Link href="/contact" className="text-accent underline">Contact us</Link> or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">{CONTACT_EMAIL}</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
