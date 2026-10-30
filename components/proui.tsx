"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { BookOpen, CheckCircle2, ChevronDown, ClipboardCopy, FileDown, Link2, Plus, Share2, Smartphone, Zap } from "lucide-react";
import { gbp } from "@/lib/tax";
import { CONTENT } from "@/lib/content";

/** Shared "Pro" design kit — the same visual language used by SalaryPro and IncomeTaxPro,
 *  factored out so every calculator can get the same premium look. */

export const tint = (c: string, pct = 14) => `color-mix(in srgb, ${c} ${pct}%, var(--surface))`;

export function Tile({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl p-4 flex items-start gap-3 shadow-sm" style={{ background: tint(color, 10), border: `1px solid ${tint(color, 28)}` }}>
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface shrink-0" style={{ color }}><Icon size={18} /></span>
      <div className="min-w-0 ml-auto text-right">
        <div className="text-[11px] uppercase tracking-wide text-muted leading-tight">{label}</div>
        <div className="text-lg md:text-xl font-extrabold mt-1 break-words">{value}</div>
      </div>
    </div>
  );
}

export function Block({ icon: Icon, title, color, children, className = "" }: { icon: any; title: string; color: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`card p-5 md:p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <span className="grid place-items-center w-9 h-9 rounded-xl" style={{ background: tint(color, 16), color }}><Icon size={17} /></span>
        <h3 className="text-lg font-extrabold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function ProFormHeader({ icon: Icon, title, subtitle, color, updating }: { icon: any; title: string; subtitle: string; color: string; updating: boolean }) {
  return updating ? (
    <h2 className="text-2xl font-extrabold" style={{ color }}>Update your calculation</h2>
  ) : (
    <div className="flex items-center gap-4">
      <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0" style={{ background: tint(color, 16), color }}><Icon size={22} /></span>
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color }}>{title}</h1>
        <p className="text-sm text-muted mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export function FormPanel({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 rounded-[1.25rem] p-6" style={{ background: tint(color, 7), border: `1px solid ${tint(color, 25)}` }}>
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-9 h-9 rounded-xl text-white" style={{ background: color }}><Icon size={17} /></span>
        <h2 className="font-extrabold text-lg">{title}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 mt-5">{children}</div>
    </div>
  );
}

export function SubmitButton({ label, color, to }: { label: string; color: string; to?: string }) {
  return (
    <div className="flex justify-center mt-8">
      <button type="submit" className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-lg font-bold text-white shadow-lg" style={{ background: `linear-gradient(90deg,${color},${to ?? tint(color, 60)})` }}>
        {label}
      </button>
    </div>
  );
}

export function ResultIntro({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6 md:p-8">
      <h2 className="text-2xl md:text-4xl font-extrabold" style={{ color }}>{title}</h2>
      <div className="mt-4 leading-7">{children}</div>
    </section>
  );
}

export function ResultsCard({ children }: { children: React.ReactNode }) {
  return <section className="card p-4 md:p-8">{children}</section>;
}

export function Hero({ icon: Icon, eyebrow, value, sub, from, to }: { icon: any; eyebrow: string; value: string; sub?: React.ReactNode; from: string; to: string }) {
  return (
    <div className="rounded-3xl text-white text-center px-6 py-12 shadow-2xl" style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}>
      <span className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-white/20"><Icon size={30} /></span>
      <div className="mt-5 text-sm font-semibold tracking-widest uppercase text-white/80">{eyebrow}</div>
      <div className="text-5xl md:text-7xl font-extrabold mt-3 break-words">{value}</div>
      {sub && <div className="mt-4 text-sm text-white/85">{sub}</div>}
    </div>
  );
}

export function ShareButton({ text, color = "#3b82f6" }: { text: string; color?: string }) {
  const [shared, setShared] = useState(false);
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setShared(true); setTimeout(() => setShared(false), 2000); }
    } catch { /* cancelled */ }
  };
  return (
    <div className="flex justify-center mt-6">
      <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5 transition" style={{ borderColor: tint(color, 40), color, background: tint(color, 8) }}>
        <Share2 size={16} /> {shared ? "Link copied" : "Share result"}
      </button>
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return <div className="card p-8 text-center text-muted border-dashed">Fill in your details above and press <b className="text-ink">{label}</b> to see the breakdown.</div>;
}

export function FaqBlock({ color, faqs }: { color: string; faqs: { q: string; a: string }[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="card p-6 md:p-8">
      <h2 className="text-2xl font-extrabold" style={{ color }}>Questions about this calculator</h2>
      <div className="mt-4 divide-y divide-line">
        {faqs.map((f) => (
          <details key={f.q} className="py-3 group">
            <summary className="cursor-pointer font-semibold flex items-center justify-between gap-4 list-none">
              {f.q}<ChevronDown size={18} className="shrink-0 text-muted transition group-open:rotate-180" />
            </summary>
            <p className="text-muted mt-2 leading-7">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function MoreTools({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="card p-5">
      <div className="font-extrabold">More tools to try</div>
      <div className="flex flex-wrap gap-3 mt-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-lg bg-surface border border-line px-4 py-2 text-sm font-medium shadow-sm hover:border-accent transition">{l.label}</Link>
        ))}
      </div>
    </section>
  );
}

export function Disclaimer() {
  return (
    <div className="rounded-xl bg-surface2 p-5 text-sm" style={{ borderLeft: "4px solid #f43f5e" }}>
      <div className="font-bold" style={{ color: "#be123c" }}>Please note</div>
      <p className="text-muted mt-1">These results are estimates for general guidance and are not financial or tax advice. Your own figures may differ because of your circumstances, provider terms or later changes to tax rules. For official information visit GOV.UK.</p>
    </div>
  );
}

export function Row({ label, value, strong, neg }: { label: string; value: string; strong?: boolean; neg?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 px-5 py-3 border-b border-line last:border-0 ${strong ? "font-bold" : ""}`}>
      <dt className="text-muted">{label}</dt>
      <dd className={neg ? "text-rose-500" : ""}>{value}</dd>
    </div>
  );
}

