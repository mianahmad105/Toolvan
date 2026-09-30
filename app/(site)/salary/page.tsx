import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { calcSalary, gbp } from "@/lib/tax";
import { COMMON_SALARIES } from "@/lib/salaries";

export const metadata: Metadata = {
  title: "Salary After Tax — Common UK Salaries 2026/27",
  description: "Take-home pay for common UK salaries in 2026/27, from £15,000 to £150,000 — pick a figure to see the full Income Tax and National Insurance breakdown.",
  alternates: { canonical: "/salary" },
};

export default function SalaryIndex() {
  const table = COMMON_SALARIES.map((gross) => ({ gross, net: calcSalary({ gross, region: "england", pensionPct: 0, plan: "none" }).net }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Salary</span>
      </nav>

      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl md:text-4xl font-extrabold flex items-center gap-3"><Calculator className="text-accent" /> UK Salary After Tax</h1>
        <div className="text-muted mt-4 leading-7 space-y-3">
          <p>
            How much of a UK salary actually lands in your bank account depends on Income Tax, National Insurance and,
            for many people, a pension contribution or student loan repayment on top. This page lists take-home pay
            for the salaries people search for most, worked out for the 2026/27 tax year in England, Wales and
            Northern Ireland.
          </p>
          <p>
            Pick a figure below to see the full breakdown — yearly, monthly, weekly and daily — plus how the same
            salary compares in Scotland, which uses its own Income Tax bands. Don&apos;t see your exact number? The
            full <Link href="/salary-calculator" className="text-accent hover:underline">Salary Calculator</Link> works
            for any amount and adds pension contributions and student loan plans into the figure.
          </p>
        </div>
      </div>

      <div className="card p-6 sm:p-8 mt-6 overflow-x-auto">
        <h2 className="font-extrabold text-lg">Take-home pay by salary (England, Wales &amp; NI)</h2>
        <table className="w-full text-sm mt-4 min-w-[420px]">
          <thead><tr className="bg-surface2 text-left"><th className="px-3 py-2.5">Gross salary</th><th className="px-3 py-2.5">Take-home a year</th><th className="px-3 py-2.5">Take-home a month</th></tr></thead>
          <tbody>
            {table.map(({ gross, net }) => (
              <tr key={gross} className="border-t border-line">
                <td className="px-3 py-2.5"><Link href={`/salary/${gross}`} className="text-accent hover:underline font-semibold">{gbp(gross, 0)}</Link></td>
                <td className="px-3 py-2.5">{gbp(net, 0)}</td>
                <td className="px-3 py-2.5">{gbp(net / 12, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted mt-3">Assumes the standard tax code, one job, no pension contribution and no student loan. Click any salary for the full breakdown, including Scotland.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        {COMMON_SALARIES.map((a) => (
          <Link key={a} href={`/salary/${a}`} className="card p-4 text-center font-bold hover:border-accent transition">{gbp(a, 0)}</Link>
        ))}
      </div>
    </div>
  );
}
