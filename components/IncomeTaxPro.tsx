"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3, Calculator, CheckCircle2, ClipboardCopy, FileDown, Globe2, LineChart, Link2,
  PieChart, Plus, Smartphone, Target, Zap, Scale, Landmark, BookOpen,
} from "lucide-react";
import { BLIND_ALLOWANCE, calcSalary, gbp, incomeTax, type Region, type StudentPlan } from "@/lib/tax";
import { PLANS } from "./ui";
import { TaxBandsReference } from "./proui";

const FREQ = { year: 1, month: 12, week: 52, day: 260 } as const;
type Freq = keyof typeof FREQ;

interface Inputs {
  amount: number; freq: Freq; region: Region; over66: boolean; blind: boolean; marriage: boolean;
  pensionUnit: "pct" | "gbp"; pensionVal: number; plan: StudentPlan; taxCode: string;
}
const DEFAULTS: Inputs = {
  amount: 0, freq: "year", region: "england", over66: false, blind: false, marriage: false,
  pensionUnit: "pct", pensionVal: 0, plan: "none", taxCode: "",
};

function run(i: Inputs, override: Partial<Inputs> = {}, grossMult = 1) {
  const x = { ...i, ...override };
  const gross = x.amount * FREQ[x.freq] * grossMult;
  const r = calcSalary({
    gross, region: x.region, plan: x.plan, taxCode: x.taxCode, blind: x.blind, over66: x.over66, marriage: x.marriage,
    pensionPct: x.pensionUnit === "pct" ? x.pensionVal : 0,
    pensionAmount: x.pensionUnit === "gbp" ? x.pensionVal : undefined,
  });
  return { gross, r };
}

const TEAL = "#1d4ed8";
const tint = (c: string, pct = 12) => `color-mix(in srgb, ${c} ${pct}%, var(--surface))`;
const pct = (n: number) => `${isFinite(n) ? n.toFixed(1) : "0.0"}%`;

/* ---------- small building blocks ---------- */
function Section({ icon: Icon, title, sub, from, to, children }: { icon: typeof Calculator; title: string; sub: string; from: string; to: string; children: React.ReactNode }) {
  return (
    <section className="card overflow-hidden no-print-break">
      <div className="px-6 md:px-8 py-6 text-white" style={{ background: `linear-gradient(100deg, ${from}, ${to})` }}>
        <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3"><Icon size={26} /> {title}</h2>
        <p className="mt-1.5 text-white/90 text-sm md:text-base">{sub}</p>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </section>
  );
}

function Accordion({ icon: Icon, title, sub, color, children }: { icon: typeof Calculator; title: string; sub: string; color: string; children: React.ReactNode }) {
  return (
    <details className="acc rounded-2xl shadow-sm" style={{ background: tint(color, 9), border: `1px solid ${tint(color, 26)}` }}>
      <summary className="flex items-center gap-4 p-4 md:p-5">
        <span className="grid place-items-center w-11 h-11 rounded-xl shrink-0" style={{ background: tint(color, 20), color }}><Icon size={20} /></span>
        <span className="flex-1 min-w-0">
          <span className="block font-extrabold">{title}</span>
          <span className="block text-sm text-muted">{sub}</span>
        </span>
        <span className="grid place-items-center w-9 h-9 rounded-full bg-surface shadow shrink-0"><Plus size={16} className="acc-plus transition" /></span>
      </summary>
      <div className="px-4 md:px-5 pb-5">{children}</div>
    </details>
  );
}

function StatCard({ label, value, note, color }: { label: string; value: string; note: string; color: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: tint(color, 8), border: `1px solid ${tint(color, 30)}` }}>
      <div className="text-sm font-medium" style={{ color }}>{label}</div>
      <div className="text-3xl font-extrabold mt-1.5 break-words" style={{ color: label === "Gross pay" ? "var(--text)" : color }}>{value}</div>
      <div className="text-sm text-muted mt-1">{note}</div>
    </div>
  );
}

