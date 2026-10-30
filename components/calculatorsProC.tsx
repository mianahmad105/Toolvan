"use client";
import { useState } from "react";
import { Car, Coins, CreditCard, Home, Landmark, PieChart, Scale } from "lucide-react";
import { gbp } from "@/lib/tax";
import { inheritanceTax, loanRepayment, savingsGrowth, stampDuty, vehicleTax, type BuyerType } from "@/lib/tax2";
import { toolHref } from "@/lib/tools";
import { NumField, SelectField } from "./ui";
import {
  Accordion, BarCompare, EmptyResults, PageHero, PieChartSvg, RowsTable, RunCard,
  Section, ShareSaveBar, StatCard, Understanding,
} from "./proui";

const pct = (n: number) => `${isFinite(n) ? n.toFixed(1) : "0.0"}%`;

/* ---------------------------------------------------------------------- */
/* Stamp Duty Calculator                                                   */
/* ---------------------------------------------------------------------- */
const STAMP_COLOR = "#1d4ed8";
const BAND_COLORS = ["#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#0ea5e9"];

export function StampDutyCalculatorPro() {
  const [price, setPrice] = useState(0);
  const [buyer, setBuyer] = useState<BuyerType>("standard");
  const [snap, setSnap] = useState<{ price: number; buyer: BuyerType } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ price, buyer }); };

  let results: React.ReactNode = <EmptyResults icon={Home} color={STAMP_COLOR} label="Calculate my Stamp Duty" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = stampDuty(snap.price, snap.buyer);
    const standardTotal = stampDuty(snap.price, "standard").total;
    const firstTotal = stampDuty(snap.price, "first").total;
    const summaryText = `Stamp Duty summary: property price ${gbp(snap.price, 0)}, Stamp Duty due ${gbp(r.total, 0)} (effective rate ${r.effective.toFixed(2)}%).`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Stamp Duty</h2>
          <p className="text-muted mt-1">Stamp Duty Land Tax · England & Northern Ireland</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Property price" value={gbp(snap.price, 0)} note="Purchase price" color="#64748b" />
          <StatCard label="Stamp Duty due" value={gbp(r.total, 0)} note="Total payable" color={STAMP_COLOR} />
          <StatCard label="Effective rate" value={`${r.effective.toFixed(2)}%`} note="Of the property price" color="#16a34a" />
        </div>
        <RowsTable title="Band-by-band breakdown" rows={[
          ...r.rows.map((b) => ({ label: `${b.label} ${gbp(b.amount, 0)}`, value: gbp(b.tax, 0) })),
          ...(r.surcharge > 0 ? [{ label: "5% additional property surcharge", value: gbp(r.surcharge, 0) }] : []),
          { label: "Total Stamp Duty", value: gbp(r.total, 0), strong: true },
        ]} />
        <ShareSaveBar color={STAMP_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="Where your Stamp Duty comes from" sub="Tax contributed by each band" from="#1e3a8a" to="#3b82f6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              ...r.rows.map((b, i) => ({ label: b.label, value: b.tax, color: BAND_COLORS[i % BAND_COLORS.length] })),
              ...(r.surcharge > 0 ? [{ label: "Additional property surcharge", value: r.surcharge, color: "#e11d48" }] : []),
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>Your effective rate is <b className="text-ink">{r.effective.toFixed(2)}%</b> of the price.</li>
                <li>Stamp Duty is charged in bands, so only the amount in each band is taxed at that rate.</li>
                {r.surcharge > 0 && <li>The 5% additional property surcharge adds <b className="text-ink">{gbp(r.surcharge, 0)}</b>.</li>}
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="Standard buyer against first-time buyer" sub="Same price, different buyer relief" from="#1e40af" to="#2563eb">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={STAMP_COLOR} aLabel="Standard buyer" bLabel="First-time buyer" rows={[{ label: "Stamp Duty due", a: standardTotal, b: firstTotal }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Stamp Duty Calculator" subtitle="Calculate the Stamp Duty Land Tax due when buying a home in England or Northern Ireland." />
      <RunCard icon={Home} from="#1e40af" to="#3b82f6" formTitle="Your purchase" formSub="Tell us about the property you're buying" submitLabel="Calculate my Stamp Duty" onSubmit={submit}
        form={<>
          <NumField label="Property price" value={price} onChange={setPrice} step={5000} />
          <SelectField label="Buyer type" value={buyer} onChange={setBuyer} options={[
            { value: "standard", label: "Home mover / standard" },
            { value: "first", label: "First-time buyer" },
            { value: "additional", label: "Additional property" },
          ]} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="stamp-duty-calculator" color={STAMP_COLOR} from="#1e293b" to="#1e40af" title="Understanding Stamp Duty"
        points={["Band-by-band Stamp Duty Land Tax", "First-time buyer relief", "Additional property surcharge", "Effective rate on the purchase price"]}
        more={[
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
          { href: toolHref("gross-salary-calculator"), label: "Gross salary calculator", sub: "work backwards from net pay" },
          { href: toolHref("loan-repayment-calculator"), label: "Loan repayment calculator", sub: "work out mortgage-style repayments" },
        ]}
        sources={[
          { label: "GOV.UK: Stamp Duty Land Tax rates", href: "https://www.gov.uk/stamp-duty-land-tax" },
          { label: "GOV.UK: SDLT relief for first-time buyers", href: "https://www.gov.uk/stamp-duty-land-tax/relief-for-first-time-buyers" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Inheritance Tax Calculator                                              */
/* ---------------------------------------------------------------------- */
const IHT_COLOR = "#e11d48";

export function InheritanceTaxCalculatorPro() {
  const [estate, setEstate] = useState(0);
  const [home, setHome] = useState(0);
  const [transferPct, setTransferPct] = useState(0);
  const [snap, setSnap] = useState<{ estate: number; home: number; transferPct: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ estate, home, transferPct }); };

  let results: React.ReactNode = <EmptyResults icon={Landmark} color={IHT_COLOR} label="Estimate the Inheritance Tax" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = inheritanceTax(snap.estate, snap.home, snap.transferPct);
    const withTransfer = inheritanceTax(snap.estate, snap.home, 100).tax;
    const withoutTransfer = inheritanceTax(snap.estate, snap.home, 0).tax;
    const summaryText = `Inheritance Tax summary: estate value ${gbp(snap.estate, 0)}, taxable estate ${gbp(r.taxable, 0)}, Inheritance Tax due ${gbp(r.tax, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your Inheritance Tax</h2>
          <p className="text-muted mt-1">Charged at 40% on the value above your allowances</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Estate value" value={gbp(snap.estate, 0)} note="Total value of the estate" color="#64748b" />
          <StatCard label="Taxable estate" value={gbp(r.taxable, 0)} note="After nil-rate bands" color="#d97706" />
          <StatCard label="Inheritance Tax due" value={gbp(r.tax, 0)} note="At 40%" color={IHT_COLOR} />
        </div>
        <RowsTable title="How it is calculated" rows={[
          { label: "Nil-rate band", value: gbp(r.nrb, 0) },
          { label: "Residence nil-rate band", value: gbp(r.rnrb, 0) },
          { label: "Taxable estate", value: gbp(r.taxable, 0) },
          { label: "Inheritance Tax due", value: gbp(r.tax, 0), strong: true },
        ]} />
        <ShareSaveBar color={IHT_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="How your estate is covered" sub="Allowances against the taxable amount" from="#881337" to="#e11d48">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Covered by nil-rate band", value: Math.min(snap.estate, r.nrb), color: "#0284c7" },
              { label: "Covered by residence nil-rate band", value: r.rnrb, color: "#7c3aed" },
              { label: "Taxable estate", value: r.taxable, color: "#e11d48" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>Your nil-rate band covers <b className="text-ink">{gbp(Math.min(snap.estate, r.nrb), 0)}</b> tax-free.</li>
                <li>The residence nil-rate band covers a further <b className="text-ink">{gbp(r.rnrb, 0)}</b> when a home passes to children or grandchildren.</li>
                <li>Inheritance Tax is charged at 40% on the remaining <b className="text-ink">{gbp(r.taxable, 0)}</b>.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="Transferable spouse allowance" sub="Inheritance Tax with none of, and all of, a late spouse's unused allowance" from="#9f1239" to="#e11d48">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={IHT_COLOR} aLabel="No transfer (0%)" bLabel="Full transfer (100%)"
              rows={[{ label: "Inheritance Tax due", a: withoutTransfer, b: withTransfer }]} />
          </div>
          <p className="text-xs text-muted mt-3">You entered {snap.transferPct}% transferred, giving the {gbp(r.tax, 0)} result above — these two bars show the full range between 0% and 100%.</p>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Inheritance Tax Calculator" subtitle="Estimate the Inheritance Tax due on an estate, including the nil-rate and residence nil-rate bands." />
      <RunCard icon={Landmark} from="#9f1239" to="#e11d48" formTitle="The estate" formSub="Tell us about the estate and what's being left" submitLabel="Estimate the Inheritance Tax" onSubmit={submit}
        form={<>
          <NumField label="Total value of the estate" value={estate} onChange={setEstate} step={5000} />
          <NumField label="Home left to children or grandchildren" value={home} onChange={setHome} step={5000} />
          <div>
            <NumField label="Unused allowance from a late spouse" value={transferPct} onChange={(v) => setTransferPct(Math.max(0, Math.min(100, v)))} prefix="" suffix="%" step={5} />
            <p className="text-xs text-muted mt-1.5">0% if none, 100% if their entire nil-rate band was unused — it's often somewhere in between.</p>
          </div>
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="inheritance-tax-calculator" color={IHT_COLOR} from="#4c0519" to="#9f1239" title="Understanding Inheritance Tax"
        points={["Nil-rate and residence nil-rate bands", "40% tax on the taxable estate", "Transferable allowance from a late spouse", "How the home-to-children relief works"]}
        more={[
          { href: toolHref("capital-gains-tax-calculator"), label: "Capital Gains Tax calculator", sub: "tax on gains when selling assets" },
          { href: toolHref("savings-interest-calculator"), label: "Savings interest calculator", sub: "compound growth on savings" },
          { href: toolHref("stamp-duty-calculator"), label: "Stamp Duty calculator", sub: "tax when buying a home" },
        ]}
        sources={[
          { label: "GOV.UK: How Inheritance Tax works", href: "https://www.gov.uk/inheritance-tax" },
          { label: "GOV.UK: Residence nil-rate band", href: "https://www.gov.uk/guidance/inheritance-tax-additional-threshold-residence-nil-rate-band" },
        ]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Savings Interest Calculator                                             */
/* ---------------------------------------------------------------------- */
const SAVINGS_COLOR = "#b45309";

export function SavingsInterestCalculatorPro() {
  const [deposit, setDeposit] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [snap, setSnap] = useState<{ deposit: number; monthly: number; rate: number; years: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ deposit, monthly, rate, years }); };

  let results: React.ReactNode = <EmptyResults icon={Coins} color={SAVINGS_COLOR} label="Work out my savings growth" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = savingsGrowth(snap.deposit, snap.monthly, snap.rate, snap.years);
    const higher = savingsGrowth(snap.deposit, snap.monthly, snap.rate + 1, snap.years);
    const summaryText = `Savings summary: starting with ${gbp(snap.deposit, 0)} and saving ${gbp(snap.monthly, 0)} a month for ${snap.years} years at ${snap.rate}%, your final balance would be about ${gbp(r.balance, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your savings growth</h2>
          <p className="text-muted mt-1">Interest compounded monthly over {snap.years} years</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total paid in" value={gbp(r.paidIn, 0)} note="Deposit plus monthly saving" color="#64748b" />
          <StatCard label="Interest earned" value={gbp(r.interest, 0)} note={`At ${snap.rate}% a year`} color="#16a34a" />
          <StatCard label="Final balance" value={gbp(r.balance, 0)} note="After all deposits and interest" color={SAVINGS_COLOR} />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Total paid in", value: gbp(r.paidIn, 0) },
          { label: "Interest earned", value: gbp(r.interest, 0) },
          { label: "Final balance", value: gbp(r.balance, 0), strong: true },
        ]} />
        <ShareSaveBar color={SAVINGS_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="Where your balance comes from" sub="Money you paid in against interest earned" from="#78350f" to="#d97706">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Total paid in", value: r.paidIn, color: "#64748b" },
              { label: "Interest earned", value: r.interest, color: "#16a34a" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>Interest makes up <b className="text-ink">{pct(r.balance > 0 ? (r.interest / r.balance) * 100 : 0)}</b> of your final balance.</li>
                <li>You paid in <b className="text-ink">{gbp(r.paidIn, 0)}</b> over {snap.years} years.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="What if the rate were 1% higher?" sub="Same savings plan, a better interest rate" from="#92400e" to="#d97706">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={SAVINGS_COLOR} aLabel={`${snap.rate}%`} bLabel={`${snap.rate + 1}%`} rows={[{ label: "Final balance", a: r.balance, b: higher.balance }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Savings Interest Calculator" subtitle="See how a lump sum and monthly deposits grow with compound interest over time." />
      <RunCard icon={Coins} from="#92400e" to="#d97706" formTitle="Your savings plan" formSub="Tell us about your deposits and rate" submitLabel="Work out my savings growth" onSubmit={submit}
        form={<>
          <NumField label="Starting deposit" value={deposit} onChange={setDeposit} step={100} />
          <NumField label="Monthly deposit" value={monthly} onChange={setMonthly} step={10} />
          <NumField label="Annual interest rate" value={rate} onChange={setRate} prefix="" suffix="%" step={0.1} />
          <NumField label="Time saving" value={years} onChange={setYears} prefix="" suffix="years" step={0.5} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="savings-interest-calculator" color={SAVINGS_COLOR} from="#451a03" to="#92400e" title="Understanding savings interest"
        points={["Compound interest on a lump sum", "Regular monthly deposits", "Interest compounded monthly", "How a better rate changes your balance"]}
        more={[
          { href: toolHref("pension-tax-relief-calculator"), label: "Pension tax relief calculator", sub: "relief on pension contributions" },
          { href: toolHref("loan-repayment-calculator"), label: "Loan repayment calculator", sub: "monthly payments on a loan" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
        ]}
        sources={[{ label: "GOV.UK: Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" }]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Loan Repayment Calculator                                               */
/* ---------------------------------------------------------------------- */
const LOAN_COLOR = "#be123c";

export function LoanRepaymentCalculatorPro() {
  const [amount, setAmount] = useState(0);
  const [apr, setApr] = useState(0);
  const [years, setYears] = useState(0);
  const [snap, setSnap] = useState<{ amount: number; apr: number; years: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ amount, apr, years }); };

  let results: React.ReactNode = <EmptyResults icon={CreditCard} color={LOAN_COLOR} label="Calculate my repayments" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = loanRepayment(snap.amount, snap.apr, snap.years);
    const longer = loanRepayment(snap.amount, snap.apr, snap.years + 5);
    const summaryText = `Loan summary: borrowing ${gbp(snap.amount, 0)} at ${snap.apr}% APR over ${snap.years} years, the monthly repayment is about ${gbp(r.monthly, 0)}, with total interest of ${gbp(r.interest, 0)}.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your loan repayments</h2>
          <p className="text-muted mt-1">Over {snap.years} years at {snap.apr}% APR</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Amount borrowed" value={gbp(snap.amount, 0)} note="Loan principal" color="#64748b" />
          <StatCard label="Monthly repayment" value={gbp(r.monthly, 0)} note="Fixed each month" color={LOAN_COLOR} />
          <StatCard label="Total interest" value={gbp(r.interest, 0)} note="Over the full term" color="#d97706" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "Total to repay", value: gbp(r.total, 0) },
          { label: "Monthly repayment", value: gbp(r.monthly, 0), strong: true },
        ]} />
        <ShareSaveBar color={LOAN_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <>
        <Section icon={PieChart} title="Where your repayments go" sub="Amount borrowed against total interest" from="#881337" to="#be123c">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <PieChartSvg parts={[
              { label: "Amount borrowed", value: snap.amount, color: "#64748b" },
              { label: "Total interest", value: r.interest, color: "#e11d48" },
            ]} />
            <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
              <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                <li>Interest adds <b className="text-ink">{gbp(r.interest, 0)}</b> on top of what you borrowed.</li>
                <li>In total you repay <b className="text-ink">{gbp(r.total, 0)}</b>.</li>
              </ul></div>
          </div>
        </Section>
        <Section icon={Scale} title="A longer term" sub="Monthly repayment over your term against 5 years longer" from="#9f1239" to="#e11d48">
          <div className="rounded-2xl border border-line p-5">
            <BarCompare color={LOAN_COLOR} aLabel={`${snap.years} years`} bLabel={`${snap.years + 5} years`} rows={[{ label: "Monthly repayment", a: r.monthly, b: longer.monthly }]} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Loan Repayment Calculator" subtitle="Work out the monthly payment and total interest on a loan." />
      <RunCard icon={CreditCard} from="#9f1239" to="#e11d48" formTitle="Your loan" formSub="Tell us about the loan you're taking out" submitLabel="Calculate my repayments" onSubmit={submit}
        form={<>
          <NumField label="Amount borrowed" value={amount} onChange={setAmount} step={500} />
          <NumField label="Interest rate (APR)" value={apr} onChange={setApr} prefix="" suffix="%" step={0.1} />
          <NumField label="Loan term" value={years} onChange={setYears} prefix="" suffix="years" step={0.5} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="loan-repayment-calculator" color={LOAN_COLOR} from="#4c0519" to="#9f1239" title="Understanding loan repayments"
        points={["Fixed monthly repayments", "Total interest over the loan term", "How APR affects your repayment", "Effect of a longer loan term"]}
        more={[
          { href: toolHref("savings-interest-calculator"), label: "Savings interest calculator", sub: "compound growth on savings" },
          { href: toolHref("stamp-duty-calculator"), label: "Stamp Duty calculator", sub: "tax when buying a home" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
        ]}
        sources={[{ label: "MoneyHelper: Loans and borrowing", href: "https://www.moneyhelper.org.uk/en/everyday-money/credit-loans-and-debt" }]} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Vehicle Tax Calculator                                                  */
/* ---------------------------------------------------------------------- */
const VEHICLE_COLOR = "#ca8a04";

export function VehicleTaxCalculatorPro() {
  const [fuel, setFuel] = useState<"petrol" | "electric">("petrol");
  const [co2, setCo2] = useState(0);
  const [price, setPrice] = useState(0);
  const [snap, setSnap] = useState<{ fuel: "petrol" | "electric"; co2: number; price: number } | null>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSnap({ fuel, co2, price }); };

  let results: React.ReactNode = <EmptyResults icon={Car} color={VEHICLE_COLOR} label="Calculate my vehicle tax" />;
  let extra: React.ReactNode = null;
  if (snap) {
    const r = vehicleTax(snap.co2, snap.fuel === "electric", snap.price);
    const other = vehicleTax(snap.co2, snap.fuel !== "electric", snap.price);
    const summaryText = `Vehicle tax summary: first-year rate ${gbp(r.first, 0)}, then ${gbp(r.standardWithSupplement, 0)} a year from year two.`;

    results = (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your vehicle tax</h2>
          <p className="text-muted mt-1">{snap.fuel === "electric" ? "Fully electric" : "Petrol, diesel or hybrid"} · registered after 1 April 2017</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="First-year rate" value={gbp(r.first, 0)} note="Paid when first registered" color={VEHICLE_COLOR} />
          <StatCard label="Standard rate from year 2" value={gbp(r.standard, 0)} note="Every year after that" color="#0284c7" />
          <StatCard label="Standard rate with supplement" value={gbp(r.standardWithSupplement, 0)} note={r.supplement > 0 ? "Includes expensive car supplement" : "No supplement due"} color="#7c3aed" />
        </div>
        <RowsTable title="Breakdown" rows={[
          { label: "First-year rate", value: gbp(r.first, 0) },
          { label: "Standard rate", value: gbp(r.standard, 0) },
          { label: "Expensive car supplement (over £40,000)", value: gbp(r.supplement, 0) },
          { label: "Standard rate with supplement", value: gbp(r.standardWithSupplement, 0), strong: true },
        ]} />
        <ShareSaveBar color={VEHICLE_COLOR} summaryText={summaryText} />
      </div>
    );

    extra = (
      <Section icon={Scale} title="Petrol against electric" sub="First-year rate for the same CO₂ and list price" from="#713f12" to="#ca8a04">
        <div className="rounded-2xl border border-line p-5">
          <BarCompare color={VEHICLE_COLOR}
            aLabel={snap.fuel === "electric" ? "Electric" : "Petrol / diesel / hybrid"}
            bLabel={snap.fuel === "electric" ? "Petrol / diesel / hybrid" : "Electric"}
            rows={[{ label: "First-year rate", a: r.first, b: other.first }]} />
        </div>
      </Section>
    );
  }

  return (
    <div className="space-y-10">
      <PageHero title="Vehicle Tax Calculator" subtitle="Estimate the first-year and standard rate of vehicle tax from CO₂ emissions and list price." />
      <RunCard icon={Car} from="#713f12" to="#ca8a04" formTitle="Your vehicle" formSub="Tell us about the car you're taxing" submitLabel="Calculate my vehicle tax" onSubmit={submit}
        form={<>
          <SelectField label="Fuel type" value={fuel} onChange={setFuel} options={[
            { value: "petrol", label: "Petrol / diesel / hybrid" }, { value: "electric", label: "Electric" },
          ]} />
          <NumField label="CO₂ emissions" value={co2} onChange={setCo2} prefix="" suffix="g/km" />
          <NumField label="List price when new" value={price} onChange={setPrice} step={500} />
        </>}>
        {results}
      </RunCard>
      {extra}
      <Understanding slug="vehicle-tax-calculator" color={VEHICLE_COLOR} from="#422006" to="#713f12" title="Understanding vehicle tax"
        points={["First-year rate based on CO₂ emissions", "Standard rate from year two", "Expensive car supplement over £40,000", "Electric vehicle rates"]}
        more={[
          { href: toolHref("loan-repayment-calculator"), label: "Loan repayment calculator", sub: "monthly payments on a loan" },
          { href: toolHref("stamp-duty-calculator"), label: "Stamp Duty calculator", sub: "tax when buying a home" },
          { href: toolHref("salary-calculator"), label: "Take-home pay", sub: "full income tax and NI breakdown" },
        ]}
        sources={[{ label: "GOV.UK: Vehicle tax rate tables", href: "https://www.gov.uk/vehicle-tax-rate-tables" }]} />
    </div>
  );
}
