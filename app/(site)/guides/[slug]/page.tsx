import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HelpCircle } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { ContactBand } from "@/components/ContactBand";
import { GUIDES, getGuide } from "@/lib/guides";
import { AUTHOR_NAME, getTool, SITE_URL } from "@/lib/tools";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  return g ? { title: g.title, description: g.dek, alternates: { canonical: `/guides/${slug}` } } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedTools = guide.related.map((s) => getTool(s)).filter((t): t is NonNullable<typeof t> => !!t);
  const otherGuides = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.dek,
    dateModified: guide.updated,
    url: `${SITE_URL}/guides/${slug}`,
    author: { "@type": "Person", name: AUTHOR_NAME },
  };
  const faqSchema = guide.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-ink">Home</Link><span>/</span>
          <Link href="/guides" className="hover:text-ink">Guides</Link><span>/</span>
          <span className="text-ink">{guide.title}</span>
        </nav>

        <article className="card p-6 sm:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{guide.title}</h1>
          <p className="text-muted mt-3 leading-7">{guide.dek}</p>
          <p className="text-xs text-muted mt-3">
            Written by {AUTHOR_NAME} · Last updated{" "}
            {new Date(guide.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <hr className="my-6 border-line" />

          <div className="space-y-8 leading-7">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-extrabold mb-2">{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className="text-muted mt-2">{p}</p>)}
                {s.bullets && (
                  <ul className="list-disc pl-6 space-y-1.5 text-muted mt-3">
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {guide.faqs.length > 0 && (
            <>
              <hr className="my-8 border-line" />
              <section>
                <h2 className="text-xl font-extrabold mb-3 flex items-center gap-2"><HelpCircle size={19} className="text-accent" /> Frequently asked questions</h2>
                <div className="divide-y divide-line">
                  {guide.faqs.map((f) => (
                    <div key={f.q} className="py-3">
                      <div className="font-bold">{f.q}</div>
                      <p className="text-muted mt-1">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <hr className="my-8 border-line" />
          <p className="text-xs text-muted">
            This guide is general information, not financial or tax advice — check{" "}
            <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK</a>{" "}
            or a qualified adviser for anything that affects a real financial decision.
          </p>
        </article>

        {relatedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">Put this into practice</h2>
            <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-4">
              {relatedTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </section>
        )}

        {otherGuides.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">More guides</h2>
            <div className="grid gap-4 mt-4 sm:grid-cols-3">
              {otherGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="card p-4 hover:border-accent transition">
                  <div className="font-bold text-sm leading-snug">{g.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <ContactBand />
    </>
  );
}
