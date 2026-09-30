"use client";
import { useState } from "react";
import {
  calcSalary, calcCGT, gbp, grossFromNet, incomeTax, employeeNI, parseTaxCode, pensionRelief, MARRIAGE,
  type Region, type StudentPlan,
} from "@/lib/tax";
import { BigResult, NumField, PLANS, Periods, REGIONS, Rows, SelectField, Shell } from "./ui";

function SalaryBase({ mode }: { mode: "salary" | "after" }) {
  const [gross, setGross] = useState(0);
  const [region, setRegion] = useState<Region>("england");
  const [pension, setPension] = useState(0);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const r = calcSalary({ gross, region, pensionPct: pension, plan });
  return (
    <Shell
      form={<>
        <NumField label="Gross annual salary" value={gross} onChange={setGross} step={500} />
        <SelectField label="Tax region" value={region} onChange={setRegion} options={REGIONS} />
        <NumField label="Pension contribution" value={pension} onChange={setPension} prefix="" suffix="%" step={0.5} />
        <SelectField label="Student loan" value={plan} onChange={setPlan} options={PLANS} />
      </>}
      result={<>
        <BigResult label={mode === "after" ? "Salary after tax" : "Yearly take-home pay"} value={gbp(r.net)}
          sub={`${gbp(r.net / 12)} per month · you keep ${gross > 0 ? ((r.net / gross) * 100).toFixed(1) : 0}%`} />
        <Periods annual={r.net} />
        <Rows title="Deductions" rows={[
          { label: "Gross salary", value: gbp(r.gross) },
          { label: "Income tax", value: `- ${gbp(r.incomeTax)}`, neg: true },
          { label: "National Insurance", value: `- ${gbp(r.ni)}`, neg: true },
          { label: "Pension", value: `- ${gbp(r.pension)}`, neg: true },
          { label: "Student loan", value: `- ${gbp(r.studentLoan)}`, neg: true },
          { label: "Take-home pay", value: gbp(r.net), strong: true },
        ]} />
      </>}
    />
  );
}
export const SalaryCalculator = () => <SalaryBase mode="salary" />;
export const AfterTax = () => <SalaryBase mode="after" />;

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [region, setRegion] = useState<Region>("england");
  const r = incomeTax(income, region);
  return (
    <Shell
      form={<>
        <NumField label="Taxable income" value={income} onChange={setIncome} step={500} />
        <SelectField label="Tax region" value={region} onChange={setRegion} options={REGIONS} />
      </>}
      result={<>
        <BigResult label="Income tax due" value={gbp(r.tax)} sub={`Effective rate ${income > 0 ? ((r.tax / income) * 100).toFixed(1) : 0}% · Personal Allowance ${gbp(r.allowance, 0)}`} />
        <Rows title="Tax by band" rows={[
          { label: "Personal Allowance (0%)", value: gbp(Math.min(income, r.allowance)) },
          ...r.bands.map((b) => ({ label: `${b.name} on ${gbp(b.amount)}`, value: gbp(b.tax) })),
          { label: "Total income tax", value: gbp(r.tax), strong: true },
        ]} />
      </>}
    />
  );
}

export function NICalculator() {
  const [gross, setGross] = useState(0);
  const ni = employeeNI(gross);
  return (
    <Shell
      form={<NumField label="Gross annual earnings" value={gross} onChange={setGross} step={500} />}
      result={<>
        <BigResult label="Employee National Insurance (Class 1)" value={gbp(ni)} sub={`${gbp(ni / 12)} per month`} />
        <Rows title="How it is calculated" rows={[
          { label: "8% on earnings £12,570 – £50,270", value: gbp(Math.max(0, Math.min(gross, 50270) - 12570) * 0.08) },
          { label: "2% on earnings above £50,270", value: gbp(Math.max(0, gross - 50270) * 0.02) },
          { label: "Total NI", value: gbp(ni), strong: true },
        ]} />
      </>}
    />
  );
}

export function GrossSalaryCalculator() {
  const [net, setNet] = useState(0);
  const [region, setRegion] = useState<Region>("england");
  const [pension, setPension] = useState(0);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const gross = grossFromNet(net, region, pension, plan);
  const r = calcSalary({ gross, region, pensionPct: pension, plan });
  return (
    <Shell
      form={<>
        <NumField label="Desired annual take-home pay" value={net} onChange={setNet} step={500} />
        <SelectField label="Tax region" value={region} onChange={setRegion} options={REGIONS} />
        <NumField label="Pension contribution" value={pension} onChange={setPension} prefix="" suffix="%" step={0.5} />
        <SelectField label="Student loan" value={plan} onChange={setPlan} options={PLANS} />
      </>}
      result={<>
        <BigResult label="Gross salary you need" value={gbp(gross, 0)} sub={`to take home ${gbp(net, 0)} a year`} />
        <Rows title="Breakdown" rows={[
          { label: "Income tax", value: gbp(r.incomeTax), neg: true },
          { label: "National Insurance", value: gbp(r.ni), neg: true },
          { label: "Pension", value: gbp(r.pension), neg: true },
          { label: "Student loan", value: gbp(r.studentLoan), neg: true },
          { label: "Net pay", value: gbp(r.net), strong: true },
        ]} />
      </>}
    />
  );
}

