import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/ContactBand";
import { calcSalary, gbp, PERSONAL_ALLOWANCE } from "@/lib/tax";
import { COMMON_SALARIES } from "@/lib/salaries";
import { SITE_URL, toolHref } from "@/lib/tools";

export function generateStaticParams() {
  return COMMON_SALARIES.map((a) => ({ amount: String(a) }));
}

export async function generateMetadata({ params }: { params: Promise<{ amount: string }> }): Promise<Metadata> {
  const { amount } = await params;
  const gross = Number(amount);
  if (!COMMON_SALARIES.includes(gross)) return {};
  return {
    title: `${gbp(gross, 0)} After Tax UK — Take-Home Pay 2026/27`,
    description: `See exactly how much of a ${gbp(gross, 0)} salary you take home after Income Tax and National Insurance in the UK for 2026/27, with a full yearly, monthly, weekly and daily breakdown.`,
    alternates: { canonical: `/salary/${gross}` },
  };
}

function prefillHref(gross: number, region: "england" | "scotland") {
  const d = { amount: gross, freq: "year", region, over66: false, blind: false, marriage: false, pensionUnit: "pct", pensionVal: 0, plan: "none", taxCode: "" };
  return `${toolHref("income-tax-calculator")}?d=${encodeURIComponent(JSON.stringify(d))}`;
}

