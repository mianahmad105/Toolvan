"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getTool, TOOLS, toolHref } from "@/lib/tools";
import { ToolIcon } from "./ToolIcon";

const POPULAR = ["salary-calculator", "income-tax-calculator", "capital-gains-tax-calculator", "ni-calculator"];

const BLURB: Record<string, string> = {
  "salary-calculator": "See your take-home pay after tax, NI and pension.",
  "income-tax-calculator": "Find out how much tax you owe in each band.",
  "ni-calculator": "Work out your Class 1 National Insurance bill.",
  "after-tax": "Turn a gross salary into net pay in one click.",
  "gross-salary-calculator": "Find the gross pay behind your target take-home.",
  "tax-code-checker": "Decode what the letters and numbers mean.",
  "pro-rata-calculator": "Convert a full-time wage to part-time pay.",
  "marriage-allowance-calculator": "Check if you can transfer part of your allowance.",
  "overtime-pay-calculator": "Price your extra hours at any multiplier.",
  "pension-tax-relief-calculator": "See the relief added to your pension payments.",
  "capital-gains-tax-calculator": "Estimate CGT on shares, property and other assets.",
  "vehicle-tax-calculator": "Estimate road tax from emissions and price.",
  "inheritance-tax-calculator": "Estimate tax on an estate after the allowances.",
  "hourly-to-yearly": "Turn an hourly wage into a yearly salary.",
  "salary-to-hourly": "Find the hourly rate behind a yearly salary.",
  "daily-rate-to-annual-salary": "Convert a contractor day rate to a year of pay.",
  "savings-interest-calculator": "Watch deposits grow with compound interest.",
  "loan-repayment-calculator": "Get the monthly cost and total interest of a loan.",
  "stamp-duty-calculator": "Calculate Stamp Duty when buying a property.",
};

export function PopularSection() {
  const [more, setMore] = useState(false);
  const popular = POPULAR.map((s) => getTool(s)!);
  const rest = TOOLS.filter((t) => !POPULAR.includes(t.slug));
  const label = `${Math.floor(rest.length / 10) * 10}+`;
  const shown = more ? [...popular, ...rest] : popular;
  return (
    <section className="band mt-14 py-14">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold">Popular Calculators</h2>
        <p className="text-muted mt-3">Start with the tools most people use to work out what they owe.</p>
        <div className="grid gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {shown.map((t) => (
            <Link key={t.slug} href={toolHref(t.slug)} className="pop-card group">
              <div className="flex items-center gap-3">
                <ToolIcon slug={t.slug} color={t.color} />
                <span className="font-bold leading-tight">{t.title.replace(" Calculator", "")}</span>
              </div>
              <p className="text-sm text-muted mt-4">{BLURB[t.slug]}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium mt-4 text-accent">
                Open calculator <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <button onClick={() => setMore(!more)} className="inline-flex items-center gap-2 mt-10 font-medium text-accent">
          {more ? "Show fewer calculators" : `See more ${label} calculators`} <ArrowRight size={16} className={more ? "-rotate-90" : ""} />
        </button>
      </div>
    </section>
  );
}