export function TaxCodeChecker() {
  const [code, setCode] = useState("");
  const r = parseTaxCode(code);
  return (
    <Shell
      form={<label className="block"><span className="label">Your tax code</span>
        <input className="field uppercase" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. 1257L, S1257L, BR" /></label>}
      result={<>
        <BigResult label={r.valid ? "Region" : "Invalid code"} value={r.valid ? r.region : "—"} sub={r.meaning} />
        {r.valid && r.allowance !== 0 && (
          <Rows rows={[{ label: "Annual tax-free amount", value: gbp(r.allowance, 0), strong: true }, { label: "Monthly", value: gbp(r.allowance / 12) }]} />
        )}
      </>}
    />
  );
}

export function ProRataCalculator() {
  const [salary, setSalary] = useState(0);
  const [fullDays, setFullDays] = useState(0);
  const [myDays, setMyDays] = useState(0);
  const annual = fullDays > 0 ? salary * (myDays / fullDays) : 0;
  return (
    <Shell
      form={<>
        <NumField label="Full-time annual salary" value={salary} onChange={setSalary} step={500} />
        <NumField label="Full-time days per week" value={fullDays} onChange={setFullDays} prefix="" step={0.5} />
        <NumField label="Days you work per week" value={myDays} onChange={setMyDays} prefix="" step={0.5} />
      </>}
      result={<><BigResult label="Pro rata salary" value={gbp(annual)} sub={`${((myDays / (fullDays || 1)) * 100).toFixed(0)}% of full-time`} /><Periods annual={annual} /></>}
    />
  );
}

export function MarriageAllowanceCalculator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [scot, setScot] = useState(false);
  void scot; void setScot;
  const donor = Math.min(a, b) <= 12570 ? Math.min(a, b) : null;
  const recipient = donor === null ? null : (donor === a ? b : a);
  const ok = donor !== null && recipient !== null && recipient > 12570 && recipient <= 50270;
  return (
    <Shell
      form={<>
        <NumField label="Partner A annual income" value={a} onChange={setA} step={500} />
        <NumField label="Partner B annual income" value={b} onChange={setB} step={500} />
      </>}
      result={<>
        <BigResult label={ok ? "You could be eligible — save up to" : "Probably not eligible"} value={ok ? `${gbp(MARRIAGE.saving, 0)} / year` : "£0"}
          sub={ok ? `Transfer ${gbp(MARRIAGE.transfer, 0)} of Personal Allowance to the higher earner.` : "One partner must earn under £12,570 and the other between £12,571 and £50,270."} />
        <Rows title="Rules" rows={[
          { label: "Amount transferable", value: gbp(MARRIAGE.transfer, 0) },
          { label: "Max annual tax saving", value: gbp(MARRIAGE.saving, 0) },
          { label: "Backdating (up to 4 years)", value: gbp(MARRIAGE.saving * 4, 0) },
        ]} />
      </>}
    />
  );
}

export function OvertimeCalculator() {
  const [rate, setRate] = useState(0);
  const [hours, setHours] = useState(0);
  const [mult, setMult] = useState(1.5);
  const gross = rate * mult * hours;
  const taxNI = gross * 0.28; // marginal 20% tax + 8% NI, illustrative
  return (
    <Shell
      form={<>
        <NumField label="Normal hourly rate" value={rate} onChange={setRate} step={0.25} />
        <NumField label="Overtime hours" value={hours} onChange={setHours} prefix="" step={0.5} />
        <SelectField label="Overtime multiplier" value={String(mult)} onChange={(v) => setMult(parseFloat(v))}
          options={[{ value: "1.25", label: "Time and a quarter" }, { value: "1.5", label: "Time and a half" }, { value: "2", label: "Double time" }, { value: "2.5", label: "Double and a half" }]} />
      </>}
      result={<>
        <BigResult label="Gross overtime pay" value={gbp(gross)} sub={`${gbp(rate * mult)} per overtime hour`} />
        <Rows title="Estimate (basic-rate taxpayer)" rows={[
          { label: "Gross overtime", value: gbp(gross) },
          { label: "Tax 20% + NI 8%", value: `- ${gbp(taxNI)}`, neg: true },
          { label: "Estimated take-home", value: gbp(gross - taxNI), strong: true },
        ]} />
      </>}
    />
  );
}

