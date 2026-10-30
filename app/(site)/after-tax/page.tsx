import type { Metadata } from "next";
import Link from "next/link";
import { Banknote } from "lucide-react";
import { calcSalary, gbp } from "@/lib/tax";
import { SITE_URL } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Salary After Tax UK — Take-Home Pay by Salary 2026/27",
  description: "See gross pay, Income Tax, National Insurance and take-home pay for common UK salaries from £20,000 to £125,000, worked out for the 2026/27 tax year.",
  alternates: { canonical: "/after-tax" },
};

// The specific salary bands requested for the hub table, in order.
const HUB_SALARIES = [20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000, 125000];

export default function AfterTaxHub() {
  const rows = HUB_SALARIES.map((gross) => {
    const r = calcSalary({ gross, region: "england", pensionPct: 0, plan: "none" });
    return { gross, tax: r.incomeTax, ni: r.ni, net: r.net };
  });

  const faqs = [
    {
      q: "How is take-home pay worked out on this page?",
      a: "Each row takes the gross salary, removes the 2026/27 Personal Allowance (£12,570, tapered away above £100,000), applies Income Tax in bands, then applies employee National Insurance separately on gross pay. What's left is take-home pay. No pension contribution, student loan repayment or non-standard tax code is included.",
    },
    {
      q: "Why is my real payslip different from this table?",
      a: "This table assumes the standard 1257L tax code, one job, and no pension or student loan. A workplace pension, a student loan plan, a company benefit, or a tax code that isn't 1257L will all change your real take-home figure — use the Income Tax Calculator or Salary Calculator to add those in.",
    },
    {
      q: "Does this apply in Scotland too?",
      a: "No — the figures above use the England, Wales and Northern Ireland Income Tax bands. Scotland uses six different bands from 19% to 48%, so the same gross salary produces a different tax bill north of the border. Click through to any individual salary page for a side-by-side England vs Scotland comparison.",
    },
    {
      q: "Which salary should I look at if mine isn't listed?",
      a: "Pick the closest figure for a rough sense of your position, then use the Income Tax Calculator or Salary Calculator for your exact salary — both run the same 2026/27 rates used to build this table, down to the penny.",
    },
    {
      q: "Why does the percentage I keep fall as salary rises?",
      a: "Because Income Tax is progressive: the slice of income above £50,270 is taxed at 40% instead of 20%, and above £125,140 it's taxed at 45%. Higher earners also lose their tax-free Personal Allowance gradually between £100,000 and £125,140. Each of these pulls the take-home percentage down as gross pay rises.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Salary After Tax UK", item: `${SITE_URL}/after-tax` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-ink">Home</Link><span>/</span><span className="text-ink">Salary After Tax UK</span>
        </nav>

        <div className="card p-6 sm:p-8">
          <h1 className="text-2xl md:text-4xl font-extrabold flex items-center gap-3"><Banknote className="text-accent" /> Salary After Tax UK</h1>
          <p className="text-muted mt-4 leading-7">
            The table below shows what common UK salaries actually turn into once Income Tax and National Insurance
            have come out, for the 2026/27 tax year. Pick the row closest to your own gross pay, or click through
            to a salary for the full yearly, monthly, weekly and daily breakdown, including a Scotland comparison.
          </p>
        </div>

        <div tabIndex={0} className="card p-6 sm:p-8 mt-6 overflow-x-auto">
          <h2 className="font-extrabold text-lg">Take-home pay by salary (England, Wales &amp; NI, 2026/27)</h2>
          <table className="w-full text-sm mt-4 min-w-[560px]">
            <thead>
              <tr className="bg-surface2 text-left">
                <th className="px-3 py-2.5">Gross salary</th>
                <th className="px-3 py-2.5">Income Tax</th>
                <th className="px-3 py-2.5">National Insurance</th>
                <th className="px-3 py-2.5">Take-home a year</th>
                <th className="px-3 py-2.5">Take-home a month</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ gross, tax, ni, net }) => (
                <tr key={gross} className="border-t border-line">
                  <td className="px-3 py-2.5"><Link href={`/after-tax/${gross}`} className="text-accent underline font-semibold">{gbp(gross, 0)}</Link></td>
                  <td className="px-3 py-2.5">{gbp(tax, 0)}</td>
                  <td className="px-3 py-2.5">{gbp(ni, 0)}</td>
                  <td className="px-3 py-2.5 font-bold">{gbp(net, 0)}</td>
                  <td className="px-3 py-2.5">{gbp(net / 12, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted mt-3">Assumes the standard 1257L tax code, one job, no pension contribution and no student loan. Click any salary for the full breakdown, including Scotland.</p>
        </div>

        <div className="card p-6 sm:p-8 mt-6 space-y-5 leading-7 text-muted">
          <h2 className="font-extrabold text-lg text-ink">How these figures are worked out</h2>
          <p>
            Two deductions do almost all of the work in turning a gross salary into take-home pay. Income Tax is
            charged on your taxable income — your salary minus the £12,570 tax-free Personal Allowance for 2026/27 —
            in slices, or bands, at rising rates. The basic rate of 20% applies up to £50,270 of total income, 40%
            from there to £125,140, and 45% above that. Crucially, a higher rate only ever applies to the slice of
            income above its threshold, never to your whole salary, which is why someone earning £60,000 pays far
            less than 40% of their total pay in tax even though part of it is taxed at that rate.
          </p>
          <p>
            National Insurance is calculated completely separately, straight from gross pay rather than taxable
            income. Employees pay 8% on earnings between £12,570 and £50,270, then 2% on anything above £50,270,
            with no upper limit. Because NI drops to 2% at the exact point Income Tax jumps to 40%, the two taxes
            partly offset each other around that threshold — which is one reason the take-home percentage doesn't
            fall as sharply between £50,270 and £100,000 as the headline 40% rate might suggest.
          </p>
          <h2 className="font-extrabold text-lg text-ink">A worked example: £70,000</h2>
          <p>
            Take the £70,000 row above. The first £12,570 is tax-free, leaving £57,430 taxable. £37,700 of that sits
            in the 20% basic-rate band (£7,540 of tax), and the remaining £19,730 falls into the 40% higher-rate
            band (£7,892), for total Income Tax of £15,432. National Insurance is 8% on the £37,700 between £12,570
            and £50,270 (£3,016), plus 2% on the £19,730 above £50,270 (£394.60), totalling £3,410.60. Add tax and
            NI together — £18,842.60 — and take-home pay comes to £51,157.40 a year, or about £4,263 a month, which
            matches the £70,000 row in the table above.
          </p>
          <h2 className="font-extrabold text-lg text-ink">The £100,000 to £125,140 band is different</h2>
          <p>
            Look closely at the jump between the £100,000 and £125,000 rows and the take-home percentage falls
            faster than the bands alone would suggest. That's because the Personal Allowance itself shrinks by £1
            for every £2 earned above £100,000, disappearing completely at £125,140. The withdrawn allowance is
            then taxed at 40%, creating an effective marginal rate of around 60% on income in that band — well
            above the 45% someone might expect from the additional-rate headline. Our guide on{" "}
            <Link href="/guides/how-the-100k-tax-trap-works" className="text-accent underline">how the £100,000 tax trap works</Link>{" "}
            covers this in detail, including how pension contributions can help.
          </p>
          <h2 className="font-extrabold text-lg text-ink">What this table doesn't include</h2>
          <p>
            Every figure above assumes a standard 1257L tax code, one job, no workplace pension, and no student
            loan repayment — the simplest possible case, used so every row is directly comparable. In reality,
            most people's take-home pay differs from this table for one of a few common reasons: a workplace
            pension contribution that lowers taxable income before tax is applied, a student loan plan that adds a
            further 9% (6% for Postgraduate loans) deduction above its threshold, a tax code that isn't 1257L
            because of a company benefit or a previous underpayment, or living in Scotland, where the Income Tax
            bands are entirely different above the basic rate. Any of these can shift your real take-home pay by a
            noticeable amount compared with the figures shown here — use the{" "}
            <Link href="/salary-calculator" className="text-accent underline">Salary Calculator</Link> to add them
            in for your own circumstances.
          </p>
          <h2 className="font-extrabold text-lg text-ink">Where to check the official figures</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK: Income Tax rates and Personal Allowances</a></li>
            <li><a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK: National Insurance rates and categories</a></li>
            <li><a href="https://www.gov.uk/scottish-income-tax" target="_blank" rel="noopener noreferrer" className="text-accent underline">GOV.UK: Scottish Income Tax rates</a></li>
          </ul>
        </div>

        <div className="card p-6 sm:p-8 mt-6">
          <h2 className="font-extrabold text-lg">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-3">
                <div className="font-bold">{f.q}</div>
                <p className="text-muted mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 sm:p-8 mt-6">
          <h2 className="font-extrabold text-lg">Related calculators and guides</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/salary-calculator" className="rounded-lg bg-surface2 border border-line px-4 py-2 text-sm font-medium hover:border-accent transition">Salary Calculator</Link>
            <Link href="/tools/income-tax-calculator" className="rounded-lg bg-surface2 border border-line px-4 py-2 text-sm font-medium hover:border-accent transition">Income Tax Calculator</Link>
            <Link href="/tools/gross-salary-calculator" className="rounded-lg bg-surface2 border border-line px-4 py-2 text-sm font-medium hover:border-accent transition">Gross Salary Calculator</Link>
            <Link href="/guides/how-the-100k-tax-trap-works" className="rounded-lg bg-surface2 border border-line px-4 py-2 text-sm font-medium hover:border-accent transition">The £100k tax trap explained</Link>
            <Link href="/guides/scottish-vs-english-income-tax-explained" className="rounded-lg bg-surface2 border border-line px-4 py-2 text-sm font-medium hover:border-accent transition">Scottish vs English Income Tax</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {HUB_SALARIES.map((a) => (
            <Link key={a} href={`/after-tax/${a}`} className="card p-4 text-center font-bold hover:border-accent transition">{gbp(a, 0)}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
