"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME, TOOLS, toolHref } from "@/lib/tools";
import { ToolSearch } from "./ToolSearch";
import { FaFacebookF, FaLinkedinIn, FaMedium, FaPinterestP, FaRedditAlien, FaXTwitter, FaYoutube } from "react-icons/fa6";

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
    <header className="sticky top-0 z-40 backdrop-blur bg-bg/80 border-b border-line">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent text-onaccent">T</span>{SITE_NAME}
        </Link>
        <div className="hidden md:block flex-1 max-w-sm mx-6"><ToolSearch /></div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <Link href="/tools" className="hover:text-ink">Calculators</Link>
          <Link href="/salary-calculator" className="hover:text-ink">Salary Calculator</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg border border-line grid place-items-center">{dark ? "☀️" : "🌙"}</button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden w-9 h-9 rounded-lg border border-line">☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-3 grid gap-2 max-h-[70vh] overflow-auto">
          <ToolSearch onPick={() => setOpen(false)} />
          <Link href="/" onClick={() => setOpen(false)} className="py-1.5 font-semibold">Home</Link>
          <Link href="/tools" onClick={() => setOpen(false)} className="py-1.5 font-semibold">Calculators</Link>
          <Link href="/salary-calculator" onClick={() => setOpen(false)} className="py-1.5 font-semibold">Salary Calculator</Link>
          {TOOLS.map((t) => (
            <Link key={t.slug} href={toolHref(t.slug)} onClick={() => setOpen(false)} className="py-1.5">{t.icon} {t.title}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Calculators" },
  { href: "/salary-calculator", label: "Salary Calculator" },
  { href: "/after-tax", label: "After-tax pay" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/terms", label: "Terms of service" },
];

// Replace these placeholder links with your real profile URLs.
const SOCIAL = [
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
  { label: "Pinterest", href: "https://pinterest.com", Icon: FaPinterestP },
  { label: "Medium", href: "https://medium.com", Icon: FaMedium },
  { label: "Reddit", href: "https://reddit.com", Icon: FaRedditAlien },
];

export function Footer() {
  return (
    <footer className="mt-0 text-white" style={{ background: "#051f14" }}>
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-10 grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-2xl font-extrabold">{SITE_NAME}</div>
          <p className="mt-3 text-sm leading-7 max-w-xs">
            Simple UK tax and salary calculators that show where your money goes and what you keep.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide">Explore</div>
          <ul className="mt-4 space-y-3 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-green-200 hover:text-white transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide">Find us online</div>
          <p className="mt-4 text-sm">Stay connected for new calculators and tax tips.</p>
          <div className="flex flex-wrap gap-5 mt-4">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white hover:text-green-300 transition">
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400 px-4">
        © {new Date().getFullYear()} {SITE_NAME}. Results are estimates only and not financial advice.
      </div>
    </footer>
  );
}
