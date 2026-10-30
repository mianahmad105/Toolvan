"use client";
import { useState } from "react";
import { gbp } from "@/lib/tax";
import { inheritanceTax, loanRepayment, savingsGrowth, stampDuty, vehicleTax, type BuyerType } from "@/lib/tax2";
import { BigResult, NumField, Rows, SelectField, Shell } from "./ui";

export function StampDutyCalculator() {
  const [price, setPrice] = useState(0);
  const [buyer, setBuyer] = useState<BuyerType>("standard");
  const r = stampDuty(price, buyer);
  return (
    <Shell
      form={<>
        <NumField label="Property price" value={price} onChange={setPrice} step={5000} />
        <SelectField label="Buyer type" value={buyer} onChange={setBuyer} options={[
          { value: "standard", label: "Home mover / standard" },
          { value: "first", label: "First-time buyer" },
          { value: "additional", label: "Additional property" },
        ]} />
      </>}
      result={<>
        <BigResult label="Stamp Duty to pay" value={gbp(r.total, 0)} sub={`Effective rate ${r.effective.toFixed(2)}% of the price`} />
        <Rows title="Breakdown" rows={[
          ...r.rows.map((b) => ({ label: `${b.label} ${gbp(b.amount, 0)}`, value: gbp(b.tax, 0) })),
          ...(r.surcharge > 0 ? [{ label: "5% additional property surcharge", value: gbp(r.surcharge, 0) }] : []),
          { label: "Total Stamp Duty", value: gbp(r.total, 0), strong: true },
        ]} />
      </>}
    />
  );
}

export function InheritanceTaxCalculator() {
  const [estate, setEstate] = useState(0);
  const [home, setHome] = useState(0);
  const [transfer, setTransfer] = useState<"no" | "yes">("no");
  const r = inheritanceTax(estate, home, transfer === "yes");
  return (
    <Shell
      form={<>
        <NumField label="Total value of the estate" value={estate} onChange={setEstate} step={5000} />
        <NumField label="Home left to children or grandchildren" value={home} onChange={setHome} step={5000} />
        <SelectField label="Unused allowance from a late spouse?" value={transfer} onChange={setTransfer} options={[
          { value: "no", label: "No" }, { value: "yes", label: "Yes, full allowance transfers" },
        ]} />
      </>}
      result={<>
        <BigResult label="Inheritance Tax due" value={gbp(r.tax, 0)} sub="Charged at 40% on the value above the allowances" />
        <Rows title="Breakdown" rows={[
          { label: "Estate value", value: gbp(estate, 0) },
          { label: "Nil-rate band", value: `- ${gbp(r.nrb, 0)}`, neg: true },
          { label: "Residence nil-rate band", value: `- ${gbp(r.rnrb, 0)}`, neg: true },
          { label: "Taxable estate", value: gbp(r.taxable, 0) },
          { label: "Inheritance Tax at 40%", value: gbp(r.tax, 0), strong: true },
        ]} />
      </>}
    />
  );
}

export function LoanRepaymentCalculator() {
  const [amount, setAmount] = useState(0);
  const [apr, setApr] = useState(0);
  const [years, setYears] = useState(0);
  const r = loanRepayment(amount, apr, years);
  return (
    <Shell
      form={<>
        <NumField label="Amount borrowed" value={amount} onChange={setAmount} step={500} />
        <NumField label="Interest rate (APR)" value={apr} onChange={setApr} prefix="" suffix="%" step={0.1} />
        <NumField label="Loan term" value={years} onChange={setYears} prefix="" suffix="years" step={0.5} />
      </>}
      result={<>
        <BigResult label="Monthly repayment" value={gbp(r.monthly)} sub={`Over ${years} years`} />
        <Rows title="Loan summary" rows={[
          { label: "Amount borrowed", value: gbp(amount) },
          { label: "Total interest", value: gbp(r.interest) },
          { label: "Total to repay", value: gbp(r.total), strong: true },
        ]} />
      </>}
    />
  );
}

export function SavingsInterestCalculator() {
  const [deposit, setDeposit] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const r = savingsGrowth(deposit, monthly, rate, years);
  return (
    <Shell
      form={<>
        <NumField label="Starting deposit" value={deposit} onChange={setDeposit} step={100} />
        <NumField label="Monthly deposit" value={monthly} onChange={setMonthly} step={10} />
        <NumField label="Annual interest rate" value={rate} onChange={setRate} prefix="" suffix="%" step={0.1} />
        <NumField label="Time saving" value={years} onChange={setYears} prefix="" suffix="years" step={0.5} />
      </>}
      result={<>
        <BigResult label="Final balance" value={gbp(r.balance)} sub="Interest compounded monthly" />
        <Rows title="Summary" rows={[
          { label: "Total paid in", value: gbp(r.paidIn) },
          { label: "Interest earned", value: gbp(r.interest) },
          { label: "Final balance", value: gbp(r.balance), strong: true },
        ]} />
      </>}
    />
  );
}

export function VehicleTaxCalculator() {
  const [co2, setCo2] = useState(0);
  const [price, setPrice] = useState(0);
  const [fuel, setFuel] = useState<"petrol" | "electric">("petrol");
  const r = vehicleTax(co2, fuel === "electric", price);
  return (
    <Shell
      form={<>
        <SelectField label="Fuel type" value={fuel} onChange={setFuel} options={[
          { value: "petrol", label: "Petrol / diesel / hybrid" }, { value: "electric", label: "Electric" },
        ]} />
        <NumField label="CO₂ emissions" value={co2} onChange={setCo2} prefix="" suffix="g/km" />
        <NumField label="List price when new" value={price} onChange={setPrice} step={500} />
      </>}
      result={<>
        <BigResult label="First-year vehicle tax" value={gbp(r.first, 0)} sub="Paid when the car is first registered" />
        <Rows title="Rates for a car registered after April 2017" rows={[
          { label: "First-year rate", value: gbp(r.first, 0) },
          { label: "Standard rate from year 2", value: gbp(r.standard, 0) },
          { label: "Expensive car supplement (list price over £40,000)", value: gbp(r.supplement, 0) },
          { label: "Standard rate with supplement", value: gbp(r.standardWithSupplement, 0), strong: true },
        ]} />
      </>}
    />
  );
}

export const CALCULATORS_2: Record<string, () => React.JSX.Element> = {
  "stamp-duty-calculator": StampDutyCalculator,
  "inheritance-tax-calculator": InheritanceTaxCalculator,
  "loan-repayment-calculator": LoanRepaymentCalculator,
  "savings-interest-calculator": SavingsInterestCalculator,
  "vehicle-tax-calculator": VehicleTaxCalculator,
};
