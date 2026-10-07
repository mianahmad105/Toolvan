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
            How much of a UK salary actually lands in your bank account comes down to two separate deductions. Income
            Tax is charged on your taxable income — your salary minus the tax-free Personal Allowance of £12,570 for
            2026/27 — in slices, or bands, at rising rates, so a pay rise only pushes the portion above a threshold
            into the higher rate, never your whole salary. National Insurance is worked out separately, straight from
            your gross pay rather than your taxable income: employees pay 8% on earnings between £12,570 and £50,270,
            then 2% on anything above that.
          </p>
          <p>
            Take a salary of £35,000 as an example. The first £12,570 is tax-free, leaving £22,430 of taxable income,
            all inside the 20% basic-rate band — £4,486 of Income Tax. National Insurance is 8% on the £22,430 above
            the £12,570 threshold, which comes to £1,794.40. Total deductions of £6,280.40 leave take-home pay of
            £28,719.60 a year, or about £2,393 a month — roughly 82% of the original salary. That ratio of what you
            keep falls gradually as income rises, because more of it crosses into the 40% and 45% bands.
          </p>
          <p>
            The figures below assume a standard tax code, one job, and no pension or student loan — a workplace
            pension, a student loan repayment, or a non-standard tax code will all change your real take-home pay,
            and Scotland uses entirely different Income Tax bands from England, Wales and Northern Ireland above the
            basic rate. Pick a salary for the full breakdown including Scotland, or use the full{" "}
            <Link href="/salary-calculator" className="text-accent underline">Salary Calculator</Link> for any
            amount with pension and student loan built in. See how National Insurance and Income Tax bands work in
            more depth in our <Link href="/guides" className="text-accent underline">tax guides</Link>.
          </p>
        </div>
      </div>

      <div tabIndex={0} className="card p-6 sm:p-8 mt-6 overflow-x-auto">
        <h2 className="font-extrabold text-lg">Take-home pay by salary (England, Wales &amp; NI)</h2>
        <table className="w-full text-sm mt-4 min-w-[420px]">
          <thead><tr className="bg-surface2 text-left"><th className="px-3 py-2.5">Gross salary</th><th className="px-3 py-2.5">Take-home a year</th><th className="px-3 py-2.5">Take-home a month</th></tr></thead>
          <tbody>
            {table.map(({ gross, net }) => (
              <tr key={gross} className="border-t border-line">
                <td className="px-3 py-2.5"><Link href={`/salary/${gross}`} className="text-accent underline font-semibold">{gbp(gross, 0)}</Link></td>
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
