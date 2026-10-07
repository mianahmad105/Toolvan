import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp } from "lucide-react";
import { QuickCalc } from "@/components/QuickCalc";
import { PopularSection } from "@/components/PopularSection";
import { ToolSuite } from "@/components/ToolSuite";
import { EmbedSection } from "@/components/EmbedSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <section className="band">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 md:pt-20 md:pb-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
              Free UK Tax Calculators
              <span className="block bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400 bg-clip-text text-transparent">That Do The Sums</span>
            </h1>
            <p className="text-muted text-lg leading-8 mt-7 max-w-xl">
              Find your <b className="text-ink">take-home pay</b>, <b className="text-ink">income tax</b>, <b className="text-ink">National Insurance</b> and{" "}
              <b className="text-ink">capital gains</b> with clear, step-by-step results. Built around the 2026/27 UK tax year.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link href="/tools" className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 font-bold text-white shadow-lg" style={{ background: "linear-gradient(90deg,#1d4ed8,#38bdf8)" }}>
                <Calculator size={19} /> See all calculators <ArrowRight size={18} />
              </Link>
              <Link href="/salary-calculator" className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 font-medium bg-surface border-2 border-line hover:border-accent transition">
                <TrendingUp size={19} /> Salary Calculator
              </Link>
            </div>
          </div>
          <div className="flex lg:justify-end"><QuickCalc /></div>
        </div>
      </section>

      <PopularSection />

      <ToolSuite />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">UK Tax Guides</h2>
            <p className="text-muted mt-2 max-w-xl">Plain-English explainers for the rules behind the numbers — tax codes, Scottish tax, salary sacrifice and more.</p>
          </div>
          <Link href="/guides" className="font-semibold text-accent underline shrink-0">See all guides <ArrowRight size={15} className="inline" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 mt-7">
          {GUIDES.slice(0, 3).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="card p-5 hover:border-accent transition">
              <div className="font-bold leading-snug">{g.title}</div>
              <p className="text-sm text-muted mt-2">{g.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <EmbedSection />

      <NewsletterSection />
    </>
  );
}
