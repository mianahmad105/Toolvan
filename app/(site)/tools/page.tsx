import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Sparkles, TrendingUp } from "lucide-react";
import { ContactBand } from "@/components/ContactBand";
import { ToolSuite } from "@/components/ToolSuite";

export const metadata: Metadata = {
  title: "All UK Tax Calculators",
  description: "Browse every free UK tax calculator in one place — salary, income tax, National Insurance, capital gains, inheritance tax, stamp duty and more, for the 2026/27 tax year.",
};

export default function AllTools() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-surface2">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm flex items-center gap-2 text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <span className="text-ink">Calculators</span>
        </div>
      </nav>

      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(110deg,#0a1a3d 0%,#1d4ed8 55%,#1e3a8a 100%)" }}>
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
            <Calculator size={15} /> Browse every calculator
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">Your UK Tax Toolkit</h1>
          <p className="text-blue-50 text-lg md:text-xl leading-8 mt-6 max-w-3xl mx-auto">
            Checking a payslip, planning a house purchase or working out what an estate owes? There is a free calculator here to walk you through the numbers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-8 text-sm text-blue-100">
            <span className="inline-flex items-center gap-2"><Sparkles size={16} /> Rates for 2026/27</span>
            <span className="inline-flex items-center gap-2"><TrendingUp size={16} /> Free to use</span>
          </div>
        </div>
      </section>

      <div className="pt-10 pb-16 band"><ToolSuite heading={false} variant="list" /></div>

      <ContactBand />
    </>
  );
}
