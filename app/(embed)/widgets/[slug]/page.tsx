import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorLoader } from "@/components/CalculatorLoader";
import { getTool, SITE_NAME, TOOLS, toolHref } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  return { title: t ? `${t.title} widget` : "Widget", robots: { index: false } };
}

export default async function Widget({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <div className="p-4">
      <h1 className="text-xl font-extrabold mb-4">{tool.icon} {tool.title}</h1>
      <CalculatorLoader slug={slug} />
      <p className="text-xs text-muted mt-4 text-center">
        Powered by <Link href={toolHref(slug)} target="_blank" className="font-semibold text-accent2">{SITE_NAME}</Link>
      </p>
    </div>
  );
}