/* ---------- charts (plain SVG) ---------- */
function PieChartSvg({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const cx = 110, cy = 110, R = 100;
  if (total <= 0) return <div className="text-muted text-sm">Enter a salary to see the split.</div>;
  let a0 = -Math.PI / 2;
  const shown = parts.filter((p) => p.value > 0);
  return (
    <svg viewBox="0 0 220 220" className="w-56 h-56 mx-auto" role="img" aria-label="Split of yearly pay">
      {shown.length === 1 ? (
        <circle cx={cx} cy={cy} r={R} fill={shown[0].color} />
      ) : shown.map((p) => {
        const a1 = a0 + (p.value / total) * Math.PI * 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M${cx},${cy} L${cx + R * Math.cos(a0)},${cy + R * Math.sin(a0)} A${R},${R} 0 ${large} 1 ${cx + R * Math.cos(a1)},${cy + R * Math.sin(a1)} Z`;
        a0 = a1;
        return <path key={p.label} d={d} fill={p.color} stroke="var(--surface)" strokeWidth="2" />;
      })}
      <circle cx={cx} cy={cy} r={48} fill="var(--surface)" />
    </svg>
  );
}

function BarCompare({ rows, bLabel }: { rows: { label: string; a: number; b: number }[]; bLabel: string }) {
  const [hover, setHover] = useState<{ i: number; x: number; y: number; w: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const max = Math.max(1, ...rows.flatMap((r) => [r.a, r.b]));
  const W = 600, H = 260, padL = 60, padB = 40, gw = (W - padL) / rows.length;

  const point = (i: number, e: { clientX: number; clientY: number }) => {
    const b = wrap.current?.getBoundingClientRect();
    if (b) setHover({ i, x: e.clientX - b.left, y: e.clientY - b.top, w: b.width });
  };
  const hr = hover ? rows[hover.i] : null;
  const diff = hr ? hr.b - hr.a : 0;
  const diffPct = hr && hr.a > 0 ? (diff / hr.a) * 100 : 0;

  return (
    <div ref={wrap} className="relative" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Current against scenario">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = H - padB - t * (H - padB - 10);
          return (
            <g key={t}>
              <line x1={padL} x2={W} y1={y} y2={y} stroke="var(--border)" />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{gbp(max * t, 0)}</text>
            </g>
          );
        })}
        {rows.map((r, i) => {
          const x0 = padL + i * gw + gw * 0.18, bw = gw * 0.28;
          const h = (v: number) => (v / max) * (H - padB - 10);
          return (
            <g key={r.label}>
              <rect x={padL + i * gw} y={0} width={gw} height={H - padB} rx="8"
                fill={hover?.i === i ? "color-mix(in srgb, #1d4ed8 10%, transparent)" : "transparent"}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => point(i, e)} onMouseMove={(e) => point(i, e)} onClick={(e) => point(i, e)} />
              <rect x={x0} y={H - padB - h(r.a)} width={bw} height={h(r.a)} rx="6" fill={TEAL} pointerEvents="none" />
              <rect x={x0 + bw + 6} y={H - padB - h(r.b)} width={bw} height={h(r.b)} rx="6" fill="#f59e0b" pointerEvents="none" />
              <text x={x0 + bw} y={H - 14} textAnchor="middle" fontSize="12" fill="var(--text)" pointerEvents="none">{r.label}</text>
            </g>
          );
        })}
      </svg>
      {hover && hr && (
        <div
          className="absolute z-20 pointer-events-none rounded-xl border border-line bg-surface px-4 py-3 text-sm shadow-xl"
          style={{ left: Math.min(Math.max(hover.x, 110), hover.w - 110), top: hover.y - 12, transform: "translate(-50%, -100%)", minWidth: 200 }}
        >
          <div className="font-extrabold mb-1.5">{hr.label}</div>
          <div className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 text-muted"><span className="w-2.5 h-2.5 rounded" style={{ background: TEAL }} />Now</span><b>{gbp(hr.a, 0)}</b></div>
          <div className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 text-muted"><span className="w-2.5 h-2.5 rounded" style={{ background: "#f59e0b" }} />{bLabel}</span><b>{gbp(hr.b, 0)}</b></div>
          <div className="flex items-center justify-between gap-4 mt-1.5 pt-1.5 border-t border-line">
            <span className="text-muted">Difference</span>
            <b style={{ color: diff === 0 ? "var(--muted)" : diff > 0 ? "#1d4ed8" : "#e11d48" }}>{diff >= 0 ? "+" : "-"}{gbp(Math.abs(diff), 0)} ({diffPct >= 0 ? "+" : ""}{diffPct.toFixed(1)}%)</b>
          </div>
        </div>
      )}
    </div>
  );
}

function RateCurve({ region, gross, current }: { region: Region; gross: number; current: number }) {
  const maxX = Math.max(150000, gross * 1.2);
  const pts: [number, number][] = [];
  for (let x = 0; x <= maxX; x += maxX / 60) {
    const r = calcSalary({ gross: x, region, pensionPct: 0, plan: "none" });
    pts.push([x, x > 0 ? ((r.incomeTax + r.ni) / x) * 100 : 0]);
  }
  const W = 600, H = 250, pl = 46, pb = 32, pt = 12;
  const sx = (x: number) => pl + (x / maxX) * (W - pl - 10);
  const sy = (y: number) => H - pb - (y / 50) * (H - pb - pt);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Tax and NI rate against income">
      {[0, 10, 20, 30, 40, 50].map((t) => (
        <g key={t}><line x1={pl} x2={W - 10} y1={sy(t)} y2={sy(t)} stroke="var(--border)" /><text x={pl - 8} y={sy(t) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{t}%</text></g>
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <text key={t} x={sx(maxX * t)} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--muted)">{gbp(maxX * t, 0)}</text>
      ))}
      <path d={path} fill="none" stroke={TEAL} strokeWidth="3" strokeLinejoin="round" />
      {gross > 0 && <circle cx={sx(gross)} cy={sy(Math.min(50, current))} r="6" fill="#f59e0b" stroke="var(--surface)" strokeWidth="2" />}
    </svg>
  );
}

/* ---------- main component ---------- */
export function IncomeTaxPro() {
  const [inp, setInp] = useState<Inputs>(DEFAULTS);
  const [adv, setAdv] = useState(false);
  const [snap, setSnap] = useState<Inputs | null>(null);
  const [scenario, setScenario] = useState("pay5");
  const [note, setNote] = useState("");
  const results = useRef<HTMLDivElement>(null);
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInp((p) => ({ ...p, [k]: v }));

  // Re-open shared links
  useEffect(() => {
    try {
      const d = new URLSearchParams(window.location.search).get("d");
      if (d) { const parsed = { ...DEFAULTS, ...JSON.parse(d) } as Inputs; setInp(parsed); setSnap(parsed); setTimeout(() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300); }
    } catch { /* ignore bad links */ }
  }, []);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    setSnap(inp);
    try { window.history.replaceState(null, "", `${window.location.pathname}?d=${encodeURIComponent(JSON.stringify(inp))}`); } catch { /* ignore */ }
    setTimeout(() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(""), 2200); };
  const regionName = (r: Region) => (r === "scotland" ? "Scotland" : "England, Wales & Northern Ireland");

  /* ----- derived numbers from the snapshot ----- */
  let out: React.ReactNode = null;
  let extra: React.ReactNode = null;
  if (snap) {
    const { gross, r } = run(snap);
    const deductions = r.incomeTax + r.ni + r.pension + r.studentLoan;
    const dRate = gross > 0 ? (deductions / gross) * 100 : 0;
    const taxRate = gross > 0 ? (r.incomeTax / gross) * 100 : 0;
    const niTaxRate = gross > 0 ? ((r.incomeTax + r.ni) / gross) * 100 : 0;
    const taxable = Math.max(0, r.taxable - r.allowance);
    const marginal = (() => { const b = calcSalary({ gross: gross + 100, region: snap.region, plan: snap.plan, pensionPct: 0, blind: snap.blind, over66: snap.over66 }); const a = calcSalary({ gross, region: snap.region, plan: snap.plan, pensionPct: 0, blind: snap.blind, over66: snap.over66 }); return gross > 0 ? (1 - (b.net - a.net) / 100) * 100 : 0; })();
    const badge = dRate < 15 ? { t: "Light overall deductions", c: "#1d4ed8" } : dRate < 30 ? { t: "Moderate overall deductions", c: "#d97706" } : { t: "Heavy overall deductions", c: "#e11d48" };
    const periods: [string, number][] = [["Yearly", 1], ["Monthly", 12], ["Weekly", 52], ["Daily", 260]];
    const rows: { label: string; v: number; tone?: "tax" | "net"; muted?: boolean }[] = [
      { label: "Gross pay", v: gross }, { label: "Personal Allowance", v: r.allowance }, { label: "Taxable income", v: taxable },
      { label: "Income tax", v: r.incomeTax, tone: "tax" }, { label: "National Insurance", v: r.ni },
      { label: "Pension contributions", v: r.pension, muted: r.pension === 0 }, { label: "Student loan repayment", v: r.studentLoan, muted: r.studentLoan === 0 },
      { label: "Take-home pay", v: r.net, tone: "net" },
    ];
    const summaryText = `Income tax summary (2026/27, ${regionName(snap.region)}): gross ${gbp(gross, 0)}, income tax ${gbp(r.incomeTax, 0)}, National Insurance ${gbp(r.ni, 0)}, take-home ${gbp(r.net, 0)} a year (${gbp(r.net / 12, 0)} a month). Overall deductions: ${pct(dRate)}.`;

    // scenarios
    const scenarios: Record<string, { label: string; res: ReturnType<typeof run> }> = {
      pay5: { label: "A 5% pay rise", res: run(snap, {}, 1.05) },
      pay10: { label: "A 10% pay rise", res: run(snap, {}, 1.1) },
      pension5: { label: "5% more into your pension", res: run(snap, snap.pensionUnit === "pct" ? { pensionVal: snap.pensionVal + 5 } : { pensionUnit: "gbp", pensionVal: snap.pensionVal + gross * 0.05 }) },
      region: { label: snap.region === "scotland" ? "English tax rates" : "Scottish tax rates", res: run(snap, { region: snap.region === "scotland" ? "england" : "scotland" }) },
      age: { label: "Being over State Pension age", res: run(snap, { over66: true }) },
    };
    const sc = scenarios[scenario] ?? scenarios.pay5;
    const s = sc.res;
    const dNet = s.r.net - r.net, dTax = s.r.incomeTax - r.incomeTax, dNi = s.r.ni - r.ni;
    const sDed = s.gross > 0 ? ((s.r.incomeTax + s.r.ni + s.r.pension + s.r.studentLoan) / s.gross) * 100 : 0;
    const signed = (n: number) => `${n >= 0 ? "+" : "-"}${gbp(Math.abs(n), 0)}`;

    const other = run(snap, { region: snap.region === "scotland" ? "england" : "scotland" });
    const parts = [
      { label: "Take-home pay", value: r.net, color: TEAL }, { label: "Income tax", value: r.incomeTax, color: "#e11d48" },
      { label: "National Insurance", value: r.ni, color: "#0284c7" }, { label: "Pension", value: r.pension, color: "#f59e0b" },
      { label: "Student loan", value: r.studentLoan, color: "#7c3aed" },
    ];

    out = (
      <div ref={results} className="space-y-6 scroll-mt-24">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Your tax results</h2>
          <p className="text-muted mt-1">Tax year 2026/27 · {regionName(snap.region)}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Gross pay" value={gbp(gross, 0)} note="Yearly income" color="#64748b" />
          <StatCard label="Take-home pay" value={gbp(r.net, 0)} note={`${gbp(r.net / 12, 0)} a month · ${gbp(r.net / 52, 0)} a week`} color="#1d4ed8" />
          <StatCard label="Total deductions" value={gbp(deductions, 0)} note={`${pct(dRate)} of your pay`} color="#e11d48" />
        </div>
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold shadow-sm" style={{ background: tint(badge.c, 12), color: badge.c, border: `1px solid ${tint(badge.c, 35)}` }}>
            <span className="w-3 h-3 rounded-full" style={{ background: badge.c }} /> {badge.t}
          </span>
        </div>

        <div className="rounded-2xl border border-line overflow-hidden shadow-sm">
          <div className="p-5 bg-surface2">
            <h3 className="text-lg font-extrabold flex items-center gap-2"><BarChart3 size={19} style={{ color: TEAL }} /> Payslip-style breakdown</h3>
            <p className="text-sm text-muted">Your pay split across each pay period</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead><tr className="border-y border-line text-muted">
                <th className="text-left font-bold px-5 py-3">Item</th>
                {periods.map(([n]) => <th key={n} className="text-right font-bold px-5 py-3">{n}</th>)}
              </tr></thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0"
                    style={row.tone === "tax" ? { background: tint("#e11d48", 8), color: "#be123c", boxShadow: "inset 4px 0 0 #f43f5e" } : row.tone === "net" ? { background: tint("#1d4ed8", 9), color: "#1e40af", boxShadow: "inset 4px 0 0 #3b82f6" } : undefined}>
                    <td className="px-5 py-3.5">{row.label}</td>
                    {periods.map(([n, d]) => <td key={n} className={`px-5 py-3.5 text-right ${row.muted ? "text-muted" : "font-semibold"}`}>{gbp(row.v / d)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl p-6 text-center no-print" style={{ background: tint(TEAL, 8), border: `1px solid ${tint(TEAL, 26)}` }}>
          <h3 className="font-extrabold">Share or save</h3>
          <p className="text-sm text-muted mt-1">Keep these results for later or send them to someone</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(summaryText); flash("Summary copied"); } catch { flash("Copy not available here"); } }}
              className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-white text-left shadow" style={{ background: TEAL }}>
              <ClipboardCopy size={20} /><span><b className="block leading-tight">Copy summary</b><span className="text-xs opacity-90">Short text version</span></span>
            </button>
            <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); flash("Link copied"); } catch { flash("Copy not available here"); } }}
              className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-white text-left shadow" style={{ background: "#334155" }}>
              <Link2 size={20} /><span><b className="block leading-tight">Copy link</b><span className="text-xs opacity-90">Reopens with your figures</span></span>
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-white text-left shadow" style={{ background: "#b45309" }}>
              <FileDown size={20} /><span><b className="block leading-tight">Save as PDF</b><span className="text-xs opacity-90">Print this report</span></span>
            </button>
          </div>
          {note && <p className="text-sm font-semibold mt-3" style={{ color: TEAL }}>{note}</p>}
        </div>

        <div className="space-y-4">
          <Accordion icon={Target} title="Tax by band" sub="How each slice of your income is taxed" color="#d97706">
            <div className="overflow-x-auto rounded-xl border border-line bg-surface"><table className="w-full text-sm min-w-[420px]">
              <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Band</th><th className="px-4 py-2.5">Income taxed</th><th className="px-4 py-2.5">Tax</th></tr></thead>
              <tbody>
                <tr className="border-t border-line"><td className="px-4 py-2.5">Personal Allowance (0%)</td><td className="px-4 py-2.5">{gbp(Math.min(r.taxable, r.allowance))}</td><td className="px-4 py-2.5">£0.00</td></tr>
                {r.bands.map((b) => <tr key={b.name} className="border-t border-line"><td className="px-4 py-2.5">{b.name}</td><td className="px-4 py-2.5">{gbp(b.amount)}</td><td className="px-4 py-2.5 font-semibold">{gbp(b.tax)}</td></tr>)}
              </tbody>
            </table></div>
          </Accordion>
          <Accordion icon={BarChart3} title="Tax rate summary" sub="Effective and marginal rates explained" color={TEAL}>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-surface p-4 border border-line"><div className="text-xs text-muted">Effective income tax rate</div><div className="text-2xl font-extrabold mt-1">{pct(taxRate)}</div></div>
              <div className="rounded-xl bg-surface p-4 border border-line"><div className="text-xs text-muted">Effective tax and NI rate</div><div className="text-2xl font-extrabold mt-1">{pct(niTaxRate)}</div></div>
              <div className="rounded-xl bg-surface p-4 border border-line"><div className="text-xs text-muted">Rate on your next £1</div><div className="text-2xl font-extrabold mt-1">{pct(marginal)}</div></div>
            </div>
            <p className="text-sm text-muted mt-3 leading-6">The effective rate is your tax divided by your total pay. The rate on your next pound is what would be taken from an extra £1, including tax, National Insurance and any student loan.</p>
          </Accordion>
          <Accordion icon={Globe2} title="England vs Scotland" sub="Same pay, different tax rules" color="#0284c7">
            <div className="overflow-x-auto rounded-xl border border-line bg-surface"><table className="w-full text-sm min-w-[420px]">
              <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5"></th><th className="px-4 py-2.5">England, Wales &amp; NI</th><th className="px-4 py-2.5">Scotland</th></tr></thead>
              <tbody>
                {(() => {
                  const eng = snap.region === "england" ? r : other.r, sco = snap.region === "scotland" ? r : other.r;
                  return ([["Income tax", eng.incomeTax, sco.incomeTax], ["Take-home pay", eng.net, sco.net]] as [string, number, number][]).map(([l, a, b]) => (
                    <tr key={l} className="border-t border-line"><td className="px-4 py-2.5">{l}</td><td className="px-4 py-2.5">{gbp(a)}</td><td className="px-4 py-2.5">{gbp(b)}</td></tr>
                  ));
                })()}
              </tbody>
            </table></div>
          </Accordion>
          <Accordion icon={LineChart} title="Tax rate curve" sub="How your rate changes as pay rises" color="#7c3aed">
            <RateCurve region={snap.region} gross={gross} current={niTaxRate} />
            <p className="text-xs text-muted mt-2">The line shows income tax plus National Insurance as a share of pay. The gold dot marks where you are.</p>
          </Accordion>
        </div>
      </div>
    );

    extra = (
      <>
        <Section icon={Scale} title="Try a different scenario" sub="See how a change would affect your take-home pay" from="#b45309" to="#f59e0b">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-extrabold">What if you had&hellip;</h3>
            <label className="flex items-center gap-2 text-sm text-muted">Compare with
              <select className="field !w-auto !py-2" value={scenario} onChange={(e) => setScenario(e.target.value)}>
                {Object.entries(scenarios).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <StatCard label="Take-home pay" value={signed(dNet)} note={`${pct(r.net > 0 ? (dNet / r.net) * 100 : 0)} change a year`} color="#1d4ed8" />
            <StatCard label="Income tax" value={signed(dTax)} note={`${pct(r.incomeTax > 0 ? (dTax / r.incomeTax) * 100 : 0)} change a year`} color="#e11d48" />
            <StatCard label="Overall deduction rate" value={`${(sDed - dRate) >= 0 ? "+" : "-"}${Math.abs(sDed - dRate).toFixed(1)} pts`} note={`${pct(dRate)} now, ${pct(sDed)} in this scenario`} color="#0284c7" />
          </div>
          <div className="rounded-2xl border border-line p-5 mt-6">
            <h3 className="font-extrabold">Current against scenario</h3>
            <p className="text-sm text-muted mb-3">Yearly amounts in pounds</p>
            <BarCompare bLabel={sc.label} rows={[{ label: "Take-home", a: r.net, b: s.r.net }, { label: "Income tax", a: r.incomeTax, b: s.r.incomeTax }, { label: "NI", a: r.ni, b: s.r.ni }]} />
            <div className="flex justify-center gap-6 text-sm mt-1">
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: TEAL }} /> Now</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: "#f59e0b" }} /> {sc.label}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-surface2 p-5 mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-extrabold mb-2">What changes</h4>
              <ul className="text-sm space-y-1.5 text-muted">
                <li>Take-home pay: <b className="text-ink">{signed(dNet)}</b> a year</li>
                <li>Income tax: <b className="text-ink">{signed(dTax)}</b> a year</li>
                <li>National Insurance: <b className="text-ink">{signed(dNi)}</b> a year</li>
              </ul>
            </div>
            <div>
              <h4 className="font-extrabold mb-2">In short</h4>
              <p className="text-sm text-muted leading-6">With {sc.label.toLowerCase()}, your yearly take-home pay would {dNet >= 0 ? "rise" : "fall"} by <b className="text-ink">{gbp(Math.abs(dNet), 0)}</b>, and your overall deductions would move from {pct(dRate)} to {pct(sDed)} of pay.</p>
            </div>
          </div>
        </Section>

        <Section icon={PieChart} title="Where your pay goes" sub="A visual split of your yearly pay" from="#155e75" to="#1d4ed8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <PieChartSvg parts={parts} />
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-5 text-sm">
                {parts.filter((p) => p.value > 0).map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded" style={{ background: p.color }} />{p.label} · {gbp(p.value, 0)}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">What you are seeing</h4>
                <p className="text-sm text-muted mt-2 leading-6">Each slice is a share of your yearly gross pay: what you keep, the income tax and National Insurance you pay, and any pension or student loan payments.</p></div>
              <div className="rounded-2xl bg-surface2 p-5"><h4 className="font-extrabold">Key points</h4>
                <ul className="text-sm text-muted mt-2 space-y-1.5 leading-6">
                  <li>You keep <b className="text-ink">{pct(gross > 0 ? (r.net / gross) * 100 : 0)}</b> of your pay.</li>
                  <li>Tax and National Insurance take <b className="text-ink">{pct(niTaxRate)}</b>.</li>
                  <li>Pension savings ({gbp(r.pension, 0)}) reduce your taxable income.</li>
                </ul></div>
            </div>
          </div>
        </Section>
      </>
    );
  }

  /* ----- page ----- */
  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto no-print">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Find Out What You Owe in Income Tax</h1>
        <p className="text-muted text-lg leading-8 mt-4">Enter your pay, choose your region and see your income tax, National Insurance, pension and student loan worked out for the 2026/27 tax year.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[{ i: Zap, t: "Instant results" }, { i: Smartphone, t: "Works on any device" }].map(({ i: I, t }) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm shadow-md border border-line"><I size={15} style={{ color: TEAL }} /> {t}</span>
          ))}
        </div>
      </header>

      <section className="card overflow-hidden">
        <div className="px-6 md:px-8 py-6 text-white no-print" style={{ background: "linear-gradient(100deg,#1d4ed8,#3b82f6 55%,#38bdf8)" }}>
          <h2 className="text-2xl font-extrabold flex items-center gap-3"><Calculator size={24} /> Run your numbers</h2>
          <p className="text-white/90 text-sm mt-1">Fill in your details and press Calculate</p>
        </div>
        <div className="grid lg:grid-cols-[360px_1fr]">
          <form onSubmit={calculate} noValidate className="p-6 bg-surface2 lg:border-r border-line no-print">
            <h3 className="font-extrabold text-lg">Your details</h3>
            <p className="text-sm text-muted mb-4">Tell us about your pay and situation</p>
            <div className="rounded-2xl bg-surface p-5 shadow-sm space-y-4">
              <div><label className="label">Tax year</label>
                <select className="field" defaultValue="2026/27"><option value="2026/27">2026/27</option></select></div>
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div><label className="label">Pay (£)</label>
                  <input className="field" type="number" min={0} step={100} value={inp.amount} onFocus={(e) => e.target.select()} onChange={(e) => set("amount", parseFloat(e.target.value) || 0)} /></div>
                <div><label className="label">Paid</label>
                  <select className="field" value={inp.freq} onChange={(e) => set("freq", e.target.value as Freq)}>
                    <option value="year">A year</option><option value="month">A month</option><option value="week">A week</option><option value="day">A day</option></select></div>
              </div>
              <div><label className="label">Region</label>
                <select className="field" value={inp.region} onChange={(e) => set("region", e.target.value as Region)}>
                  <option value="england">England, Wales &amp; N. Ireland</option><option value="scotland">Scotland</option></select></div>
              <div><label className="label">State Pension age</label>
                <select className="field" value={inp.over66 ? "over" : "under"} onChange={(e) => set("over66", e.target.value === "over")}>
                  <option value="under">Under State Pension age</option><option value="over">Reached State Pension age</option></select></div>
              <div className="flex items-center justify-between gap-3">
                <span className="label !mb-0">Registered blind?</span>
                <div className="flex gap-2">
                  {[false, true].map((v) => (
                    <button key={String(v)} type="button" onClick={() => set("blind", v)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold border ${inp.blind === v ? "text-white border-transparent" : "bg-surface2 border-line text-muted"}`}
                      style={inp.blind === v ? { background: TEAL } : undefined}>{v ? "Yes" : "No"}</button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setAdv(!adv)} className="text-sm font-semibold" style={{ color: TEAL }}>{adv ? "Hide extra options" : "Show extra options"}</button>
              {adv && (
                <div className="space-y-4 pt-1">
                  <div><label className="label">Pension contribution</label>
                    <div className="flex gap-2">
                      <select className="field !w-24 shrink-0" value={inp.pensionUnit} onChange={(e) => set("pensionUnit", e.target.value as "pct" | "gbp")}><option value="pct">%</option><option value="gbp">£ a year</option></select>
                      <input className="field" type="number" min={0} step={0.5} value={inp.pensionVal} onFocus={(e) => e.target.select()} onChange={(e) => set("pensionVal", parseFloat(e.target.value) || 0)} />
                    </div></div>
                  <div><label className="label">Student loan plan</label>
                    <select className="field" value={inp.plan} onChange={(e) => set("plan", e.target.value as StudentPlan)}>{PLANS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></div>
                  <div><label className="label">Tax code (optional)</label>
                    <input className="field uppercase" placeholder="e.g. 1257L" value={inp.taxCode} onChange={(e) => set("taxCode", e.target.value)} /></div>
                  <label className="flex items-center gap-2.5 text-sm"><input type="checkbox" className="sal-check" checked={inp.marriage} onChange={(e) => set("marriage", e.target.checked)} /> I receive Marriage Allowance</label>
                </div>
              )}
              <button type="submit" className="w-full rounded-xl py-3.5 font-bold text-white shadow-md" style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}>Calculate</button>
            </div>
          </form>

          <div className="p-6 md:p-8">
            {out ?? (
              <div className="h-full min-h-[320px] grid place-items-center text-center text-muted border-2 border-dashed border-line rounded-2xl p-8">
                <div><Landmark size={40} className="mx-auto mb-3" style={{ color: TEAL }} />Your results will appear here once you press <b className="text-ink">Calculate</b>.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {extra}
      <TaxBandsReference />
      <Understanding blind={BLIND_ALLOWANCE} />
    </div>
  );
}

/* ---------- educational block ---------- */
function Understanding({ blind }: { blind: number }) {
  const bands = incomeTax(1e9, "england");
  void bands;
  return (
    <Section icon={BookOpen} title="Understanding UK income tax" sub="How the system works and what changes your take-home pay" from="#1f3b38" to="#345a55">
      <div className="space-y-8 text-[15px] leading-7">
        <div>
          <h3 className="text-lg font-extrabold mb-2">How income tax works in 2026/27</h3>
          <p>Income tax in the UK is <b>progressive</b>: each slice of your income is taxed at its own rate, so earning more never means your whole pay is taxed at the top rate.</p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-muted">
            <li><b className="text-ink">£12,570</b> Personal Allowance, tax-free (it shrinks once income passes £100,000)</li>
            <li><b className="text-ink">20%</b> basic rate on the next slice up to £50,270</li>
            <li><b className="text-ink">40%</b> higher rate from £50,271 to £125,140</li>
            <li><b className="text-ink">45%</b> additional rate above £125,140</li>
            <li>Scotland uses its own bands, from <b className="text-ink">19% to 48%</b></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-extrabold mb-2">What this calculator covers</h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-muted">
            {["Income tax for England, Wales, Northern Ireland and Scotland", "Employee National Insurance (Class 1)", "Pension contributions taken before tax", "Student loan plans 1, 2, 4, 5 and postgraduate", "Tax codes such as 1257L, BR, D0 and K codes", `Blind Person's Allowance (+${gbp(blind, 0)})`, "Marriage Allowance (£252 tax saving)", "Over State Pension age (no NI)"].map((t) => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-1 shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div><h3 className="text-lg font-extrabold mb-2">Who it helps</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted"><li>Employees paid through PAYE</li><li>Contractors checking a day rate against a salary</li><li>Anyone comparing a job offer with what they earn now</li></ul></div>
          <div><h3 className="text-lg font-extrabold mb-2">Regions covered</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted"><li><b className="text-ink">England, Wales and Northern Ireland</b>: the standard UK bands</li><li><b className="text-ink">Scotland</b>: the Scottish income tax bands</li></ul></div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold mb-3">Common questions</h3>
          <div className="space-y-4">
            {[
              ["How is my income tax worked out?", "Your Personal Allowance comes off first. The rest of your income is then split across the bands, and each part is taxed at that band's rate."],
              ["What if I earn more than £100,000?", "Your Personal Allowance drops by £1 for every £2 above £100,000 and disappears completely at £125,140, which is why the effective rate jumps in that range."],
              ["Do pension payments reduce my tax?", "Yes. Money paid into a pension through your employer's payroll comes off before tax, so your taxable income is lower."],
              ["Is my data stored?", "No. Every calculation runs in your browser. If you use Copy link, your figures are placed in the link itself, not on a server."],
            ].map(([q, a]) => <div key={q}><div className="font-bold">{q}</div><p className="text-muted">{a}</p></div>)}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold mb-2">More tools</h3>
          <ul className="space-y-1.5">
            {[["/tools/gross-salary-calculator", "Gross salary from net pay", "work backwards from the pay you want"], ["/tools/capital-gains-tax-calculator", "Capital gains tax", "for shares, property and other assets"], ["/tools/inheritance-tax-calculator", "Inheritance tax", "estimate what an estate might owe"], ["/tools/vehicle-tax-calculator", "Vehicle tax", "road tax for cars"]].map(([h, t, d]) => (
              <li key={h}><Link href={h} className="font-semibold underline" style={{ color: TEAL }}>{t}</Link> <span className="text-muted">– {d}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-surface2 border border-line p-4 text-sm">
          <div className="font-bold mb-1">Where to check the official figures</div>
          <ul className="space-y-0.5">
            <li><a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GOV.UK: Income Tax rates and Personal Allowances</a></li>
            <li><a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GOV.UK: National Insurance rates and categories</a></li>
            <li><a href="https://www.gov.uk/scottish-income-tax" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GOV.UK: Scottish Income Tax rates</a></li>
          </ul>
          <p className="text-xs text-muted mt-2">These results are estimates for general guidance and are not financial advice. Always confirm important figures with an official source.</p>
          <p className="text-xs text-muted mt-2">Rates last reviewed: 30 September 2026 · Built around the 2026/27 UK tax year</p>
        </div>
      </div>
    </Section>
  );
}
