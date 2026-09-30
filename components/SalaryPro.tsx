"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowDownToLine, CalendarDays, Calculator, CheckCircle2, ChevronDown, Eye, Info, Percent,
  PoundSterling, Share2, ShieldCheck, SlidersHorizontal, UserRound, Users, Wallet, Table2, Layers,
} from "lucide-react";
import { calcSalary, gbp, type Region, type StudentPlan } from "@/lib/tax";
import { PLANS } from "./ui";

const FREQ = { year: 1, month: 12, week: 52, day: 260 } as const;
type Freq = keyof typeof FREQ;
type Result = ReturnType<typeof calcSalary>;
interface Snap { r: Result; region: Region; blind: boolean; over66: boolean; marriage: boolean; taxCode: string; plan: StudentPlan }

const TEAL = "#3b82f6";
const tint = (c: string, pct = 14) => `color-mix(in srgb, ${c} ${pct}%, var(--surface))`;

function Tile({ icon: Icon, label, value, color }: { icon: typeof Wallet; label: string; value: string; color: string }) {
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

function Block({ icon: Icon, title, color, children, className = "" }: { icon: typeof Wallet; title: string; color: string; children: React.ReactNode; className?: string }) {
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

export function SalaryPro() {
  const [amount, setAmount] = useState(0);
  const [freq, setFreq] = useState<Freq>("year");
  const [region, setRegion] = useState<Region>("england");
  const [open, setOpen] = useState(false);
  const [pensionUnit, setPensionUnit] = useState<"pct" | "gbp">("pct");
  const [pensionVal, setPensionVal] = useState(0);
  const [plan, setPlan] = useState<StudentPlan>("none");
  const [taxCode, setTaxCode] = useState("");
  const [blind, setBlind] = useState(false);
  const [over66, setOver66] = useState(false);
  const [marriage, setMarriage] = useState(false);
  const [snap, setSnap] = useState<Snap | null>(null);
  const [shared, setShared] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const gross = amount * FREQ[freq];
    const r = calcSalary({
      gross, region, plan, taxCode, blind, over66, marriage,
      pensionPct: pensionUnit === "pct" ? pensionVal : 0,
      pensionAmount: pensionUnit === "gbp" ? pensionVal : undefined,
    });
    setSnap({ r, region, blind, over66, marriage, taxCode, plan });
    setTimeout(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const share = async () => {
    if (!snap) return;
    const text = `On a ${gbp(snap.r.gross, 0)} salary I would take home about ${gbp(snap.r.net, 0)} a year (2026/27).`;
    try {
      if (navigator.share) await navigator.share({ text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setShared(true); setTimeout(() => setShared(false), 2000); }
    } catch { /* cancelled */ }
  };

  const form = (
    <form className="sal-card" onSubmit={submit}>
      {snap ? (
        <h2 className="text-2xl font-extrabold" style={{ color: "#1d4ed8" }}>Update your calculation</h2>
      ) : (
        <div className="flex items-center gap-4">
          <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0" style={{ background: tint(TEAL, 16), color: TEAL }}><Calculator size={22} /></span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: "#1d4ed8" }}>Take-Home Pay Calculator 2026/27</h1>
            <p className="text-sm text-muted mt-1">See what lands in your bank account after tax, National Insurance and other deductions.</p>
          </div>
        </div>
      )}

      <div className="sal-panel mt-7">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-9 h-9 rounded-xl text-white" style={{ background: TEAL }}><PoundSterling size={17} /></span>
          <h2 className="font-extrabold text-lg">Your pay details</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 mt-5">
          <div>
            <label className="label flex items-center gap-1.5">Gross pay
              <span title="Your pay before tax and other deductions are taken off"><Info size={14} style={{ color: TEAL }} /></span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted">£</span>
              <input className="field sal-input" style={{ paddingLeft: "2.3rem" }} type="number" min={0} step={100} value={amount}
                onFocus={(e) => e.target.select()} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <label className="label">Pay period</label>
            <select className="field sal-input" value={freq} onChange={(e) => setFreq(e.target.value as Freq)}>
              <option value="year">Per year</option><option value="month">Per month</option>
              <option value="week">Per week</option><option value="day">Per day</option>
            </select>
          </div>
          <div>
            <label className="label">Tax year</label>
            <select className="field sal-input" defaultValue="2026/27"><option value="2026/27">2026/27</option></select>
          </div>
          <div>
            <label className="label">Tax region</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setRegion("england")} className={`sal-seg ${region === "england" ? "sal-seg-on" : ""}`}>England, Wales &amp; NI</button>
              <button type="button" onClick={() => setRegion("scotland")} className={`sal-seg ${region === "scotland" ? "sal-seg-on" : ""}`}>Scotland</button>
            </div>
          </div>
        </div>
      </div>

      <div className="sal-adv mt-6">
        <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 text-left" aria-expanded={open}>
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface2 text-muted shrink-0"><SlidersHorizontal size={17} /></span>
          <span className="flex-1">
            <span className="block font-bold">More options</span>
            <span className="block text-sm text-muted">Pension, student loan, tax code and allowances</span>
          </span>
          <span className="grid place-items-center w-8 h-8 rounded-full shrink-0" style={{ background: tint(TEAL, 16), color: TEAL }}>
            <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
          </span>
        </button>
        {open && (
          <div className="mt-5 pt-5 border-t border-line grid gap-5 md:grid-cols-2">
            <div>
              <label className="label">Pension contribution</label>
              <div className="flex gap-2">
                <select className="field sal-input !w-28 shrink-0" value={pensionUnit} onChange={(e) => setPensionUnit(e.target.value as "pct" | "gbp")}>
                  <option value="pct">%</option><option value="gbp">£ a year</option>
                </select>
                <input className="field sal-input" type="number" min={0} step={0.5} value={pensionVal}
                  onFocus={(e) => e.target.select()} onChange={(e) => setPensionVal(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div>
              <label className="label">Student loan plan</label>
              <select className="field sal-input" value={plan} onChange={(e) => setPlan(e.target.value as StudentPlan)}>
                {PLANS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Tax code (optional)</label>
              <input className="field sal-input uppercase" value={taxCode} onChange={(e) => setTaxCode(e.target.value)} placeholder="e.g. 1257L" />
            </div>
            <div className="grid gap-3 content-start pt-1 text-sm">
              <label className="flex items-center gap-2.5"><input type="checkbox" className="sal-check" checked={blind} onChange={(e) => setBlind(e.target.checked)} /> I claim Blind Person&apos;s Allowance</label>
              <label className="flex items-center gap-2.5"><input type="checkbox" className="sal-check" checked={over66} onChange={(e) => setOver66(e.target.checked)} /> Over State Pension age (no NI)</label>
              <label className="flex items-center gap-2.5"><input type="checkbox" className="sal-check" checked={marriage} onChange={(e) => setMarriage(e.target.checked)} /> I receive Marriage Allowance</label>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button type="submit" className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-lg font-bold text-white shadow-lg" style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}>
          <Calculator size={20} /> Work out my pay
        </button>
      </div>
    </form>
  );

  // ---------- Results (built from the snapshot taken when the button was pressed) ----------
  let results: React.ReactNode = null;
  if (snap) {
    const { r } = snap;
    const gross = r.gross;
    const effective = gross > 0 ? (r.incomeTax / gross) * 100 : 0;
    const other = r.pension + r.studentLoan;
    const regionName = snap.region === "scotland" ? "Scotland" : "England, Wales & NI";
    const periods: [string, number][] = [["Yearly", 1], ["Monthly", 12], ["Weekly", 52], ["Daily", 260]];
    const applied: string[] = [];
    if (r.allowance > 0) applied.push(`Tax-free allowance of ${gbp(r.allowance, 0)}`);
    if (snap.blind) applied.push("Blind Person's Allowance added to your tax-free amount");
    if (snap.marriage && r.incomeTax >= 0) applied.push("Marriage Allowance saving applied to your tax");
    if (snap.taxCode.trim()) applied.push(`Tax code ${snap.taxCode.trim().toUpperCase()} used for your allowance`);
    if (r.pension > 0) applied.push(`Pension contribution of ${gbp(r.pension, 0)} taken before tax`);
    if (r.studentLoan > 0) applied.push(`Student loan repayment of ${gbp(r.studentLoan, 0)}`);
    if (snap.over66) applied.push("Over State Pension age: no National Insurance charged");

    results = (
      <div ref={top} className="space-y-6 scroll-mt-24">
        <nav aria-label="Breadcrumb" className="hidden" />
        <section className="card p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-extrabold" style={{ color: "#1d4ed8" }}>{gbp(gross, 0)} a year after tax in the UK (2026/27)</h2>
          <p className="mt-4 leading-7">
            On a gross salary of <b>{gbp(gross, 0)}</b> in the 2026/27 tax year you would take home about <b>{gbp(r.net, 0)}</b> a year, which works out at
            <b> {gbp(r.net / 12, 0)}</b> a month. That figure already allows for <b>income tax</b>, <b>National Insurance</b> and any extras you added.
          </p>
          <p className="text-sm text-muted mt-3"><b>Tax year:</b> 2026/27 &nbsp;|&nbsp; <b>Region:</b> {regionName}</p>
        </section>

        <section className="card p-4 md:p-8">
          <div className="rounded-3xl text-white text-center px-6 py-12 shadow-2xl" style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 55%,#38bdf8 100%)" }}>
            <span className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-white/20"><Wallet size={30} /></span>
            <div className="mt-5 text-sm font-semibold tracking-widest uppercase text-emerald-50">Your yearly take-home pay</div>
            <div className="text-5xl md:text-7xl font-extrabold mt-3 break-words">{gbp(r.net, 2)}</div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-5 text-sm text-emerald-50">
              <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-300" /> Net pay</span>
              <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-300" /> After tax &amp; NI</span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5 transition" style={{ borderColor: tint(TEAL, 40), color: TEAL, background: tint(TEAL, 8) }}>
              <Share2 size={16} /> {shared ? "Link copied" : "Share result"}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mt-8">
            <div className="space-y-6">
              <Block icon={Wallet} title="Where your pay goes" color={TEAL}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Tile icon={Wallet} label="Gross pay" value={gbp(gross, 0)} color="#3b82f6" />
                  <Tile icon={CheckCircle2} label="Tax-free amount" value={gbp(r.allowance, 0)} color="#1d4ed8" />
                  <Tile icon={ArrowDownToLine} label="Income tax" value={gbp(r.incomeTax, 0)} color="#e11d48" />
                  <Tile icon={ShieldCheck} label="National Insurance" value={gbp(r.ni, 0)} color="#0284c7" />
                  <Tile icon={Eye} label="Taxable income" value={gbp(Math.max(0, r.taxable - r.allowance), 0)} color="#d97706" />
                  <Tile icon={Percent} label="Effective tax rate" value={`${effective.toFixed(2)}%`} color="#7c3aed" />
                </div>
              </Block>
              <Block icon={Layers} title="Allowances and deductions used" color="#1d4ed8">
                {applied.length === 0 ? (
                  <p className="text-sm text-muted flex items-center gap-2"><UserRound size={16} /> No extra allowances or deductions were applied.</p>
                ) : (
                  <ul className="space-y-2.5 text-sm">
                    {applied.map((a) => <li key={a} className="flex items-start gap-2.5"><CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />{a}</li>)}
                  </ul>
                )}
              </Block>
            </div>

            <div className="space-y-6">
              <Block icon={CalendarDays} title="Your pay by period" color="#7c3aed">
                <div className="overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-sm min-w-[460px]">
                    <thead><tr className="bg-surface2 text-left">
                      {["Period", "Gross", "Tax", "NI", "Other", "Take-home"].map((h) => <th key={h} className="px-3 py-2.5 font-bold">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {periods.map(([name, d]) => (
                        <tr key={name} className="border-t border-line">
                          <td className="px-3 py-2.5">{name}</td>
                          <td className="px-3 py-2.5">{gbp(gross / d)}</td>
                          <td className="px-3 py-2.5">{gbp(r.incomeTax / d)}</td>
                          <td className="px-3 py-2.5">{gbp(r.ni / d)}</td>
                          <td className="px-3 py-2.5">{gbp(other / d)}</td>
                          <td className="px-3 py-2.5 font-bold">{gbp(r.net / d)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted mt-3">&ldquo;Other&rdquo; covers pension and student loan. Daily figures assume 260 working days.</p>
              </Block>
              <Block icon={Table2} title="Income tax by band" color="#e11d48">
                <div className="overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface2 text-left"><th className="px-3 py-2.5">Band</th><th className="px-3 py-2.5">Income taxed</th><th className="px-3 py-2.5">Tax</th></tr></thead>
                    <tbody>
                      {r.bands.length === 0 ? (
                        <tr className="border-t border-line"><td colSpan={3} className="px-3 py-3 text-muted">{snap.taxCode.trim() && ["NT"].includes(snap.taxCode.trim().toUpperCase()) ? "No tax is deducted with this tax code." : "No income tax is due at this level."}</td></tr>
                      ) : r.bands.map((b) => (
                        <tr key={b.name} className="border-t border-line"><td className="px-3 py-2.5">{b.name}</td><td className="px-3 py-2.5">{gbp(b.amount)}</td><td className="px-3 py-2.5 font-semibold">{gbp(b.tax)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Block>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface2 p-5 flex gap-4">
            <span className="grid place-items-center w-10 h-10 rounded-xl shrink-0" style={{ background: tint("#0284c7", 16), color: "#0284c7" }}><Info size={18} /></span>
            <div>
              <div className="font-bold">Good to know</div>
              <p className="text-sm text-muted mt-1">These figures come from the details you entered for the 2026/27 tax year. Real payslips can differ because of bonuses, benefits in kind, salary sacrifice or changes to your tax code.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 2026/27 rates</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /> Estimate only</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Check gov.uk for official rates</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---------- FAQs ----------
  const r0 = snap?.r;
  const faqs = [
    {
      q: r0 ? `How much is ${gbp(r0.gross, 0)} a year after tax in the UK?` : "How much of my salary do I keep after tax?",
      a: r0
        ? `About ${gbp(r0.net, 0)} a year, or ${gbp(r0.net / 12, 0)} a month and ${gbp(r0.net / 52, 0)} a week, once income tax (${gbp(r0.incomeTax, 0)}) and National Insurance (${gbp(r0.ni, 0)}) and your other deductions are taken off.`
        : "It depends on your pay and choices. Enter your salary above and press the button to see the exact amount for you.",
    },
    { q: "What is included in the calculation?", a: "Income tax, employee National Insurance, pension contributions, student loan repayments, and optional allowances such as Blind Person's Allowance and Marriage Allowance. You can also enter your own tax code." },
    { q: "Can I work out my pay for Scotland?", a: "Yes. Choose Scotland under Tax region and the Scottish income tax bands are used instead of the ones for England, Wales and Northern Ireland." },
    { q: "Which tax year is used?", a: "The 2026/27 tax year, which runs from 6 April 2026 to 5 April 2027. Always check the latest figures on gov.uk before making big decisions." },
  ];

  const extras = (
    <div className="space-y-6">
      <section className="card p-5">
        <div className="font-extrabold">More tools to try</div>
        <div className="flex flex-wrap gap-3 mt-3">
          {[{ href: "/after-tax", label: "After-tax pay" }, { href: "/tools/income-tax-calculator", label: "Income tax bands" }, { href: "/tools/tax-code-checker", label: "Tax code checker" }].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg bg-surface border border-line px-4 py-2 text-sm font-medium shadow-sm hover:border-accent transition">{l.label}</Link>
          ))}
        </div>
      </section>

      <section className="card p-6 md:p-8">
        <h2 className="text-2xl font-extrabold" style={{ color: "#1d4ed8" }}>Questions about this calculator</h2>
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

      <div className="rounded-xl bg-surface2 p-5 text-sm" style={{ borderLeft: "4px solid #f43f5e" }}>
        <div className="font-bold" style={{ color: "#be123c" }}>Please note</div>
        <p className="text-muted mt-1">These results are estimates for general guidance and are not financial or tax advice. Your own figures may differ because of your circumstances, employer arrangements or later changes to tax rules. For official information visit GOV.UK.</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {results}
      {form}
      {!snap && <div className="card p-8 text-center text-muted border-dashed">Fill in your details above and press <b className="text-ink">Work out my pay</b> to see the breakdown.</div>}
      {extras}
    </div>
  );
}