export function RowsTable({ rows, title }: { rows: { label: string; value: string; strong?: boolean; neg?: boolean }[]; title?: string }) {
  return (
    <div className="rounded-xl border border-line overflow-hidden">
      {title && <div className="px-5 py-3 font-semibold border-b border-line bg-surface2">{title}</div>}
      <dl>{rows.map((r, i) => <Row key={i} {...r} />)}</dl>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* IncomeTaxPro-style building blocks — the split form/results layout,    */
/* stat cards, accordions and charts used by the Income Tax Calculator.   */
/* ---------------------------------------------------------------------- */

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="text-center max-w-3xl mx-auto no-print">
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{title}</h1>
      <p className="text-muted text-lg leading-8 mt-4">{subtitle}</p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[{ i: Zap, t: "Instant results" }, { i: Smartphone, t: "Works on any device" }].map(({ i: I, t }) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm shadow-md border border-line"><I size={15} style={{ color: "#1d4ed8" }} /> {t}</span>
        ))}
      </div>
    </header>
  );
}

export function RunCard({ icon: Icon, from, to, formTitle, formSub, submitLabel, onSubmit, form, children }: {
  icon: any; from: string; to: string; formTitle: string; formSub: string; submitLabel: string;
  onSubmit: (e: React.FormEvent) => void; form: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="px-6 md:px-8 py-6 text-white no-print" style={{ background: `linear-gradient(100deg, ${from}, ${to})` }}>
        <h2 className="text-2xl font-extrabold flex items-center gap-3"><Icon size={24} /> Run your numbers</h2>
        <p className="text-white/90 text-sm mt-1">Fill in your details and press Calculate</p>
      </div>
      <div className="grid lg:grid-cols-[360px_1fr]">
        <form onSubmit={onSubmit} className="p-6 bg-surface2 lg:border-r border-line no-print">
          <h3 className="font-extrabold text-lg">{formTitle}</h3>
          <p className="text-sm text-muted mb-4">{formSub}</p>
          <div className="rounded-2xl bg-surface p-5 shadow-sm space-y-4">
            {form}
            <button type="submit" className="w-full rounded-xl py-3.5 font-bold text-white shadow-md" style={{ background: `linear-gradient(90deg,${from},${to})` }}>{submitLabel}</button>
          </div>
        </form>
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </section>
  );
}

export function EmptyResults({ icon: Icon, color, label }: { icon: any; color: string; label: string }) {
  return (
    <div className="h-full min-h-[320px] grid place-items-center text-center text-muted border-2 border-dashed border-line rounded-2xl p-8">
      <div><Icon size={40} className="mx-auto mb-3" style={{ color }} />Your results will appear here once you press <b className="text-ink">{label}</b>.</div>
    </div>
  );
}

export function StatCard({ label, value, note, color }: { label: string; value: string; note: string; color: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: tint(color, 8), border: `1px solid ${tint(color, 30)}` }}>
      <div className="text-sm font-medium" style={{ color }}>{label}</div>
      <div className="text-3xl font-extrabold mt-1.5 break-words" style={{ color: "var(--text)" }}>{value}</div>
      <div className="text-sm text-muted mt-1">{note}</div>
    </div>
  );
}

