import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorLoader } from "@/components/CalculatorLoader";
import { ContactBand } from "@/components/ContactBand";
import { ToolCard } from "@/components/ToolCard";
import { CONTENT } from "@/lib/content";
import { getTool, SITE_NAME, SITE_URL, TOOLS, toolHref } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  return t ? { title: t.title, description: t.description, alternates: { canonical: toolHref(slug) } } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const related = TOOLS.filter((t) => t.slug !== slug && t.category === tool.category).slice(0, 4);
  const faqs = CONTENT[slug]?.faqs ?? [];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `${SITE_URL}${toolHref(slug)}`,
    description: tool.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    <div className="mx-auto max-w-[1400px] px-4 sm:px-8 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2"><Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">{tool.title}</span></nav>
      <CalculatorLoader slug={slug} />
      <p className="text-xs text-muted mt-6">Based on 2026/27 UK tax rates. Results are estimates and not financial advice.</p>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Related calculators</h2>
          <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-4">{related.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
        </section>
      )}
    </div>
    <ContactBand />
    </>
  );
}
