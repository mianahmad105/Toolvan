import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Code2, Globe, Sparkles, Zap } from "lucide-react";
import { CopyCodeButton } from "./CopyCodeButton";

const FEATURES = [
  { icon: Zap, label: "Ready in a minute", bg: "#dbeafe", fg: "#2563eb" },
  { icon: Globe, label: "Works on every screen", bg: "#f3e8ff", fg: "#9333ea" },
  { icon: Sparkles, label: "No cost to use", bg: "#dcfce7", fg: "#16a34a" },
];

const CARDS = [
  {
    slug: "salary-calculator", title: "Salary Calculator", tag: "Top pick", tagBg: "linear-gradient(90deg,#f97316,#f59e0b)",
    text: "Turn gross pay into take-home pay", gradient: "linear-gradient(90deg,#16a34a,#22c55e)",
    points: ["Gross to net pay", "Tax and NI deductions", "Pension and student loan", "Scottish tax bands"],
  },
  {
    slug: "income-tax-calculator", title: "Income Tax Calculator", tag: "Must-have", tagBg: "linear-gradient(90deg,#22c55e,#10b981)",
    text: "Show tax band by band", gradient: "linear-gradient(90deg,#1e3a8a,#2563eb)",
    points: ["England and Scotland bands", "Personal Allowance taper", "Effective tax rate", "2026/27 rates"],
  },
  {
    slug: "ni-calculator", title: "NI Calculator", tag: "Well used", tagBg: "linear-gradient(90deg,#9333ea,#ec4899)",
    text: "Work out National Insurance", gradient: "linear-gradient(90deg,#b45309,#f59e0b)",
    points: ["Class 1 employee rates", "Monthly and yearly totals", "Clear step-by-step split", "Instant results"],
  },
];

export function EmbedSection() {
  return (
    <section className="band mt-0 py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-sm shadow-sm">
          <Sparkles size={15} className="text-accent" /> Free to use
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-6">Add Our Tax Calculators To Your Site</h2>
        <p className="text-muted text-lg mt-5 max-w-2xl mx-auto">
          Place a working calculator on your website or blog with one line of code. Each widget fits any screen size and updates whenever we do.
        </p>

        <div className="flex flex-wrap justify-center gap-x-14 gap-y-4 mt-9">
          {FEATURES.map(({ icon: Icon, label, bg, fg }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background: bg, color: fg }}><Icon size={18} /></span>
              {label}
            </div>
          ))}
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-3 text-left">
          {CARDS.map((c) => (
            <div key={c.slug} className="relative rounded-2xl bg-surface flex flex-col" style={{ boxShadow: "0 12px 32px -8px rgba(15,23,42,0.18)" }}>
              <span className="absolute left-4 top-0 -translate-y-1/2 z-10 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow" style={{ background: c.tagBg }}>{c.tag}</span>
              <div className="px-6 pt-8 pb-7 text-white rounded-t-2xl" style={{ background: c.gradient }}>
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-white/20"><Calculator size={22} /></span>
                  <h3 className="text-xl font-extrabold">{c.title}</h3>
                </div>
                <p className="mt-4 text-sm text-white/90">{c.text}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col rounded-b-2xl">
                <ul className="space-y-3.5 text-sm">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-3"><CheckCircle2 size={17} className="text-emerald-500 shrink-0" />{p}</li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-7">
                  <CopyCodeButton slug={c.slug} title={c.title} />
                  <a href={`/widgets/${c.slug}`} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: "#16a34a" }}>
                    Live preview <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl mt-14 rounded-2xl bg-surface border border-line shadow-lg px-6 py-10 sm:px-12">
          <h3 className="text-2xl font-extrabold">Ready to add a calculator to your site?</h3>
          <p className="text-muted mt-3">Setup takes about a minute: copy one line of code and paste it into your page where you want the calculator to appear.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            <Link href="/widgets" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white" style={{ background: "#16a34a" }}>
              <Code2 size={18} /> View all widgets
            </Link>
            <Link href="/salary-calculator" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold border-2 border-line text-ink hover:border-accent transition">
              <Calculator size={18} /> Open salary calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
