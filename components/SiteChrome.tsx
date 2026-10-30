"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calculator, Home, Mail, TrendingUp, X } from "lucide-react";
import { SITE_NAME } from "@/lib/tools";
import { ToolSearch } from "./ToolSearch";

const MOBILE_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "Calculators", icon: Calculator },
  { href: "/salary-calculator", label: "Salary Calculator", icon: TrendingUp },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

const BRAND_GRADIENT = "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 55%, #38bdf8 100%)";

function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-lg text-white font-extrabold shrink-0"
      style={{ width: size, height: size, background: BRAND_GRADIENT, fontSize: size * 0.6 }}
    >
      £
    </span>
  );
}

export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem("theme") === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("theme", d ? "dark" : "light");
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-bg/80 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
            <BrandMark /> {SITE_NAME}
          </Link>
          <div className="hidden md:block flex-1 max-w-sm mx-6"><ToolSearch /></div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <Link href="/tools" className="hover:text-ink">Calculators</Link>
            <Link href="/salary-calculator" className="hover:text-ink">Salary Calculator</Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg border border-line grid place-items-center">{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => setOpen(true)} aria-label="Menu" className="md:hidden w-9 h-9 rounded-lg border border-line grid place-items-center">☰</button>
          </div>
        </div>
      </header>

      {open && <div className="fixed inset-0 bg-black/40 z-[60] md:hidden" onClick={() => setOpen(false)} />}
      <div className={`fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm shadow-2xl flex flex-col transition-transform duration-200 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-line shrink-0">
          <h2 className="font-extrabold text-lg">Menu</h2>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg border border-line grid place-items-center">{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-9 h-9 rounded-lg border border-line grid place-items-center"><X size={18} /></button>
          </div>
        </div>
        <div className="p-5"><ToolSearch onPick={() => setOpen(false)} /></div>
        <nav className="px-3 flex-1 overflow-auto">
          {MOBILE_NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-2 py-3 rounded-xl text-[15px] font-medium hover:bg-surface2 transition">
              <Icon size={19} className="text-accent shrink-0" /> {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-line p-5 text-center text-sm shrink-0">
          <div className="font-bold">{SITE_NAME}</div>
          <div className="flex justify-center gap-5 mt-2 text-muted">
            <Link href="/tools" onClick={() => setOpen(false)} className="hover:text-ink">All Tools</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-ink">Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Calculators" },
  { href: "/salary-calculator", label: "Salary Calculator" },
  { href: "/after-tax", label: "After-tax pay" },
  { href: "/salary", label: "Salary after tax" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/terms", label: "Terms of service" },
];

export function Footer() {
  return (
    <footer className="mt-0 text-white" style={{ background: "#051f14" }}>
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-10 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-2xl font-extrabold"><BrandMark size={28} /> {SITE_NAME}</div>
          <p className="mt-3 text-sm leading-7 max-w-xs">
            Simple UK tax and salary calculators that show where your money goes and what you keep.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide">Explore</div>
          <ul className="mt-4 space-y-3 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-blue-200 hover:text-white transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide">About</div>
          <p className="mt-4 text-sm leading-6">
            Our figures are built around published rates from{" "}
            <a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white underline">GOV.UK</a> and HMRC.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/about" className="text-blue-200 hover:text-white transition">About us</Link></li>
            <li><Link href="/contact" className="text-blue-200 hover:text-white transition">Contact us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400 px-4">
        © {new Date().getFullYear()} {SITE_NAME}. Results are estimates only and not financial advice.
      </div>
    </footer>
  );
}
