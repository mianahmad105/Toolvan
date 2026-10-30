"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookieConsent")) setVisible(true);
    } catch { /* localStorage unavailable */ }
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    try { localStorage.setItem("cookieConsent", choice); } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie size={22} className="text-accent shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm text-muted flex-1">
          We store a small local preference (your light/dark theme choice) on your device, and use Google
          advertising cookies to help fund these free tools. See our <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link> for details and how to opt out.
        </p>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button onClick={() => choose("rejected")} className="rounded-xl border border-line px-4 py-2.5 text-sm font-bold flex-1 sm:flex-none">Reject</button>
          <button onClick={() => choose("accepted")} className="btn flex-1 sm:flex-none">Accept</button>
        </div>
      </div>
    </div>
  );
}