export function Section({ icon: Icon, title, sub, from, to, children }: { icon: any; title: string; sub: string; from: string; to: string; children: React.ReactNode }) {
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

export function Accordion({ icon: Icon, title, sub, color, children }: { icon: any; title: string; sub: string; color: string; children: React.ReactNode }) {
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

export function ShareSaveBar({ color, summaryText }: { color: string; summaryText: string }) {
  const [note, setNote] = useState("");
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(""), 2200); };
  return (
    <div className="rounded-2xl p-6 text-center no-print" style={{ background: tint(color, 8), border: `1px solid ${tint(color, 26)}` }}>
      <h3 className="font-extrabold">Share or save</h3>
      <p className="text-sm text-muted mt-1">Keep these results for later or send them to someone</p>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(summaryText); flash("Summary copied"); } catch { flash("Copy not available here"); } }}
          className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-white text-left shadow" style={{ background: color }}>
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
      {note && <p className="text-sm font-semibold mt-3" style={{ color }}>{note}</p>}
    </div>
  );
}

export function PieChartSvg({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const cx = 110, cy = 110, R = 100;
  if (total <= 0) return <div className="text-muted text-sm">Enter your details to see the split.</div>;
  let a0 = -Math.PI / 2;
  const shown = parts.filter((p) => p.value > 0);
  return (
    <svg viewBox="0 0 220 220" className="w-56 h-56 mx-auto" role="img" aria-label="Breakdown split">
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

export function BarCompare({ rows, aLabel, bLabel, color, otherColor = "#f59e0b" }: {
  rows: { label: string; a: number; b: number }[]; aLabel: string; bLabel: string; color: string; otherColor?: string;
}) {
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
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Comparison">
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
                fill={hover?.i === i ? `color-mix(in srgb, ${color} 10%, transparent)` : "transparent"}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => point(i, e)} onMouseMove={(e) => point(i, e)} onClick={(e) => point(i, e)} />
              <rect x={x0} y={H - padB - h(r.a)} width={bw} height={h(r.a)} rx="6" fill={color} pointerEvents="none" />
              <rect x={x0 + bw + 6} y={H - padB - h(r.b)} width={bw} height={h(r.b)} rx="6" fill={otherColor} pointerEvents="none" />
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
          <div className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 text-muted"><span className="w-2.5 h-2.5 rounded" style={{ background: color }} />{aLabel}</span><b>{gbp(hr.a, 0)}</b></div>
          <div className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 text-muted"><span className="w-2.5 h-2.5 rounded" style={{ background: otherColor }} />{bLabel}</span><b>{gbp(hr.b, 0)}</b></div>
          <div className="flex items-center justify-between gap-4 mt-1.5 pt-1.5 border-t border-line">
            <span className="text-muted">Difference</span>
            <b style={{ color: diff === 0 ? "var(--muted)" : diff > 0 ? "#1d4ed8" : "#e11d48" }}>{diff >= 0 ? "+" : "-"}{gbp(Math.abs(diff), 0)} ({diffPct >= 0 ? "+" : ""}{diffPct.toFixed(1)}%)</b>
          </div>
        </div>
      )}
    </div>
  );
}

