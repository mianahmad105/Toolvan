import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorLoader } from "@/components/CalculatorLoader";
import { ContactBand } from "@/components/ContactBand";
import { ToolCard } from "@/components/ToolCard";
import { getTool, TOOLS, toolHref } from "@/lib/tools";

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
  return (
    <>
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
