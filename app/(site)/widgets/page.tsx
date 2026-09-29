import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Code2, MousePointerClick, Rocket, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { ToolIcon } from "@/components/ToolIcon";
import { CONTACT_EMAIL, TOOLS, toolHref, type Tool } from "@/lib/tools";

export const metadata: Metadata = { title: "Free Embeddable Tax Calculator Widgets" };

const BADGES = [
  { icon: Rocket, label: "Set up in minutes" },
  { icon: ShieldCheck, label: "Built on published UK tax rates" },
  { icon: Smartphone, label: "Fits any screen size" },
];

const STEPS = [
  { title: "Pick a calculator", body: "Choose the tool that fits your site from the list below." },
  { title: "Copy the snippet", body: "One click copies a ready-to-use HTML snippet to your clipboard." },
  { title: "Paste it in", body: "Drop it into your page. The calculator loads instantly — nothing else to set up." },
];

/** Two short, honest highlights per tool — kept separate from the shared blurb below. */
const HIGHLIGHTS: Record<string, [string, string]> = {
  "salary-calculator": ["Gross to net pay breakdown", "Pension and student loan support"],
  "income-tax-calculator": ["Tax band-by-band breakdown", "England, Wales, NI and Scotland"],
  "ni-calculator": ["Employee Class 1 NI", "Monthly and yearly totals"],
  "after-tax": ["Net pay from a gross figure", "Shows the % of pay you keep"],
  "gross-salary-calculator": ["Works backwards from take-home pay", "Finds the salary you'd need"],
  "tax-code-checker": ["Decodes any UK tax code", "Shows your tax-free allowance"],
  "pro-rata-calculator": ["Part-time salary from full-time", "Yearly, monthly and weekly figures"],
  "marriage-allowance-calculator": ["Checks eligibility in seconds", "Shows the possible saving"],
  "overtime-pay-calculator": ["Any overtime multiplier", "Gross and estimated take-home"],
  "pension-tax-relief-calculator": ["Relief-at-source contributions", "Extra higher-rate relief to claim"],
  "capital-gains-tax-calculator": ["18% and 24% CGT bands", "Annual exempt amount applied"],
  "vehicle-tax-calculator": ["First-year and standard VED", "Petrol, diesel and electric"],
  "inheritance-tax-calculator": ["Nil-rate and residence bands", "Estimated 40% IHT charge"],
  "hourly-to-yearly": ["Hourly rate to annual salary", "Weekly and monthly figures too"],
  "salary-to-hourly": ["Annual salary to hourly rate", "Handy for contract comparisons"],
  "daily-rate-to-annual-salary": ["Contractor day-rate converter", "Annual, monthly and weekly views"],
  "savings-interest-calculator": ["Compound interest projection", "Lump sum plus monthly deposits"],
  "loan-repayment-calculator": ["Estimated monthly repayment", "Total interest over the term"],
  "stamp-duty-calculator": ["England and NI SDLT bands", "First-time buyer relief included"],
};

function WidgetCard({ tool }: { tool: Tool }) {
  const points = HIGHLIGHTS[tool.slug] ?? [tool.description, "Runs entirely in the browser"];
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="px-5 pt-5 pb-6 text-white relative" style={{ background: `linear-gradient(135deg, ${tool.color}, color-mix(in srgb, ${tool.color} 55%, #000))` }}>
        {tool.popular && (
          <span className="absolute top-4 right-4 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">Popular</span>
        )}
        <div className="w-11 h-11 rounded-xl bg-white/20 grid place-items-center"><ToolIcon slug={tool.slug} color="#fff" /></div>
        <h2 className="font-extrabold text-lg mt-3 leading-tight">{tool.title}</h2>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <ul className="space-y-2 text-sm flex-1">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: tool.color }} />{p}</li>
          ))}
          <li className="flex items-start gap-2 text-muted"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-line" />Free to embed, no sign-up</li>
        </ul>
        <div className="flex gap-2 mt-5">
          <a href={`/widgets/${tool.slug}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-surface2 border border-line px-3 py-3 text-sm font-medium hover:border-accent transition">
            Preview widget
          </a>
          <CopyCodeButton slug={tool.slug} title={tool.title} />
        </div>
      </div>
    </div>
  );
}

export default function Widgets() {
  return (
    <>
      <section className="text-white text-center px-4 py-16 md:py-20" style={{ background: "linear-gradient(120deg,#0a2412 0%,#16a34a 55%,#3f6212 100%)" }}>
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
            <Sparkles size={15} /> Free, no catches
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-5">Embed Our UK Tax Calculators</h1>
          <p className="mt-5 text-white/90 leading-7">
            Drop any calculator on this site straight into your own page or blog post. Each one stays lined up with
            the latest published UK tax rates, resizes to fit the space it's given, and costs nothing to use.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            {BADGES.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm"><Icon size={14} /> {label}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold">Pick a calculator to embed</h2>
          <p className="text-muted mt-2">Every tool below can go on your page with one line of code — preview it first, or copy the snippet straight away.</p>
        </div>

        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => <WidgetCard key={t.slug} tool={t} />)}
        </div>
      </div>

      <div className="band py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold">How embedding works</h2>
            <p className="text-muted mt-2">Three short steps and it's live on your page.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 mt-10 text-center">
            {STEPS.map((s, i) => (
              <div key={s.title}>
                <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-surface border-2 border-accent text-accent font-extrabold shadow-sm">{i + 1}</span>
                <div className="font-bold mt-3">{s.title}</div>
                <p className="text-sm text-muted mt-1.5 leading-6">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-2xl px-6 py-10 md:px-12 text-white text-center" style={{ background: "linear-gradient(120deg,#16a34a,#a3e635)" }}>
          <Code2 size={28} className="mx-auto" />
          <h2 className="text-2xl md:text-3xl font-extrabold mt-3">Ready to add a calculator?</h2>
          <p className="text-white/90 mt-2 max-w-lg mx-auto">Copy a snippet above and paste it into your site. There&apos;s nothing to install and nothing to configure.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href="/salary-calculator" className="inline-flex items-center gap-2 rounded-xl bg-white text-accent2 px-5 py-3 font-bold">
              <MousePointerClick size={17} /> Open Salary Calculator
            </Link>
            <Link href="/after-tax" className="inline-flex items-center gap-2 rounded-xl bg-white text-accent2 px-5 py-3 font-bold">
              <MousePointerClick size={17} /> Open After-Tax Pay
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-5 py-3 font-bold">
              <ClipboardCheck size={17} /> Need help embedding?
            </Link>
          </div>
          <p className="text-xs text-white/70 mt-4">Or email us directly at {CONTACT_EMAIL}</p>
        </div>
      </div>
    </>
  );
}
