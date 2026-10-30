"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TOOLS, toolHref } from "@/lib/tools";

export function ToolSearch({ onPick }: { onPick?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return TOOLS.filter((t) => `${t.title} ${t.short} ${t.description} ${t.category}`.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  const go = (slug: string) => {
    setQ(""); setOpen(false); onPick?.();
    router.push(toolHref(slug));
  };

  return (
    <div className="relative w-full">
      <input
        className="field !py-2 !text-sm !rounded-full"
        style={{ paddingLeft: "2.4rem" }}
        placeholder="Search tools…"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(results[0].slug); }}
        aria-label="Search tools"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 card !rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted">No tools found</div>
          ) : (
            results.map((t) => (
              <button key={t.slug} onMouseDown={(e) => e.preventDefault()} onClick={() => go(t.slug)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface2 flex items-center gap-2">
                <span>{t.icon}</span><span className="font-semibold" style={{ color: t.color }}>{t.title}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