export default async function SalaryAmountPage({ params }: { params: Promise<{ amount: string }> }) {
  const { amount } = await params;
  const gross = Number(amount);
  if (!COMMON_SALARIES.includes(gross)) notFound();

  const eng = calcSalary({ gross, region: "england", pensionPct: 0, plan: "none" });
  const sco = calcSalary({ gross, region: "scotland", pensionPct: 0, plan: "none" });
  const effective = gross > 0 ? (eng.incomeTax / gross) * 100 : 0;
  const combinedRate = gross > 0 ? ((eng.incomeTax + eng.ni) / gross) * 100 : 0;
  const keepPct = gross > 0 ? (eng.net / gross) * 100 : 0;

  const idx = COMMON_SALARIES.indexOf(gross);
  const prev = COMMON_SALARIES[idx - 1];
  const next = COMMON_SALARIES[idx + 1];

  const periods: [string, number][] = [["Yearly", 1], ["Monthly", 12], ["Weekly", 52], ["Daily", 260]];

  const faqs = [
    { q: `How much is ${gbp(gross, 0)} after tax in the UK?`, a: `On a ${gbp(gross, 0)} salary in England, Wales or Northern Ireland, you'd take home about ${gbp(eng.net, 0)} a year (${gbp(eng.net / 12, 0)} a month), after ${gbp(eng.incomeTax, 0)} of Income Tax and ${gbp(eng.ni, 0)} of National Insurance.` },
    { q: `What's the take-home pay on ${gbp(gross, 0)} in Scotland?`, a: `In Scotland, a ${gbp(gross, 0)} salary works out at about ${gbp(sco.net, 0)} a year take-home, because Scottish Income Tax uses different bands from the rest of the UK.` },
    { q: `What is the effective tax rate on ${gbp(gross, 0)}?`, a: `Income Tax alone comes to about ${effective.toFixed(1)}% of a ${gbp(gross, 0)} salary. Add National Insurance and the combined effective rate is about ${combinedRate.toFixed(1)}%.` },
    { q: "Does this include pension contributions or student loan?", a: "No — this page assumes no pension contribution, no student loan and the standard tax code. Use the full Income Tax Calculator to add those and get a more personal figure." },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${gbp(gross, 0)} After Tax UK Calculator`,
    url: `${SITE_URL}/salary/${gross}`,
    description: `Take-home pay breakdown for a ${gbp(gross, 0)} UK salary in 2026/27.`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted flex items-center gap-2">
          <Link href="/" className="hover:text-ink">Home</Link><span>/</span>
          <Link href="/salary" className="hover:text-ink">Salary</Link><span>/</span>
          <span className="text-ink">{gbp(gross, 0)}</span>
        </nav>

        <div className="card p-6 sm:p-8">
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">{gbp(gross, 0)} After Tax UK — Take-Home Pay 2026/27</h1>
          <p className="text-muted mt-4 leading-7">
            On a <b className="text-ink">{gbp(gross, 0)}</b> salary in England, Wales or Northern Ireland, you take home about{" "}
            <b className="text-ink">{gbp(eng.net, 0)}</b> a year — that's <b className="text-ink">{gbp(eng.net / 12, 0)}</b> a month, or{" "}
            <b className="text-ink">{gbp(eng.net / 52, 0)}</b> a week — once Income Tax and National Insurance are taken off. You keep about{" "}
            <b className="text-ink">{keepPct.toFixed(1)}%</b> of your gross pay.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-6">
          <div className="card p-5"><div className="text-sm text-muted">Take-home pay</div><div className="text-2xl font-extrabold mt-1" style={{ color: "#1d4ed8" }}>{gbp(eng.net, 0)}</div><div className="text-xs text-muted mt-1">a year</div></div>
          <div className="card p-5"><div className="text-sm text-muted">Income Tax</div><div className="text-2xl font-extrabold mt-1" style={{ color: "#dc2626" }}>{gbp(eng.incomeTax, 0)}</div><div className="text-xs text-muted mt-1">a year</div></div>
          <div className="card p-5"><div className="text-sm text-muted">National Insurance</div><div className="text-2xl font-extrabold mt-1" style={{ color: "#0284c7" }}>{gbp(eng.ni, 0)}</div><div className="text-xs text-muted mt-1">a year</div></div>
        </div>

        <div className="card p-6 sm:p-8 mt-6 overflow-x-auto">
          <h2 className="font-extrabold text-lg">Pay by period</h2>
          <table className="w-full text-sm mt-4 min-w-[480px]">
            <thead><tr className="bg-surface2 text-left">
              <th className="px-3 py-2.5">Period</th><th className="px-3 py-2.5">Gross</th><th className="px-3 py-2.5">Tax</th><th className="px-3 py-2.5">NI</th><th className="px-3 py-2.5">Take-home</th>
            </tr></thead>
            <tbody>
              {periods.map(([name, d]) => (
                <tr key={name} className="border-t border-line">
                  <td className="px-3 py-2.5">{name}</td>
                  <td className="px-3 py-2.5">{gbp(gross / d)}</td>
                  <td className="px-3 py-2.5">{gbp(eng.incomeTax / d)}</td>
                  <td className="px-3 py-2.5">{gbp(eng.ni / d)}</td>
                  <td className="px-3 py-2.5 font-bold">{gbp(eng.net / d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted mt-3">Personal Allowance: {gbp(PERSONAL_ALLOWANCE, 0)}. Assumes the standard tax code, one job, no pension contribution and no student loan.</p>
        </div>

        <div className="card p-6 sm:p-8 mt-6">
          <h2 className="font-extrabold text-lg">England, Wales &amp; NI vs Scotland</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm min-w-[420px]">
              <thead><tr className="bg-surface2 text-left"><th className="px-3 py-2.5"></th><th className="px-3 py-2.5">England, Wales &amp; NI</th><th className="px-3 py-2.5">Scotland</th></tr></thead>
              <tbody>
                <tr className="border-t border-line"><td className="px-3 py-2.5">Income Tax</td><td className="px-3 py-2.5">{gbp(eng.incomeTax, 0)}</td><td className="px-3 py-2.5">{gbp(sco.incomeTax, 0)}</td></tr>
                <tr className="border-t border-line"><td className="px-3 py-2.5">Take-home pay</td><td className="px-3 py-2.5 font-bold">{gbp(eng.net, 0)}</td><td className="px-3 py-2.5 font-bold">{gbp(sco.net, 0)}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href={prefillHref(gross, "england")} className="btn">See full England/Wales/NI breakdown</Link>
            <Link href={prefillHref(gross, "scotland")} className="btn" style={{ background: "#334155" }}>See full Scotland breakdown</Link>
          </div>
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
          <h2 className="font-extrabold text-lg">Other salaries</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {prev && <Link href={`/salary/${prev}`} className="rounded-lg bg-surface2 border border-line px-3 py-2 text-sm hover:border-accent transition">{gbp(prev, 0)}</Link>}
            {next && <Link href={`/salary/${next}`} className="rounded-lg bg-surface2 border border-line px-3 py-2 text-sm hover:border-accent transition">{gbp(next, 0)}</Link>}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {COMMON_SALARIES.filter((a) => a !== gross).map((a) => (
              <Link key={a} href={`/salary/${a}`} className="rounded-full bg-surface2 border border-line px-3 py-1.5 text-xs hover:border-accent transition">{gbp(a, 0)}</Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted mt-6">These figures are estimates based on 2026/27 UK tax rates and are not financial advice. For pension, student loan or tax code adjustments, use the <Link href={toolHref("income-tax-calculator")} className="text-accent hover:underline">Income Tax Calculator</Link>.</p>
      </div>
      <ContactBand />
    </>
  );
}
