// UK tax year 2025/26 rates (illustrative calculator, not financial advice)

export type Region = "england" | "scotland";
export type StudentPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";

export const PERSONAL_ALLOWANCE = 12570;
const TAPER_START = 100000;

const ENGLAND = [
  { name: "Basic rate 20%", width: 37700, rate: 0.2 },
  { name: "Higher rate 40%", width: 125140 - 37700, rate: 0.4 },
  { name: "Additional rate 45%", width: Infinity, rate: 0.45 },
];
const SCOTLAND = [
  { name: "Starter 19%", width: 15397 - 12570, rate: 0.19 },
  { name: "Basic 20%", width: 27491 - 15397, rate: 0.2 },
  { name: "Intermediate 21%", width: 43662 - 27491, rate: 0.21 },
  { name: "Higher 42%", width: 75000 - 43662, rate: 0.42 },
  { name: "Advanced 45%", width: 125140 - 75000, rate: 0.45 },
  { name: "Top 48%", width: Infinity, rate: 0.48 },
];

export function personalAllowance(income: number, base = PERSONAL_ALLOWANCE) {
  if (income <= TAPER_START) return base;
  return Math.max(0, base - Math.floor((income - TAPER_START) / 2));
}

export interface TaxBandResult { name: string; amount: number; tax: number }

export function incomeTax(taxable: number, region: Region = "england", allowance?: number) {
  const pa = allowance ?? personalAllowance(taxable);
  let rest = Math.max(0, taxable - pa);
  const bands = region === "scotland" ? SCOTLAND : ENGLAND;
  const out: TaxBandResult[] = [];
  let total = 0;
  for (const b of bands) {
    const amt = Math.min(rest, b.width);
    if (amt > 0) {
      const t = amt * b.rate;
      out.push({ name: b.name, amount: amt, tax: t });
      total += t;
    }
    rest -= amt;
    if (rest <= 0) break;
  }
  return { tax: total, bands: out, allowance: pa };
}

// Employee Class 1 NI 2025/26 (annual approximation)
export function employeeNI(gross: number) {
  const PT = 12570, UEL = 50270;
  const main = Math.max(0, Math.min(gross, UEL) - PT) * 0.08;
  const upper = Math.max(0, gross - UEL) * 0.02;
  return main + upper;
}

export function studentLoan(gross: number, plan: StudentPlan) {
  const t = { none: [0, 0], plan1: [26900, 0.09], plan2: [29385, 0.09], plan4: [33795, 0.09], plan5: [25000, 0.09], postgrad: [21000, 0.06] }[plan];
  return Math.max(0, gross - t[0]) * t[1];
}

export interface SalaryInput {
  gross: number;
  region: Region;
  pensionPct: number; // % of gross, net-pay arrangement
  plan: StudentPlan;
  taxFreeBenefits?: number;
  pensionAmount?: number; // fixed £ per year, overrides pensionPct
  taxCode?: string;
  blind?: boolean;
  over66?: boolean; // over State Pension age: no employee NI
  marriage?: boolean; // receiving Marriage Allowance
}

export const BLIND_ALLOWANCE = 3130;
export const MARRIAGE_SAVING = 252;

export function calcSalary(i: SalaryInput) {
  const pension = i.pensionAmount ?? i.gross * (i.pensionPct / 100);
  const taxable = Math.max(0, i.gross - pension);

  let it: { tax: number; bands: TaxBandResult[]; allowance: number };
  const code = i.taxCode && i.taxCode.trim() ? parseTaxCode(i.taxCode) : null;
  const flat: Record<string, number> = { BR: 0.2, D0: 0.4, D1: 0.45, NT: 0 };
  if (code?.valid && code.kind in flat) {
    it = { tax: taxable * flat[code.kind], bands: [], allowance: 0 };
  } else {
    let allowance = code?.valid ? Math.max(0, code.allowance) : personalAllowance(taxable);
    const extra = code?.valid && code.allowance < 0 ? -code.allowance : 0; // K code adds to income
    if (i.blind) allowance += BLIND_ALLOWANCE;
    it = incomeTax(taxable + extra, i.region, allowance);
  }
  let tax = it.tax;
  if (i.marriage && taxable > PERSONAL_ALLOWANCE && taxable <= 50270) tax = Math.max(0, tax - MARRIAGE_SAVING);

  const ni = i.over66 ? 0 : employeeNI(i.gross);
  const sl = studentLoan(i.gross, i.plan);
  const net = i.gross - tax - ni - sl - pension;
  return { gross: i.gross, pension, taxable, incomeTax: tax, bands: it.bands, allowance: it.allowance, ni, studentLoan: sl, net };
}

