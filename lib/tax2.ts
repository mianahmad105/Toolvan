// Extra calculators: property, estate, savings & loans, vehicle tax (estimates)

export type BuyerType = "standard" | "first" | "additional";

// Stamp Duty Land Tax (England & Northern Ireland, rates from April 2025)
export function stampDuty(price: number, buyer: BuyerType) {
  const bands: [number, number][] =
    buyer === "first" && price <= 500000
      ? [[300000, 0], [500000, 0.05]]
      : [[125000, 0], [250000, 0.02], [925000, 0.05], [1500000, 0.1], [Infinity, 0.12]];
  let prev = 0;
  let tax = 0;
  const rows: { label: string; amount: number; tax: number }[] = [];
  for (const [upTo, rate] of bands) {
    const amt = Math.max(0, Math.min(price, upTo) - prev);
    if (amt > 0) {
      rows.push({ label: `${(rate * 100).toFixed(0)}% on`, amount: amt, tax: amt * rate });
      tax += amt * rate;
    }
    prev = upTo;
    if (price <= upTo) break;
  }
  const surcharge = buyer === "additional" ? price * 0.05 : 0;
  const total = tax + surcharge;
  return { rows, surcharge, total, effective: price > 0 ? (total / price) * 100 : 0 };
}

// Inheritance Tax
export function inheritanceTax(estate: number, homeToChildren: number, transferable: boolean) {
  const mult = transferable ? 2 : 1;
  const nrb = 325000 * mult;
  const taper = Math.max(0, (estate - 2000000) / 2);
  const rnrb = Math.max(0, Math.min(homeToChildren, 175000 * mult) - taper);
  const taxable = Math.max(0, estate - nrb - rnrb);
  return { nrb, rnrb, taxable, tax: taxable * 0.4 };
}

export function loanRepayment(amount: number, apr: number, years: number) {
  const n = Math.round(years * 12);
  const r = apr / 100 / 12;
  if (n <= 0 || amount <= 0) return { monthly: 0, total: 0, interest: 0 };
  const monthly = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
  return { monthly, total: monthly * n, interest: monthly * n - amount };
}

export function savingsGrowth(deposit: number, monthly: number, ratePct: number, years: number) {
  const n = Math.round(years * 12);
  const r = ratePct / 100 / 12;
  const g = Math.pow(1 + r, n);
  const balance = deposit * g + monthly * (r === 0 ? n : (g - 1) / r);
  const paidIn = deposit + monthly * n;
  return { balance, paidIn, interest: balance - paidIn };
}

// Vehicle tax (VED) for cars registered after 1 April 2017
const FIRST_YEAR: [number, number][] = [
  [0, 10], [50, 110], [75, 130], [90, 270], [100, 350], [110, 390], [130, 440],
  [150, 540], [170, 1540], [190, 2555], [225, 3900], [255, 5545], [Infinity, 5690],
];
export function vehicleTax(co2: number, electric: boolean, listPrice: number) {
  const first = electric ? 10 : FIRST_YEAR.find(([max]) => co2 <= max)![1];
  const standard = 195;
  const supplement = listPrice > 40000 ? 425 : 0;
  return { first, standard, supplement, standardWithSupplement: standard + supplement };
}
