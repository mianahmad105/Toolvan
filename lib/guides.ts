export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  dek: string;
  updated: string;
  related: string[]; // tool slugs this guide links to / is linked from
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
}

const UPDATED = "2026-10-02";

export const GUIDES: Guide[] = [
  {
    slug: "how-the-100k-tax-trap-works",
    title: "How the £100,000 tax trap works",
    dek: "Why crossing £100,000 can cost you more than the headline 40% rate suggests, and what you can do about it.",
    updated: UPDATED,
    related: ["income-tax-calculator", "salary-calculator", "pension-tax-relief-calculator"],
    sections: [
      {
        heading: "It isn't a new tax band — it's your allowance disappearing",
        paragraphs: [
          "There's no official '£100,000 tax band' in the UK system — the headline Income Tax rates are still 20%, 40% and 45%. What actually happens at £100,000 is that your tax-free Personal Allowance starts being withdrawn. For every £2 you earn above £100,000, you lose £1 of the £12,570 Personal Allowance, until it's gone completely at £125,140.",
          "Because that lost allowance becomes taxable at the 40% higher rate, the effective marginal rate on income between £100,000 and £125,140 works out at 60% — you keep only 40p of every extra pound, not the 60p a higher-rate taxpayer normally keeps.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Say your salary rises from £100,000 to £101,000. Without the taper, that extra £1,000 would be taxed at 40%, costing £400 in tax and leaving £600. With the taper, £500 of your Personal Allowance is also withdrawn and becomes taxable at 40%, adding another £200 of tax. You pay £600 tax on £1,000 of extra income — an effective rate of 60%, even though your 'tax bracket' hasn't officially changed.",
          "Our Income Tax Calculator shows this directly: enter any taxable income between £100,000 and £125,140 and you'll see the shrinking allowance reflected in the tax figure.",
        ],
      },
      {
        heading: "Why it's worse than it looks",
        paragraphs: [
          "The 60% zone often overlaps with other means-tested withdrawals that use 'adjusted net income' as the trigger — most notably Tax-Free Childcare and the 30 hours of free childcare, both of which cut off entirely once either parent's adjusted net income passes £100,000. Lose those and the real cost of crossing £100,000 can run into several thousand pounds a year for a family with young children, well beyond the extra Income Tax alone.",
          "High Income Child Benefit Charge works similarly from £60,000 upward, clawing back Child Benefit gradually and fully by £80,000, so some households effectively face two separate tapering zones at different income levels.",
        ],
      },
      {
        heading: "What you can do about it",
        paragraphs: [
          "The taper is based on 'adjusted net income', which is total taxable income minus certain reliefs — most usefully, pension contributions and Gift Aid donations. Paying extra into a pension through salary sacrifice or a net pay arrangement reduces your taxable income pound-for-pound, which can pull you back under £100,000 (or under £60,000 for Child Benefit purposes) and avoid the taper rather than just paying tax at a higher rate.",
          "Because the pension contribution also escapes the 60% band itself, extra pension contributions in this income range effectively attract up to 60% tax relief — among the most efficient pension contributions you can make. Our Pension Tax Relief Calculator shows how much relief a contribution at your income level would attract.",
        ],
      },
    ],
    faqs: [
      { q: "Is there really a 60% tax rate?", a: "There's no official 60% band on the tax tables, but the combination of the 40% higher rate and the loss of £1 of Personal Allowance for every £2 earned creates an effective marginal rate of 60% on income between £100,000 and £125,140." },
      { q: "Does the 100k trap affect National Insurance too?", a: "No — National Insurance has its own separate thresholds and isn't affected by the Personal Allowance taper. The 60% effect is purely an Income Tax phenomenon." },
      { q: "How do I get back under £100,000?", a: "Pension contributions and Gift Aid donations reduce your 'adjusted net income', which is what the £100,000 threshold is measured against — so increasing pension contributions is the most common way to avoid or reduce the taper." },
    ],
  },
  {
    slug: "scottish-vs-english-income-tax-explained",
    title: "Scottish vs English Income Tax explained",
    dek: "Scotland sets its own Income Tax bands. Here's exactly how they differ from the rest of the UK, and who ends up paying more.",
    updated: UPDATED,
    related: ["income-tax-calculator", "salary-calculator", "ni-calculator"],
    sections: [
      {
        heading: "Same allowance, different bands",
        paragraphs: [
          "Income Tax is partly devolved to the Scottish Parliament. Anyone whose main home is in Scotland pays Income Tax under the Scottish rates and bands (shown on payslips with an 'S' prefix on their tax code, e.g. S1257L), while the rest of the UK uses the rates set by the UK government. Crucially, the tax-free Personal Allowance — £12,570 for 2026/27 — is set UK-wide and is identical in both systems.",
          "What differs is what happens to the income above that allowance. England, Wales and Northern Ireland use three bands: 20% basic rate, 40% higher rate, and 45% additional rate. Scotland uses six: 19% starter, 20% basic, 21% intermediate, 42% higher, 45% advanced and 48% top.",
        ],
      },
      {
        heading: "Where the bands sit for 2026/27",
        paragraphs: [
          "In England, Wales and Northern Ireland: the 20% basic rate applies up to £50,270 of total income, 40% from there to £125,140, and 45% above that.",
          "In Scotland: 19% applies up to £16,537, 20% up to £29,526, 21% up to £43,662, 42% up to £75,000, 45% up to £125,140, and 48% above that.",
        ],
      },
      {
        heading: "Who actually pays more",
        paragraphs: [
          "At low incomes, Scotland is marginally cheaper — the 19% starter rate on the first slice of taxable income saves a small amount compared with the 20% rate used elsewhere. The crossover happens around £30,000-£35,000 of income, above which Scotland's bands bite harder, mainly because the 42% higher rate starts at £43,662 — more than £6,500 lower than the £50,270 point where the rest of the UK's 40% rate begins.",
          "Someone earning £60,000 pays £11,432 in Income Tax in England, Wales or Northern Ireland, but £13,213.80 in Scotland — about £1,780 more a year, almost entirely because of that earlier, higher 42% band. Use our Income Tax Calculator with the region switched to Scotland to see the exact figure for any income.",
        ],
      },
      {
        heading: "What stays the same regardless of region",
        paragraphs: [
          "National Insurance is not devolved — it's identical across the whole of the UK, so the 8%/2% employee rates and the £12,570/£50,270 thresholds apply equally whether you're in Edinburgh or Exeter. Dividend tax, savings interest tax (including the Personal Savings Allowance), Capital Gains Tax and Inheritance Tax are also all set at UK level and apply the same way in Scotland as elsewhere.",
          "Your region for Income Tax purposes is based on where your main home is during the tax year, not where your employer is based or where you work day to day — someone living in Scotland but commuting to an office in England still pays the Scottish rates.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know if I'm taxed under Scottish rates?", a: "Check your tax code — Scottish tax codes start with the letter S (for example S1257L). HMRC assigns this based on your main home address, not your workplace." },
      { q: "Is the tax-free Personal Allowance different in Scotland?", a: "No. The £12,570 Personal Allowance for 2026/27 is set UK-wide and is exactly the same whether you're taxed under Scottish or rest-of-UK rates." },
      { q: "Does National Insurance differ in Scotland?", a: "No — National Insurance isn't devolved, so the same 8% and 2% employee rates and thresholds apply across the whole of the UK." },
    ],
  },
  {
    slug: "what-does-tax-code-1257l-mean",
    title: "What does tax code 1257L mean?",
    dek: "1257L is the standard tax code for most UK employees — here's exactly what the numbers and letter mean, and when yours might look different.",
    updated: UPDATED,
    related: ["tax-code-checker", "salary-calculator", "income-tax-calculator"],
    sections: [
      {
        heading: "Breaking down the numbers",
        paragraphs: [
          "A tax code tells your employer or pension provider how much of your income to pay before Income Tax is deducted. In 1257L, the number 1257 multiplied by 10 gives your tax-free Personal Allowance for the year: £12,570 — exactly the standard allowance for 2026/27. If your code were 1000L instead, your tax-free amount would be £10,000.",
          "This is the most common tax code in the UK, used for most people with one job, no taxable benefits, and no adjustments for under- or overpaid tax from previous years.",
        ],
      },
      {
        heading: "What the letter means",
        paragraphs: [
          "The letter tells HMRC's system (and your payslip) something extra about how the code applies. L means you're entitled to the standard Personal Allowance with no special adjustments — it's the default for most employees.",
        ],
        bullets: [
          "L — Standard Personal Allowance, no adjustments",
          "M — You're receiving Marriage Allowance transferred from your partner",
          "N — You've transferred part of your Marriage Allowance to your partner",
          "T — Your code includes items HMRC needs to review further",
          "K — Your allowance is negative, meaning extra income is added to what's taxed, usually because of benefits or previous underpaid tax that exceeds your allowance",
          "BR — All your income from this source is taxed at the basic rate (20%), with no Personal Allowance applied — common for a second job",
          "D0 / D1 — All income taxed at the higher (40%) or additional (45%) rate, again with no allowance — also typically a second job or pension",
          "0T — No Personal Allowance at all; every pound is taxed through the normal bands",
        ],
      },
      {
        heading: "Why your code might not be 1257L",
        paragraphs: [
          "Your code changes if you receive a taxable benefit like a company car or private medical insurance (which reduces your allowance), if you owe tax from a previous year that's being collected through your current pay, if you have more than one income source (where only one usually gets the full allowance), or if you're claiming Marriage Allowance.",
          "If your home is in Scotland, you'll see an S prefix (S1257L); in Wales, a C prefix (C1257L) — the number still represents the same £12,570 allowance, but tells HMRC which set of Income Tax bands to apply.",
        ],
      },
      {
        heading: "Checking your own code",
        paragraphs: [
          "Your tax code appears on your payslip, your P60, and any PAYE coding notice HMRC sends you. If it looks wrong — for example, if you've changed jobs, lost a benefit, or started a second job — contact HMRC, since an incorrect code can mean you pay too much or too little tax throughout the year.",
          "Enter any code into our Tax Code Checker to see exactly what allowance and meaning it represents, or use the Salary Calculator with your own code entered to see how it changes your take-home pay compared with the standard 1257L.",
        ],
      },
    ],
    faqs: [
      { q: "Is 1257L the same for everyone?", a: "It's the standard code for most employees with one job and no adjustments, representing the full £12,570 Personal Allowance for 2026/27 — but your own code can differ based on your circumstances." },
      { q: "What does a K code mean?", a: "A K code means your allowance is negative — usually because taxable benefits or previous underpaid tax exceed your Personal Allowance, so extra income is added to what gets taxed rather than subtracted from it." },
      { q: "Why do I have a BR code on my second job?", a: "BR means all income from that source is taxed at the basic 20% rate with no Personal Allowance applied, because your allowance has already been given against your main job's tax code." },
    ],
  },
  {
    slug: "salary-sacrifice-explained",
    title: "Salary sacrifice explained",
    dek: "Salary sacrifice can cut your tax and National Insurance bill at the same time — here's how it works and when it's worth it.",
    updated: UPDATED,
    related: ["salary-calculator", "ni-calculator", "pension-tax-relief-calculator"],
    sections: [
      {
        heading: "What salary sacrifice actually is",
        paragraphs: [
          "Salary sacrifice means contractually agreeing to give up part of your gross salary in exchange for a non-cash benefit — most commonly extra pension contributions, but sometimes childcare vouchers, a cycle-to-work scheme, or an electric car lease. Because your contractual salary is genuinely reduced, the sacrificed amount is removed before either Income Tax or National Insurance is calculated.",
          "This is different from a standard 'net pay' pension contribution, which reduces your taxable income for Income Tax but not the earnings National Insurance is calculated on. Salary sacrifice reduces both.",
        ],
      },
      {
        heading: "Why it saves more than a normal pension contribution",
        paragraphs: [
          "Take a basic-rate taxpayer contributing £100 a month to a pension. Under a standard net pay arrangement, they save 20% Income Tax (£20) but still pay 8% National Insurance on that £100, so the real cost to their take-home pay is £92. Under salary sacrifice, the same £100 never counts as earnings at all, so neither the 20% tax nor the 8% NI applies — the cost to take-home pay drops to £72, with the employer also saving their 15% employer NI on the sacrificed amount (sometimes passed on as an extra pension boost).",
          "The saving is proportionally similar for higher-rate taxpayers, though the NI rate above £50,270 drops to 2%, so the extra benefit from avoiding NI is smaller in cash terms at that point — but the Income Tax saving at 40% is larger.",
        ],
      },
      {
        heading: "Where it can also help with the £100,000 and £60,000 traps",
        paragraphs: [
          "Because salary sacrifice reduces your gross salary — not just your taxable income — it's an effective way to bring your income back under thresholds like the £100,000 Personal Allowance taper or the £60,000 point where Child Benefit starts being clawed back, since both are measured against income after pension contributions.",
          "See our guide on how the £100,000 tax trap works for how this plays out in practice.",
        ],
      },
      {
        heading: "What to watch out for",
        paragraphs: [
          "Salary sacrifice reduces your 'official' salary, which can affect anything calculated from it — mortgage affordability assessments, life insurance multiples, statutory maternity pay, and some means-tested benefits can all be affected if your sacrifice is large. It can also reduce how much you're allowed to pay into a pension tax-efficiently if it pushes your income close to the £60,000 Annual Allowance (tapered for very high earners), so it's worth checking the numbers before sacrificing a large amount.",
          "Also check that sacrificing doesn't take your pay below the National Minimum Wage, which employers aren't allowed to let happen — most pension salary sacrifice schemes build in a safeguard for this automatically.",
        ],
      },
    ],
    faqs: [
      { q: "Does salary sacrifice reduce my National Insurance as well as my tax?", a: "Yes — that's the main advantage over a standard pension contribution. Because your contractual salary is genuinely reduced, the sacrificed amount avoids both Income Tax and employee National Insurance." },
      { q: "Can salary sacrifice affect my mortgage application?", a: "Potentially, yes. Lenders usually assess affordability on your actual contractual salary, so a large sacrifice can reduce the amount you're assessed as able to borrow." },
      { q: "Is salary sacrifice only for pensions?", a: "Pensions are the most common use, but employers also offer it for benefits like cycle-to-work schemes, electric car leases and, in some cases, childcare." },
    ],
  },
  {
    slug: "national-insurance-explained",
    title: "National Insurance explained",
    dek: "What National Insurance actually pays for, how the employee rates work for 2026/27, and how it differs from Income Tax.",
    updated: UPDATED,
    related: ["ni-calculator", "salary-calculator"],
    sections: [
      {
        heading: "What NI is for",
        paragraphs: [
          "Unlike Income Tax, which funds general government spending, National Insurance contributions build your entitlement to specific state benefits — most importantly the State Pension, but also contributory Jobseeker's Allowance and Employment and Support Allowance. You generally need at least 35 qualifying years of contributions (or credits) for the full new State Pension.",
          "Employees pay what's called Class 1 National Insurance, deducted automatically from your pay by your employer, alongside a separate employer contribution that doesn't appear on your payslip and isn't deducted from your pay.",
        ],
      },
      {
        heading: "The 2026/27 rates",
        paragraphs: [
          "Employee Class 1 NI is charged at 8% on earnings between £12,570 and £50,270 a year, and at 2% on everything above £50,270, with no upper limit on that 2% band. Below £12,570, no employee NI is due at all. Unlike Income Tax bands, there's no equivalent of the Personal Allowance taper above £100,000 — the 2% rate simply continues indefinitely.",
          "This is worked out on your gross earnings directly, not your taxable income — so a standard pension contribution that reduces your Income Tax bill (a net pay arrangement) does nothing to reduce the earnings NI is calculated on. Only salary sacrifice, which lowers your actual contractual salary, reduces your NI bill too.",
        ],
      },
      {
        heading: "How NI differs from Income Tax in practice",
        paragraphs: [
          "Because the NI rate drops from 8% to 2% once you cross £50,270, National Insurance as a share of income actually falls for higher earners, even as Income Tax rises from 20% to 40% at the same point. The two taxes move in opposite directions around that threshold, which is why total deductions don't rise as sharply as the Income Tax rate alone would suggest.",
          "NI is also calculated separately for each job if you have more than one employment, each against its own threshold — which can mean paying slightly more combined NI across two jobs than you would on the same total income from a single job, since the lower NI-free portion effectively applies twice (though HMRC can arrange deferment in some cases).",
        ],
      },
      {
        heading: "When NI stops",
        paragraphs: [
          "Once you reach State Pension age, you stop paying employee Class 1 National Insurance altogether, even if you keep working — though your employer's contribution continues as normal. This is one of the few genuine tax advantages of working past State Pension age.",
          "Self-employed people pay under a different system — Class 2 and Class 4 National Insurance — calculated on profits rather than earnings, with different thresholds and rates to the employee figures above.",
        ],
      },
    ],
    faqs: [
      { q: "What does National Insurance actually pay for?", a: "Mainly your entitlement to the State Pension, plus certain contributory benefits like Jobseeker's Allowance — unlike Income Tax, which funds general government spending." },
      { q: "Does a pension contribution reduce my NI?", a: "Only if it's taken through salary sacrifice, which genuinely lowers your contractual salary. A standard net pay pension contribution reduces your Income Tax but not the earnings NI is calculated on." },
      { q: "Do I stop paying NI at State Pension age?", a: "Yes — employee Class 1 National Insurance stops once you reach State Pension age, regardless of how much you continue to earn." },
    ],
  },
  {
    slug: "student-loan-repayment-plans-explained",
    title: "Student loan repayment plans explained",
    dek: "Plan 1, 2, 4, 5 or Postgraduate — which one applies to you, what the thresholds are, and how repayments are actually worked out.",
    updated: UPDATED,
    related: ["salary-calculator", "after-tax"],
    sections: [
      {
        heading: "Why there are several plans",
        paragraphs: [
          "Which repayment plan you're on depends on when and where you started your course, not on how much you borrowed or which university you went to. Each plan has its own repayment threshold — the income level above which you start repaying — and the plan follows you for the life of the loan unless you take out a later loan that moves you onto a newer plan.",
        ],
      },
      {
        heading: "The 2026/27 thresholds",
        paragraphs: [
          "Repayments are calculated as a percentage of your income above the threshold, deducted automatically through payroll if you're employed, in addition to — not instead of — Income Tax and National Insurance.",
        ],
        bullets: [
          "Plan 1 (mostly pre-2012 English/Welsh starters, and Northern Ireland): threshold £26,900, repayment rate 9%",
          "Plan 2 (most English/Welsh starters 2012-2023): threshold £29,385, repayment rate 9%",
          "Plan 4 (Scottish students): threshold £33,795, repayment rate 9%",
          "Plan 5 (English starters from August 2023 onward): threshold £25,000, repayment rate 9%",
          "Postgraduate Loan (Master's/Doctoral, any nation): threshold £21,000, repayment rate 6% — and can run alongside an undergraduate plan at the same time",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Someone on Plan 2 earning £40,000 a year repays 9% of the amount above £29,385 — that's 9% of £10,615, or £955.35 a year, deducted on top of Income Tax and National Insurance. If their income instead sat at or below £29,385, nothing would be deducted at all that year, even though the loan balance continues accruing interest in the background.",
          "If you're on a Postgraduate Loan and still repaying an undergraduate plan, both repayments apply simultaneously against their own separate thresholds — so it's possible to have 9% and 6% being deducted from different slices of your income at the same time.",
        ],
      },
      {
        heading: "What it doesn't affect",
        paragraphs: [
          "Student loan repayments are calculated on gross earnings in a similar way to National Insurance, not on taxable income — so they aren't reduced by a standard net pay pension contribution, though a salary sacrifice arrangement that lowers your contractual salary will reduce them, just as it reduces tax and NI.",
          "Repayments stop automatically once the loan (plus accrued interest) is fully repaid, or after the loan is written off at the end of its term — typically 30 or 40 years after you became eligible to repay, depending on the plan — whichever comes first.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know which plan I'm on?", a: "It depends on where and when you started your course. You can check on your student loan online account at gov.uk, or ask the Student Loans Company directly if you're unsure." },
      { q: "Can I be on two plans at once?", a: "Yes — a Postgraduate Loan can run alongside an undergraduate Plan 1, 2, 4 or 5 repayment at the same time, each calculated against its own threshold." },
      { q: "Does a pension contribution reduce my student loan repayment?", a: "Only if it's taken through salary sacrifice. A standard net pay pension contribution doesn't reduce the earnings your student loan repayment is calculated on." },
    ],
  },
  {
    slug: "marriage-allowance-explained",
    title: "Marriage Allowance explained",
    dek: "How married couples and civil partners can transfer part of an unused Personal Allowance to save up to £252 a year.",
    updated: UPDATED,
    related: ["marriage-allowance-calculator", "salary-calculator"],
    sections: [
      {
        heading: "What it does",
        paragraphs: [
          "Marriage Allowance lets one spouse or civil partner transfer £1,260 of their unused tax-free Personal Allowance to the other, as long as neither of them is a higher or additional-rate taxpayer. The receiving partner's tax bill is reduced by 20% of the transferred amount — £252 a year for 2026/27 — because that £1,260 would otherwise have been taxed at the basic rate.",
          "It only makes sense where one partner isn't using their full Personal Allowance — typically because they earn below £12,570, or don't work at all — and the other earns enough to benefit from extra tax-free income, but not so much that they've become a higher-rate taxpayer.",
        ],
      },
      {
        heading: "Who's eligible",
        paragraphs: [
          "You can claim if you're married or in a civil partnership (not just living together), one of you earns below the £12,570 Personal Allowance (or has no income), and the other is a basic-rate taxpayer — meaning their income stays below £50,270 in England, Wales and Northern Ireland, or the equivalent higher-rate threshold in Scotland. If the recipient's income crosses into higher-rate territory, the allowance isn't available that year.",
        ],
      },
      {
        heading: "How it shows up on a payslip",
        paragraphs: [
          "If you transfer your allowance away, your tax code gets the suffix N (for example 1131N instead of 1257L), showing a reduced allowance. If you receive a transferred allowance, your code gets the suffix M instead, showing an increased one. Both partners' codes change, even though only one person's tax bill actually falls.",
        ],
      },
      {
        heading: "Backdating and how to claim",
        paragraphs: [
          "You can backdate a claim for up to four previous tax years if you were eligible but didn't claim at the time, potentially bringing in several years' worth of the saving — up to roughly £1,250 in backdated claims on top of the current year, depending on exact historic allowance amounts. The claim is made online through gov.uk, and once accepted it continues automatically each year until one of you cancels it or your circumstances change.",
          "Use our Marriage Allowance Calculator to check whether you're likely to be eligible and see the saving for your own numbers.",
        ],
      },
    ],
    faqs: [
      { q: "How much can Marriage Allowance save?", a: "Up to £252 a year for 2026/27, worked out as 20% of the £1,260 Personal Allowance that can be transferred between partners." },
      { q: "Can we claim if we're not married, just living together?", a: "No — Marriage Allowance is only available to married couples and registered civil partners, not unmarried couples." },
      { q: "Can I backdate a claim?", a: "Yes, for up to four previous tax years if you were eligible but didn't claim, in addition to the current year." },
    ],
  },
  {
    slug: "understanding-your-payslip",
    title: "Understanding your payslip",
    dek: "A line-by-line guide to what's on a UK payslip, from gross pay and tax code to the deductions that make up the difference to your net pay.",
    updated: UPDATED,
    related: ["salary-calculator", "tax-code-checker", "ni-calculator"],
    sections: [
      {
        heading: "Gross pay and net pay",
        paragraphs: [
          "Gross pay is your full salary before anything is taken off — the figure usually quoted in a job offer. Net pay (sometimes called take-home pay) is what actually lands in your bank account after every deduction. Everything else on a payslip exists to explain the gap between those two numbers.",
        ],
      },
      {
        heading: "The deductions you'll usually see",
        paragraphs: [
          "Most payslips break deductions into the same handful of categories, though the exact layout varies by employer and payroll software.",
        ],
        bullets: [
          "Income Tax (PAYE) — calculated against your tax code and the current Income Tax bands for your region",
          "National Insurance — 8% on earnings between £12,570 and £50,270, 2% above that, for 2026/27",
          "Pension contributions — either a 'net pay' amount deducted before tax, or a salary sacrifice amount that also reduces your NI",
          "Student loan — 9% (6% for Postgraduate Loans) of income above your plan's threshold, if applicable",
          "Any other deductions — season ticket loans, union fees, benefit-in-kind adjustments or court-ordered deductions",
        ],
      },
      {
        heading: "Your tax code and pay period figures",
        paragraphs: [
          "Your tax code (commonly 1257L) tells payroll software how much tax-free allowance to apply — see our guide to what tax code 1257L means for the full breakdown of what the letters and numbers represent.",
          "Most payslips also show 'year to date' figures alongside the current period's numbers — your total gross pay, tax and NI paid so far in the tax year (which runs 6 April to 5 April). These are worth checking periodically, since PAYE assumes an even income across the year, so a payslip after a bonus, pay rise, or missed pay period can look unusually taxed in isolation even though it evens out over the year.",
        ],
      },
      {
        heading: "When something looks wrong",
        paragraphs: [
          "If your tax code doesn't match what you expect, if National Insurance looks miscalculated, or if a deduction appears that you don't recognise, the first step is usually to ask your payroll or HR team, since most discrepancies come down to a tax code that hasn't updated after a change in circumstances. If HMRC needs to correct your tax code, they'll normally issue a new one directly to your employer.",
          "You can check your own numbers against our Salary Calculator (for the full picture) or the NI Calculator (for National Insurance specifically) using your actual gross pay and tax code to see what the figures should look like.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my payslip different every month even though my salary hasn't changed?", a: "Small month-to-month differences are often down to the number of working days or pay-period rounding; larger swings usually come from a bonus, overtime, or a change in your tax code partway through the year." },
      { q: "What's the difference between gross and net pay?", a: "Gross pay is your salary before any deductions; net pay is what you actually receive after Income Tax, National Insurance, pension and any other deductions." },
      { q: "What does 'year to date' mean on my payslip?", a: "It's the running total of your pay, tax and National Insurance since the start of the current tax year on 6 April, which can be useful for spotting whether you're on track to overpay or underpay tax." },
    ],
  },
  {
    slug: "stamp-duty-thresholds-explained",
    title: "Stamp Duty thresholds explained",
    dek: "How Stamp Duty Land Tax is actually calculated in slices, who gets first-time buyer relief, and when the extra-property surcharge applies.",
    updated: UPDATED,
    related: ["stamp-duty-calculator"],
    sections: [
      {
        heading: "It's a slice tax, like Income Tax",
        paragraphs: [
          "Stamp Duty Land Tax (SDLT) applies when you buy a property or land in England or Northern Ireland over a certain value (Scotland and Wales have their own equivalent taxes — Land and Buildings Transaction Tax and Land Transaction Tax respectively, with different rates). Like Income Tax, SDLT is charged in slices: each band of the purchase price is taxed at its own rate, so buying a slightly more expensive home never retroactively increases the rate on the cheaper slices you've already paid for.",
        ],
      },
      {
        heading: "Standard residential rates",
        paragraphs: [
          "For a main residence, nothing is due on the portion of the price up to £125,000, 2% is charged on the portion from £125,001 to £250,000, 5% from £250,001 to £925,000, 10% from £925,001 to £1.5 million, and 12% above that. Each rate only applies to its own slice of the price, not the whole purchase.",
        ],
      },
      {
        heading: "First-time buyer relief",
        paragraphs: [
          "First-time buyers pay no SDLT on the first £300,000 of a property price (provided the whole property costs £500,000 or less), then 5% on the portion between £300,000 and £500,000. Above £500,000, first-time buyers lose the relief entirely and pay the standard rates on the full price instead. To qualify, every buyer on the purchase must be a genuine first-time buyer who has never owned a residential property anywhere in the world before.",
        ],
      },
      {
        heading: "The extra-property surcharge",
        paragraphs: [
          "Buying an additional residential property — a second home or a buy-to-let — usually adds a 5% surcharge on top of the standard rates for every band, including the portion that would otherwise be tax-free. There are two notable exceptions: the surcharge doesn't apply if you're replacing your main residence (even if you briefly own two homes while the sale and purchase overlap, provided the old home is sold within 36 months), and it doesn't apply to purchases below £40,000, which are exempt from the surcharge regardless of how many other properties you own.",
          "Our Stamp Duty Calculator applies all of these rules automatically — enter the price, whether you're a first-time buyer, and whether the surcharge applies, and it works out the exact SDLT due slice by slice.",
        ],
      },
    ],
    faqs: [
      { q: "Is Stamp Duty charged on the whole price or in slices?", a: "In slices — each band of the purchase price is taxed at its own rate, similar to how Income Tax bands work, so a higher price only increases the rate on the portion above each threshold." },
      { q: "Do first-time buyers always avoid Stamp Duty?", a: "Only up to £300,000, and only if the total property price is £500,000 or less. Above £500,000, first-time buyer relief doesn't apply at all and standard rates are charged on the full price." },
      { q: "Does the extra-property surcharge apply if I'm selling my old home at the same time?", a: "No, provided you're replacing your main residence and sell your previous home within 36 months of the new purchase — in that case the surcharge doesn't apply." },
    ],
  },
  {
    slug: "capital-gains-tax-allowance-explained",
    title: "Capital Gains Tax allowance and rates explained",
    dek: "What counts as a chargeable gain, how much you can make tax-free, and how the basic and higher rates are actually applied.",
    updated: UPDATED,
    related: ["capital-gains-tax-calculator", "income-tax-calculator"],
    sections: [
      {
        heading: "What Capital Gains Tax applies to",
        paragraphs: [
          "Capital Gains Tax (CGT) is charged on the profit — the gain — you make when you sell or dispose of most assets that have increased in value, including shares, investment funds, and property that isn't your main home. It's charged on the gain only, not the full sale price, and only once that gain exceeds your annual tax-free allowance.",
          "Your main home is normally exempt under Private Residence Relief, and personal possessions worth under £6,000 each (like most cars and everyday belongings) are also outside the scope of CGT entirely.",
        ],
      },
      {
        heading: "The tax-free allowance",
        paragraphs: [
          "For 2026/27, the first £3,000 of gains in a tax year is tax-free for individuals. Gains above that are taxable at rates that depend on your overall income for the year — not a fixed CGT rate on its own.",
        ],
      },
      {
        heading: "How the rate is actually worked out",
        paragraphs: [
          "The taxable gain (after deducting the £3,000 allowance) is effectively stacked on top of your other taxable income. Any part of the gain that falls within your remaining basic-rate Income Tax band is taxed at 18%, and any part above that — in the higher or additional-rate bands — is taxed at 24%.",
          "For example, someone with £40,000 of other taxable income and a £20,000 gain (after the allowance) has £10,270 of basic-rate band left before reaching the £50,270 higher-rate threshold. That portion of the gain is taxed at 18% (£1,848.60), and the remaining £9,730 is taxed at 24% (£2,335.20) — a total CGT bill of £4,183.80.",
        ],
      },
      {
        heading: "What reduces a taxable gain",
        paragraphs: [
          "The gain itself is calculated as the sale price minus what you originally paid, minus allowable costs like Stamp Duty on the original purchase, estate agent and legal fees, and the cost of any improvements (though not routine maintenance). Losses on other asset sales in the same tax year — or carried forward from previous years — can also be deducted from gains before the allowance and rates are applied.",
          "Our Capital Gains Tax Calculator applies the £3,000 allowance and the 18%/24% split automatically once you enter your gain and other taxable income.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I make tax-free on Capital Gains Tax?", a: "£3,000 per individual for 2026/27 — gains above that are taxable at 18% or 24% depending on your income." },
      { q: "Does selling my own home trigger Capital Gains Tax?", a: "Usually not — your main residence is normally covered by Private Residence Relief, which exempts most people from CGT when selling the home they actually live in." },
      { q: "Why is my CGT rate not just one fixed percentage?", a: "Because the rate depends on how much of your taxable gain falls within your remaining basic-rate Income Tax band (taxed at 18%) versus the higher or additional-rate bands (taxed at 24%) — it's based on your total income for the year, not the gain alone." },
    ],
  },
  {
    slug: "inheritance-tax-nil-rate-band-explained",
    title: "Inheritance Tax nil-rate bands explained",
    dek: "How the standard and residence nil-rate bands combine to shelter up to £1 million of an estate from Inheritance Tax for some couples.",
    updated: UPDATED,
    related: ["inheritance-tax-calculator"],
    sections: [
      {
        heading: "The standard nil-rate band",
        paragraphs: [
          "Inheritance Tax is charged at 40% on the value of an estate above the available nil-rate band — the tax-free threshold everyone gets. For 2026/27, the standard nil-rate band is £325,000 per person, a figure that has been frozen at this level since 2009. Anything left to a spouse, civil partner, or a registered charity is exempt from Inheritance Tax entirely, regardless of value, and doesn't use up any of the nil-rate band.",
        ],
      },
      {
        heading: "The residence nil-rate band",
        paragraphs: [
          "On top of the standard band, an extra residence nil-rate band of £175,000 is available if the main home is left to children, grandchildren, or other direct descendants. Combined, that gives most individuals up to £500,000 of tax-free estate value (£325,000 plus £175,000), provided the estate includes a home passing to direct descendants.",
          "The residence nil-rate band tapers away for larger estates: it reduces by £1 for every £2 the total estate exceeds £2 million, disappearing completely once the estate reaches £2.35 million.",
        ],
      },
      {
        heading: "Why some couples can shelter up to £1 million",
        paragraphs: [
          "Any unused nil-rate band from a deceased spouse or civil partner can be transferred to the survivor's estate when they later die — effectively doubling what's available. A married couple who leave everything to each other first, then to their children on the second death, can between them shelter up to £650,000 of standard nil-rate band plus up to £350,000 of residence nil-rate band — a combined £1 million before Inheritance Tax applies, assuming neither used any of their own allowance on an earlier gift or bequest.",
        ],
      },
      {
        heading: "What else affects the bill",
        paragraphs: [
          "Gifts made in the seven years before death can also count against the nil-rate band under 'taper relief' rules, with the tax rate on those gifts gradually reducing the longer before death they were made. Larger gifts made more than seven years before death generally fall outside the estate altogether for Inheritance Tax purposes.",
          "Our Inheritance Tax Calculator applies the standard and residence nil-rate bands (including the transferable allowance from a spouse) automatically to estimate the tax due on an estate.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I leave tax-free?", a: "Most individuals can leave up to £500,000 tax-free — £325,000 standard nil-rate band plus £175,000 residence nil-rate band if a home passes to direct descendants. Married couples can potentially combine their allowances for up to £1 million." },
      { q: "Does everything left to a spouse avoid Inheritance Tax?", a: "Yes — transfers to a spouse or civil partner are exempt from Inheritance Tax regardless of value, and don't use up any nil-rate band." },
      { q: "Does the residence nil-rate band apply to any property?", a: "Only if the home is left to direct descendants, such as children or grandchildren — leaving it to a sibling, friend, or anyone else doesn't qualify for this extra band." },
    ],
  },
  {
    slug: "pension-tax-relief-explained",
    title: "Pension tax relief explained",
    dek: "How tax relief on pension contributions actually works, why higher-rate taxpayers often need to claim extra relief themselves, and what the Annual Allowance limits.",
    updated: UPDATED,
    related: ["pension-tax-relief-calculator", "salary-calculator"],
    sections: [
      {
        heading: "The basic idea",
        paragraphs: [
          "Pension tax relief means the government effectively refunds the Income Tax you would otherwise have paid on money you put into a pension, up to certain limits. Put simply, money that would have gone to HMRC as tax goes into your pension instead — which is why pension contributions are often described as costing less than the amount that actually lands in the pot.",
        ],
      },
      {
        heading: "Relief at source vs net pay arrangements",
        paragraphs: [
          "There are two common ways relief is given. Under 'relief at source' (typical for personal pensions and some workplace schemes), you pay in from your take-home pay, and the pension provider automatically claims 20% basic-rate relief from HMRC and adds it to your pot — so a £80 contribution from your pocket becomes £100 in the pension.",
          "Under a 'net pay arrangement' (common for many workplace pensions), your contribution comes out of your gross salary before Income Tax is calculated, so you get relief immediately at your full marginal rate through payroll, with no separate claim needed.",
        ],
      },
      {
        heading: "Why higher-rate taxpayers often need to claim extra",
        paragraphs: [
          "Under relief at source, the pension provider only ever claims the basic 20% automatically — regardless of your actual tax rate. If you're a higher-rate (40%) or additional-rate (45%) taxpayer, you need to claim the extra relief yourself, usually through your Self Assessment return or by contacting HMRC directly, since it isn't given automatically.",
          "This means a £100 gross pension contribution genuinely costs a higher-rate taxpayer only £60 once the extra relief is claimed back — £20 automatically added by the provider, and a further £20 refunded directly to the taxpayer (not into the pension) after they claim it.",
        ],
      },
      {
        heading: "What limits how much relief you can get",
        paragraphs: [
          "The Annual Allowance caps how much can go into your pension each year while still getting tax relief — most people can get relief on contributions up to the lower of their UK earnings or £60,000 a year, though this tapers down for very high earners with income (including pension contributions) above £260,000. Unused allowance from the previous three tax years can sometimes be carried forward, letting you contribute — and get relief on — more than the standard annual limit in a single year.",
          "Our Pension Tax Relief Calculator estimates the relief you'd get on a contribution based on your income, including the extra relief a higher or additional-rate taxpayer would need to claim back separately.",
        ],
      },
    ],
    faqs: [
      { q: "Do I automatically get full tax relief on my pension?", a: "Only if you're a basic-rate taxpayer, or your pension uses a net pay arrangement. Under relief at source, higher and additional-rate taxpayers need to claim the extra relief above 20% themselves, usually via Self Assessment." },
      { q: "What's the difference between relief at source and a net pay arrangement?", a: "Relief at source takes your contribution from already-taxed pay and has the pension provider claim back 20% automatically; a net pay arrangement takes the contribution from your gross pay before tax, giving relief at your full rate immediately through payroll." },
      { q: "How much can I pay into a pension and still get tax relief?", a: "Up to the lower of your UK earnings or £60,000 a year for most people, tapering down for very high earners with total income above £260,000, with some ability to carry forward unused allowance from the previous three years." },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForTool = (toolSlug: string) => GUIDES.filter((g) => g.related.includes(toolSlug));
