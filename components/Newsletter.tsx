"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <p className="mt-8 inline-flex items-center gap-2 font-semibold text-emerald-600">
      <CheckCircle2 size={20} /> Thanks! We will let you know when rates change.
    </p>
  ) : (
    <form className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input
        type="email" required placeholder="Your email" aria-label="Email address"
        className="flex-1 rounded-xl border border-line bg-surface px-5 py-4 text-base outline-none focus:border-accent shadow-sm"
      />
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-md" style={{ background: "#16a34a" }}>
        Subscribe <ArrowRight size={18} />
      </button>
    </form>
  );
}