const DEFAULT_SOURCES = [
  { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK: National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
];

/** The closing "Understanding X" education block used by every calculator: how it works,
 *  what it covers, common questions (pulled from lib/content.ts) and links to related tools. */
export function Understanding({ slug, color, from, to, title, points, more, sources = DEFAULT_SOURCES }: {
  slug: string; color: string; from: string; to: string; title: string; points: string[];
  more: { href: string; label: string; sub: string }[]; sources?: { label: string; href: string }[];
}) {
  const content = CONTENT[slug];
  return (
    <Section icon={BookOpen} title={title} sub="What this calculator covers and how the numbers are worked out" from={from} to={to}>
      <div className="space-y-8 text-[15px] leading-7">
        <div>
          <h3 className="text-lg font-extrabold mb-2">How it works</h3>
          {content.how.map((p, i) => <p key={i} className="text-muted mt-2 first:mt-0">{p}</p>)}
        </div>
        <div>
          <h3 className="text-lg font-extrabold mb-2">What this calculator covers</h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-muted">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 mt-1 shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-extrabold mb-3">Common questions</h3>
          <div className="space-y-4">
            {content.faqs.map((f) => <div key={f.q}><div className="font-bold">{f.q}</div><p className="text-muted">{f.a}</p></div>)}
          </div>
        </div>
        {more.length > 0 && (
          <div>
            <h3 className="text-lg font-extrabold mb-2">More tools</h3>
            <ul className="space-y-1.5">
              {more.map((m) => (
                <li key={m.href}><Link href={m.href} className="font-semibold underline" style={{ color }}>{m.label}</Link> <span className="text-muted">– {m.sub}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-xl bg-surface2 border border-line p-4 text-sm">
          <div className="font-bold mb-1">Where to check the official figures</div>
          <ul className="space-y-0.5">
            {sources.map((s) => (
              <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color }}>{s.label}</a></li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-2">These results are estimates for general guidance and are not financial advice. Always confirm important figures with an official source.</p>
          <p className="text-xs text-muted mt-2">Rates last reviewed: 2 October 2026 · Built around the 2026/27 UK tax year</p>
        </div>
      </div>
    </Section>
  );
}

const ENGLAND_BANDS = [
  { band: "Personal Allowance", range: "Up to £12,570", rate: "0%" },
  { band: "Basic rate", range: "£12,571 to £50,270", rate: "20%" },
  { band: "Higher rate", range: "£50,271 to £125,140", rate: "40%" },
  { band: "Additional rate", range: "Over £125,140", rate: "45%" },
];
const SCOTLAND_BANDS = [
  { band: "Personal Allowance", range: "Up to £12,570", rate: "0%" },
  { band: "Starter rate", range: "£12,571 to £16,537", rate: "19%" },
  { band: "Basic rate", range: "£16,538 to £29,526", rate: "20%" },
  { band: "Intermediate rate", range: "£29,527 to £43,662", rate: "21%" },
  { band: "Higher rate", range: "£43,663 to £75,000", rate: "42%" },
  { band: "Advanced rate", range: "£75,001 to £125,140", rate: "45%" },
  { band: "Top rate", range: "Over £125,140", rate: "48%" },
];

/** Static reference table of the full 2026/27 Income Tax bands — not tied to the user's own
 *  numbers, just the published rates, so the page has real reference content even before a
 *  calculation is run. */
export function TaxBandsReference() {
  const [tab, setTab] = useState<"england" | "scotland">("england");
  const rows = tab === "england" ? ENGLAND_BANDS : SCOTLAND_BANDS;
  return (
    <Block icon={BookOpen} title="2026/27 Income Tax bands" color="#1d4ed8">
      <div className="flex gap-2 mb-4">
        <button type="button" onClick={() => setTab("england")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold border ${tab === "england" ? "text-white border-transparent" : "bg-surface2 border-line text-muted"}`}
          style={tab === "england" ? { background: "#1d4ed8" } : undefined}>England, Wales &amp; NI</button>
        <button type="button" onClick={() => setTab("scotland")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold border ${tab === "scotland" ? "text-white border-transparent" : "bg-surface2 border-line text-muted"}`}
          style={tab === "scotland" ? { background: "#1d4ed8" } : undefined}>Scotland</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm min-w-[420px]">
          <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Band</th><th className="px-4 py-2.5">Taxable income</th><th className="px-4 py-2.5">Rate</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.band} className="border-t border-line"><td className="px-4 py-2.5">{r.band}</td><td className="px-4 py-2.5">{r.range}</td><td className="px-4 py-2.5 font-semibold">{r.rate}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Personal Allowance reduces by £1 for every £2 earned above £100,000, reaching £0 at £125,140. Employee National Insurance is separate: 8% between £12,570 and £50,270, then 2% above that.</p>
    </Block>
  );
}

const NI_BANDS = [
  { band: "Below the Primary Threshold", range: "Up to £12,570", rate: "0%" },
  { band: "Main rate", range: "£12,571 to £50,270", rate: "8%" },
  { band: "Above the Upper Earnings Limit", range: "Over £50,270", rate: "2%" },
];

/** Static reference table of the 2026/27 employee Class 1 National Insurance rates. */
export function NIBandsReference() {
  return (
    <Block icon={BookOpen} title="2026/27 National Insurance rates" color="#059669">
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm min-w-[420px]">
          <thead><tr className="bg-surface2 text-left"><th className="px-4 py-2.5">Band</th><th className="px-4 py-2.5">Annual earnings</th><th className="px-4 py-2.5">Rate</th></tr></thead>
          <tbody>
            {NI_BANDS.map((r) => (
              <tr key={r.band} className="border-t border-line"><td className="px-4 py-2.5">{r.band}</td><td className="px-4 py-2.5">{r.range}</td><td className="px-4 py-2.5 font-semibold">{r.rate}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted mt-3">Employee Class 1 National Insurance stops once you reach State Pension age. Income Tax is worked out separately, on different bands.</p>
    </Block>
  );
}
