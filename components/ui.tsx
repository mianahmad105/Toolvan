"use client";
import { useState } from "react";
import { gbp, type Region, type StudentPlan } from "@/lib/tax";

export function NumField({ label, value, onChange, prefix = "£", suffix, step = 1, min = 0 }: {
  label: string; value: number; onChange: (n: number) => void; prefix?: string; suffix?: string; step?: number; min?: number;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{prefix}</span>}
        <input
          className="field" style={{ paddingLeft: prefix ? "2.2rem" : undefined, paddingRight: suffix ? "3rem" : undefined }}
          type="number" inputMode="decimal" min={min} step={step} onFocus={(e) => e.target.select()}
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">{suffix}</span>}
      </div>
    </label>
  );
}

export function SelectField<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[];
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select className="field" value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export const REGIONS = [
  { value: "england" as Region, label: "England, Wales & N. Ireland" },
  { value: "scotland" as Region, label: "Scotland" },
];
export const PLANS = [
  { value: "none" as StudentPlan, label: "No student loan" },
  { value: "plan1" as StudentPlan, label: "Plan 1" },
  { value: "plan2" as StudentPlan, label: "Plan 2" },
  { value: "plan4" as StudentPlan, label: "Plan 4 (Scotland)" },
  { value: "plan5" as StudentPlan, label: "Plan 5" },
  { value: "postgrad" as StudentPlan, label: "Postgraduate loan" },
];

export function Shell({ form, result }: { form: React.ReactNode; result: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <div className="space-y-6">
      <form
        className="card p-6 sm:p-8"
        onChange={() => setDone(false)}
        onSubmit={(e) => { e.preventDefault(); setDone(true); }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{form}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="submit" className="btn text-lg px-10 py-3.5 w-full sm:w-auto">Calculate</button>
        </div>
      </form>
      {done ? (
        <div className="grid gap-4 lg:grid-cols-2 lg:[&>:first-child]:col-span-2">{result}</div>
      ) : (
        <div className="card p-10 text-center text-muted border-dashed">Enter your details above and press <b className="text-ink">Calculate</b> to see your results.</div>
      )}
    </div>
  );
}

export function BigResult({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-teal-700 to-teal-500 text-white shadow-lg">
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">{value}</div>
      {sub && <div className="text-sm opacity-90 mt-2">{sub}</div>}
    </div>
  );
}

export function Rows({ rows, title }: { rows: { label: string; value: string; strong?: boolean; neg?: boolean }[]; title?: string }) {
  return (
    <div className="card overflow-hidden">
      {title && <div className="px-5 py-3 font-semibold border-b border-line bg-surface2">{title}</div>}
      <dl>
        {rows.map((r, i) => (
          <div key={i} className={`flex justify-between gap-4 px-5 py-3 border-b border-line last:border-0 ${r.strong ? "font-bold" : ""}`}>
            <dt className="text-muted">{r.label}</dt>
            <dd className={r.neg ? "text-rose-500" : ""}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Periods({ annual, working = 260 }: { annual: number; working?: number }) {
  const rows = [
    ["Yearly", annual], ["Monthly", annual / 12], ["4-weekly", annual / 13], ["Weekly", annual / 52], ["Daily", annual / working],
  ] as const;
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="bg-surface2 text-left text-muted"><th className="px-5 py-3">Period</th><th className="px-5 py-3 text-right">Amount</th></tr></thead>
        <tbody>
          {rows.map(([l, v]) => (
            <tr key={l} className="border-t border-line"><td className="px-5 py-3">{l}</td><td className="px-5 py-3 text-right font-semibold">{gbp(v)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function useNum(initial: number) { return useState<number>(initial); }
