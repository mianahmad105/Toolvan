import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-English guides to UK tax — the £100,000 trap, Scottish vs English Income Tax, tax codes, salary sacrifice, student loans and more.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Guides</span>
      </nav>

      <div className="card p-6 sm:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3"><BookOpen className="text-accent" /> UK Tax Guides</h1>
        <p className="text-muted mt-4 leading-7 max-w-2xl">
          Our calculators give you a number — these guides explain the rules behind it. Each one covers a single topic
          in plain English: how a rule works, a worked example, and where it catches people out. Written around the
          2026/27 UK tax year and linked to the calculator that puts it into practice for your own figures.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 mt-6">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="card p-6 hover:border-accent transition flex flex-col">
            <h2 className="font-extrabold text-lg leading-snug">{g.title}</h2>
            <p className="text-sm text-muted mt-2.5 flex-1">{g.dek}</p>
            <span className="mt-4 flex items-center gap-1.5 font-semibold text-accent text-sm">
              Read guide <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
