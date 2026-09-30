export type Category =
  | "Income Tax" | "Investment Tax" | "Vehicle Tax" | "Estate Tax" | "Other" | "Savings & Loans" | "Property Tax";

export interface Tool {
  slug: string;
  title: string;
  short: string;
  description: string;
  category: Category;
  icon: string;
  color: string;
  popular?: boolean;
}

export const TOOLS: Tool[] = [
  { slug: "salary-calculator", title: "Salary Calculator", short: "Take-home pay", icon: "💷", category: "Income Tax", popular: true, color: "#2563eb",
    description: "Work out your yearly, monthly, weekly and daily take-home pay after income tax, National Insurance, pension and student loan." },
  { slug: "income-tax-calculator", title: "Income Tax Calculator", short: "Bands breakdown", icon: "🧾", category: "Income Tax", popular: true, color: "#db2777",
    description: "See exactly how much income tax you pay in each band for England, Wales, NI or Scotland." },
  { slug: "ni-calculator", title: "National Insurance Calculator", short: "Class 1 NI", icon: "🛡️", category: "Income Tax", popular: true, color: "#059669",
    description: "Calculate your employee Class 1 National Insurance contributions." },
  { slug: "after-tax", title: "After Tax", short: "Net from gross", icon: "🏦", category: "Income Tax", popular: true, color: "#d97706",
    description: "Instantly see your net salary after all deductions and the percentage you keep." },
  { slug: "gross-salary-calculator", title: "Gross Salary Calculator", short: "Net to gross", icon: "🔄", category: "Income Tax", color: "#7c3aed",
    description: "Know the take-home pay you want? Find the gross salary you need to earn." },
  { slug: "tax-code-checker", title: "Tax Code Checker", short: "Decode your code", icon: "🔎", category: "Income Tax", color: "#0891b2",
    description: "Enter your tax code (e.g. 1257L) to understand your allowance and what it means." },
  { slug: "pro-rata-calculator", title: "Pro Rata Calculator", short: "Part-time salary", icon: "⏱️", category: "Income Tax", color: "#dc2626",
    description: "Convert a full-time salary into your pro rata salary based on days or hours worked." },
  { slug: "marriage-allowance-calculator", title: "Marriage Allowance Calculator", short: "Save up to £252", icon: "💍", category: "Income Tax", color: "#c026d3",
    description: "Check whether you and your partner are eligible and how much you could save." },
  { slug: "overtime-pay-calculator", title: "Overtime Pay Calculator", short: "Extra hours", icon: "🕒", category: "Income Tax", color: "#ea580c",
    description: "Calculate overtime pay at time-and-a-half, double time or a custom multiplier." },
  { slug: "pension-tax-relief-calculator", title: "Pension Tax Relief Calculator", short: "Relief on savings", icon: "🌴", category: "Income Tax", color: "#0d9488",
    description: "See how much tax relief you get on your pension contributions." },
  { slug: "capital-gains-tax-calculator", title: "Capital Gains Tax Calculator", short: "CGT", icon: "📊", category: "Investment Tax", color: "#4f46e5",
    description: "Estimate the capital gains tax due when you sell shares, property or other assets." },
  { slug: "vehicle-tax-calculator", title: "Vehicle Tax Calculator", short: "Road tax (VED)", icon: "🚗", category: "Vehicle Tax", color: "#ca8a04",
    description: "Estimate the first-year and standard rate of vehicle tax from CO₂ emissions and list price." },
  { slug: "inheritance-tax-calculator", title: "Inheritance Tax Calculator", short: "Estate tax", icon: "🏛️", category: "Estate Tax", color: "#e11d48",
    description: "Estimate the inheritance tax due on an estate, including the nil-rate and residence nil-rate bands." },
  { slug: "hourly-to-yearly", title: "Hourly to Yearly Salary", short: "Hourly → annual", icon: "📈", category: "Other", color: "#0284c7",
    description: "Convert an hourly wage into weekly, monthly and annual salary." },
  { slug: "salary-to-hourly", title: "Salary to Hourly", short: "Annual → hourly", icon: "📉", category: "Other", color: "#9333ea",
    description: "Convert an annual salary into the hourly rate you earn." },
  { slug: "daily-rate-to-annual-salary", title: "Daily Rate to Annual Salary", short: "Contractor day rate", icon: "📅", category: "Other", color: "#16a34a",
    description: "Turn a contractor day rate into an equivalent annual salary." },
  { slug: "savings-interest-calculator", title: "Savings Interest Calculator", short: "Compound growth", icon: "🐷", category: "Savings & Loans", color: "#b45309",
    description: "See how a lump sum and monthly deposits grow with compound interest over time." },
  { slug: "loan-repayment-calculator", title: "Loan Repayment Calculator", short: "Monthly payments", icon: "💳", category: "Savings & Loans", color: "#be123c",
    description: "Work out the monthly payment and total interest on a loan." },
  { slug: "stamp-duty-calculator", title: "Stamp Duty Calculator", short: "SDLT", icon: "🏠", category: "Property Tax", color: "#1d4ed8",
    description: "Calculate the Stamp Duty Land Tax due when buying a home in England or Northern Ireland." },
];

export const TAB_CATEGORIES: ("All Tools" | Category)[] = [
  "All Tools", "Income Tax", "Investment Tax", "Vehicle Tax", "Estate Tax", "Other", "Savings & Loans", "Property Tax",
];
export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const SITE_NAME = "Toolvan";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.toolvan.site";

export const CONTACT_EMAIL = "support@toolvan.site";

/** Public URL of each tool. */
export function toolHref(slug: string): string {
  if (slug === "salary-calculator" || slug === "after-tax") return `/${slug}`;
  if (["hourly-to-yearly", "salary-to-hourly", "daily-rate-to-annual-salary"].includes(slug)) return `/salary-calculator/${slug}`;
  return `/tools/${slug}`;
}
