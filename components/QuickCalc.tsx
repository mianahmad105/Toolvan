"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Sparkles } from "lucide-react";
import type { Region } from "@/lib/tax";

const PERIODS = { year: 1, month: 12, week: 52 } as const;

export function QuickCalc() {
  const router = useRouter();
  const [gross, setGross] = useState(0);
  const [freq, setFreq] = useState<keyof typeof PERIODS>("year");
  const [region, setRegion] = useState<Region>("england");

  // Opens the full Income Tax Calculator page with these figures already worked out.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      amount: gross, freq, region, over66: false, blind: false, marriage: false,
      pensionUnit: "pct", pensionVal: 0, plan: "none", taxCode: "",
    };
    router.push(`/tools/income-tax-calculator?d=${encodeURIComponent(JSON.stringify(d))}`);
  };

  return (
    <form
      className="w-full max-w-md rounded-3xl bg-surface border border-line p-7 text-left"
      style={{ boxShadow: "0 24px 60px -20px rgba(15,23,42,0.25)" }}
      onSubmit={submit}
      noValidate
    >
      <h2 className="text-xl font-extrabold text-center">Quick Tax Calculator</h2>
      <p className="text-sm text-muted text-center mt-1">See your take-home pay in seconds</p>

      <label className="label mt-6">Gross pay (£)</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
        <input type="number" min={0} className="field" style={{ paddingLeft: "2.4rem", borderRadius: "0.9rem" }} value={gross}
          onFocus={(e) => e.target.select()} onChange={(e) => setGross(parseFloat(e.target.value) || 0)} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="label">Paid every</label>
          <select className="field" style={{ borderRadius: "0.9rem" }} value={freq} onChange={(e) => setFreq(e.target.value as keyof typeof PERIODS)}>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>
        <div>
          <label className="label">Tax region</label>
          <select className="field" style={{ borderRadius: "0.9rem" }} value={region} onChange={(e) => setRegion(e.target.value as Region)}>
            <option value="england">England / Wales / NI</option>
            <option value="scotland">Scotland</option>
          </select>
        </div>
      </div>

      <button type="submit" className="w-full mt-6 rounded-2xl py-4 font-bold text-white shadow-lg" style={{ background: "linear-gradient(90deg,#1d4ed8,#38bdf8)" }}>
        Calculate My Tax
      </button>

      <div className="flex justify-center gap-5 mt-6 pt-5 border-t border-line text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> Fast</span>
        <span className="inline-flex items-center gap-1.5"><Sparkles size={14} className="text-sky-400" /> Free</span>
      </div>
    </form>
  );
}
