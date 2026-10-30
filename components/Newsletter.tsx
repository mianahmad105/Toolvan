"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/tools";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Newsletter signup";
    const body = `Please add this address to your tax-update list: ${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return sent ? (
    <p className="mt-8 inline-flex items-center gap-2 font-semibold text-emerald-600">
      <CheckCircle2 size={20} /> Thanks! Send the email that just opened and we&apos;ll add you.
    </p>
  ) : (
    <form className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto" onSubmit={submit}>
      <input
        type="email" required placeholder="Your email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-xl border border-line bg-surface px-5 py-4 text-base outline-none focus:border-accent shadow-sm"
      />
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-md" style={{ background: "#1d4ed8" }}>
        Subscribe <ArrowRight size={18} />
      </button>
    </form>
  );
}
