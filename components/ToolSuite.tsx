"use client";
import { useState } from "react";
import { TAB_CATEGORIES, TOOLS } from "@/lib/tools";
import { ToolListCard, ToolWidget } from "./ToolCard";

export function ToolSuite({ heading = true, variant = "cards" }: { heading?: boolean; variant?: "cards" | "list" }) {
  const [tab, setTab] = useState<(typeof TAB_CATEGORIES)[number]>(variant === "list" ? "All Tools" : "Income Tax");
  const list = tab === "All Tools" ? TOOLS : TOOLS.filter((t) => t.category === tab);
  const isList = variant === "list";
  return (
    <section className={`mx-auto px-4 text-center ${isList ? "max-w-6xl mt-10" : "max-w-[1300px] mt-20"}`}>
      {heading && (
        <>
          <span className="inline-block rounded-full bg-surface2 px-4 py-1 text-xs font-bold tracking-wide text-accent2 uppercase">Every tax tool you need</span>
          <h2 className="text-2xl md:text-4xl font-extrabold mt-4">All our UK tax calculators in one place</h2>
          <p className="text-muted mt-3 max-w-2xl mx-auto">From everyday salary sums to estate and property planning, pick a calculator for the 2026/27 tax year and get your answer in seconds.</p>
        </>
      )}
      <div className={`flex flex-wrap justify-center gap-3 ${heading ? "mt-10" : ""}`}>
        {TAB_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setTab(c)} className={`suite-pill ${tab === c ? "suite-pill-on" : ""}`}>{c}</button>
        ))}
      </div>
      {isList ? (
        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 text-left">
          {list.map((t) => <ToolListCard key={t.slug} tool={t} />)}
        </div>
      ) : (
        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {list.map((t) => <ToolWidget key={t.slug} tool={t} />)}
        </div>
      )}
      {list.length === 0 && <p className="text-muted mt-8">No calculators in this category yet.</p>}
    </section>
  );
}