export function PensionReliefCalculator() {
  const [gross, setGross] = useState(0);
  const [contrib, setContrib] = useState(0);
  const r = pensionRelief(gross, contrib);
  return (
    <Shell
      form={<>
        <NumField label="Gross annual salary" value={gross} onChange={setGross} step={500} />
        <NumField label="Your pension payment (net, relief at source)" value={contrib} onChange={setContrib} step={100} />
      </>}
      result={<>
        <BigResult label="Total tax relief" value={gbp(r.totalRelief)} sub={`Marginal rate ${(r.rate * 100).toFixed(0)}%`} />
        <Rows rows={[
          { label: "Your payment", value: gbp(contrib) },
          { label: "Basic-rate relief added by provider (20%)", value: gbp(r.basicRelief) },
          { label: "Total in pension pot", value: gbp(r.grossContribution), strong: true },
          { label: "Extra relief to claim via Self Assessment", value: gbp(r.extraClaim) },
        ]} />
      </>}
    />
  );
}

export function HourlyToYearly() {
  const [rate, setRate] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [wks, setWks] = useState(0);
  const annual = rate * hrs * wks;
  return (
    <Shell
      form={<>
        <NumField label="Hourly rate" value={rate} onChange={setRate} step={0.25} />
        <NumField label="Hours per week" value={hrs} onChange={setHrs} prefix="" step={0.5} />
        <NumField label="Weeks per year" value={wks} onChange={setWks} prefix="" />
      </>}
      result={<><BigResult label="Annual salary" value={gbp(annual)} /><Periods annual={annual} working={(hrs / 7.5) * wks} /></>}
    />
  );
}

export function SalaryToHourly() {
  const [salary, setSalary] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [wks, setWks] = useState(0);
  const hourly = salary / (hrs * wks || 1);
  return (
    <Shell
      form={<>
        <NumField label="Annual salary" value={salary} onChange={setSalary} step={500} />
        <NumField label="Hours per week" value={hrs} onChange={setHrs} prefix="" step={0.5} />
        <NumField label="Weeks per year" value={wks} onChange={setWks} prefix="" />
      </>}
      result={<><BigResult label="Hourly rate" value={gbp(hourly)} sub={`${gbp(hourly * hrs)} per week`} /><Periods annual={salary} /></>}
    />
  );
}

export function DailyRateToAnnual() {
  const [day, setDay] = useState(0);
  const [days, setDays] = useState(0);
  const annual = day * days;
  return (
    <Shell
      form={<>
        <NumField label="Daily rate" value={day} onChange={setDay} step={10} />
        <NumField label="Days worked per year" value={days} onChange={setDays} prefix="" />
      </>}
      result={<><BigResult label="Annual earnings" value={gbp(annual, 0)} sub="Contractors typically work ~220 days after holidays and bank holidays." /><Periods annual={annual} working={days} /></>}
    />
  );
}

export function CGTCalculator() {
  const [gain, setGain] = useState(0);
  const [income, setIncome] = useState(0);
  const r = calcCGT(gain, income, "shares");
  return (
    <Shell
      form={<>
        <NumField label="Total capital gain" value={gain} onChange={setGain} step={500} />
        <NumField label="Your taxable income" value={income} onChange={setIncome} step={500} />
      </>}
      result={<>
        <BigResult label="Capital gains tax" value={gbp(r.tax)} sub="2026/27 · 18% basic rate, 24% higher rate" />
        <Rows rows={[
          { label: "Annual exempt amount", value: gbp(r.exempt, 0) },
          { label: "Taxable gain", value: gbp(r.taxableGain) },
          { label: "Taxed at 18%", value: gbp(r.atBasic) },
          { label: "Taxed at 24%", value: gbp(r.atHigher) },
          { label: "CGT due", value: gbp(r.tax), strong: true },
        ]} />
      </>}
    />
  );
}

export const CALCULATORS: Record<string, () => React.JSX.Element> = {
  "salary-calculator": SalaryCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
  "ni-calculator": NICalculator,
  "after-tax": AfterTax,
  "gross-salary-calculator": GrossSalaryCalculator,
  "tax-code-checker": TaxCodeChecker,
  "pro-rata-calculator": ProRataCalculator,
  "marriage-allowance-calculator": MarriageAllowanceCalculator,
  "overtime-pay-calculator": OvertimeCalculator,
  "pension-tax-relief-calculator": PensionReliefCalculator,
  "hourly-to-yearly": HourlyToYearly,
  "salary-to-hourly": SalaryToHourly,
  "daily-rate-to-annual-salary": DailyRateToAnnual,
  "capital-gains-tax-calculator": CGTCalculator,
};
