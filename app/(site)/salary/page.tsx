import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { gbp } from "@/lib/tax";
import { COMMON_SALARIES } from "@/lib/salaries";

export const metadata: Metadata = {
  title: "Salary After Tax — Common UK Salaries 2026/27",
  description: "Take-home pay for common UK salaries in 2026/27, from £15,000 to £150,000 — pick a figure to see the full Income Tax and National Insurance breakdown.",
};

export default function SalaryIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Salary</span>
      </nav>

      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl md:text-4xl font-extrabold flex items-center gap-3"><Calculator className="text-accent" /> Salary After Tax</h1>
        <p className="text-muted mt-4 leading-7">
          Pick a common UK salary below to see exactly how much you&apos;d take home in 2026/27, with a full
          yearly, monthly, weekly and daily breakdown of Income Tax and National Insurance. Don&apos;t see your
          figure? Use the full <Link href="/salary-calculator" className="text-accent hover:underline">Salary Calculator</Link> for any amount.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        {COMMON_SALARIES.map((a) => (
          <Link key={a} href={`/salary/${a}`} className="card p-4 text-center font-bold hover:border-accent transition">{gbp(a, 0)}</Link>
        ))}
      </div>
    </div>
  );
}
