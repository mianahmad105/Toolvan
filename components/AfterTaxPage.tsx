"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, CircleDollarSign, HelpCircle, Info, ListChecks, PoundSterling } from "lucide-react";
import { calcSalary, gbp, PERSONAL_ALLOWANCE, type Region } from "@/lib/tax";
import { toolHref } from "@/lib/tools";
import { SelectField, NumField } from "./ui";
import { StatCard } from "./proui";

const FREQ_MULT: Record<string, number> = { year: 1, month: 12, week: 52, day: 260, hour: 1950 };
const FREQ_OPTIONS = [
  { value: "year", label: "Yearly" }, { value: "month", label: "Monthly" },
  { value: "week", label: "Weekly" }, { value: "day", label: "Daily" }, { value: "hour", label: "Hourly" },
];

type Preset = { amount: number; freq: string; label: string };

const POPULAR_SALARIES: Preset[] = [20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000]
  .map((a) => ({ amount: a, freq: "year", label: `${gbp(a, 0)} / year` }));
const HIGH_EARNER_SALARIES: Preset[] = [110000, 125000, 140000, 150000]
  .map((a) => ({ amount: a, freq: "year", label: `${gbp(a, 0)} / year` }));
const ALT_FREQUENCIES: Preset[] = [
  { amount: 3000, freq: "month", label: "£3,000 / month" }, { amount: 4000, freq: "month", label: "£4,000 / month" },
  { amount: 700, freq: "week", label: "£700 / week" }, { amount: 800, freq: "week", label: "£800 / week" },
];
const WAGE_RATES: Preset[] = [
  { amount: 12, freq: "hour", label: "£12 / hour" }, { amount: 15, freq: "hour", label: "£15 / hour" },
  { amount: 20, freq: "hour", label: "£20 / hour" }, { amount: 100, freq: "day", label: "£100 / day" },
  { amount: 250, freq: "day", label: "£250 / day" },
];
const COMMON_SALARIES: Preset[] = [24000, 26000, 28000, 30000, 33000, 35000, 38000, 42000]
  .map((a) => ({ amount: a, freq: "year", label: `${gbp(a, 0)} / year` }));

const ASSUMPTIONS = [
  "You're on the standard tax code, with the full Personal Allowance and no adjustments",
  "You have one job and your pay is spread evenly across the year",
  "You're under State Pension age, so employee National Insurance applies",
  "No pension contributions are included unless you use the full Salary Calculator",
  "No Marriage Allowance, Blind Person's Allowance or student loan repayments are applied",
  "You can choose either England, Wales & NI rates or Scottish rates",
  "Weekly, daily and hourly figures assume a 52-week working year",
];

const FAQS = [
  { q: "How much tax would I pay on a £30,000 salary?", a: `On a £30,000 salary you'd pay income tax and National Insurance based on the 2026/27 thresholds — use the calculator above with £30,000 selected to see the exact income tax, NI and take-home figures.` },
  { q: "What's the tax-free Personal Allowance for 2026/27?", a: `It's ${gbp(PERSONAL_ALLOWANCE, 0)} for most people. It reduces by £1 for every £2 you earn above £100,000, and disappears completely once you reach £125,140.` },
  { q: "How accurate is this after-tax figure?", a: "It's built on the same published UK tax bands and National Insurance thresholds as the rest of this site. It won't capture every personal detail — like pension contributions or a non-standard tax code — for that, use the full Salary Calculator." },
];

