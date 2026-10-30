import {
  ArrowUpRight, BadgePercent, Banknote, Building2, Calculator, CalendarDays, Car, Clock, Coins, HandCoins,
  Home, Landmark, PiggyBank, Receipt, ScanSearch, Shield, TrendingDown, TrendingUp, Users, Zap, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "salary-calculator": TrendingUp,
  "income-tax-calculator": Receipt,
  "ni-calculator": Zap,
  "after-tax": Banknote,
  "gross-salary-calculator": ArrowUpRight,
  "tax-code-checker": ScanSearch,
  "pro-rata-calculator": Clock,
  "marriage-allowance-calculator": Users,
  "overtime-pay-calculator": Coins,
  "pension-tax-relief-calculator": Shield,
  "capital-gains-tax-calculator": TrendingDown,
  "vehicle-tax-calculator": Car,
  "inheritance-tax-calculator": Landmark,
  "hourly-to-yearly": CalendarDays,
  "salary-to-hourly": BadgePercent,
  "daily-rate-to-annual-salary": Calculator,
  "savings-interest-calculator": PiggyBank,
  "loan-repayment-calculator": HandCoins,
  "stamp-duty-calculator": Home,
};

export function ToolIcon({ slug, color, size = 20, solid = false, gradient }: { slug: string; color: string; size?: number; solid?: boolean; gradient?: string }) {
  const Icon = ICONS[slug] ?? Building2;
  const big = solid || !!gradient;
  return (
    <span
      className={`grid place-items-center shrink-0 ${big ? "w-12 h-12 rounded-2xl shadow-md" : "w-10 h-10 rounded-xl"}`}
      style={
        gradient ? { background: gradient, color: "#fff" }
        : solid ? { background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "#fff" }
        : { background: `color-mix(in srgb, ${color} 14%, transparent)`, color }
      }
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}
