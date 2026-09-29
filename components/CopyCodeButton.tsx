"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeButton({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const code = `<iframe src="${window.location.origin}/widgets/${slug}" width="100%" height="720" style="border:0" title="${title}"></iframe>`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this code:", code);
    }
  };
  return (
    <button onClick={copy} className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-surface2 border border-line px-3 py-3 text-sm font-medium hover:border-accent transition">
      {copied ? <Check size={16} className="text-emerald-500 shrink-0" /> : <Copy size={16} className="shrink-0" />}
      {copied ? "Copied!" : "Copy snippet"}
    </button>
  );
}