export function AfterTaxPage() {
  const [amount, setAmount] = useState(0);
  const [freq, setFreq] = useState("year");
  const [region, setRegion] = useState<Region>("england");
  const [snap, setSnap] = useState<{ gross: number } | null>(null);

  const runFor = (a: number, f: string, r: Region = region) => {
    setAmount(a); setFreq(f); setRegion(r);
    setSnap({ gross: a * (FREQ_MULT[f] ?? 1) });
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); runFor(amount, freq, region); };

  const r = snap ? calcSalary({ gross: snap.gross, region, pensionPct: 0, plan: "none" }) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
      <div className="space-y-6">
        <section className="card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-accent text-onaccent shrink-0 mt-1"><Banknote size={17} /></span>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">After Tax</h1>
          </div>
          <p className="text-muted mt-4 leading-7">
            This free calculator estimates how much of your salary you&apos;ll actually take home for the 2026/27 tax year.
            Whether you&apos;re paid yearly, monthly, weekly, daily or by the hour, enter a figure below to see your income tax, National Insurance and net pay.
          </p>
          <div className="mt-4 rounded-xl border border-line bg-surface2 p-4 flex gap-3">
            <Info size={16} className="text-accent shrink-0 mt-0.5" />
            <div className="text-sm text-muted">
              <b className="text-ink">How this differs from the Salary Calculator:</b> this page is built for speed —
              it&apos;s the only calculator on the site that converts an <b className="text-ink">hourly or daily rate</b>{" "}
              straight to take-home pay, with no form fields to fill in beyond the amount itself. It doesn&apos;t handle
              pension contributions, student loan plans, a custom tax code, or Marriage/Blind Person&apos;s Allowance.
              If you need any of those, use the full{" "}
              <Link href={toolHref("salary-calculator")} className="text-accent hover:underline">Salary Calculator</Link>{" "}
              instead.
            </div>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="font-extrabold text-lg">What&apos;s your gross salary?</h2>
          <form onSubmit={submit} className="mt-4">
            <div className="grid sm:grid-cols-3 gap-3">
              <NumField label="Gross pay" value={amount} onChange={setAmount} step={100} />
              <SelectField label="Paid" value={freq} onChange={setFreq} options={FREQ_OPTIONS} />
              <SelectField label="Region" value={region} onChange={setRegion} options={[
                { value: "england", label: "England, Wales & NI" }, { value: "scotland", label: "Scotland" },
              ]} />
            </div>
            <button type="submit" className="btn inline-flex items-center gap-2 mt-4">Calculate <ArrowRight size={16} /></button>
          </form>
        </section>

        {r && snap && (
          <section className="card p-6 sm:p-8">
            <h2 className="font-extrabold text-lg">Your result</h2>
            <p className="text-muted text-sm mt-1">On {gbp(snap.gross, 0)} a year, in {region === "scotland" ? "Scotland" : "England, Wales & NI"}</p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <StatCard label="Take-home pay" value={gbp(r.net, 0)} note={`${gbp(r.net / 12, 0)} a month`} color="#16a34a" />
              <StatCard label="Income tax" value={gbp(r.incomeTax, 0)} note="Per year" color="#dc2626" />
              <StatCard label="National Insurance" value={gbp(r.ni, 0)} note="Per year" color="#2563eb" />
            </div>
          </section>
        )}

        <section className="card p-6 sm:p-8">
          <h2 className="font-extrabold text-lg flex items-center gap-2"><CircleDollarSign size={19} className="text-accent" /> Calculate After Tax for Any Salary</h2>
          <div className="mt-5">
            <h3 className="text-sm font-bold text-muted uppercase tracking-wide">Popular salaries</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {POPULAR_SALARIES.map((p) => (
                <button key={p.label} onClick={() => runFor(p.amount, p.freq)} className="flex items-center gap-1.5 text-left text-sm text-accent hover:underline">
                  <PoundSterling size={13} className="shrink-0" />{p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted uppercase tracking-wide">Higher earners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {HIGH_EARNER_SALARIES.map((p) => (
                <button key={p.label} onClick={() => runFor(p.amount, p.freq)} className="flex items-center gap-1.5 text-left text-sm text-accent hover:underline">
                  <PoundSterling size={13} className="shrink-0" />{p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted uppercase tracking-wide">Other pay frequencies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {ALT_FREQUENCIES.map((p) => (
                <button key={p.label} onClick={() => runFor(p.amount, p.freq)} className="flex items-center gap-1.5 text-left text-sm text-accent hover:underline">
                  <PoundSterling size={13} className="shrink-0" />{p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-bold text-muted uppercase tracking-wide">Hourly and daily rates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {WAGE_RATES.map((p) => (
                <button key={p.label} onClick={() => runFor(p.amount, p.freq)} className="flex items-center gap-1.5 text-left text-sm text-accent hover:underline">
                  <PoundSterling size={13} className="shrink-0" />{p.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="font-extrabold text-lg flex items-center gap-2"><ListChecks size={19} className="text-accent" /> This calculation assumes</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {ASSUMPTIONS.map((a) => <li key={a} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />{a}</li>)}
          </ul>
        </section>

        <p className="text-xs text-muted flex items-start gap-2 px-1">
          <Info size={14} className="mt-0.5 shrink-0" />
          This tool uses the same 2026/27 tax thresholds as the rest of the site. For pension, tax code or student loan
          adjustments, use our <Link href={toolHref("income-tax-calculator")} className="text-accent hover:underline">Income Tax Calculator</Link>.
        </p>

        <section className="card p-6 sm:p-8">
          <h2 className="font-extrabold text-lg flex items-center gap-2"><HelpCircle size={19} className="text-accent" /> Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-3">
                <div className="font-bold">{f.q}</div>
                <p className="text-muted mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <div className="card p-5">
          <h3 className="font-extrabold">Helpful tools</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            {[
              ["income-tax-calculator", "Income Tax Calculator"], ["vehicle-tax-calculator", "Vehicle Tax Calculator"],
              ["capital-gains-tax-calculator", "Capital Gains Tax Calculator"], ["inheritance-tax-calculator", "Inheritance Tax Calculator"],
              ["ni-calculator", "NI Calculator"],
            ].map(([slug, label]) => (
              <li key={slug}><Link href={toolHref(slug)} className="flex items-center gap-2 text-accent hover:underline"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="font-extrabold">Common yearly salaries</h3>
          <div className="mt-3 space-y-2">
            {COMMON_SALARIES.map((p) => (
              <button key={p.label} onClick={() => runFor(p.amount, p.freq)}
                className="flex items-center gap-2 w-full text-left rounded-lg border border-line px-3 py-2.5 text-sm text-accent hover:border-accent hover:bg-surface2 transition">
                <PoundSterling size={14} className="shrink-0" />{p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-extrabold">Wages and rates</h3>
          <div className="mt-3 space-y-2">
            {WAGE_RATES.map((p) => (
              <button key={p.label} onClick={() => runFor(p.amount, p.freq)}
                className="flex items-center gap-2 w-full text-left rounded-lg border border-line px-3 py-2.5 text-sm text-accent hover:border-accent hover:bg-surface2 transition">
                <PoundSterling size={14} className="shrink-0" />{p.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
