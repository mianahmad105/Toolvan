"use client";
import { useState } from "react";
import {
  Banknote, Clock, Globe2, HeartHandshake,
  PieChart, Repeat, Scale, Search, ShieldCheck, Target,
} from "lucide-react";
import {
  employeeNI, gbp, grossFromNet, calcSalary, parseTaxCode, MARRIAGE,
  type Region, type StudentPlan,
} from "@/lib/tax";
import { toolHref } from "@/lib/tools";
import { NumField, PLANS, REGIONS, SelectField } from "./ui";
import {
  Accordion, BarCompare, EmptyResults, PageHero, PieChartSvg, RowsTable, RunCard,
  Section, ShareSaveBar, StatCard, Understanding,
} from "./proui";

const pct = (n: number) => `${isFinite(n) ? n.toFixed(1) : "0.0"}%`;

/* ---------------------------------------------------------------------- */
/* National Insurance Calculator                                          */
/* ---------------------------------------------------------------------- */
const NI_COLOR = "#059669";

export function NICalculatorPro() {
  const [gross, setGross] = useState(0);
  const [snap, setSnap] = useState<number | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap(gross); };

  let results: React.ReactNode = <EmptyResults icon={ShieldCheck} color={NI_COLOR} label="Calculate" />;
  let extra: React.ReactNode = null;
  if (snap !== null) {
    const ni = employeeNI(snap);
    const main = Math.max(0, Math.min(snap, 50270) - 12570) * 0.08;
    const upper = Math.max(0, snap - 50270) * 0.02;
    const takeHomeAfterNI = snap - ni;
    const dRate = snap > 0 ? (ni / snap) * 100 : 0;
    const more = calcSalary({ gross: snap * 1.1, region: "england", pensionPct: 0, plan: "none" });
    const moreNI = employeeNI(snap * 1.1);
    const summaryText = `National Insurance summary (2026/27): gross ${gbp(snap, 0)}, National Insurance ${gbp(ni, 0)} a year (${pct(dRate)} of pay).`;
    void more;
    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your National Insurance</h2>
          <p className="text-muted mt-1">Tax year 2026/27 · Employee Class 1</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Gross earnings" value={gbp(snap, 0)} note="Yearly income" color="#64748b" />
          <StatCard label="National Insurance" value={gbp(ni, 0)} note={`${gbp(ni / 12, 0)} a month · ${pct(dRate)} of pay`} color="#e11d48" />
          <StatCard label="Take-home after NI" value={gbp(takeHomeAfterNI, 0)} note="Before income tax" color="#16a34a" />
        </div>
        <RowsTable title="How it is calculated" rows={[
          { label: "8% on earnings £12,570 – £50,270", value: gbp(main, 0) },
          { label: "2% on earnings above £50,270", value: gbp(upper, 0) },
          { label: "Total National Insurance", value: gbp(ni, 0), strong: true },
        ]} />
        <ShareSaveBar color={NI_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={Scale} title="What if you earned more?" sub="See how a pay rise changes your National Insurance" from="#065f46" to="#059669">
          <div className="rounded-2xl border border-line p-5">
            <h3 className="font-extrabold">Now against a 10% pay rise</h3>
            <p className="text-sm text-muted mb-3">Yearly amounts in pounds</p>
            <BarCompare color={NI_COLOR} aLabel="Now" bLabel="With a 10% rise" rows={[{ label: "National Insurance", a: ni, b: moreNI }]} />
            <div className="flex justify-center gap-6 text-sm mt-1">
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: NI_COLOR }} /> Now</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: "#f59e0b" }} /> With a 10% rise</span>
            </div>
          </div>
        </Section>
        <Section icon={PieChart} title="Where your pay goes" sub="Take-home after NI against National Insurance" from="#0e7490" to="#0891b2">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[{ label: "Take-home after NI", value: takeHomeAfterNI, color: "#16a34a" }, { label: "National Insurance", value: ni, color: "#e11d48" }]} />
            <div className="space-y-4">
              <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
                <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                  <li>National Insurance takes <b className="text-ink">{pct(dRate)}</b> of your gross pay.</li>
                  <li>You pay 8% between £12,570 and £50,270, then 2% above that.</li>
                  <li>NI stops once you reach State Pension age.</li>
                </ul></div>
            </div>
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="National Insurance Calculator" subtitle="Work out your employee Class 1 National Insurance contributions for the 2026/27 tax year." />
      <RunCard icon={ShieldCheck} from="#047857" to="#059669" formTitle="Your earnings" formSub="Tell us your gross pay" submitLabel="Calculate" onSubmit={submit}
        form={<NumField label="Gross annual earnings" value={gross} onChange={setGross} step={500} />}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="ni-calculator" color={NI_COLOR} from="#1f3b38" to="#345a55" title="Understanding National Insurance"
        points={["Employee Class 1 National Insurance", "8% and 2% band breakdown", "Effect of a pay rise on your NI", "Where your pay goes at a glance"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "see your tax by band" },
          { href: toolHref("after-tax"), label: "After-tax salary", sub: "net pay from gross" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* After Tax Salary Calculator                                            */
/* ---------------------------------------------------------------------- */
const AFTER_COLOR = "#d97706";
const FREQ = { year: 1, month: 12, week: 52, day: 260 } as const;
type Freq = keyof typeof FREQ;

export function AfterTaxPro() {
  const [amount, setAmount] = useState(0);
  const [freq, setFreq] = useState<Freq>("year");
  const [region, setRegion] = useState<Region>("england");
  const [pension, setPension] = useState(0);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const [snap, setSnap] = useState<{ r: ReturnType<typeof calcSalary>; region: Region } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const gross = amount * FREQ[freq];
    setSnap({ r: calcSalary({ gross, region, pensionPct: pension, plan }), region });
  };

  let results: React.ReactNode = <EmptyResults icon={Banknote} color={AFTER_COLOR} label="Calculate" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const { r } = snap;
    const kept = r.gross > 0 ? (r.net / r.gross) * 100 : 0;
    const deductions = r.incomeTax + r.ni + r.pension + r.studentLoan;
    const other = calcSalary({ gross: r.gross, region: snap.region === "scotland" ? "england" : "scotland", pensionPct: pension, plan });
    const summaryText = `After-tax summary (2026/27): gross ${gbp(r.gross, 0)}, take-home ${gbp(r.net, 0)} a year (${pct(kept)} kept).`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your after-tax salary</h2>
          <p className="text-muted mt-1">Tax year 2026/27 · {snap.region === "scotland" ? "Scotland" : "England, Wales & NI"}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Gross pay" value={gbp(r.gross, 0)} note="Yearly income" color="#64748b" />
          <StatCard label="After-tax salary" value={gbp(r.net, 0)} note={`${gbp(r.net / 12, 0)} a month · you keep ${pct(kept)}`} color="#16a34a" />
          <StatCard label="Total deductions" value={gbp(deductions, 0)} note={`${pct(r.gross > 0 ? (deductions / r.gross) * 100 : 0)} of your pay`} color="#e11d48" />
        </div>
        <RowsTable title="Deductions" rows={[
          { label: "Income tax", value: gbp(r.incomeTax, 0) },
          { label: "National Insurance", value: gbp(r.ni, 0) },
          { label: "Pension", value: gbp(r.pension, 0) },
          { label: "Student loan", value: gbp(r.studentLoan, 0) },
          { label: "Take-home pay", value: gbp(r.net, 0), strong: true },
        ]} />
        <ShareSaveBar color={AFTER_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={Globe2} title="England vs Scotland" sub="Same pay, different tax rules" from="#0284c7" to="#38bdf8">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={AFTER_COLOR} aLabel={snap.region === "scotland" ? "Scotland" : "England, Wales & NI"} bLabel={snap.region === "scotland" ? "England, Wales & NI" : "Scotland"}
              rows={[{ label: "Take-home pay", a: r.net, b: other.net }, { label: "Income tax", a: r.incomeTax, b: other.incomeTax }]} />
          </div>
        </Section>
        <Section icon={PieChart} title="Where your pay goes" sub="A visual split of your yearly pay" from="#155e75" to="#0f766e">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Take-home pay", value: r.net, color: "#16a34a" }, { label: "Income tax", value: r.incomeTax, color: "#e11d48" },
              { label: "National Insurance", value: r.ni, color: "#0284c7" }, { label: "Pension", value: r.pension, color: "#7c3aed" },
              { label: "Student loan", value: r.studentLoan, color: "#d97706" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>You keep <b className="text-ink">{pct(kept)}</b> of your pay.</li>
                <li>Tax and National Insurance take <b className="text-ink">{pct(r.gross > 0 ? ((r.incomeTax + r.ni) / r.gross) * 100 : 0)}</b>.</li>
              </ul></div>
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="After Tax Salary Calculator" subtitle="See your net salary after all deductions and the percentage of your pay you keep." />
      <RunCard icon={Banknote} from="#b45309" to="#f59e0b" formTitle="Your pay details" formSub="Tell us about your pay and situation" submitLabel="Calculate" onSubmit={submit}
        form={<>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <NumField label="Gross pay" value={amount} onChange={setAmount} step={100} />
            <SelectField label="Paid" value={freq} onChange={setFreq} options={[
              { value: "year", label: "A year" }, { value: "month", label: "A month" }, { value: "week", label: "A week" }, { value: "day", label: "A day" },
            ]} />
          </div>
          <SelectField label="Tax region" value={region} onChange={setRegion} options={REGIONS} />
          <NumField label="Pension contribution" value={pension} onChange={setPension} prefix="" suffix="%" step={0.5} />
          <SelectField label="Student loan" value={plan} onChange={setPlan} options={PLANS} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="after-tax" color={AFTER_COLOR} from="#3b2a12" to="#5a4522" title="Understanding after-tax pay"
        points={["Income tax and National Insurance", "Pension contributions before tax", "Student loan plans 1, 2, 4, 5 and postgraduate", "England, Wales, NI and Scotland"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "the full breakdown" },
          { href: toolHref("gross-salary-calculator"), label: "Gross salary calculator", sub: "work backwards from net pay" },
          { href: toolHref("ni-calculator"), label: "National Insurance calculator", sub: "NI on its own" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Gross Salary Calculator (net → gross)                                  */
/* ---------------------------------------------------------------------- */
const GROSS_COLOR = "#7c3aed";

export function GrossSalaryCalculatorPro() {
  const [net, setNet] = useState(0);
  const [region, setRegion] = useState<Region>("england");
  const [pension, setPension] = useState(0);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const [snap, setSnap] = useState<{ net: number; region: Region; pension: number; plan: StudentPlan } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ net, region, pension, plan }); };

  let results: React.ReactNode = <EmptyResults icon={Repeat} color={GROSS_COLOR} label="Calculate" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const gross = grossFromNet(snap.net, snap.region, snap.pension, snap.plan);
    const r = calcSalary({ gross, region: snap.region, pensionPct: snap.pension, plan: snap.plan });
    const deductions = r.incomeTax + r.ni + r.pension + r.studentLoan;
    const other = grossFromNet(snap.net, snap.region === "scotland" ? "england" : "scotland", snap.pension, snap.plan);
    const summaryText = `Gross salary summary (2026/27): to take home ${gbp(snap.net, 0)} a year you need a gross salary of about ${gbp(gross, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">The gross salary you need</h2>
          <p className="text-muted mt-1">Tax year 2026/27 · {snap.region === "scotland" ? "Scotland" : "England, Wales & NI"}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Target take-home" value={gbp(snap.net, 0)} note="What you want to keep" color="#64748b" />
          <StatCard label="Gross salary needed" value={gbp(gross, 0)} note={`${gbp(gross / 12, 0)} a month`} color="#7c3aed" />
          <StatCard label="Total deductions" value={gbp(deductions, 0)} note={`${pct(gross > 0 ? (deductions / gross) * 100 : 0)} of gross`} color="#e11d48" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Income tax", value: gbp(r.incomeTax, 0) },
          { label: "National Insurance", value: gbp(r.ni, 0) },
          { label: "Pension", value: gbp(r.pension, 0) },
          { label: "Student loan", value: gbp(r.studentLoan, 0) },
          { label: "Net pay", value: gbp(r.net, 0), strong: true },
        ]} />
        <ShareSaveBar color={GROSS_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <Section icon={Globe2} title="England vs Scotland" sub="The gross salary you would need in each region" from="#5b21b6" to="#8b5cf6">
        <div className="rounded-2xl border border-line p-5">
          <BarCompare color={GROSS_COLOR} aLabel={snap.region === "scotland" ? "Scotland" : "England, Wales & NI"} bLabel={snap.region === "scotland" ? "England, Wales & NI" : "Scotland"}
            rows={[{ label: "Gross salary needed", a: gross, b: other }]} />
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Gross Salary Calculator" subtitle="Know the take-home pay you want? Find the gross salary you need to earn for it." />
      <RunCard icon={Repeat} from="#6d28d9" to="#a78bfa" formTitle="Your target pay" formSub="Tell us the take-home pay you want" submitLabel="Calculate" onSubmit={submit}
        form={<>
          <NumField label="Desired annual take-home pay" value={net} onChange={setNet} step={500} />
          <SelectField label="Tax region" value={region} onChange={setRegion} options={REGIONS} />
          <NumField label="Pension contribution" value={pension} onChange={setPension} prefix="" suffix="%" step={0.5} />
          <SelectField label="Student loan" value={plan} onChange={setPlan} options={PLANS} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="gross-salary-calculator" color={GROSS_COLOR} from="#2e1065" to="#4c1d95" title="Understanding gross salary"
        points={["Works backwards from take-home pay", "Income tax and National Insurance", "Pension contributions and student loan", "England, Wales, NI and Scotland"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "gross to net" },
          { href: toolHref("after-tax"), label: "After-tax salary", sub: "net from gross" },
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "tax by band" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Tax Code Checker                                                        */
/* ---------------------------------------------------------------------- */
const CODE_COLOR = "#0891b2";

export function TaxCodeCheckerPro() {
  const [code, setCode] = useState("");
  const [snap, setSnap] = useState<string | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap(code); };

  let results: React.ReactNode = <EmptyResults icon={Search} color={CODE_COLOR} label="Check code" />;
  let extra: React.ReactNode = null;
  if (snap !== null) {
    const r = parseTaxCode(snap);
    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">{r.valid ? snap.trim().toUpperCase() : "Not a valid code"}</h2>
          <p className="text-muted mt-1">{r.meaning}</p>
        </div>
        {r.valid && (
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Region" value={r.region} note="Based on the code prefix" color="#64748b" />
            <StatCard label="Annual tax-free amount" value={gbp(r.allowance, 0)} note="Personal Allowance" color={CODE_COLOR} />
            <StatCard label="Monthly" value={gbp(r.allowance / 12, 0)} note="Spread over 12 months" color="#16a34a" />
          </div>
        )}
      </div>
    );
    extra = (
      <Accordion icon={Target} title="Common tax codes" sub="What the most frequent codes mean" color={CODE_COLOR}>
        <RowsTable rows={[
          { label: "1257L — standard Personal Allowance", value: gbp(12570, 0) },
          { label: "BR — all income at 20%", value: "£0" },
          { label: "D0 — all income at 40%", value: "£0" },
          { label: "D1 — all income at 45%", value: "£0" },
          { label: "NT — no tax deducted", value: "£0" },
          { label: "K codes — extra income added to your tax", value: "varies" },
        ]} />
      </Accordion>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Tax Code Checker" subtitle="Enter your tax code to understand your tax-free allowance and what it means." />
      <RunCard icon={Search} from="#0e7490" to="#22d3ee" formTitle="Your tax code" formSub="Type it exactly as it appears on your payslip" submitLabel="Check code" onSubmit={submit}
        form={<label className="block"><span className="label">Tax code</span>
          <input className="field uppercase" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. 1257L, S1257L, BR" /></label>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="tax-code-checker" color={CODE_COLOR} from="#083344" to="#155e75" title="Understanding tax codes"
        points={["Standard, BR, D0, D1 and NT codes", "K codes that add to your taxable income", "Scotland (S) and Wales (C) prefixes", "M and N Marriage Allowance suffixes"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "see your full breakdown" },
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "tax by band" },
          { href: toolHref("marriage-allowance-calculator"), label: "Marriage Allowance calculator", sub: "check eligibility" },
        ]}
        sources={[{ label: "GOV.UK: Tax codes explained", href: "https://www.gov.uk/tax-codes" }]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Pro Rata Calculator                                                     */
/* ---------------------------------------------------------------------- */
const PRO_RATA_COLOR = "#dc2626";

export function ProRataCalculatorPro() {
  const [salary, setSalary] = useState(0);
  const [fullDays, setFullDays] = useState(5);
  const [myDays, setMyDays] = useState(0);
  const [snap, setSnap] = useState<{ salary: number; fullDays: number; myDays: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ salary, fullDays, myDays }); };

  let results: React.ReactNode = <EmptyResults icon={Clock} color={PRO_RATA_COLOR} label="Calculate" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const share = snap.fullDays > 0 ? snap.myDays / snap.fullDays : 0;
    const annual = snap.salary * share;
    const foregone = snap.salary - annual;
    const days = (snap.fullDays || 5) * 52;
    const periods: [string, number][] = [["Yearly", 1], ["Monthly", 12], ["Weekly", 52], ["Daily", days]];

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your pro rata salary</h2>
          <p className="text-muted mt-1">{snap.myDays} of {snap.fullDays} full-time days a week</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Full-time salary" value={gbp(snap.salary, 0)} note="100% equivalent" color="#64748b" />
          <StatCard label="Pro rata salary" value={gbp(annual, 0)} note={`${pct(share * 100)} of full-time`} color={PRO_RATA_COLOR} />
          <StatCard label="Monthly" value={gbp(annual / 12, 0)} note={`${gbp(annual / 52, 0)} a week`} color="#16a34a" />
        </div>
        <RowsTable title="By pay period" rows={periods.map(([n, d]) => ({ label: n, value: gbp(annual / d, 0) }))} />
      </div>
    );

    extra = (
      <Section icon={PieChart} title="Full-time against pro rata" sub="What you're paid compared to the full-time equivalent" from="#991b1b" to="#dc2626">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <PieChartSvg parts={[{ label: "Your pro rata pay", value: annual, color: PRO_RATA_COLOR }, { label: "Foregone (part-time gap)", value: foregone, color: "#64748b" }]} />
          <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
            <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
              <li>You are paid <b className="text-ink">{pct(share * 100)}</b> of the full-time salary.</li>
              <li>That's <b className="text-ink">{gbp(annual, 0)}</b> a year against a full-time {gbp(snap.salary, 0)}.</li>
            </ul></div>
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Pro Rata Calculator" subtitle="Convert a full-time salary into your pro rata salary based on the days you work." />
      <RunCard icon={Clock} from="#b91c1c" to="#f87171" formTitle="Your working pattern" formSub="Tell us your days and full-time salary" submitLabel="Calculate" onSubmit={submit}
        form={<>
          <NumField label="Full-time annual salary" value={salary} onChange={setSalary} step={500} />
          <NumField label="Full-time days per week" value={fullDays} onChange={setFullDays} prefix="" step={0.5} />
          <NumField label="Days you work per week" value={myDays} onChange={setMyDays} prefix="" step={0.5} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="pro-rata-calculator" color={PRO_RATA_COLOR} from="#450a0a" to="#7f1d1d" title="Understanding pro rata pay"
        points={["Scales a full-time salary by days worked", "Yearly, monthly, weekly and daily figures", "Useful for part-time and flexible contracts"]}
        more={[
          { href: toolHref("hourly-to-yearly"), label: "Hourly to yearly", sub: "convert an hourly wage" },
          { href: toolHref("salary-to-hourly"), label: "Salary to hourly", sub: "find your hourly rate" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "after tax and NI" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Marriage Allowance Calculator                                           */
/* ---------------------------------------------------------------------- */
const MARRIAGE_COLOR = "#c026d3";

export function MarriageAllowanceCalculatorPro() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [snap, setSnap] = useState<{ a: number; b: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ a, b }); };

  let results: React.ReactNode = <EmptyResults icon={HeartHandshake} color={MARRIAGE_COLOR} label="Check eligibility" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const donor = Math.min(snap.a, snap.b) <= 12570 ? Math.min(snap.a, snap.b) : null;
    const recipient = donor === null ? null : (donor === snap.a ? snap.b : snap.a);
    const ok = donor !== null && recipient !== null && recipient > 12570 && recipient <= 50270;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">{ok ? "You could be eligible" : "Probably not eligible"}</h2>
          <p className="text-muted mt-1">{ok ? `Transfer ${gbp(MARRIAGE.transfer, 0)} of Personal Allowance to the higher earner.` : "One partner must earn £12,570 or less, and the other between £12,571 and £50,270."}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Amount transferable" value={gbp(MARRIAGE.transfer, 0)} note="Of Personal Allowance" color="#64748b" />
          <StatCard label="Max yearly saving" value={ok ? gbp(MARRIAGE.saving, 0) : "£0"} note="In income tax" color={MARRIAGE_COLOR} />
          <StatCard label="Backdating (4 years)" value={ok ? gbp(MARRIAGE.saving * 4, 0) : "£0"} note="If eligible in past years" color="#16a34a" />
        </div>
      </div>
    );
    extra = (
      <Accordion icon={Target} title="Eligibility rules" sub="Exactly what's required to qualify" color={MARRIAGE_COLOR}>
        <RowsTable rows={[
          { label: "Lower earner's income", value: `${gbp(0)} – ${gbp(12570, 0)}` },
          { label: "Higher earner's income", value: `${gbp(12571, 0)} – ${gbp(50270, 0)}` },
          { label: "Amount transferable", value: gbp(MARRIAGE.transfer, 0) },
          { label: "Maximum saving", value: gbp(MARRIAGE.saving, 0), strong: true },
        ]} />
      </Accordion>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Marriage Allowance Calculator" subtitle="Check whether you and your partner are eligible for Marriage Allowance and how much you could save." />
      <RunCard icon={HeartHandshake} from="#a21caf" to="#e879f9" formTitle="Your incomes" formSub="Enter both partners' annual income" submitLabel="Check eligibility" onSubmit={submit}
        form={<>
          <NumField label="Partner A annual income" value={a} onChange={setA} step={500} />
          <NumField label="Partner B annual income" value={b} onChange={setB} step={500} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="marriage-allowance-calculator" color={MARRIAGE_COLOR} from="#4a044e" to="#701a75" title="Understanding Marriage Allowance"
        points={["Transfers up to £1,260 of Personal Allowance", "Saves up to £252 a year in tax", "Can be backdated up to 4 years", "Available to married couples and civil partners"]}
        more={[
          { href: toolHref("tax-code-checker"), label: "Tax code checker", sub: "M and N code suffixes" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full tax breakdown" },
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "tax by band" },
        ]}
        sources={[{ label: "GOV.UK: Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" }]} />
    </div>
  );
}