export const gbp = (n: number, d = 2) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: d, maximumFractionDigits: d }).format(isFinite(n) ? n : 0);

/** Find gross salary that yields a target net */
export function grossFromNet(target: number, region: Region, pensionPct: number, plan: StudentPlan) {
  let lo = target, hi = target * 3 + 50000;
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    const n = calcSalary({ gross: mid, region, pensionPct, plan }).net;
    if (n < target) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// Tax code parsing
export function parseTaxCode(raw: string) {
  const code = raw.trim().toUpperCase().replace(/\s+/g, "");
  let prefix: "" | "S" | "C" = "";
  let c = code;
  if (/^[SC]/.test(c) && c.length > 1) { prefix = c[0] as "S" | "C"; c = c.slice(1); }
  const region = prefix === "S" ? "Scotland" : prefix === "C" ? "Wales" : "England / Northern Ireland";
  if (["BR", "D0", "D1", "NT", "0T"].includes(c)) {
    const map: Record<string, string> = {
      BR: "All income taxed at the basic rate (20%). No allowance.",
      D0: "All income taxed at the higher rate (40%).",
      D1: "All income taxed at the additional rate (45%).",
      NT: "No tax is deducted.",
      "0T": "No personal allowance; income taxed via bands from £0.",
    };
    return { valid: true, region, allowance: 0, meaning: map[c], kind: c };
  }
  const m = c.match(/^(K)?(\d{1,4})([LMNTY])$/);
  if (!m) return { valid: false, region, allowance: 0, meaning: "This does not look like a valid UK tax code.", kind: "" };
  const num = parseInt(m[2], 10);
  const isK = !!m[1];
  const allowance = isK ? -(num * 10) : num * 10;
  const suffix: Record<string, string> = {
    L: "standard tax-free Personal Allowance",
    M: "you receive Marriage Allowance from your partner",
    N: "you have transferred Marriage Allowance to your partner",
    T: "your employer needs to review other items",
    Y: "Personal Allowance tax-code Y",
  };
  return {
    valid: true, region, allowance, kind: c,
    meaning: isK
      ? `K code: ${gbp(-allowance, 0)} is ADDED to your taxable income (you owe tax on untaxed income/benefits).`
      : `Tax-free allowance of about ${gbp(allowance, 0)} a year — ${suffix[m[3]]}.`,
  };
}

// CGT 2025/26
export function calcCGT(gain: number, taxableIncome: number, asset: "shares" | "property") {
  void asset;
  const exempt = 3000;
  const taxableGain = Math.max(0, gain - exempt);
  const basicLeft = Math.max(0, 50270 - Math.max(taxableIncome, PERSONAL_ALLOWANCE));
  const atBasic = Math.min(taxableGain, basicLeft);
  const atHigher = taxableGain - atBasic;
  const tax = atBasic * 0.18 + atHigher * 0.24;
  return { exempt, taxableGain, atBasic, atHigher, tax };
}

// Pension relief
export function pensionRelief(gross: number, contribution: number) {
  const grossContribution = contribution / 0.8; // relief at source
  const taxable = gross;
  const rate = taxable > 125140 ? 0.45 : taxable > 50270 ? 0.4 : 0.2;
  const basicRelief = grossContribution - contribution;
  const extraClaim = Math.max(0, grossContribution * (rate - 0.2));
  return { grossContribution, basicRelief, extraClaim, totalRelief: basicRelief + extraClaim, rate };
}

export const MARRIAGE = { transfer: 1260, saving: 252 };
