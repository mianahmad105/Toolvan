"use client";
import { useState } from "react";
import {
  BarChart3, CalendarDays, PiggyBank, PieChart, Scale, Timer, TrendingDown, TrendingUp,
} from "lucide-react";
import { calcCGT, gbp, pensionRelief } from "@/lib/tax";
import { toolHref } from "@/lib/tools";
import { NumField, SelectField } from "./ui";
import {
  BarCompare, EmptyResults, PageHero, PieChartSvg, RowsTable, RunCard,
  Section, ShareSaveBar, StatCard, Understanding,
} from "./proui";

const pct = (n: number) => `${isFinite(n) ? n.toFixed(1) : "0.0"}%`;

/* ---------------------------------------------------------------------- */
/* Overtime Pay Calculator                                                */
/* ---------------------------------------------------------------------- */
const OVERTIME_COLOR = "#ea580c";
const MULT_LABELS: Record<string, string> = {
  "1.25": "Time and a quarter", "1.5": "Time and a half", "2": "Double time", "2.5": "Double and a half",
};

export function OvertimePayCalculatorPro() {
  const [rate, setRate] = useState(0);
  const [hours, setHours] = useState(0);
  const [mult, setMult] = useState("1.5");
  const [snap, setSnap] = useState<{ rate: number; hours: number; mult: string } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ rate, hours, mult }); };

  let results: React.ReactNode = <EmptyResults icon={Timer} color={OVERTIME_COLOR} label="Calculate my overtime pay" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const multNum = Number(snap.mult);
    const multLabel = MULT_LABELS[snap.mult] ?? `${multNum}×`;
    const gross = snap.rate * multNum * snap.hours;
    const taxNI = gross * 0.28;
    const takeHome = gross - taxNI;
    const doubleGross = snap.rate * 2 * snap.hours;
    const summaryText = `Overtime pay summary: ${snap.hours} hours at ${gbp(snap.rate, 2)}/hr (${multLabel}) = ${gbp(gross, 0)} gross, about ${gbp(takeHome, 0)} take-home.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your overtime pay</h2>
          <p className="text-muted mt-1">{snap.hours} hours at {multLabel} · estimate based on a basic-rate taxpayer (~20% tax + 8% NI)</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Gross overtime pay" value={gbp(gross, 0)} note={`At ${multNum}× your normal rate`} color={OVERTIME_COLOR} />
          <StatCard label="Rate per overtime hour" value={gbp(snap.rate * multNum, 2)} note="Normal rate × multiplier" color="#0284c7" />
          <StatCard label="Estimated take-home" value={gbp(takeHome, 0)} note="After tax & NI estimate" color="#16a34a" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Tax & NI (est.)", value: gbp(taxNI, 0) },
          { label: "Estimated take-home", value: gbp(takeHome, 0) },
          { label: "Gross overtime", value: gbp(gross, 0), strong: true },
        ]} />
        <ShareSaveBar color={OVERTIME_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="Where your overtime pay goes" sub="Take-home pay against the estimated tax and NI" from="#9a3412" to="#ea580c">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Estimated take-home", value: takeHome, color: "#16a34a" },
              { label: "Tax & NI (est.)", value: taxNI, color: "#e11d48" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>You keep about <b className="text-ink">{pct(gross > 0 ? (takeHome / gross) * 100 : 0)}</b> of your overtime pay.</li>
                <li>This is an illustrative estimate — your actual tax depends on your total income for the year.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="Compare overtime multipliers" sub="See how much more double time would pay" from="#7c2d12" to="#c2410c">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={OVERTIME_COLOR} aLabel={multLabel} bLabel="Double time"
              rows={[{ label: "Gross overtime pay", a: gross, b: doubleGross }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Overtime Pay Calculator" subtitle="Work out your gross overtime pay and an estimated take-home for extra hours worked." />
      <RunCard icon={Timer} from="#c2410c" to="#fb923c" formTitle="Your overtime" formSub="Tell us your rate, hours and multiplier" submitLabel="Calculate my overtime pay" onSubmit={submit}
        form={<>
          <NumField label="Normal hourly rate" value={rate} onChange={setRate} step={0.5} />
          <NumField label="Overtime hours" value={hours} onChange={setHours} prefix="" step={0.5} />
          <SelectField label="Overtime multiplier" value={mult} onChange={setMult} options={[
            { value: "1.25", label: "Time and a quarter" }, { value: "1.5", label: "Time and a half" },
            { value: "2", label: "Double time" }, { value: "2.5", label: "Double and a half" },
          ]} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="overtime-pay-calculator" color={OVERTIME_COLOR} from="#431407" to="#7c2d12" title="Understanding overtime pay"
        points={["Gross overtime at any multiplier", "Time and a quarter, half, double and double-and-a-half", "Estimated take-home after tax and NI", "Compares your rate to double time"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
          { href: toolHref("hourly-to-yearly"), label: "Hourly to yearly", sub: "convert an hourly wage" },
          { href: toolHref("salary-to-hourly"), label: "Salary to hourly", sub: "find your hourly rate" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Pension Tax Relief Calculator                                          */
/* ---------------------------------------------------------------------- */
const PENSION_COLOR = "#0d9488";

export function PensionReliefCalculatorPro() {
  const [gross, setGross] = useState(0);
  const [contrib, setContrib] = useState(0);
  const [snap, setSnap] = useState<{ gross: number; contrib: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ gross, contrib }); };

  let results: React.ReactNode = <EmptyResults icon={PiggyBank} color={PENSION_COLOR} label="Work out my tax relief" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = pensionRelief(snap.gross, snap.contrib);
    const r2 = pensionRelief(snap.gross, snap.contrib * 2);
    const summaryText = `Pension tax relief summary: paying ${gbp(snap.contrib, 0)} attracts about ${gbp(r.totalRelief, 0)} in tax relief, taking your pot to ${gbp(r.grossContribution, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your pension tax relief</h2>
          <p className="text-muted mt-1">Relief-at-source contribution · marginal rate {(r.rate * 100).toFixed(0)}%</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Your payment" value={gbp(snap.contrib, 0)} note="Net, relief at source" color={PENSION_COLOR} />
          <StatCard label="Total tax relief" value={gbp(r.totalRelief, 0)} note={`Marginal rate ${(r.rate * 100).toFixed(0)}%`} color="#16a34a" />
          <StatCard label="Total in pension pot" value={gbp(r.grossContribution, 0)} note="Payment + all tax relief" color="#7c3aed" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Basic-rate relief (20%)", value: gbp(r.basicRelief, 0) },
          { label: "Extra relief to claim via Self Assessment", value: gbp(r.extraClaim, 0) },
          { label: "Total in pension pot", value: gbp(r.grossContribution, 0), strong: true },
        ]} />
        <ShareSaveBar color={PENSION_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="Where your pension pot comes from" sub="Your own payment against the tax relief added" from="#115e59" to="#0d9488">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Your payment", value: snap.contrib, color: "#0d9488" },
              { label: "Tax relief added", value: r.totalRelief, color: "#16a34a" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>For every £80 you pay in, the government tops it up to £100 in basic-rate relief.</li>
                <li>Higher and additional rate taxpayers must claim the extra relief via Self Assessment.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="Double your contribution" sub="How much more relief you'd get on double the payment" from="#134e4a" to="#0f766e">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={PENSION_COLOR} aLabel="Now" bLabel="Double contribution"
              rows={[{ label: "Total tax relief", a: r.totalRelief, b: r2.totalRelief }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Pension Tax Relief Calculator" subtitle="See how much tax relief is added to a relief-at-source pension contribution." />
      <RunCard icon={PiggyBank} from="#0f766e" to="#14b8a6" formTitle="Your pension contribution" formSub="Tell us your salary and pension payment" submitLabel="Work out my tax relief" onSubmit={submit}
        form={<>
          <NumField label="Gross annual salary" value={gross} onChange={setGross} step={500} />
          <NumField label="Your pension payment (net, relief at source)" value={contrib} onChange={setContrib} step={50} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="pension-tax-relief-calculator" color={PENSION_COLOR} from="#042f2e" to="#115e59" title="Understanding pension tax relief"
        points={["Basic, higher and additional rate relief", "Relief-at-source contributions", "Extra relief claimed via Self Assessment", "Total added to your pension pot"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "tax by band" },
          { href: toolHref("savings-interest-calculator"), label: "Savings interest calculator", sub: "compound growth" },
        ]}
        sources={[{ label: "GOV.UK: Tax on your private pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension" }]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Hourly to Yearly Salary                                                */
/* ---------------------------------------------------------------------- */
const H2Y_COLOR = "#0284c7";

export function HourlyToYearlyPro() {
  const [rate, setRate] = useState(0);
  const [hrs, setHrs] = useState(37.5);
  const [wks, setWks] = useState(52);
  const [snap, setSnap] = useState<{ rate: number; hrs: number; wks: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ rate, hrs, wks }); };

  let results: React.ReactNode = <EmptyResults icon={TrendingUp} color={H2Y_COLOR} label="Convert to yearly salary" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const annual = snap.rate * snap.hrs * snap.wks;
    const days = (snap.hrs / 7.5) * snap.wks || 260;
    const moreAnnual = (snap.rate + 1) * snap.hrs * snap.wks;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your annual salary</h2>
          <p className="text-muted mt-1">{gbp(snap.rate, 2)}/hr · {snap.hrs} hours a week for {snap.wks} weeks a year</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Yearly" value={gbp(annual, 0)} note="Before tax" color={H2Y_COLOR} />
          <StatCard label="Monthly" value={gbp(annual / 12, 0)} note="Before tax" color="#7c3aed" />
          <StatCard label="Weekly" value={gbp(annual / 52, 0)} note="Before tax" color="#16a34a" />
        </div>
        <RowsTable title="By pay period" rows={[
          { label: "Yearly", value: gbp(annual, 0) },
          { label: "Monthly", value: gbp(annual / 12, 0) },
          { label: "Weekly", value: gbp(annual / 52, 0) },
          { label: "Daily", value: gbp(annual / days, 0) },
        ]} />
      </div>
    );

    extra = (
      <Section icon={Scale} title="What if you earned £1 more an hour?" sub="See the effect on your annual salary" from="#075985" to="#0369a1">
        <div className="rounded-2xl border border-line p-5">
          <BarCompare color={H2Y_COLOR} aLabel="Now" bLabel="£1/hr more" rows={[{ label: "Annual salary", a: annual, b: moreAnnual }]} />
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Hourly to Yearly Salary" subtitle="Convert an hourly wage into weekly, monthly and annual salary." />
      <RunCard icon={TrendingUp} from="#0369a1" to="#38bdf8" formTitle="Your hourly pay" formSub="Tell us your rate and hours" submitLabel="Convert to yearly salary" onSubmit={submit}
        form={<>
          <NumField label="Hourly rate" value={rate} onChange={setRate} step={0.25} />
          <NumField label="Hours per week" value={hrs} onChange={setHrs} prefix="" step={0.5} />
          <NumField label="Weeks per year" value={wks} onChange={setWks} prefix="" step={1} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="hourly-to-yearly" color={H2Y_COLOR} from="#0c4a6e" to="#075985" title="Understanding hourly to yearly pay"
        points={["Yearly, monthly and weekly equivalents", "Adjusts for your actual hours and weeks worked", "See the effect of a £1/hr pay rise"]}
        more={[
          { href: toolHref("salary-to-hourly"), label: "Salary to hourly", sub: "the reverse conversion" },
          { href: toolHref("pro-rata-calculator"), label: "Pro rata calculator", sub: "part-time salary" },
          { href: toolHref("daily-rate-to-annual-salary"), label: "Daily rate to annual salary", sub: "for contractors" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Salary to Hourly                                                       */
/* ---------------------------------------------------------------------- */
const S2H_COLOR = "#9333ea";

export function SalaryToHourlyPro() {
  const [salary, setSalary] = useState(0);
  const [hrs, setHrs] = useState(37.5);
  const [wks, setWks] = useState(52);
  const [snap, setSnap] = useState<{ salary: number; hrs: number; wks: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ salary, hrs, wks }); };

  let results: React.ReactNode = <EmptyResults icon={TrendingDown} color={S2H_COLOR} label="Convert to hourly rate" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const hourly = snap.salary / (snap.hrs * snap.wks || 1);
    const fourDayHourly = snap.salary / ((snap.hrs * 0.8) * snap.wks || 1);

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your hourly rate</h2>
          <p className="text-muted mt-1">{gbp(snap.salary, 0)} a year · {snap.hrs} hours a week for {snap.wks} weeks a year</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Annual salary" value={gbp(snap.salary, 0)} note="Before tax" color={S2H_COLOR} />
          <StatCard label="Hourly rate" value={gbp(hourly, 2)} note="Before tax" color="#16a34a" />
          <StatCard label="Weekly pay" value={gbp(hourly * snap.hrs, 0)} note="Before tax" color="#0284c7" />
        </div>
        <RowsTable title="By pay period" rows={[
          { label: "Annual", value: gbp(snap.salary, 0) },
          { label: "Weekly", value: gbp(hourly * snap.hrs, 0) },
          { label: "Hourly", value: gbp(hourly, 2) },
          { label: "Daily", value: gbp(hourly * (snap.hrs / 5), 0) },
        ]} />
      </div>
    );

    extra = (
      <Section icon={Scale} title="What if you worked a 4-day week?" sub="Same salary, fewer hours — see the effect on your hourly rate" from="#6b21a8" to="#7e22ce">
        <div className="rounded-2xl border border-line p-5">
          <BarCompare color={S2H_COLOR} aLabel="5-day week" bLabel="4-day week (same salary)" rows={[{ label: "Hourly rate", a: hourly, b: fourDayHourly }]} />
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Salary to Hourly" subtitle="Convert an annual salary into the hourly rate you actually earn." />
      <RunCard icon={TrendingDown} from="#7e22ce" to="#c084fc" formTitle="Your salary" formSub="Tell us your salary and hours" submitLabel="Convert to hourly rate" onSubmit={submit}
        form={<>
          <NumField label="Annual salary" value={salary} onChange={setSalary} step={500} />
          <NumField label="Hours per week" value={hrs} onChange={setHrs} prefix="" step={0.5} />
          <NumField label="Weeks per year" value={wks} onChange={setWks} prefix="" step={1} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="salary-to-hourly" color={S2H_COLOR} from="#3b0764" to="#581c87" title="Understanding salary to hourly pay"
        points={["Works out your true hourly rate from a salary", "Adjusts for your actual hours and weeks worked", "Compares a 5-day and a 4-day working week"]}
        more={[
          { href: toolHref("hourly-to-yearly"), label: "Hourly to yearly", sub: "the reverse conversion" },
          { href: toolHref("pro-rata-calculator"), label: "Pro rata calculator", sub: "part-time salary" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "after tax and NI" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Daily Rate to Annual Salary                                            */
/* ---------------------------------------------------------------------- */
const D2A_COLOR = "#16a34a";

export function DailyRateToAnnualPro() {
  const [day, setDay] = useState(0);
  const [days, setDays] = useState(220);
  const [snap, setSnap] = useState<{ day: number; days: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ day, days }); };

  let results: React.ReactNode = <EmptyResults icon={CalendarDays} color={D2A_COLOR} label="Convert to annual salary" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const annual = snap.day * snap.days;
    const at250 = snap.day * 250;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your annual earnings</h2>
          <p className="text-muted mt-1">{gbp(snap.day, 0)} a day · {snap.days} billable days a year</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Yearly" value={gbp(annual, 0)} note="Before tax" color={D2A_COLOR} />
          <StatCard label="Monthly" value={gbp(annual / 12, 0)} note="Before tax" color="#7c3aed" />
          <StatCard label="Weekly" value={gbp(annual / 52, 0)} note="Before tax" color="#0284c7" />
        </div>
        <RowsTable title="By pay period" rows={[
          { label: "Yearly", value: gbp(annual, 0) },
          { label: "Monthly", value: gbp(annual / 12, 0) },
          { label: "Weekly", value: gbp(annual / 52, 0) },
          { label: "Daily", value: gbp(snap.day, 0) },
        ]} />
      </div>
    );

    extra = (
      <Section icon={Scale} title="Working more days a year" sub="Your earnings now against 250 billable days a year" from="#166534" to="#15803d">
        <div className="rounded-2xl border border-line p-5">
          <BarCompare color={D2A_COLOR} aLabel="Your days" bLabel="250 days a year" rows={[{ label: "Annual earnings", a: annual, b: at250 }]} />
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Daily Rate to Annual Salary" subtitle="Turn a contractor day rate into an equivalent annual salary." />
      <RunCard icon={CalendarDays} from="#15803d" to="#4ade80" formTitle="Your day rate" formSub="Tell us your rate and days worked" submitLabel="Convert to annual salary" onSubmit={submit}
        form={<>
          <NumField label="Daily rate" value={day} onChange={setDay} step={25} />
          <NumField label="Days worked per year" value={days} onChange={setDays} prefix="" step={5} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="daily-rate-to-annual-salary" color={D2A_COLOR} from="#052e16" to="#14532d" title="Understanding daily rate to annual salary"
        points={["Converts a contractor day rate to a yearly figure", "Yearly, monthly and weekly equivalents", "Compares your billable days to 250 days a year"]}
        more={[
          { href: toolHref("hourly-to-yearly"), label: "Hourly to yearly", sub: "convert an hourly wage" },
          { href: toolHref("salary-to-hourly"), label: "Salary to hourly", sub: "find your hourly rate" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "after tax and NI" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Capital Gains Tax Calculator                                           */
/* ---------------------------------------------------------------------- */
const CGT_COLOR = "#4f46e5";

export function CGTCalculatorPro() {
  const [gain, setGain] = useState(0);
  const [income, setIncome] = useState(0);
  const [snap, setSnap] = useState<{ gain: number; income: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ gain, income }); };

  let results: React.ReactNode = <EmptyResults icon={BarChart3} color={CGT_COLOR} label="Work out my CGT" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = calcCGT(snap.gain, snap.income, "shares");
    const bigger = calcCGT(snap.gain * 1.5, snap.income, "shares");
    const summaryText = `Capital Gains Tax summary (2026/27): gain ${gbp(snap.gain, 0)}, tax due ${gbp(r.tax, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Capital Gains Tax</h2>
          <p className="text-muted mt-1">Tax year 2026/27 · 18% basic rate, 24% higher rate</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Taxable gain" value={gbp(r.taxableGain, 0)} note="After annual exemption" color={CGT_COLOR} />
          <StatCard label="Tax at 18%" value={gbp(r.atBasic, 0)} note="Basic-rate portion" color="#0284c7" />
          <StatCard label="Tax at 24%" value={gbp(r.atHigher, 0)} note="Higher-rate portion" color="#d97706" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Annual exempt amount", value: gbp(r.exempt, 0) },
          { label: "Taxable gain", value: gbp(r.taxableGain, 0) },
          { label: "Tax at 18%", value: gbp(r.atBasic, 0) },
          { label: "Tax at 24%", value: gbp(r.atHigher, 0) },
          { label: "Total Capital Gains Tax due", value: gbp(r.tax, 0), strong: true },
        ]} />
        <ShareSaveBar color={CGT_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="How your gain is taxed" sub="Tax-free, basic-rate and higher-rate portions" from="#3730a3" to="#4f46e5">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Tax-free (annual exemption)", value: r.exempt, color: "#64748b" },
              { label: "Taxed at 18%", value: r.atBasic, color: "#0284c7" },
              { label: "Taxed at 24%", value: r.atHigher, color: "#d97706" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>The first <b className="text-ink">{gbp(r.exempt, 0)}</b> of any gain is tax-free every year.</li>
                <li>Which rate applies depends on your other taxable income, not just the gain itself.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="What if your gain were 50% bigger?" sub="See how the tax bill changes on a larger gain" from="#312e81" to="#4338ca">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={CGT_COLOR} aLabel="Your gain" bLabel="50% bigger gain" rows={[{ label: "Capital Gains Tax due", a: r.tax, b: bigger.tax }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Capital Gains Tax Calculator" subtitle="Estimate the Capital Gains Tax due when you sell shares or other assets." />
      <RunCard icon={BarChart3} from="#4338ca" to="#818cf8" formTitle="Your gain" formSub="Tell us your gain and taxable income" submitLabel="Work out my CGT" onSubmit={submit}
        form={<>
          <NumField label="Total capital gain" value={gain} onChange={setGain} step={500} />
          <NumField label="Your taxable income" value={income} onChange={setIncome} step={500} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="capital-gains-tax-calculator" color={CGT_COLOR} from="#1e1b4b" to="#312e81" title="Understanding Capital Gains Tax"
        points={["Annual exempt amount for 2026/27", "18% basic rate, 24% higher rate on shares", "How your other income affects the rate", "Effect of a bigger gain on your tax bill"]}
        more={[
          { href: toolHref("income-tax-calculator"), label: "Income tax calculator", sub: "tax by band" },
          { href: toolHref("savings-interest-calculator"), label: "Savings interest calculator", sub: "compound growth" },
          { href: toolHref("inheritance-tax-calculator"), label: "Inheritance tax calculator", sub: "estate tax" },
        ]}
        sources={[{ label: "GOV.UK: Capital Gains Tax rates and allowances", href: "https://www.gov.uk/capital-gains-tax/rates" }]} />
    </div>
  );
}
