import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { toolHref, type Tool } from "@/lib/tools";
import { ToolIcon } from "./ToolIcon";

/** Compact card (kept for related-tool lists). */
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={toolHref(tool.slug)} className="pop-card">
      <div className="flex items-center gap-3">
        <ToolIcon slug={tool.slug} color={tool.color} />
        <span className="font-bold leading-tight">{tool.title.replace(" Calculator", "")}</span>
      </div>
      <p className="text-sm text-muted mt-3">{tool.short}</p>
    </Link>
  );
}

/** Suite card: category badge, centred icon, title, description and an Open calculator link. */
export function ToolWidget({ tool }: { tool: Tool }) {
  return (
    <Link href={toolHref(tool.slug)} className="suite-card group">
      <div className="flex items-start justify-between gap-2">
        <span className="suite-badge">{tool.category}</span>
        {tool.popular && (
          <span className="suite-badge suite-badge-hot"><Star size={11} /> Top pick</span>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <ToolIcon slug={tool.slug} color={tool.color} size={22} solid />
      </div>
      <h3 className="font-extrabold text-lg text-center mt-4 leading-snug">{tool.title}</h3>
      <p className="text-sm text-muted text-center mt-3 flex-1">{tool.description}</p>
      <span className="mt-5 flex items-center justify-center gap-1.5 font-semibold text-accent">
        Open calculator <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

const CATEGORY_GRADIENT: Record<string, string> = {
  "Income Tax": "linear-gradient(135deg,#0f766e,#14b8a6)",
  "Investment Tax": "linear-gradient(135deg,#d946ef,#f43f5e)",
  "Vehicle Tax": "linear-gradient(135deg,#f59e0b,#f97316)",
  "Estate Tax": "linear-gradient(135deg,#0d9488,#14b8a6)",
  "Other": "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "Savings & Loans": "linear-gradient(135deg,#16a34a,#84cc16)",
  "Property Tax": "linear-gradient(135deg,#4f46e5,#8b5cf6)",
};

/** Row-style card for the All Calculators page: icon on the left, text on the right. */
export function ToolListCard({ tool }: { tool: Tool }) {
  return (
    <Link href={toolHref(tool.slug)} className="list-card group">
      <ToolIcon slug={tool.slug} color={tool.color} size={22} gradient={CATEGORY_GRADIENT[tool.category]} />
      <div className="min-w-0 flex flex-col">
        <h3 className="font-extrabold text-lg leading-snug group-hover:text-accent transition">{tool.title}</h3>
        <p className="text-sm text-muted mt-2 flex-1">{tool.description}</p>
        <span className="list-chip mt-4 self-start">{tool.category}</span>
      </div>
    </Link>
  );
}
