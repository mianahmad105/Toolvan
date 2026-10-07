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
          "Let's clear something up first: there's no secret '£100k tax band' hiding in the tax tables. The headline Income Tax rates are still 20%, 40% and 45% — nothing new kicks in at six figures. What actually happens is sneakier: your tax-free Personal Allowance starts getting clawed back. For every £2 you earn over £100,000, HMRC takes away £1 of your £12,570 allowance, until there's nothing left by £125,140.",
          "Here's the part that catches people out: that withdrawn allowance doesn't just vanish quietly — it becomes taxable at 40%. Stack that on top of the tax you're already paying, and the real marginal rate between £100,000 and £125,140 works out at 60%. You keep 40p of every extra pound, not the 60p a normal higher-rate taxpayer keeps.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Picture your salary creeping from £100,000 to £101,000. Normally that extra grand would just cost £400 in tax at 40%, leaving £600 in your pocket. But because you're also losing £500 of Personal Allowance to the taper — and that £500 gets taxed at 40% too — you lose an extra £200 on top. Total damage: £600 tax on £1,000 of extra income. On paper you're still a '40% taxpayer'. In practice, 60% of that raise just disappeared.",
          "If you want to see this for your own number, drop any income between £100,000 and £125,140 into our Income Tax Calculator — the shrinking allowance shows up automatically in the result.",
        ],
      },
      {
        heading: "Why it's worse than it looks",
        paragraphs: [
          "And it doesn't stop at the tax bill. That same 60% zone usually overlaps with other things measured against 'adjusted net income' — Tax-Free Childcare and the 30 free childcare hours both disappear entirely the moment either parent crosses £100,000. For a family with young kids, losing those can cost more than the extra tax itself. We're talking several thousand pounds a year, not a rounding error.",
          "There's a second trap lurking from £60,000 too: the High Income Child Benefit Charge, which claws back Child Benefit gradually until it's gone completely by £80,000. Cross both thresholds and you're effectively navigating two separate tapers at once.",
        ],
      },
      {
        heading: "What you can do about it",
        paragraphs: [
          "The good news: the £100,000 threshold isn't based on your salary — it's based on 'adjusted net income', and that figure comes down if you pay into a pension or give to charity through Gift Aid. Push enough into a pension through salary sacrifice (or a net pay arrangement) and you can pull your adjusted net income back under £100,000 — or under £60,000, if Child Benefit is what you're protecting — instead of just accepting the 60% hit.",
          "This is genuinely one of the better pension tricks going: because the contribution also escapes the 60% band itself, money you put in here attracts up to 60% effective tax relief. Not many other corners of the tax system are this generous. Our Pension Tax Relief Calculator will tell you exactly how much relief a contribution at your income level attracts.",
        ],
      },
    ],
    faqs: [
      { q: "Is there really a 60% tax rate?", a: "Not officially — you won't find a 60% band on any tax table. But the combination of the 40% higher rate and losing £1 of Personal Allowance for every £2 you earn creates an effective marginal rate of 60% on income between £100,000 and £125,140." },
      { q: "Does the 100k trap affect National Insurance too?", a: "No. NI has its own thresholds and doesn't care about the Personal Allowance taper — this 60% effect is purely an Income Tax thing." },
      { q: "How do I get back under £100,000?", a: "Pension contributions and Gift Aid donations both reduce your 'adjusted net income', which is what the £100,000 threshold actually measures. Topping up a pension is by far the most common way people avoid or reduce the taper." },
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
          "Income Tax is one of the few taxes that isn't identical everywhere in the UK — it's partly devolved to the Scottish Parliament. If your main home is in Scotland, you're taxed under Scottish rates and bands (you'll spot it on your payslip: an S in front of your tax code, like S1257L). Everyone else uses the rates set at Westminster. One thing that doesn't change, though: the tax-free Personal Allowance. At £12,570 for 2026/27, it's set UK-wide and identical either way.",
          "What's actually different is what happens above that allowance. England, Wales and Northern Ireland keep it to three bands — 20%, 40%, 45%. Scotland splits things into six: 19% starter, 20% basic, 21% intermediate, 42% higher, 45% advanced, 48% top. More bands, smaller gaps between them.",
        ],
      },
      {
        heading: "Where the bands sit for 2026/27",
        paragraphs: [
          "Rest of the UK: 20% up to £50,270 of total income, 40% from there to £125,140, 45% above that.",
          "Scotland: 19% up to £16,537, 20% up to £29,526, 21% up to £43,662, 42% up to £75,000, 45% up to £125,140, and 48% beyond that.",
        ],
      },
      {
        heading: "Who actually pays more",
        paragraphs: [
          "At the low end, Scotland's a touch cheaper — that 19% starter rate shaves a little off compared with the 20% used elsewhere. But the crossover arrives earlier than most people expect, somewhere around £30,000–£35,000, and above that Scotland starts to sting more. The main culprit is the 42% higher rate kicking in at £43,662 — over £6,500 earlier than the 40% rate down south.",
          "Take someone on £60,000: £11,432 in tax in England, Wales or Northern Ireland, but £13,213.80 north of the border — nearly £1,780 more, almost entirely down to that earlier 42% band. Switch the region toggle to Scotland in our Income Tax Calculator and you'll see exactly what it means for any income.",
        ],
      },
      {
        heading: "What stays the same regardless of region",
        paragraphs: [
          "National Insurance doesn't care which side of the border you're on — it's identical everywhere, same 8%/2% rates and the same thresholds whether you're in Glasgow or Guildford. Dividend tax, savings interest tax, Capital Gains Tax and Inheritance Tax are all set at UK level too, with no Scottish variant.",
          "One thing worth knowing: your tax region is decided by where your main home actually is, not where you work. Commute into England from a house in Scotland and you're still taxed under Scottish rates — HMRC goes by your address, not your desk.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know if I'm taxed under Scottish rates?", a: "Check your tax code. Scottish codes start with S (S1257L, for example), assigned based on your main home address rather than your workplace." },
      { q: "Is the tax-free Personal Allowance different in Scotland?", a: "No — £12,570 for 2026/27, set UK-wide, exactly the same whichever set of bands applies to you." },
      { q: "Does National Insurance differ in Scotland?", a: "No. NI isn't devolved, so the same 8% and 2% rates and thresholds apply across the whole of the UK." },
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
          "Your tax code looks cryptic, but it's really just an instruction to your employer: here's how much of this person's pay to leave untaxed. Take the number in 1257L, multiply by 10, and you've got your tax-free Personal Allowance for the year — £12,570, which happens to be exactly the standard allowance for 2026/27. Change the number and the allowance changes with it: 1000L would mean £10,000 tax-free instead.",
          "1257L is also just about the most common code in the country — the default for anyone with one job, no taxable perks, and no history of under- or overpaid tax to square up.",
        ],
      },
      {
        heading: "What the letter means",
        paragraphs: [
          "The letter does a different job — it flags something specific to HMRC's system, and it shows up on your payslip too. L is the boring-but-common one: standard allowance, nothing unusual going on.",
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
          "Codes drift away from 1257L for a handful of reasons: a company car or private medical insurance eating into your allowance, an old tax bill being clawed back through your current pay, having more than one income source (only one of which usually gets the full allowance), or claiming Marriage Allowance.",
          "Live in Scotland and you'll see an S stuck on the front (S1257L); in Wales, a C (C1257L). Same £12,570 allowance underneath — the letter's just telling HMRC which set of bands to apply.",
        ],
      },
      {
        heading: "Checking your own code",
        paragraphs: [
          "You'll find your code on your payslip, your P60, or any coding notice HMRC sends you directly. If it looks off — you've changed jobs, lost a benefit, picked up a second role — it's worth flagging to HMRC, because a wrong code quietly means you're paying too much or too little all year without realising.",
          "Curious what a specific code actually means? Drop it into our Tax Code Checker. Or if you want to see the real-money difference it makes, put your own code into the Salary Calculator and compare it against the standard 1257L.",
        ],
      },
    ],
    faqs: [
      { q: "Is 1257L the same for everyone?", a: "It's the default for most employees with one job and nothing unusual going on — the full £12,570 Personal Allowance for 2026/27. Your own code can still differ depending on your circumstances." },
      { q: "What does a K code mean?", a: "Your allowance has gone negative — usually because taxable benefits or old underpaid tax outweigh your Personal Allowance, so extra income gets added to what's taxed rather than taken off it." },
      { q: "Why do I have a BR code on my second job?", a: "Because your Personal Allowance has already been allocated to your main job's tax code, so everything from the second job is taxed at a flat 20% with no allowance of its own." },
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
          "Salary sacrifice sounds painful, but it's really just a contractual swap: you agree to take a bit less salary in exchange for something else — usually extra pension contributions, sometimes a cycle-to-work scheme, an electric car lease, or childcare. Because your actual contractual salary drops, that sacrificed chunk never gets taxed or NI'd in the first place.",
          "Compare that with a normal 'net pay' pension contribution, which only sidesteps Income Tax — National Insurance still gets charged on the full amount. Salary sacrifice dodges both.",
        ],
      },
      {
        heading: "Why it saves more than a normal pension contribution",
        paragraphs: [
          "Numbers make this clearer. A basic-rate taxpayer paying £100 a month into a pension the normal way saves the 20% tax (£20) but still pays 8% NI on it — so it actually costs them £92 of take-home pay. Do the same £100 through salary sacrifice instead, and it never counts as earnings at all: no 20% tax, no 8% NI. Real cost: £72. Even the employer saves their 15% NI on it, and plenty pass some of that saving straight back into your pension.",
          "Higher-rate taxpayers see a similar story, just with smaller NI savings (the rate drops to 2% above £50,270) offset by a bigger Income Tax saving at 40%.",
        ],
      },
      {
        heading: "Where it can also help with the £100,000 and £60,000 traps",
        paragraphs: [
          "Because it genuinely lowers your gross salary — not just your taxable income on paper — salary sacrifice is one of the cleanest ways to duck under thresholds like the £100,000 Personal Allowance taper, or the £60,000 point where Child Benefit starts disappearing. Both are measured after pension contributions, so this actually moves the needle rather than just shuffling numbers around.",
          "Worth reading alongside our guide on how the £100,000 tax trap works if that's the threshold you're trying to dodge.",
        ],
      },
      {
        heading: "What to watch out for",
        paragraphs: [
          "It's not free money, though. Sacrificing your salary lowers the 'official' number used for things like mortgage affordability checks, life insurance multiples, statutory maternity pay, and some means-tested benefits — if you're sacrificing a big chunk, it's worth checking what else that number feeds into first. It can also eat into how much pension Annual Allowance you've got left if it pushes you close to the tapered £60,000 limit for high earners.",
          "One more thing: your employer legally can't let salary sacrifice drop your pay below the National Minimum Wage. Most schemes build in a safeguard for this automatically, but it's still worth knowing the rule exists.",
        ],
      },
    ],
    faqs: [
      { q: "Does salary sacrifice reduce my National Insurance as well as my tax?", a: "Yes — that's the main thing it has over a normal pension contribution. Because your contractual salary genuinely drops, the sacrificed amount avoids both Income Tax and employee NI." },
      { q: "Can salary sacrifice affect my mortgage application?", a: "It can. Lenders usually assess affordability on your actual contractual salary, so a large sacrifice can shrink what you're assessed as able to borrow." },
      { q: "Is salary sacrifice only for pensions?", a: "Pensions are the most common use by far, but plenty of employers also run it for cycle-to-work schemes, electric car leases, and sometimes childcare." },
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
          "Income Tax pays for pretty much everything — roads, schools, the NHS, general government spending. National Insurance is different: it's specifically building your entitlement to the State Pension, plus a few contributory benefits like Jobseeker's Allowance. You need roughly 35 qualifying years to get the full new State Pension, and NI is how those years get counted.",
          "What shows up on your payslip is Class 1 NI, deducted automatically by your employer. There's also a separate employer contribution running alongside it that never touches your pay at all — don't go looking for it on your payslip, because it isn't there.",
        ],
      },
      {
        heading: "The 2026/27 rates",
        paragraphs: [
          "The actual numbers: 8% on everything you earn between £12,570 and £50,270, then 2% on anything above that, with no ceiling on the 2% band — it just keeps going. Below £12,570, you pay nothing at all. And unlike Income Tax, there's no taper above £100,000 to worry about here; the 2% rate simply carries on regardless of how much you earn.",
          "NI is worked out on your gross earnings, full stop — not your taxable income. So a standard pension contribution that knocks down your Income Tax bill does absolutely nothing to your NI bill. Only salary sacrifice, which genuinely lowers your contractual pay, touches the NI side too.",
        ],
      },
      {
        heading: "How NI differs from Income Tax in practice",
        paragraphs: [
          "Here's a quirk worth knowing: once you cross £50,270, your NI rate actually drops (8% to 2%), even as your Income Tax rate climbs (20% to 40%). The two taxes pull in opposite directions right at that threshold — part of why total deductions don't rise quite as steeply as the headline 40% rate alone would suggest.",
          "Two jobs complicates things slightly, since NI is worked out separately against each job's own threshold — which can mean paying a touch more combined NI than if the same total income came through one employer. HMRC can sometimes arrange deferment if this applies to you.",
        ],
      },
      {
        heading: "When NI stops",
        paragraphs: [
          "Reach State Pension age and your employee NI stops dead, even if you're still working full-time. Your employer's contribution carries on regardless, but yours doesn't — genuinely one of the only tax perks that comes with getting older.",
          "Self-employed? Different system entirely — Class 2 and Class 4 NI, charged on profits rather than earnings, with its own thresholds that don't match anything above.",
        ],
      },
    ],
    faqs: [
      { q: "What does National Insurance actually pay for?", a: "Mainly your entitlement to the State Pension, plus certain contributory benefits like Jobseeker's Allowance — unlike Income Tax, which just funds general government spending." },
      { q: "Does a pension contribution reduce my NI?", a: "Only through salary sacrifice, which genuinely lowers your contractual salary. A standard net pay pension contribution cuts your Income Tax but leaves your NI bill untouched." },
      { q: "Do I stop paying NI at State Pension age?", a: "Yes — employee Class 1 NI stops the moment you reach State Pension age, no matter how much you keep earning after that." },
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
          "Nobody chooses their repayment plan — it's decided entirely by when and where you started your course, not how much you borrowed or which university you went to. Each plan comes with its own repayment threshold, and once you're on one, you generally stay on it for the life of the loan, unless a later course moves you onto something newer.",
        ],
      },
      {
        heading: "The 2026/27 thresholds",
        paragraphs: [
          "Whatever plan you're on, the repayment works the same way: a percentage of your income above the threshold, taken straight out of your pay alongside — not instead of — Income Tax and National Insurance.",
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
          "Say you're on Plan 2, earning £40,000. You repay 9% of whatever's above £29,385 — that's 9% of £10,615, or £955.35 a year. Dip to or below the threshold and the deduction stops completely for that year, though interest keeps quietly accruing in the background regardless.",
          "Got a Postgraduate Loan running alongside an old undergraduate one? Both apply at once, each against its own threshold — so it's entirely possible to have 9% and 6% coming out of different slices of your pay at the same time.",
        ],
      },
      {
        heading: "What it doesn't affect",
        paragraphs: [
          "Like NI, student loan repayments are calculated on gross earnings rather than taxable income, so a standard pension contribution won't touch them. Salary sacrifice will, though, since it genuinely lowers your contractual pay.",
          "And it doesn't go on forever: once the loan (plus whatever interest has piled up) is cleared, or the write-off date arrives — typically 30 or 40 years after you became eligible to repay, depending on the plan — the deductions simply stop.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know which plan I'm on?", a: "It comes down to where and when you started your course. Check your student loan account at gov.uk, or ask the Student Loans Company directly if you're not sure." },
      { q: "Can I be on two plans at once?", a: "Yes — a Postgraduate Loan can run alongside an undergraduate Plan 1, 2, 4 or 5 repayment at the same time, each calculated against its own threshold." },
      { q: "Does a pension contribution reduce my student loan repayment?", a: "Only if it's taken through salary sacrifice. A standard net pay pension contribution doesn't touch the earnings your repayment is calculated on." },
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
          "Marriage Allowance is a fairly simple idea: one partner hands over £1,260 of their unused tax-free Personal Allowance to the other. Do the maths and that's worth £252 a year for 2026/27 — 20% of £1,260, since that's the rate it would otherwise have been taxed at.",
          "It only actually helps if one of you isn't using your full allowance — typically because you earn under £12,570, or don't work — and the other earns enough to make use of extra tax-free income without tipping into higher-rate territory.",
        ],
      },
      {
        heading: "Who's eligible",
        paragraphs: [
          "The rules: you need to be married or in a civil partnership (living together doesn't count, however long you've been together), one of you earning below £12,570 or nothing at all, and the other sitting as a basic-rate taxpayer — under £50,270 in England, Wales and Northern Ireland, or the Scottish equivalent. Cross into higher-rate territory and the allowance stops being available for that year.",
        ],
      },
      {
        heading: "How it shows up on a payslip",
        paragraphs: [
          "Transfer your allowance away and your code picks up an N (1131N instead of 1257L). Receive one and yours gets an M instead. Both of you will notice your code change, even though only one of you actually sees a smaller tax bill.",
        ],
      },
      {
        heading: "Backdating and how to claim",
        paragraphs: [
          "Here's a bit most people miss: you can backdate a claim up to four tax years if you were eligible but never got around to it — potentially worth up to roughly £1,250 on top of the current year, depending on the exact historic allowance amounts. It's a quick form on gov.uk, and once it's approved it just renews itself automatically every year until someone cancels it or your circumstances change.",
          "Not sure if it's worth it for you? Our Marriage Allowance Calculator will tell you in about ten seconds.",
        ],
      },
    ],
    faqs: [
      { q: "How much can Marriage Allowance save?", a: "Up to £252 a year for 2026/27 — 20% of the £1,260 Personal Allowance that can be transferred between partners." },
      { q: "Can we claim if we're not married, just living together?", a: "No — it's restricted to married couples and registered civil partners, however long an unmarried couple has lived together." },
      { q: "Can I backdate a claim?", a: "Yes, up to four previous tax years if you were eligible but didn't claim at the time, on top of the current year." },
    ],
  },
  {
    slug: "understanding-your-payslip",
    title: "Understanding your payslip",
    dek: "A line-by-line guide to what's on a UK payslip, from gross pay and tax code to the deductions that make up the difference to your net pay.",
    updated: UPDATED,
    related: [
      "salary-calculator", "tax-code-checker", "ni-calculator", "gross-salary-calculator",
      "pro-rata-calculator", "overtime-pay-calculator", "hourly-to-yearly", "salary-to-hourly", "daily-rate-to-annual-salary",
    ],
    sections: [
      {
        heading: "Gross pay and net pay",
        paragraphs: [
          "Two numbers matter on a payslip, and pretty much everything else just explains the gap between them. Gross pay is the headline figure — what's in the job offer, before anything's taken off. Net pay (take-home pay) is what actually hits your bank account once every deduction has done its thing.",
        ],
      },
      {
        heading: "The deductions you'll usually see",
        paragraphs: [
          "The exact layout differs by employer and whatever payroll software they use, but the deductions themselves tend to fall into the same handful of buckets.",
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
          "Your tax code — usually 1257L — tells the payroll software how much to leave untaxed. We've got a whole guide on what 1257L actually means, if that string of letters and numbers has ever bugged you.",
          "Most payslips also carry 'year to date' totals next to the current period's numbers — running totals of pay, tax and NI since 6 April. Worth a glance now and then: PAYE assumes your income is spread evenly across the year, so a payslip right after a bonus or a missed pay period can look oddly over- or under-taxed in isolation, even though it balances out by year-end.",
        ],
      },
      {
        heading: "When something looks wrong",
        paragraphs: [
          "Tax code looks off, NI seems miscalculated, or there's a deduction you don't recognise? Start with payroll or HR — nine times out of ten it's a tax code that hasn't caught up with a change in your circumstances. If HMRC needs to fix it, they'll send the new code straight to your employer.",
          "Or just run your actual gross pay and tax code through our Salary Calculator (for the full picture) or the NI Calculator (just the National Insurance line) and see what the numbers should actually look like.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my payslip different every month even though my salary hasn't changed?", a: "Usually just the number of working days or pay-period rounding. Bigger swings tend to come from a bonus, some overtime, or a tax code that changed partway through the year." },
      { q: "What's the difference between gross and net pay?", a: "Gross pay is your salary before anything's taken off. Net pay is what you actually receive once Income Tax, National Insurance, pension and any other deductions have come out." },
      { q: "What does 'year to date' mean on my payslip?", a: "A running total of your pay, tax and National Insurance since the tax year started on 6 April — handy for spotting whether you're on track to over- or underpay tax." },
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
          "Buy a property over a certain price in England or Northern Ireland, and Stamp Duty Land Tax (SDLT) applies. Scotland and Wales run their own versions instead — Land and Buildings Transaction Tax and Land Transaction Tax — with different rates, so this guide is specifically about the English and Northern Irish system. Like Income Tax, SDLT is charged in slices: each band of the price gets its own rate, so paying a bit more for a house never retroactively bumps up the rate on the cheaper slices underneath.",
        ],
      },
      {
        heading: "Standard residential rates",
        paragraphs: [
          "For a main residence: nothing on the first £125,000, 2% from £125,001 to £250,000, 5% from £250,001 to £925,000, 10% from £925,001 to £1.5 million, and 12% above that. Each rate only bites on its own slice of the price, never the whole purchase.",
        ],
      },
      {
        heading: "First-time buyer relief",
        paragraphs: [
          "First-time buyers get a better deal — nothing at all on the first £300,000, provided the whole property costs £500,000 or less, then 5% on the slice between £300,000 and £500,000. Go even a pound over £500,000, though, and the relief disappears entirely — you're back on the standard rates for the full price. Every buyer on the purchase needs to be a genuine first-timer, anywhere in the world, for this to apply.",
        ],
      },
      {
        heading: "The extra-property surcharge",
        paragraphs: [
          "Buying a second home or a buy-to-let usually means an extra 5% on top of every band — including the slice that would otherwise be tax-free. Two exceptions worth knowing: it doesn't apply if you're replacing your main home (even briefly owning two while a sale and purchase overlap, as long as the old one sells within 36 months), and it doesn't apply to purchases below £40,000, regardless of how many other properties you own.",
          "Our Stamp Duty Calculator handles all of this automatically — price, first-time buyer status, surcharge or not — and works out the exact bill slice by slice.",
        ],
      },
    ],
    faqs: [
      { q: "Is Stamp Duty charged on the whole price or in slices?", a: "In slices, much like Income Tax bands — each portion of the price is taxed at its own rate, so a higher price only increases the rate on the bit above each threshold." },
      { q: "Do first-time buyers always avoid Stamp Duty?", a: "Only up to £300,000, and only if the total property price is £500,000 or less. Go above £500,000 and the relief disappears completely — standard rates apply to the full price." },
      { q: "Does the extra-property surcharge apply if I'm selling my old home at the same time?", a: "No, as long as you're replacing your main residence and sell the previous one within 36 months of the new purchase — the surcharge doesn't apply in that case." },
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
          "Sell something that's gone up in value — shares, a fund, a second property — and Capital Gains Tax (CGT) might apply to the profit. Just the profit, mind, not the sale price, and only once it clears your annual tax-free allowance.",
          "Your own home is usually safe under Private Residence Relief, and personal items worth under £6,000 each — most cars, most everyday belongings — sit outside CGT entirely.",
        ],
      },
      {
        heading: "The tax-free allowance",
        paragraphs: [
          "The allowance itself is modest these days: £3,000 of gains a year, tax-free, for 2026/27. Anything above that gets taxed at a rate that depends on your income for the year — there's no single flat CGT rate to quote.",
        ],
      },
      {
        heading: "How the rate is actually worked out",
        paragraphs: [
          "Think of your taxable gain (after the £3,000 allowance) as sitting on top of your other income. Whatever fits inside your remaining basic-rate band gets taxed at 18%; the rest, pushed into higher or additional-rate territory, gets taxed at 24%.",
          "Worked example: £40,000 of other income, plus a £20,000 gain after the allowance. That leaves £10,270 of basic-rate band before hitting the £50,270 higher-rate line, so that slice is taxed at 18% (£1,848.60), and the remaining £9,730 at 24% (£2,335.20). Total bill: £4,183.80.",
        ],
      },
      {
        heading: "What reduces a taxable gain",
        paragraphs: [
          "Your actual gain is the sale price minus what you paid, minus costs like the original Stamp Duty, legal and agent fees, and genuine improvements (not routine upkeep — a new kitchen counts, a repainted wall doesn't). Losses from other sales in the same tax year, or carried forward from previous ones, come off before the allowance and rates are applied.",
          "Enter your gain and other income into our Capital Gains Tax Calculator and it handles the £3,000 allowance and the 18%/24% split for you.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I make tax-free on Capital Gains Tax?", a: "£3,000 per individual for 2026/27 — anything above that is taxed at 18% or 24% depending on your income." },
      { q: "Does selling my own home trigger Capital Gains Tax?", a: "Usually not. Private Residence Relief covers most people when selling the home they actually live in." },
      { q: "Why is my CGT rate not just one fixed percentage?", a: "Because it depends on how much of your taxable gain falls within your remaining basic-rate band (18%) versus higher or additional-rate territory (24%) — it's based on your total income for the year, not the gain in isolation." },
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
          "Inheritance Tax takes 40% of an estate's value above the nil-rate band — the tax-free slice everyone gets. For 2026/27 that's £325,000 per person, a figure that's been frozen since 2009 (yes, really — over fifteen years without moving). Leave anything to a spouse, civil partner or registered charity, though, and it's exempt entirely, no matter the value, and it doesn't even touch your nil-rate band.",
        ],
      },
      {
        heading: "The residence nil-rate band",
        paragraphs: [
          "There's a second allowance on top — £175,000 — if the main home goes to children, grandchildren or other direct descendants. Stack it with the standard band and most people can pass on up to £500,000 tax-free, as long as a home's involved and it's going to direct descendants.",
          "It does taper away for bigger estates, though: £1 lost for every £2 the estate sits above £2 million, gone completely by £2.35 million.",
        ],
      },
      {
        heading: "Why some couples can shelter up to £1 million",
        paragraphs: [
          "Here's the bit that surprises people: any nil-rate band your spouse didn't use gets transferred to you when they die. Leave everything to each other first, then to the kids on the second death, and a couple can combine up to £650,000 of standard nil-rate band with £350,000 of residence nil-rate band — £1 million, tax-free, before the 40% rate even enters the conversation (assuming neither of you used up your own allowance earlier on other gifts).",
        ],
      },
      {
        heading: "What else affects the bill",
        paragraphs: [
          "Gifts made in the seven years before death can still count against the nil-rate band, under what's called taper relief — the tax on them reduces the longer before death they were made. Go further back than seven years with a gift and it generally falls outside the estate altogether.",
          "Our Inheritance Tax Calculator folds in both nil-rate bands — plus any transferred from a spouse — to give you a working estimate.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I leave tax-free?", a: "Most individuals can pass on up to £500,000 tax-free — £325,000 standard nil-rate band plus £175,000 residence nil-rate band, if a home goes to direct descendants. Couples can potentially combine their allowances for up to £1 million." },
      { q: "Does everything left to a spouse avoid Inheritance Tax?", a: "Yes — transfers to a spouse or civil partner are exempt regardless of value, and don't use up any nil-rate band." },
      { q: "Does the residence nil-rate band apply to any property?", a: "Only if it's left to direct descendants — children, grandchildren and so on. Leave it to a sibling or a friend and this extra band doesn't apply." },
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
          "Pension tax relief is the government quietly giving you back the tax you'd otherwise have paid on money you put into a pension. Put another way: cash that would've gone to HMRC goes into your pension pot instead — exactly why a pension contribution always costs less than what actually lands in the pot.",
        ],
      },
      {
        heading: "Relief at source vs net pay arrangements",
        paragraphs: [
          "There are two ways this actually happens. 'Relief at source' — common for personal pensions — takes your contribution from pay you've already been taxed on, then the provider claims back 20% from HMRC and tops up your pot automatically. Put in £80, end up with £100.",
          "A 'net pay arrangement' — common in workplace schemes — takes the contribution before tax is even worked out, so you get relief at your full rate immediately, through payroll, with nothing to claim afterwards.",
        ],
      },
      {
        heading: "Why higher-rate taxpayers often need to claim extra",
        paragraphs: [
          "Here's the catch with relief at source: the provider only ever claims the basic 20%, no matter what you actually pay. Higher-rate (40%) and additional-rate (45%) taxpayers have to go and claim the rest themselves — usually through Self Assessment — because it doesn't happen automatically.",
          "Work it through and a £100 pension contribution really only costs a higher-rate taxpayer £60 once they've claimed it back: £20 added automatically by the provider, and another £20 refunded straight to them (not into the pension) after they ask for it.",
        ],
      },
      {
        heading: "What limits how much relief you can get",
        paragraphs: [
          "There's a ceiling, obviously — the Annual Allowance. Most people get relief on contributions up to the lower of their earnings or £60,000 a year, tapering down for very high earners above £260,000. You can sometimes carry forward unused allowance from the previous three years if you want to put in more in a single year.",
          "Our Pension Tax Relief Calculator works out the relief on a given contribution at your income level, extra claim included.",
        ],
      },
    ],
    faqs: [
      { q: "Do I automatically get full tax relief on my pension?", a: "Only if you're a basic-rate taxpayer, or your scheme uses a net pay arrangement. Under relief at source, higher and additional-rate taxpayers need to claim the extra relief above 20% themselves, usually via Self Assessment." },
      { q: "What's the difference between relief at source and a net pay arrangement?", a: "Relief at source takes your contribution from already-taxed pay and has the provider claim back 20%; a net pay arrangement takes it from your gross pay before tax, giving full-rate relief immediately through payroll." },
      { q: "How much can I pay into a pension and still get tax relief?", a: "Up to the lower of your earnings or £60,000 a year for most people, tapering down above £260,000 of total income, with some scope to carry forward unused allowance from the last three years." },
    ],
  },
  {
    slug: "savings-interest-and-tax-explained",
    title: "Do you pay tax on savings interest?",
    dek: "How the Personal Savings Allowance works, who still owes tax on interest, and how HMRC actually collects it.",
    updated: UPDATED,
    related: ["savings-interest-calculator"],
    sections: [
      {
        heading: "The Personal Savings Allowance",
        paragraphs: [
          "Most people pay zero tax on savings interest — the Personal Savings Allowance (PSA) sees to that. Basic-rate taxpayers get £1,000 of interest tax-free a year, higher-rate taxpayers get £500, and additional-rate taxpayers (over £125,140) get nothing at all — every penny of their interest is potentially taxable.",
          "Which band you fall into depends on your total income, not just the interest itself — so if interest happens to tip you into higher-rate territory, you could lose part of that £1,000 allowance for the year.",
        ],
      },
      {
        heading: "There's a second allowance for low earners",
        paragraphs: [
          "Less well known: a 0% starting rate for savings worth up to £5,000, available to anyone whose other income doesn't fully use up their Personal Allowance and basic-rate band. In practice that's mostly retirees with a small pension and a decent savings pot, rather than the average employee — but it's worth knowing it exists.",
          "Stack the Personal Allowance, the starting rate, and the PSA together, and someone with modest earned income can genuinely receive several thousand pounds of interest a year without owing HMRC anything.",
        ],
      },
      {
        heading: "ISAs sit outside all of this",
        paragraphs: [
          "Interest inside a Cash ISA — or the cash side of a Stocks and Shares ISA — is always tax-free, full stop, no matter the balance, and it never touches your PSA. If you're sitting on savings outside an ISA and paying tax on the interest, moving it inside one (up to the £20,000 annual ISA allowance) is usually the easiest fix.",
        ],
      },
      {
        heading: "How the tax actually gets collected",
        paragraphs: [
          "You don't have to tell HMRC about interest that stays within your PSA — there's nothing to do there. Banks report what they've paid you straight to HMRC each year, and if you do owe tax above your allowance, it's usually collected automatically through next year's tax code rather than a bill landing on your doormat. Only people already doing Self Assessment for other reasons tend to report it that way instead.",
          "Our Savings Interest Calculator shows how a balance grows with compound interest — use the allowances above to work out whether any of that growth would actually be taxable for you.",
        ],
      },
    ],
    faqs: [
      { q: "How much savings interest can I earn tax-free?", a: "£1,000 a year for basic-rate taxpayers, £500 for higher-rate, and nothing for additional-rate taxpayers — plus a separate 0% starting rate of up to £5,000 for people with low other income." },
      { q: "Do I need to declare savings interest to HMRC myself?", a: "Usually not. Banks report what they've paid you directly to HMRC, who adjust your tax code to collect anything owed — you'd only report it yourself if you already file a Self Assessment return." },
      { q: "Does interest in an ISA count towards my Personal Savings Allowance?", a: "No. ISA interest is always tax-free and never touches your PSA, however large the balance." },
    ],
  },
  {
    slug: "vehicle-tax-ved-explained",
    title: "How Vehicle Tax (VED) actually works",
    dek: "First-year rates, the flat standard rate, the expensive car supplement, and what changes for older and electric cars.",
    updated: UPDATED,
    related: ["vehicle-tax-calculator"],
    sections: [
      {
        heading: "Two different systems, depending on age",
        paragraphs: [
          "Vehicle Excise Duty (VED) — still called road tax by basically everyone — isn't one simple system, it's two, split by registration date. Cars registered from 1 April 2017 onward use the CO₂-based first-year rate followed by a flat standard rate, covered below. Anything older runs on an earlier system based on engine size (pre-2001) or a different set of CO₂ bands (2001–2017), and it's usually cheaper for smaller, older cars than the current rules would be.",
        ],
      },
      {
        heading: "First year, then a flat rate",
        paragraphs: [
          "For anything registered after April 2017: year one is priced by CO₂ emissions (check the V5C for the figure) — the dirtier the car, the steeper the rate. From year two, nearly everything drops to a flat £200 a year, emissions irrelevant. A thrifty hatchback and a thirsty performance car cost exactly the same to tax from that point on.",
        ],
      },
      {
        heading: "The expensive car supplement",
        paragraphs: [
          "Cars with a list price over £50,000 when new get hit with an extra £440 a year on top of the standard rate, for five years starting in year two. Work it through and that's £640 a year for years two through six, dropping back to £200 once the five years are up.",
          "Electric cars used to dodge all of this — not anymore. Since April 2025 they're taxed exactly like petrol and diesel, expensive car supplement included if the list price was over £50,000. Their first-year rate still tends to be low, though, since it's based on their minimal emissions figure.",
        ],
      },
      {
        heading: "SORN and exemptions",
        paragraphs: [
          "Vehicle sitting unused off the road? Declare a SORN (Statutory Off Road Notification) and the VED stops until it's back in use. A handful of vehicle types are exempt regardless of age — certain disabled-driver schemes, and anything over 40 years old registered as a historic vehicle.",
          "Our Vehicle Tax Calculator estimates the first-year and standard-rate VED for anything registered after April 2017 — grab the CO₂ figure and list price from the V5C for the most accurate number.",
        ],
      },
    ],
    faqs: [
      { q: "Why does my older car not fit the £200 standard rate?", a: "Cars registered before 1 April 2017 are taxed under an earlier system based on engine size or a different set of CO₂ bands, which can work out cheaper than the current flat rate for smaller or older cars." },
      { q: "Do electric cars pay vehicle tax?", a: "Yes, since April 2025 — same rules as petrol and diesel, including the expensive car supplement if the list price when new was over £50,000." },
      { q: "What happens if I don't drive my car for a while?", a: "Declare a SORN and VED stops while the vehicle is genuinely off the road and unused, rather than paying tax on a car that's just sitting there." },
    ],
  },
  {
    slug: "understanding-loan-repayments-and-apr",
    title: "Understanding loan repayments and APR",
    dek: "Why your monthly payment stays the same but its makeup changes, what APR actually includes, and how overpaying really saves you money.",
    updated: UPDATED,
    related: ["loan-repayment-calculator"],
    sections: [
      {
        heading: "Every payment is part interest, part capital",
        paragraphs: [
          "Most loans — personal loans, car finance, repayment mortgages — work the same way: your monthly payment is fixed, but what it's actually made of shifts every single month. Interest gets charged on whatever you still owe, and that's at its highest right at the start, so early payments are mostly interest, barely denting the balance. As the balance shrinks, so does the interest charged on it, and later payments swing increasingly toward paying off capital instead.",
        ],
      },
      {
        heading: "APR isn't just the interest rate",
        paragraphs: [
          "APR bundles the interest rate and any mandatory fees into one yearly figure, specifically so loans with wildly different fee structures can actually be compared. A loan with a lower headline rate but a chunky arrangement fee can end up with a higher APR — and cost more overall — than one with a slightly higher rate and no fees. APR is the number worth comparing, not the rate on the poster.",
          "One more thing worth knowing: advertised rates are usually 'representative', meaning at least 51% of successful applicants get that rate or better. Everyone else — often anyone with a thinner credit history — gets offered something worse once they actually apply.",
        ],
      },
      {
        heading: "Term length is a real trade-off, not just a bigger or smaller payment",
        paragraphs: [
          "Stretch the term and the monthly payment drops, which helps if affordability's tight — but you pay interest for longer, so the total cost climbs even though the rate hasn't moved an inch. A £10,000 loan at 6% APR costs about £1,601 in interest over 5 years, but roughly £2,276 over 7 — nearly £675 more, purely from stretching it out. Worth weighing that trade-off deliberately rather than just defaulting to the longest term on offer.",
        ],
      },
      {
        heading: "Overpaying works — but check for a penalty first",
        paragraphs: [
          "Because interest is charged on whatever's still outstanding, any overpayment shrinks the balance immediately, and every month after that you're charged interest on a smaller number. Pay extra early in the loan and you save more than paying the same extra amount later on. Just check first — many lenders cap penalty-free overpayments at around 10% of the balance a year, so a big lump sum could land you a fee.",
          "Our Loan Repayment Calculator shows the fixed monthly payment and total interest for any amount, rate and term — worth running a couple of different term lengths to see the affordability-versus-cost trade-off for yourself.",
        ],
      },
    ],
    faqs: [
      { q: "Why is so much of my early payment just interest?", a: "Interest is charged on whatever you still owe, which is highest right at the start of the loan — so early payments are mostly interest, and later payments shift increasingly toward capital as the balance falls." },
      { q: "Is APR the same as the interest rate?", a: "No — APR bundles the interest rate with any mandatory fees into one yearly figure, which is why it's the number to compare between loans rather than the headline rate alone." },
      { q: "Does a longer loan term cost more overall?", a: "Yes, even at an identical rate, simply because you're paying interest on the outstanding balance for longer — a lower monthly payment over a longer term usually means more total interest by the end." },
      { q: "Can I pay off my loan early to save money?", a: "Generally yes, since overpaying shrinks the balance interest gets charged on. Check your loan agreement first, though — some lenders charge a fee above a certain overpayment amount." },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForTool = (toolSlug: string) => GUIDES.filter((g) => g.related.includes(toolSlug));
