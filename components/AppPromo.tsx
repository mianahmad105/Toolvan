import { ChevronRight, Gift, Lock, Play, Smartphone, Apple, Wallet, Briefcase, DollarSign, Zap, ShieldCheck, BadgePercent, Clock } from "lucide-react";
import { SITE_NAME } from "@/lib/tools";

const FEATURES = [
  { icon: Zap, label: "Answers in seconds", bg: "#f3e8ff", fg: "#9333ea" },
  { icon: Lock, label: "Private by design", bg: "#dbeafe", fg: "#2563eb" },
  { icon: BadgePercent, label: "Up-to-date rates", bg: "#dcfce7", fg: "#16a34a" },
  { icon: Clock, label: "Fast on any phone", bg: "#ffedd5", fg: "#ea580c" },
];

const APP_CARDS = [
  { icon: Wallet, title: "Take Home Pay", sub: "Net salary", gradient: "linear-gradient(135deg,#8b5cf6,#a78bfa)", tag: true },
  { icon: Briefcase, title: "National Insurance", sub: "Class 1 NI", gradient: "linear-gradient(135deg,#22c55e,#4ade80)" },
  { icon: DollarSign, title: "Income Tax", sub: "Tax by band", gradient: "linear-gradient(135deg,#022c22,#16a34a)" },
];

export function AppPromo() {
  return (
    <section className="band mt-20 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:gap-[20.75rem] lg:grid-cols-[1fr_auto] items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-sm shadow-sm">
            <Smartphone size={15} className="text-accent" /> Mobile app coming soon
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-6">
            Carry your <span className="text-accent">tax calculators</span> everywhere
          </h2>
          <p className="text-muted text-lg mt-5 max-w-lg">
            Work out your <b className="text-ink">take-home pay</b>, check your <b className="text-ink">income tax</b> and plan your
            <b className="text-ink"> after-tax salary</b> from your phone. Until the app arrives, {SITE_NAME} works smoothly in any mobile browser.
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8 max-w-md">
            {FEATURES.map(({ icon: Icon, label, bg, fg }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <span className="grid place-items-center w-10 h-10 rounded-full shrink-0" style={{ background: bg, color: fg }}><Icon size={17} /></span>
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-9">
            <span className="inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-white font-semibold opacity-60 cursor-not-allowed" style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}>
              <Play size={20} />
              <span className="leading-tight text-left"><span className="block text-[11px] uppercase">Google Play</span>Coming soon</span>
            </span>
            <span className="inline-flex items-center gap-3 rounded-xl px-6 py-3.5 border border-line bg-surface text-muted font-semibold opacity-70 cursor-not-allowed">
              <Apple size={20} />
              <span className="leading-tight text-left"><span className="block text-[11px] uppercase">App Store</span>Coming soon</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><Gift size={15} /> Free to use</span>
            <span className="inline-flex items-center gap-1.5"><Lock size={15} /> No sign-up needed</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} /> Runs in your browser</span>
          </div>
        </div>

        {/* Phone mock-up */}
        <div className="relative flex justify-center lg:justify-end lg:pr-10">
          <span className="absolute -top-2 right-8 w-9 h-9 rounded-full bg-green-400/70" />
          <span className="absolute top-1/3 -right-1 w-4 h-4 rounded-full bg-purple-400" />
          <span className="absolute bottom-2 left-10 w-6 h-6 rounded-full bg-green-500" />
          <div className="relative w-[260px] rounded-[2.4rem] bg-black p-2.5 shadow-2xl">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
            <div className="rounded-[1.9rem] bg-white text-slate-800 overflow-hidden h-[500px] px-4 pt-9">
              <div className="text-center text-[11px] font-bold py-2 border-b border-slate-100">{SITE_NAME} Calculator</div>
              <div className="mt-4 font-bold text-sm">Top picks</div>
              <div className="text-[10px] text-slate-500">Tools people use most</div>
              <div className="space-y-2.5 mt-3">
                {APP_CARDS.map(({ icon: Icon, title, sub, gradient, tag }) => (
                  <div key={title} className="rounded-xl p-3 text-white flex items-center gap-3" style={{ background: gradient }}>
                    <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/25"><Icon size={15} /></span>
                    <div className="flex-1 leading-tight">
                      <div className="text-[11px] font-bold flex items-center gap-1.5">{title}{tag && <span className="text-[8px] bg-white/25 rounded px-1">Top</span>}</div>
                      <div className="text-[9px] opacity-80">{sub}</div>
                    </div>
                    <ChevronRight size={14} className="opacity-80" />
                  </div>
                ))}
              </div>
              <div className="mt-5 font-bold text-sm">Browse by type</div>
              <div className="flex gap-1.5 mt-3 text-[9px]">
                {["Income Tax", "Investment", "Vehicle"].map((t, i) => (
                  <span key={t} className={`rounded-full px-2.5 py-1 border ${i === 1 ? "bg-green-800 text-white border-green-800" : "border-slate-200"}`}>{t}</span>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-100 p-3 shadow-sm text-[10px]">
                <div className="font-bold">Capital Gains Calculator</div>
                <div className="text-slate-500 mt-1">Estimate CGT on shares, property and other assets.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
