export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface Guide {
  slug: string;
  title: string;
  dek: string;
  published: string;
  updated: string;
  related: string[]; // tool slugs this guide links to / is linked from
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; href: string }[];
}

const GOVUK_INCOME_TAX = { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" };
const GOVUK_NI = { label: "GOV.UK: National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" };

const PUBLISHED = "2026-09-24";
const UPDATED = "2026-10-02";
const NEW = "2026-10-29";

export const GUIDES: Guide[] = [
  {
    slug: "how-the-100k-tax-trap-works",
    title: "How the £100,000 tax trap works",
    dek: "Why crossing £100,000 can cost you more than the headline 40% rate suggests, and what you can do about it.",
    published: PUBLISHED,
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
      {
        heading: "Marginal rate by income band",
        paragraphs: [
          "It helps to see the whole curve in one place. The table below shows the effective rate on each extra £100 you earn as your income rises — not the average rate on your whole salary, just the rate on the next slice.",
        ],
        table: {
          headers: ["Income band", "What's happening", "Marginal rate on the next £100"],
          rows: [
            ["Up to £50,270", "Basic rate, full Personal Allowance", "~28% (20% tax + 8% NI)"],
            ["£50,270 – £60,000", "Higher rate, Child Benefit starts tapering if you claim it", "42% (62% with Child Benefit taper for a two-child family)"],
            ["£60,000 – £100,000", "Higher rate, Child Benefit fully gone", "42%"],
            ["£100,000 – £125,140", "Higher rate plus the Personal Allowance taper", "~62% (40% tax + 2% NI + 20% from the lost allowance)"],
            ["Above £125,140", "Additional rate, no Personal Allowance left", "47% (45% tax + 2% NI)"],
          ],
        },
      },
      {
        heading: "A second worked example: £115,000",
        paragraphs: [
          "Someone on £115,000 is £15,000 into the taper, so their Personal Allowance has shrunk by £7,500 (half of £15,000), down to £5,070 from the standard £12,570. Compare that with someone on £95,000 — just under the taper — who keeps the full £12,570. Despite earning only £20,000 more, the £115,000 earner has £7,500 less tax-free income to work with, on top of the extra 40% tax on the £20,000 itself. It's a useful sanity check for anyone assuming the jump from £95,000 to £115,000 costs 'just' 40% tax on the difference — the real cost includes the vanishing allowance too.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming the 60% rate applies to your whole salary, not just the £100,000–£125,140 slice — it doesn't; income below £100,000 is still taxed at the normal rates.",
          "Forgetting that 'adjusted net income' includes bonuses, benefits in kind and rental or dividend income, not just your salary — a bonus can easily tip someone from £98,000 into the taper zone without them realising.",
          "Missing the childcare cliff edges — Tax-Free Childcare and the 30 free hours disappear entirely at £100,000 of adjusted net income, not gradually, so being £1 over the line can cost thousands, not pence.",
          "Not checking Gift Aid donations as a lever — like pension contributions, they reduce adjusted net income, and are often overlooked next to pensions as a way back under £100,000.",
          "Timing a pension contribution for the wrong tax year — contributions only count against the tax year they're actually paid in, so a contribution made in April to cover the previous tax year won't help that year's bill.",
        ],
      },
    ],
    faqs: [
      { q: "Is there really a 60% tax rate?", a: "Not officially — you won't find a 60% band on any tax table. But the combination of the 40% higher rate and losing £1 of Personal Allowance for every £2 you earn creates an effective marginal rate of 60% on income between £100,000 and £125,140." },
      { q: "Does the 100k trap affect National Insurance too?", a: "No. NI has its own thresholds and doesn't care about the Personal Allowance taper — this 60% effect is purely an Income Tax thing." },
      { q: "How do I get back under £100,000?", a: "Pension contributions and Gift Aid donations both reduce your 'adjusted net income', which is what the £100,000 threshold actually measures. Topping up a pension is by far the most common way people avoid or reduce the taper." },
      { q: "Does a bonus count towards the £100,000 taper?", a: "Yes. Adjusted net income includes your total pay for the year — salary, bonus, most benefits in kind, and other income like rental or dividend income — not just your base salary, so a bonus can push someone into the taper even if their salary alone is under £100,000." },
      { q: "What happens exactly at £125,140?", a: "The Personal Allowance taper finishes at £125,140 — by that point the full £12,570 has been withdrawn, so everyone earning £125,140 or more has no Personal Allowance at all and the 60% effective rate zone ends, replaced by the standard 45% additional rate (47% with NI)." },
    ],
    sources: [GOVUK_INCOME_TAX, { label: "GOV.UK: High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" }],
  },
  {
    slug: "scottish-vs-english-income-tax-explained",
    title: "Scottish vs English Income Tax explained",
    dek: "Scotland sets its own Income Tax bands. Here's exactly how they differ from the rest of the UK, and who ends up paying more.",
    published: PUBLISHED,
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
        table: {
          headers: ["Band", "England, Wales & NI", "Scotland"],
          rows: [
            ["Tax-free", "£0 – £12,570 (0%)", "£0 – £12,570 (0%)"],
            ["Starter/basic (low)", "—", "£12,571 – £16,537 (19%)"],
            ["Basic rate", "£12,571 – £50,270 (20%)", "£16,538 – £29,526 (20%)"],
            ["Intermediate", "—", "£29,527 – £43,662 (21%)"],
            ["Higher rate", "£50,271 – £125,140 (40%)", "£43,663 – £75,000 (42%)"],
            ["Advanced", "—", "£75,001 – £125,140 (45%)"],
            ["Top/additional rate", "Above £125,140 (45%)", "Above £125,140 (48%)"],
          ],
        },
      },
      {
        heading: "Who actually pays more",
        paragraphs: [
          "At the low end, Scotland's a touch cheaper — that 19% starter rate shaves a little off compared with the 20% used elsewhere. But the crossover arrives earlier than most people expect, somewhere around £30,000–£35,000, and above that Scotland starts to sting more. The main culprit is the 42% higher rate kicking in at £43,662 — over £6,500 earlier than the 40% rate down south.",
          "Take someone on £60,000: £11,432 in tax in England, Wales or Northern Ireland, but £13,213.80 north of the border — nearly £1,780 more, almost entirely down to that earlier 42% band. Switch the region toggle to Scotland in our Income Tax Calculator and you'll see exactly what it means for any income.",
        ],
      },
      {
        heading: "A second worked example: £32,000",
        paragraphs: [
          "Someone earning £32,000 sits right around the crossover point, which makes it a useful test case. In England, Wales or Northern Ireland: £12,570 is tax-free, leaving £19,430 taxed at 20%, for a bill of £3,886. In Scotland: the first £12,570 is tax-free, the next £3,967 (up to £16,537) is taxed at 19% (£753.73), the next £12,989 (up to £29,526) at 20% (£2,597.80), and the remaining £2,474 at 21% (£519.54) — a total of £3,871.07. Scotland comes out £14.93 cheaper here, right at the point where the extra 19% starter band still roughly cancels out the earlier, narrower bands above it. Push the same comparison to £45,000 and Scotland is already slightly more expensive, because more income has crossed into the 21% intermediate band.",
        ],
      },
      {
        heading: "What stays the same regardless of region",
        paragraphs: [
          "National Insurance doesn't care which side of the border you're on — it's identical everywhere, same 8%/2% rates and the same thresholds whether you're in Glasgow or Guildford. Dividend tax, savings interest tax, Capital Gains Tax and Inheritance Tax are all set at UK level too, with no Scottish variant.",
          "One thing worth knowing: your tax region is decided by where your main home actually is, not where you work. Commute into England from a house in Scotland and you're still taxed under Scottish rates — HMRC goes by your address, not your desk.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming Scotland is always more expensive — it's actually slightly cheaper below roughly £30,000–£35,000 of income, because of the 19% starter rate.",
          "Working out Scottish tax using the three UK-wide bands by mistake — Scotland has six bands, not three, and missing the 21% intermediate band or the 42% higher rate threshold will give the wrong answer.",
          "Assuming a Scottish tax code means Scottish National Insurance rates too — NI is identical across the whole UK regardless of your tax code prefix.",
          "Basing tax region on where you work rather than where you live — a Scottish resident commuting to an English office is still taxed under Scottish rates, and vice versa.",
          "Forgetting that dividend and savings income use UK-wide rates even for Scottish taxpayers — only earned income (salary, pensions, self-employment profit) follows the Scottish bands.",
          "Assuming a change of address updates your tax code instantly — HMRC usually needs to be told directly about a house move between Scotland and the rest of the UK, since it won't necessarily pick this up from other records automatically.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know if I'm taxed under Scottish rates?", a: "Check your tax code. Scottish codes start with S (S1257L, for example), assigned based on your main home address rather than your workplace." },
      { q: "Is the tax-free Personal Allowance different in Scotland?", a: "No — £12,570 for 2026/27, set UK-wide, exactly the same whichever set of bands applies to you." },
      { q: "Does National Insurance differ in Scotland?", a: "No. NI isn't devolved, so the same 8% and 2% rates and thresholds apply across the whole of the UK." },
      { q: "At what income does Scotland become more expensive than the rest of the UK?", a: "Roughly £30,000–£35,000, depending on the exact figure. Below that, the 19% starter rate tends to make Scotland slightly cheaper; above it, the earlier 42% higher-rate threshold at £43,662 tends to make Scotland more expensive." },
      { q: "Do dividends and savings interest use the Scottish bands?", a: "No. Dividend tax and savings interest tax are set at UK level and use the same rates for everyone, regardless of whether you're a Scottish taxpayer for earned income." },
      { q: "What if I move between Scotland and the rest of the UK partway through the tax year?", a: "Your tax code should update to reflect your new main residence once HMRC is told, and your Income Tax for the year is generally apportioned based on where you lived while each part of your income was earned." },
    ],
    sources: [GOVUK_INCOME_TAX, { label: "GOV.UK: Scottish Income Tax", href: "https://www.gov.uk/scottish-income-tax" }],
  },
  {
    slug: "what-does-tax-code-1257l-mean",
    title: "What does tax code 1257L mean?",
    dek: "1257L is the standard tax code for most UK employees — here's exactly what the numbers and letter mean, and when yours might look different.",
    published: PUBLISHED,
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
      {
        heading: "Common tax codes compared",
        table: {
          headers: ["Code", "Meaning", "Tax-free amount"],
          rows: [
            ["1257L", "Standard allowance, one job, nothing unusual", "£12,570"],
            ["S1257L", "Standard allowance, taxed under Scottish bands", "£12,570"],
            ["C1257L", "Standard allowance, taxed under Welsh bands (same rates as England)", "£12,570"],
            ["1257L M1", "Standard allowance, but applied month-by-month rather than cumulatively — common when starting a new job partway through the year", "£12,570 (spread unevenly)"],
            ["BR", "Everything taxed at 20%, no allowance — typical for a second job", "£0"],
            ["K243", "Negative allowance; £2,430 is added to taxable pay instead of deducted", "–£2,430 (added to income)"],
            ["0T", "No allowance at all; full bands apply from £0", "£0"],
          ],
        },
      },
      {
        heading: "A worked example: comparing 1257L with BR",
        paragraphs: [
          "Say someone earns £30,000 from their main job and takes on a second job paying £8,000 a year. The main job keeps the standard 1257L code, so the usual £12,570 allowance applies there, with the rest taxed normally. The second job, having no allowance left to give, gets a BR code — every pound of that £8,000 is taxed at 20%, giving £1,600 in tax with no tax-free slice at all. Added together, their total Income Tax across both jobs is the same as if the full £38,000 had been earned from one employer with a 1257L code — PAYE is just splitting the same calculation across two payslips rather than charging extra for having two jobs.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a BR or D0 code on a second job means you're being overtaxed — it's usually correct, because your Personal Allowance has already been used against your main job.",
          "Confusing the S and C prefixes — S means Scottish Income Tax bands, C means Welsh rates (which currently match England's), and no letter means England or Northern Ireland.",
          "Not checking the code after a life change — starting a company car, losing a benefit, or finishing repayment of an old tax bill should all trigger a new code from HMRC, but it's worth double-checking it actually arrived.",
          "Mixing up 'cumulative' and 'month 1' (M1) codes — a cumulative code spreads your allowance evenly through the year based on year-to-date pay, while an M1 code resets each month, which can temporarily over- or under-tax pay right after starting a new job.",
          "Ignoring a K code because it looks unusual — it's a normal part of the system for people with benefits or debts larger than their allowance, not an error, though it's still worth checking the number behind the K is correct.",
        ],
      },
    ],
    faqs: [
      { q: "Is 1257L the same for everyone?", a: "It's the default for most employees with one job and nothing unusual going on — the full £12,570 Personal Allowance for 2026/27. Your own code can still differ depending on your circumstances." },
      { q: "What does a K code mean?", a: "Your allowance has gone negative — usually because taxable benefits or old underpaid tax outweigh your Personal Allowance, so extra income gets added to what's taxed rather than taken off it." },
      { q: "Why do I have a BR code on my second job?", a: "Because your Personal Allowance has already been allocated to your main job's tax code, so everything from the second job is taxed at a flat 20% with no allowance of its own." },
      { q: "What's the difference between a cumulative code and an M1 (month 1) code?", a: "A cumulative code works out your tax-free allowance for the year so far and adjusts each payslip accordingly, while an M1 code treats every pay period in isolation, giving you one month's worth of allowance each time regardless of what happened earlier in the year — this is common when joining partway through the tax year." },
      { q: "Can my tax code change more than once a year?", a: "Yes. HMRC can issue a new code whenever your estimated income, benefits or allowances change, so it's normal to see more than one code in a single tax year if your circumstances shift." },
    ],
    sources: [{ label: "GOV.UK: Tax codes", href: "https://www.gov.uk/tax-codes" }, GOVUK_INCOME_TAX],
  },
  {
    slug: "salary-sacrifice-explained",
    title: "Salary sacrifice explained",
    dek: "Salary sacrifice can cut your tax and National Insurance bill at the same time — here's how it works and when it's worth it.",
    published: PUBLISHED,
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
      {
        heading: "Salary sacrifice vs a normal pension contribution",
        table: {
          headers: ["", "Net pay pension contribution", "Salary sacrifice"],
          rows: [
            ["Income Tax on the amount", "Avoided", "Avoided"],
            ["Employee NI on the amount", "Still charged", "Avoided"],
            ["Employer NI on the amount", "Still charged", "Avoided (often partly reinvested)"],
            ["Effect on contractual salary", "None — salary stays the same", "Reduces your official salary"],
            ["Real cost of £100 to a basic-rate taxpayer", "£92", "£72"],
            ["Effect on mortgage affordability checks", "None", "Can reduce what you're assessed as able to borrow"],
          ],
        },
      },
      {
        heading: "A higher-rate worked example: £200 a month",
        paragraphs: [
          "Take a higher-rate taxpayer sacrificing £200 a month (£2,400 a year) into their pension. Under a normal net pay contribution, they'd save 40% Income Tax (£960 a year) but still pay 2% NI on that £2,400 (£48), for a real cost of £1,392. Under salary sacrifice, the £2,400 never counts as pay at all, so there's no Income Tax and no NI on it whatsoever — the real cost drops to £1,440... which is actually slightly more in this example, because above the Upper Earnings Limit the employee NI saving is only 2%, a much smaller gap than the 8% a basic-rate taxpayer saves. The bigger win for higher earners is usually the employer NI saving (13.8% on top), some of which many employers pass back into the pension as an extra contribution.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming salary sacrifice always saves more than a net pay contribution — for some higher-rate taxpayers whose income sits entirely above the Upper Earnings Limit, the NI saving is smaller than it looks, though the employer-side saving often still makes it worthwhile.",
          "Not checking what your 'official' salary feeds into before sacrificing a large amount — mortgage lenders, income protection insurers and statutory maternity pay calculations typically use your post-sacrifice salary, not your original one.",
          "Forgetting salary sacrifice contributions still count towards your pension Annual Allowance — sacrificing a large amount can use up more of your £60,000 allowance than you expect.",
          "Assuming every employer passes on their NI saving — some do, many don't; it's worth asking your employer specifically whether they add their NI saving back into your pension.",
          "Sacrificing right down to minimum wage without checking the legal floor — employers must keep your cash pay at or above National Minimum Wage after any sacrifice, which can cap how much you're allowed to give up.",
        ],
      },
    ],
    faqs: [
      { q: "Does salary sacrifice reduce my National Insurance as well as my tax?", a: "Yes — that's the main thing it has over a normal pension contribution. Because your contractual salary genuinely drops, the sacrificed amount avoids both Income Tax and employee NI." },
      { q: "Can salary sacrifice affect my mortgage application?", a: "It can. Lenders usually assess affordability on your actual contractual salary, so a large sacrifice can shrink what you're assessed as able to borrow." },
      { q: "Is salary sacrifice only for pensions?", a: "Pensions are the most common use by far, but plenty of employers also run it for cycle-to-work schemes, electric car leases, and sometimes childcare." },
      { q: "Does my employer have to pass on their NI saving?", a: "No, it's entirely up to the employer. Some schemes add the employer's National Insurance saving back into your pension as an extra contribution; others simply keep it as a cost saving, so it's worth asking your HR or payroll team directly." },
      { q: "Can salary sacrifice take my pay below minimum wage?", a: "No — this is a hard legal limit, and employers must ensure your cash pay after sacrifice stays at or above the National Minimum Wage or National Living Wage, which can restrict how much you're able to sacrifice." },
    ],
    sources: [{ label: "GOV.UK: Salary sacrifice for employers", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" }, GOVUK_NI],
  },
  {
    slug: "national-insurance-explained",
    title: "National Insurance explained",
    dek: "What National Insurance actually pays for, how the employee rates work for 2026/27, and how it differs from Income Tax.",
    published: PUBLISHED,
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
      {
        heading: "Qualifying years and the State Pension",
        paragraphs: [
          "Every tax year you pay enough NI — or receive NI credits, for example while claiming certain benefits or Child Benefit for a child under 12 — counts as a 'qualifying year' towards your State Pension record. You generally need 35 qualifying years to get the full new State Pension, and at least 10 to get anything at all, so a handful of years with little or no NI contribution early in a career can genuinely reduce the State Pension someone ends up with decades later if they're never made up.",
          "This is one reason it's worth checking your NI record on gov.uk occasionally, particularly after a career break, a period of self-employment with low profits, or several years working part-time below the Lower Earnings Limit — gaps can sometimes be filled with voluntary Class 3 contributions if it's cost-effective to do so.",
          "It's also worth knowing that your NI record is checked against your earnings in each individual job, not your combined income if you have more than one employment — someone working two part-time jobs, each below the Lower Earnings Limit on its own, might not build a qualifying year from either job even though their combined income would comfortably have qualified had it come from a single employer.",
        ],
      },
      {
        heading: "Worked examples at three income levels",
        table: {
          headers: ["Gross salary", "NI at 8% (£12,570–£50,270)", "NI at 2% (above £50,270)", "Total annual NI"],
          rows: [
            ["£25,000", "£994.40", "£0.00", "£994.40"],
            ["£50,270", "£3,016.00", "£0.00", "£3,016.00"],
            ["£80,000", "£3,016.00", "£594.60", "£3,610.60"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming NI works like Income Tax, with a Personal Allowance that tapers above £100,000 — it doesn't; the 2% rate simply continues at every income level with no upper limit and no taper.",
          "Expecting a workplace pension to lower NI — only a salary sacrifice arrangement reduces the earnings NI is charged on; a standard net pay contribution leaves NI completely untouched.",
          "Forgetting NI is calculated per job, not on combined income — two part-time jobs each under the threshold can still mean less total NI than one combined job over it, or occasionally more, depending on how the thresholds split across both.",
          "Assuming NI stops as soon as you decide to 'semi-retire' — it only stops once you reach State Pension age specifically, regardless of how much or little you're working beforehand.",
          "Mixing up Class 1 (employee), Class 2 and Class 4 (self-employed) NI — they have entirely different rates and thresholds, so a self-employed worked example won't match the employee figures on this page.",
        ],
      },
    ],
    faqs: [
      { q: "What does National Insurance actually pay for?", a: "Mainly your entitlement to the State Pension, plus certain contributory benefits like Jobseeker's Allowance — unlike Income Tax, which just funds general government spending." },
      { q: "Does a pension contribution reduce my NI?", a: "Only through salary sacrifice, which genuinely lowers your contractual salary. A standard net pay pension contribution cuts your Income Tax but leaves your NI bill untouched." },
      { q: "Do I stop paying NI at State Pension age?", a: "Yes — employee Class 1 NI stops the moment you reach State Pension age, no matter how much you keep earning after that." },
      { q: "Is there an upper limit on how much NI I can pay?", a: "No. Unlike the old 'Upper Earnings Limit' cap that used to exist, earnings above £50,270 are simply charged at 2% indefinitely, with no ceiling on income or on the amount of NI due." },
      { q: "How much NI would I pay on £80,000?", a: "£3,610.60 a year — 8% on the £37,700 between £12,570 and £50,270 (£3,016), plus 2% on the remaining £29,730 above £50,270 (£594.60)." },
    ],
    sources: [GOVUK_NI],
  },
  {
    slug: "student-loan-repayment-plans-explained",
    title: "Student loan repayment plans explained",
    dek: "Plan 1, 2, 4, 5 or Postgraduate — which one applies to you, what the thresholds are, and how repayments are actually worked out.",
    published: PUBLISHED,
    updated: UPDATED,
    related: ["salary-calculator"],
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
        table: {
          headers: ["Plan", "Who it's for", "Threshold", "Rate"],
          rows: [
            ["Plan 1", "Mostly pre-2012 English/Welsh starters, and Northern Ireland", "£26,900", "9%"],
            ["Plan 2", "Most English/Welsh starters 2012–2023", "£29,385", "9%"],
            ["Plan 4", "Scottish students", "£33,795", "9%"],
            ["Plan 5", "English starters from August 2023 onward", "£25,000", "9%"],
            ["Postgraduate Loan", "Master's/Doctoral, any nation", "£21,000", "6%"],
          ],
        },
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Say you're on Plan 2, earning £40,000. You repay 9% of whatever's above £29,385 — that's 9% of £10,615, or £955.35 a year. Dip to or below the threshold and the deduction stops completely for that year, though interest keeps quietly accruing in the background regardless.",
          "Got a Postgraduate Loan running alongside an old undergraduate one? Both apply at once, each against its own threshold — so it's entirely possible to have 9% and 6% coming out of different slices of your pay at the same time.",
        ],
      },
      {
        heading: "A combined worked example: Plan 2 plus a Postgraduate Loan",
        paragraphs: [
          "Take the same £40,000 earner, but now also repaying a Postgraduate Loan. The Plan 2 repayment is unchanged at £955.35 (9% of the £10,615 above £29,385). The Postgraduate Loan is calculated completely separately, against its own £21,000 threshold: 6% of £19,000 (£40,000 minus £21,000), which is £1,140. Added together, that's £2,095.35 a year in student loan repayments alone, on top of Income Tax and National Insurance — a useful reminder that having both loan types doesn't average the two rates, it stacks them against two different thresholds.",
        ],
      },
      {
        heading: "Interest accrues whether you're repaying or not",
        paragraphs: [
          "Student loans accrue interest continuously from the day they're taken out, including while you're studying, during any period you earn below the threshold, and even once you've left the UK. The interest rate itself is usually linked to RPI inflation, sometimes with an extra percentage on top depending on income and plan — it's worth checking the current rate for your specific plan on gov.uk, since it can move from year to year. A loan can keep growing in total size for years even while nothing is being repaid, simply because interest continues to accrue on the outstanding balance throughout.",
        ],
      },
      {
        heading: "What it doesn't affect",
        paragraphs: [
          "Like NI, student loan repayments are calculated on gross earnings rather than taxable income, so a standard pension contribution won't touch them. Salary sacrifice will, though, since it genuinely lowers your contractual pay.",
          "And it doesn't go on forever: once the loan (plus whatever interest has piled up) is cleared, or the write-off date arrives — typically 30 or 40 years after you became eligible to repay, depending on the plan — the deductions simply stop.",
          "If you're self-employed as well as (or instead of) employed, student loan repayments are worked out through Self Assessment rather than payroll, calculated on your profit above the same thresholds — it's reported alongside the rest of your Self Assessment return rather than deducted automatically each pay period.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming your plan is based on your university or course subject — it's actually based purely on when and where (which UK nation) you started your course.",
          "Forgetting repayments are based on gross income above the threshold, not your total loan balance — a high earner with a small remaining balance can still have a large monthly deduction, and vice versa.",
          "Not reporting self-employed income to the Student Loans Company — if you're both employed and self-employed, you may need to declare the self-employed portion separately through Self Assessment rather than relying on PAYE alone to capture it.",
          "Overpaying voluntarily without checking if it's worthwhile — for many graduates, especially on Plan 2 or 5, the loan is forecast to be written off before it's fully repaid, so voluntary overpayments can be money that would otherwise never have been due.",
          "Assuming moving abroad cancels the loan — repayments continue if you live overseas, just assessed and collected directly by the Student Loans Company rather than through a UK employer's payroll.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know which plan I'm on?", a: "It comes down to where and when you started your course. Check your student loan account at gov.uk, or ask the Student Loans Company directly if you're not sure." },
      { q: "Can I be on two plans at once?", a: "Yes — a Postgraduate Loan can run alongside an undergraduate Plan 1, 2, 4 or 5 repayment at the same time, each calculated against its own threshold." },
      { q: "Does a pension contribution reduce my student loan repayment?", a: "Only if it's taken through salary sacrifice. A standard net pay pension contribution doesn't touch the earnings your repayment is calculated on." },
      { q: "How much would I repay on Plan 2 and a Postgraduate Loan together on £40,000?", a: "About £2,095.35 a year in total — £955.35 (9% of the £10,615 above the £29,385 Plan 2 threshold) plus £1,140 (6% of the £19,000 above the £21,000 Postgraduate threshold)." },
      { q: "Should I pay off my student loan early?", a: "It depends on your plan and how likely you are to repay it in full before the write-off date — for many people on Plan 2 or Plan 5, the loan is forecast to be written off before it's cleared, which makes voluntary overpayment less attractive than it would be for a conventional loan." },
    ],
    sources: [{ label: "GOV.UK: Repaying your student loan", href: "https://www.gov.uk/repaying-your-student-loan" }],
  },
  {
    slug: "marriage-allowance-explained",
    title: "Marriage Allowance explained",
    dek: "How married couples and civil partners can transfer part of an unused Personal Allowance to save up to £252 a year.",
    published: PUBLISHED,
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
        heading: "What if your circumstances change during the year?",
        paragraphs: [
          "If the lower earner starts earning more, or the higher earner's income rises into higher-rate territory partway through the tax year, Marriage Allowance can stop being available for that year even though it was claimed at the start of it. HMRC generally works this out when tax positions are finalised after the year ends, which can mean a small adjustment to one partner's tax bill rather than the transfer simply continuing regardless of what actually happened to each person's income.",
        ],
      },
      {
        heading: "Backdating and how to claim",
        paragraphs: [
          "Here's a bit most people miss: you can backdate a claim up to four tax years if you were eligible but never got around to it — potentially worth up to roughly £1,250 on top of the current year, depending on the exact historic allowance amounts. It's a quick form on gov.uk, and once it's approved it just renews itself automatically every year until someone cancels it or your circumstances change.",
          "Not sure if it's worth it for you? Our Marriage Allowance Calculator will tell you in about ten seconds.",
        ],
      },
      {
        heading: "A worked example: backdating four years",
        paragraphs: [
          "Imagine a couple who became eligible for Marriage Allowance in the 2022/23 tax year but only find out about it now, in 2026/27. They can claim the current year (worth £252) plus the four previous tax years, each worth a slightly different amount because the transferable allowance has grown over time: roughly £252 for 2025/26, £252 for 2024/25, £252 for 2023/24, and £238 for 2022/23. Added together, that's a one-off backdated payment of around £1,246, on top of £252 a year going forward — a lump sum many eligible couples never claim simply because they didn't know the option existed.",
        ],
      },
      {
        heading: "Marriage Allowance vs other allowances for couples",
        table: {
          headers: ["", "Marriage Allowance", "Married Couple's Allowance"],
          rows: [
            ["Who it's for", "Couples where one earns under £12,570", "Couples where at least one partner was born before 6 April 1935"],
            ["Typical saving", "Up to £252 a year", "Between £401 and £1,037.50 a year, depending on income"],
            ["Can you claim both?", "No — only one can apply at a time", "No — only one can apply at a time"],
            ["How it's given", "Transfers part of the Personal Allowance", "A separate deduction from the tax bill itself"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming cohabiting couples qualify — Marriage Allowance is restricted to legally married couples and registered civil partnerships, regardless of how long an unmarried couple has lived together.",
          "Not backdating a claim — many eligible couples only apply for the current year and miss out on up to four years of past claims they were entitled to.",
          "Applying when the higher earner is already a higher-rate taxpayer — the receiving partner must stay a basic-rate taxpayer for the allowance to apply; it's withdrawn for any year they cross into higher-rate territory.",
          "Forgetting to cancel after divorce or separation — the transfer doesn't end automatically in every case, so it's worth actively cancelling it rather than assuming HMRC will catch the change.",
          "Confusing Marriage Allowance with the older Married Couple's Allowance — they're different reliefs with different eligibility rules, and a couple can only claim one of the two.",
        ],
      },
    ],
    faqs: [
      { q: "How much can Marriage Allowance save?", a: "Up to £252 a year for 2026/27 — 20% of the £1,260 Personal Allowance that can be transferred between partners." },
      { q: "Can we claim if we're not married, just living together?", a: "No — it's restricted to married couples and registered civil partners, however long an unmarried couple has lived together." },
      { q: "Can I backdate a claim?", a: "Yes, up to four previous tax years if you were eligible but didn't claim at the time, on top of the current year." },
      { q: "What's the difference between Marriage Allowance and Married Couple's Allowance?", a: "Marriage Allowance is for any eligible married couple or civil partnership where one partner earns under £12,570. Married Couple's Allowance is a separate, generally more valuable relief only available where at least one partner was born before 6 April 1935 — you can't claim both at once." },
      { q: "What happens to Marriage Allowance if we divorce?", a: "The transfer should be cancelled, since you're no longer eligible once the marriage or civil partnership ends — this is usually done online and any adjustment needed is handled through a tax code change or Self Assessment." },
    ],
    sources: [{ label: "GOV.UK: Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" }],
  },
  {
    slug: "understanding-your-payslip",
    title: "Understanding your payslip",
    dek: "A line-by-line guide to what's on a UK payslip, from gross pay and tax code to the deductions that make up the difference to your net pay.",
    published: PUBLISHED,
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
          "Some payslips also show your pension scheme's contribution rate and your employer's matching rate side by side, plus any salary sacrifice arrangements as a separate line. Checking these every so often is worth doing even if nothing's changed recently — a payroll system error affecting pension contributions can go unnoticed for months if nobody's actually comparing the percentage shown against what the contract or scheme booklet promised.",
        ],
      },
      {
        heading: "When something looks wrong",
        paragraphs: [
          "Tax code looks off, NI seems miscalculated, or there's a deduction you don't recognise? Start with payroll or HR — nine times out of ten it's a tax code that hasn't caught up with a change in your circumstances. If HMRC needs to fix it, they'll send the new code straight to your employer.",
          "Or just run your actual gross pay and tax code through our Salary Calculator (for the full picture) or the NI Calculator (just the National Insurance line) and see what the numbers should actually look like.",
        ],
      },
      {
        heading: "A worked example: reading a £3,000 monthly payslip",
        paragraphs: [
          "Picture a payslip showing £3,000 gross pay for the month (£36,000 a year), standard 1257L tax code, no pension or student loan. Income Tax for the month would be about £390.50 (a twelfth of £4,686 a year, after £12,570 is taken off and the remaining £23,430 is taxed at 20%). National Insurance would be about £156.20 for the month (a twelfth of £1,874.40 a year, 8% of the £23,430 above the £12,570 threshold). Net pay for the month comes to roughly £2,453.30. If the year-to-date figures three months into the tax year show tax of exactly three times that monthly figure, everything is on track — a noticeably different year-to-date total is usually the first sign something's changed.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Comparing one payslip to a yearly calculator result without dividing by 12 — a monthly figure and an annual figure will never match, so always check which period you're comparing.",
          "Panicking over a bonus month's tax — PAYE assumes that month's pay is your regular pay repeated all year, so a one-off bonus can look heavily taxed in that month even though it balances out by the end of the tax year.",
          "Ignoring a change in tax code — a new code appearing on a payslip without an obvious reason is worth checking with payroll, since it usually reflects a genuine change HMRC has made to your record.",
          "Assuming an employer error means underpaid tax is written off — HMRC will usually still collect any underpaid tax eventually, typically by adjusting a future tax code, even if the mistake wasn't the employee's fault.",
          "Not checking year-to-date figures after changing jobs mid-year — a new employer needs your P45 figures to carry over your allowance correctly; without them, you can be taxed on a temporary 'emergency' basis until it's sorted.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my payslip different every month even though my salary hasn't changed?", a: "Usually just the number of working days or pay-period rounding. Bigger swings tend to come from a bonus, some overtime, or a tax code that changed partway through the year." },
      { q: "What's the difference between gross and net pay?", a: "Gross pay is your salary before anything's taken off. Net pay is what you actually receive once Income Tax, National Insurance, pension and any other deductions have come out." },
      { q: "What does 'year to date' mean on my payslip?", a: "A running total of your pay, tax and National Insurance since the tax year started on 6 April — handy for spotting whether you're on track to over- or underpay tax." },
      { q: "Why does my bonus month look so heavily taxed?", a: "PAYE assumes your current month's pay is typical for the whole year, so a large one-off bonus can temporarily push that month into a higher tax band on paper. It generally balances out over the rest of the tax year as your income returns to normal." },
      { q: "What should I do if I don't recognise a deduction on my payslip?", a: "Ask payroll or HR first — it's usually something like a season ticket loan repayment, a benefit-in-kind adjustment, or a court-ordered deduction you may have forgotten about. If it's genuinely unexplained, raise it in writing and keep a copy of the payslip." },
    ],
    sources: [GOVUK_INCOME_TAX, GOVUK_NI],
  },
  {
    slug: "stamp-duty-thresholds-explained",
    title: "Stamp Duty thresholds explained",
    dek: "How Stamp Duty Land Tax is actually calculated in slices, who gets first-time buyer relief, and when the extra-property surcharge applies.",
    published: PUBLISHED,
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
        table: {
          headers: ["Slice of the price", "Standard rate", "First-time buyer rate (if total price ≤ £500,000)"],
          rows: [
            ["Up to £125,000", "0%", "0% (up to £300,000)"],
            ["£125,001 – £250,000", "2%", "0% (up to £300,000)"],
            ["£250,001 – £300,000", "5%", "0% (up to £300,000)"],
            ["£300,001 – £500,000", "5%", "5%"],
            ["£500,001 – £925,000", "5%", "Relief doesn't apply above £500,000"],
            ["£925,001 – £1.5m", "10%", "Relief doesn't apply above £500,000"],
            ["Above £1.5m", "12%", "Relief doesn't apply above £500,000"],
          ],
        },
      },
      {
        heading: "First-time buyer relief",
        paragraphs: [
          "First-time buyers get a better deal — nothing at all on the first £300,000, provided the whole property costs £500,000 or less, then 5% on the slice between £300,000 and £500,000. Go even a pound over £500,000, though, and the relief disappears entirely — you're back on the standard rates for the full price. Every buyer on the purchase needs to be a genuine first-timer, anywhere in the world, for this to apply.",
          "'Anywhere in the world' is doing real work in that last sentence — someone who has previously owned property overseas, even somewhere with completely different property laws, generally doesn't count as a first-time buyer for this relief, even if this would be their first home in the UK specifically.",
        ],
      },
      {
        heading: "A worked example: £400,000 three ways",
        paragraphs: [
          "Take a £400,000 purchase and compare the three common situations. As a standard home mover: 0% on the first £125,000, 2% on the next £125,000 (£2,500), and 5% on the remaining £150,000 up to £400,000 (£7,500) — a total of £10,000. As a first-time buyer: 0% on the first £300,000, and 5% on the remaining £100,000 up to £400,000 — a total of £5,000, a £5,000 saving over the standard rate. As an additional property (a second home or buy-to-let): the standard £10,000 plus a flat 5% surcharge on the entire £400,000 (£20,000) — a total of £30,000, three times the standard home mover's bill.",
        ],
      },
      {
        heading: "The extra-property surcharge",
        paragraphs: [
          "Buying a second home or a buy-to-let usually means an extra 5% on top of every band — including the slice that would otherwise be tax-free. Two exceptions worth knowing: it doesn't apply if you're replacing your main home (even briefly owning two while a sale and purchase overlap, as long as the old one sells within 36 months), and it doesn't apply to purchases below £40,000, regardless of how many other properties you own.",
          "Our Stamp Duty Calculator handles all of this automatically — price, first-time buyer status, surcharge or not — and works out the exact bill slice by slice.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Applying the top rate to the whole purchase price — SDLT is a slice tax, so only the portion of the price within each band is taxed at that band's rate.",
          "Assuming first-time buyer relief applies above £500,000 with a reduced benefit — it doesn't scale down, it switches off completely, so a £500,001 purchase is taxed entirely at standard rates with no relief at all.",
          "Forgetting the surcharge applies to the whole price, not just the amount above a threshold — a 5% surcharge on a £400,000 additional property is £20,000, not 5% of some smaller slice.",
          "Not checking the 36-month rule when replacing a main home — if the old home hasn't sold yet, the surcharge is usually charged upfront and can be reclaimed once it sells within 36 months, rather than being avoided automatically from day one.",
          "Assuming Scotland and Wales use the same rates — they run entirely separate systems (Land and Buildings Transaction Tax and Land Transaction Tax respectively), with different bands and thresholds from England and Northern Ireland's SDLT.",
        ],
      },
    ],
    faqs: [
      { q: "Is Stamp Duty charged on the whole price or in slices?", a: "In slices, much like Income Tax bands — each portion of the price is taxed at its own rate, so a higher price only increases the rate on the bit above each threshold." },
      { q: "Do first-time buyers always avoid Stamp Duty?", a: "Only up to £300,000, and only if the total property price is £500,000 or less. Go above £500,000 and the relief disappears completely — standard rates apply to the full price." },
      { q: "Does the extra-property surcharge apply if I'm selling my old home at the same time?", a: "No, as long as you're replacing your main residence and sell the previous one within 36 months of the new purchase — the surcharge doesn't apply in that case." },
      { q: "How much Stamp Duty would I pay on a £400,000 second home?", a: "£30,000 — the standard £10,000 (0% on the first £125,000, 2% on the next £125,000, 5% on the remaining £150,000) plus a flat 5% surcharge on the full £400,000 (£20,000)." },
      { q: "Does Stamp Duty apply in Scotland and Wales?", a: "No. Scotland uses Land and Buildings Transaction Tax and Wales uses Land Transaction Tax, both with their own separate rates and bands, so this guide's figures only apply to England and Northern Ireland." },
      { q: "Does owning property abroad affect first-time buyer relief?", a: "Yes — previously owning a residential property anywhere in the world, not just the UK, generally disqualifies you from first-time buyer relief, even if the UK purchase would be your first home here." },
      { q: "Who actually pays the Stamp Duty bill?", a: "The buyer, not the seller — it's calculated on the purchase price and is one of the costs a buyer needs to budget for alongside the deposit, legal fees and any mortgage arrangement fee." },
    ],
    sources: [{ label: "GOV.UK: Stamp Duty Land Tax rates", href: "https://www.gov.uk/stamp-duty-land-tax" }, { label: "GOV.UK: First-time buyer relief for Stamp Duty", href: "https://www.gov.uk/guidance/sdlt-relief-for-first-time-buyers" }],
  },
  {
    slug: "capital-gains-tax-allowance-explained",
    title: "Capital Gains Tax allowance and rates explained",
    dek: "What counts as a chargeable gain, how much you can make tax-free, and how the basic and higher rates are actually applied.",
    published: PUBLISHED,
    updated: UPDATED,
    related: ["capital-gains-tax-calculator", "income-tax-calculator"],
    sections: [
      {
        heading: "What Capital Gains Tax applies to",
        paragraphs: [
          "Sell something that's gone up in value — shares, a fund, a second property — and Capital Gains Tax (CGT) might apply to the profit. Just the profit, mind, not the sale price, and only once it clears your annual tax-free allowance.",
          "Your own home is usually safe under Private Residence Relief, and personal items worth under £6,000 each — most cars, most everyday belongings — sit outside CGT entirely.",
          "Assets held inside an ISA or a pension are also completely outside CGT, regardless of how much they've grown — this is one of the main reasons ISAs and pensions are worth using for investments before a general trading account, since gains made inside either wrapper never need to be reported or taxed at all.",
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
      {
        heading: "A second example: an already higher-rate taxpayer",
        paragraphs: [
          "Now compare that with someone earning £70,000 who makes the same £20,000 taxable gain. Their income alone already exceeds the £50,270 higher-rate threshold, so they have no basic-rate band left for the gain to use. The entire £20,000 taxable gain is charged at 24%, giving a CGT bill of £4,800 — £616.20 more than the £4,183.80 paid in the first example, purely because their other income used up the cheaper 18% band before the gain was even added.",
        ],
      },
      {
        heading: "Splitting a gain between spouses",
        paragraphs: [
          "Assets can generally be transferred between spouses and civil partners without triggering CGT, which some couples use deliberately before a sale to make use of two separate £3,000 allowances instead of one. Transfer half of a shareholding to a lower-earning spouse before selling, for instance, and each of you reports your own half of the gain against your own allowance and your own income-based rate — potentially saving several hundred pounds in total compared with one person reporting the whole gain alone, especially where one partner is a basic-rate taxpayer and the other isn't using their allowance at all.",
        ],
      },
      {
        heading: "CGT rate by taxpayer type",
        table: {
          headers: ["Taxpayer type", "Rate on gains within the basic-rate band", "Rate on gains above it"],
          rows: [
            ["Basic-rate (income under £50,270)", "18%", "24% on any excess"],
            ["Higher or additional-rate (income over £50,270)", "Not applicable — no basic-rate band left", "24% on the whole taxable gain"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming CGT has one flat rate — the rate depends on how much basic-rate band is left once your other income is accounted for, so the same gain can be taxed differently for two different people.",
          "Forgetting to deduct allowable costs — Stamp Duty, legal fees, agent fees and genuine capital improvements all reduce the taxable gain, but routine maintenance and running costs don't count.",
          "Not reporting a loss in the year it happens — losses must generally be reported to HMRC to be used later, even in a year no tax is actually due, or they may not be available to offset a future gain.",
          "Assuming the £3,000 allowance can be carried forward — it can't; an unused allowance simply disappears at the end of the tax year rather than rolling into the next one.",
          "Missing the 60-day reporting deadline for residential property — unlike most other gains reported through Self Assessment, a taxable gain on UK residential property must be reported and paid within 60 days of completion.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I make tax-free on Capital Gains Tax?", a: "£3,000 per individual for 2026/27 — anything above that is taxed at 18% or 24% depending on your income." },
      { q: "Does selling my own home trigger Capital Gains Tax?", a: "Usually not. Private Residence Relief covers most people when selling the home they actually live in." },
      { q: "Why is my CGT rate not just one fixed percentage?", a: "Because it depends on how much of your taxable gain falls within your remaining basic-rate band (18%) versus higher or additional-rate territory (24%) — it's based on your total income for the year, not the gain in isolation." },
      { q: "How much CGT would a higher-rate taxpayer pay on a £20,000 gain?", a: "£4,800 — because someone already earning above £50,270 has no basic-rate band left, so the entire taxable gain (after the £3,000 allowance) is charged at 24%." },
      { q: "Can I carry forward an unused CGT allowance to next year?", a: "No. The £3,000 annual exempt amount doesn't carry forward — if you don't use it in a tax year, it's simply lost, unlike some other allowances." },
    ],
    sources: [{ label: "GOV.UK: Capital Gains Tax rates and allowances", href: "https://www.gov.uk/capital-gains-tax/rates" }],
  },
  {
    slug: "inheritance-tax-nil-rate-band-explained",
    title: "Inheritance Tax nil-rate bands explained",
    dek: "How the standard and residence nil-rate bands combine to shelter up to £1 million of an estate from Inheritance Tax for some couples.",
    published: PUBLISHED,
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
      {
        heading: "A worked example: a £700,000 estate",
        paragraphs: [
          "Take a single person's estate worth £700,000, including a home worth £300,000 left to their two children. The standard nil-rate band covers £325,000, and the residence nil-rate band covers the full £175,000 (the home is worth more than that, so the whole allowance applies). Combined allowance: £500,000. Taxable estate: £700,000 minus £500,000 = £200,000. At 40%, the Inheritance Tax bill is £80,000. If that same person had been a surviving spouse who inherited their late partner's fully unused allowances, the combined allowance would double to £1,000,000, and no Inheritance Tax would be due at all on the £700,000 estate.",
        ],
      },
      {
        heading: "Taper relief on gifts within seven years",
        table: {
          headers: ["Years before death", "Tax rate on the gift"],
          rows: [
            ["0–3 years", "40% (full rate)"],
            ["3–4 years", "32%"],
            ["4–5 years", "24%"],
            ["5–6 years", "16%"],
            ["6–7 years", "8%"],
            ["7+ years", "0% — outside the estate"],
          ],
        },
      },
      {
        heading: "Business and agricultural relief, briefly",
        paragraphs: [
          "Two reliefs are worth knowing exist even though they're outside the scope of a general calculator: Business Relief can reduce the taxable value of a genuine trading business or shares in one by up to 100%, and Agricultural Relief can do the same for working farmland and farmhouses. Both have detailed qualifying conditions — how long the asset was owned, whether the business genuinely trades rather than mainly holds investments, and so on — so anyone with a business or farm as part of their estate should get specific advice rather than relying on the general nil-rate band figures here.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming the residence nil-rate band applies to any beneficiary — it's only available when the home goes to direct descendants (children, grandchildren, step-children), not siblings, friends, or other relatives.",
          "Forgetting the residence nil-rate band tapers away on large estates — it reduces by £1 for every £2 the estate exceeds £2 million, and disappears entirely above £2.35 million.",
          "Not claiming a deceased spouse's unused nil-rate bands — this transfer isn't automatic; the executor must actively claim it when the second spouse dies, usually using the relevant HMRC forms.",
          "Assuming all lifetime gifts are immediately outside the estate — only gifts that survive seven years are fully exempt; gifts made within seven years of death are added back in, with taper relief reducing the rate rather than the gift itself.",
          "Treating this calculator's estimate as the final figure for probate — Inheritance Tax can also involve trusts, business relief, agricultural relief and other reliefs this guide doesn't cover, so a solicitor should confirm the exact position for a real estate.",
        ],
      },
    ],
    faqs: [
      { q: "How much can I leave tax-free?", a: "Most individuals can pass on up to £500,000 tax-free — £325,000 standard nil-rate band plus £175,000 residence nil-rate band, if a home goes to direct descendants. Couples can potentially combine their allowances for up to £1 million." },
      { q: "Does everything left to a spouse avoid Inheritance Tax?", a: "Yes — transfers to a spouse or civil partner are exempt regardless of value, and don't use up any nil-rate band." },
      { q: "Does the residence nil-rate band apply to any property?", a: "Only if it's left to direct descendants — children, grandchildren and so on. Leave it to a sibling or a friend and this extra band doesn't apply." },
      { q: "How much Inheritance Tax is due on a £700,000 estate left to children, including a £300,000 home?", a: "£80,000 — the combined £500,000 allowance (£325,000 nil-rate band plus £175,000 residence nil-rate band) leaves £200,000 taxable at 40%." },
      { q: "What is taper relief on gifts?", a: "It reduces the Inheritance Tax rate charged on a gift made between three and seven years before death, stepping down from 40% to 32%, 24%, 16% and 8% as more time passes, reaching 0% once the gift is more than seven years old." },
    ],
    sources: [{ label: "GOV.UK: Inheritance Tax", href: "https://www.gov.uk/inheritance-tax" }, { label: "GOV.UK: Residence nil rate band", href: "https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band" }],
  },
  {
    slug: "pension-tax-relief-explained",
    title: "Pension tax relief explained",
    dek: "How tax relief on pension contributions actually works, why higher-rate taxpayers often need to claim extra relief themselves, and what the Annual Allowance limits.",
    published: PUBLISHED,
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
          "This is a genuinely common missed claim — HMRC doesn't proactively calculate and refund this extra relief for most relief-at-source contributions, so a higher-rate taxpayer who never mentions their pension contributions on a Self Assessment return (or writes to HMRC separately if they don't file one) can go years without claiming relief they were always entitled to.",
        ],
      },
      {
        heading: "What limits how much relief you can get",
        paragraphs: [
          "There's a ceiling, obviously — the Annual Allowance. Most people get relief on contributions up to the lower of their earnings or £60,000 a year, tapering down for very high earners above £260,000. You can sometimes carry forward unused allowance from the previous three years if you want to put in more in a single year.",
          "Our Pension Tax Relief Calculator works out the relief on a given contribution at your income level, extra claim included.",
        ],
      },
      {
        heading: "Why relief can also help with the £100,000 and £60,000 traps",
        paragraphs: [
          "Pension contributions don't just attract tax relief in their own right — they also reduce your 'adjusted net income', which is the figure used for the Personal Allowance taper above £100,000 and the High Income Child Benefit Charge above £60,000. A contribution large enough to pull someone back under one of these thresholds effectively attracts relief at an even higher rate than their normal marginal rate, because it also protects allowances or benefits that would otherwise be lost. This is one of the most commonly recommended ways to deal with both thresholds, and it's covered in more detail in our guide on how the £100,000 tax trap works.",
        ],
      },
      {
        heading: "The true cost of £1,000 in your pension, by tax rate",
        table: {
          headers: ["Your tax rate", "Relief added automatically", "Extra you can claim via Self Assessment", "True net cost of £1,000"],
          rows: [
            ["Basic rate (20%)", "£200 (added by provider)", "£0 — already at the right rate", "£800"],
            ["Higher rate (40%)", "£200 (added by provider)", "£200", "£600"],
            ["Additional rate (45%)", "£200 (added by provider)", "£250", "£550"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming the extra relief above 20% arrives automatically — under relief at source, it only ever does if you actively claim it, usually through Self Assessment or by writing to HMRC.",
          "Confusing relief at source with a net pay arrangement — they achieve a similar end result for higher earners, but relief at source needs an extra claim step that net pay arrangements don't.",
          "Not checking which type your workplace scheme uses — the two systems are easy to mix up, and getting it wrong means either expecting relief that never arrives or missing out on a claim you're entitled to make.",
          "Forgetting the Annual Allowance taper applies to very high earners — contributions attracting relief are capped at a lower figure than £60,000 once 'adjusted income' passes £260,000, and contributing above your real limit can trigger a tax charge.",
          "Overlooking carry forward — if you've had years with little or no pension contribution, you may be able to use unused allowance from the previous three tax years to get relief on a larger single contribution now.",
        ],
      },
    ],
    faqs: [
      { q: "Do I automatically get full tax relief on my pension?", a: "Only if you're a basic-rate taxpayer, or your scheme uses a net pay arrangement. Under relief at source, higher and additional-rate taxpayers need to claim the extra relief above 20% themselves, usually via Self Assessment." },
      { q: "What's the difference between relief at source and a net pay arrangement?", a: "Relief at source takes your contribution from already-taxed pay and has the provider claim back 20%; a net pay arrangement takes it from your gross pay before tax, giving full-rate relief immediately through payroll." },
      { q: "How much can I pay into a pension and still get tax relief?", a: "Up to the lower of your earnings or £60,000 a year for most people, tapering down above £260,000 of total income, with some scope to carry forward unused allowance from the last three years." },
      { q: "What does £1,000 in my pension really cost a higher-rate taxpayer?", a: "£600 — £800 after the automatic 20% relief is added, minus a further £200 reclaimed via Self Assessment once their 40% entitlement is claimed." },
      { q: "Can I use unused pension allowance from previous years?", a: "Yes, through carry forward — you can use unused Annual Allowance from the previous three tax years on top of this year's, provided you were a member of a registered pension scheme in those years." },
    ],
    sources: [{ label: "GOV.UK: Tax on your private pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension" }],
  },
  {
    slug: "savings-interest-and-tax-explained",
    title: "Do you pay tax on savings interest?",
    dek: "How the Personal Savings Allowance works, who still owes tax on interest, and how HMRC actually collects it.",
    published: PUBLISHED,
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
          "A worked example: a retiree with £10,000 of pension income and £4,000 of savings interest. Their Personal Allowance covers £12,570, so all £10,000 of pension income is already tax-free, leaving £2,570 of unused allowance. That unused £2,570 absorbs the first slice of their interest tax-free in the normal way, and the 0% starting rate for savings then covers up to a further £5,000 of interest on top — comfortably covering their entire £4,000 of interest, which means this retiree pays no tax at all despite having £14,000 of total income.",
        ],
      },
      {
        heading: "ISAs sit outside all of this",
        paragraphs: [
          "Interest inside a Cash ISA — or the cash side of a Stocks and Shares ISA — is always tax-free, full stop, no matter the balance, and it never touches your PSA. If you're sitting on savings outside an ISA and paying tax on the interest, moving it inside one (up to the £20,000 annual ISA allowance) is usually the easiest fix.",
          "It's worth remembering the £20,000 ISA allowance resets every tax year rather than accumulating — you can't 'save up' unused ISA allowance from previous years, so moving a large lump sum from a regular savings account into an ISA often has to happen gradually, over more than one tax year, rather than all at once.",
        ],
      },
      {
        heading: "How the tax actually gets collected",
        paragraphs: [
          "You don't have to tell HMRC about interest that stays within your PSA — there's nothing to do there. Banks report what they've paid you straight to HMRC each year, and if you do owe tax above your allowance, it's usually collected automatically through next year's tax code rather than a bill landing on your doormat. Only people already doing Self Assessment for other reasons tend to report it that way instead.",
          "Our Savings Interest Calculator shows how a balance grows with compound interest — use the allowances above to work out whether any of that growth would actually be taxable for you.",
        ],
      },
      {
        heading: "Personal Savings Allowance by taxpayer type",
        table: {
          headers: ["Taxpayer type", "Income range", "Tax-free interest allowance"],
          rows: [
            ["Basic rate", "Up to £50,270", "£1,000 a year"],
            ["Higher rate", "£50,271 – £125,140", "£500 a year"],
            ["Additional rate", "Above £125,140", "£0 — all interest potentially taxable"],
          ],
        },
      },
      {
        heading: "A worked example: £1,400 of interest",
        paragraphs: [
          "Say a basic-rate taxpayer with other income of £30,000 earns £1,400 in savings interest in a tax year from a mix of easy-access accounts. The first £1,000 is covered by their Personal Savings Allowance and is tax-free. The remaining £400 is taxable at their 20% basic rate, giving a tax bill of £80 — usually collected automatically by adjusting next year's tax code, with no action needed from them. If the same £1,400 of interest instead pushed their total income over £50,270, part of their allowance would shrink to the £500 higher-rate limit, and more of the interest would become taxable at 40% instead of 20%.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming savings interest is always tax-free — it's only tax-free up to your Personal Savings Allowance, which shrinks or disappears entirely as your income rises.",
          "Forgetting that interest itself counts towards the income that decides your allowance — a large interest payment can occasionally tip someone from basic-rate into higher-rate territory, shrinking their own allowance in the process.",
          "Not using the £20,000 annual ISA allowance — interest inside an ISA never uses up the Personal Savings Allowance and is always tax-free, making it the simplest fix for anyone regularly exceeding their PSA.",
          "Assuming you need to declare PSA-covered interest to HMRC — banks report interest directly to HMRC, so there's nothing for most people to actively declare unless they already file Self Assessment for other reasons.",
          "Overlooking the 0% starting rate for savings — low earners whose other income doesn't use up their Personal Allowance and basic-rate band can have up to £5,000 of interest taxed at 0%, on top of their PSA.",
        ],
      },
    ],
    faqs: [
      { q: "How much savings interest can I earn tax-free?", a: "£1,000 a year for basic-rate taxpayers, £500 for higher-rate, and nothing for additional-rate taxpayers — plus a separate 0% starting rate of up to £5,000 for people with low other income." },
      { q: "Do I need to declare savings interest to HMRC myself?", a: "Usually not. Banks report what they've paid you directly to HMRC, who adjust your tax code to collect anything owed — you'd only report it yourself if you already file a Self Assessment return." },
      { q: "Does interest in an ISA count towards my Personal Savings Allowance?", a: "No. ISA interest is always tax-free and never touches your PSA, however large the balance." },
      { q: "How much tax would I pay on £1,400 of savings interest as a basic-rate taxpayer?", a: "£80 — the first £1,000 is covered by the Personal Savings Allowance, and the remaining £400 is taxed at the 20% basic rate." },
      { q: "What is the 0% starting rate for savings?", a: "A separate allowance of up to £5,000 taxed at 0%, available to anyone whose other income doesn't fully use up their Personal Allowance and basic-rate band — it sits on top of the Personal Savings Allowance and mainly helps low earners and retirees with modest other income." },
    ],
    sources: [{ label: "GOV.UK: Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" }],
  },
  {
    slug: "vehicle-tax-ved-explained",
    title: "How Vehicle Tax (VED) actually works",
    dek: "First-year rates, the flat standard rate, the expensive car supplement, and what changes for older and electric cars.",
    published: PUBLISHED,
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
        table: {
          headers: ["CO₂ emissions (g/km)", "First-year rate"],
          rows: [
            ["0 (electric)", "£10"],
            ["1 – 50", "£110"],
            ["51 – 75", "£130"],
            ["76 – 90", "£270"],
            ["91 – 100", "£350"],
            ["101 – 110", "£390"],
            ["111 – 130", "£440"],
            ["131 – 150", "£540"],
            ["151 – 170", "£1,540"],
            ["171 – 190", "£2,555"],
            ["191 – 225", "£3,900"],
            ["226 – 255", "£5,545"],
            ["Over 255", "£5,690"],
          ],
        },
      },
      {
        heading: "The expensive car supplement",
        paragraphs: [
          "Cars with a list price over £50,000 when new get hit with an extra £440 a year on top of the standard rate, for five years starting in year two. Work it through and that's £640 a year for years two through six, dropping back to £200 once the five years are up.",
          "Electric cars used to dodge all of this — not anymore. Since April 2025 they're taxed exactly like petrol and diesel, expensive car supplement included if the list price was over £50,000. Their first-year rate still tends to be low, though, since it's based on their minimal emissions figure.",
        ],
      },
      {
        heading: "VED isn't the same as company car tax",
        paragraphs: [
          "It's worth being clear that Vehicle Excise Duty and company car Benefit-in-Kind tax are two completely separate things, even though both relate to running a car. VED is the annual road tax covered on this page, paid by whoever owns or keeps the vehicle. Company car tax, by contrast, is an Income Tax charge on an employee who's given a car as a work benefit, based on the car's list price and its emissions figure, and it's taken through the employee's own tax code rather than paid directly like VED. A low-emissions car can mean a smaller company car tax bill for the employee even while the VED on the same car is worked out completely independently under the rules described here.",
        ],
      },
      {
        heading: "A worked example: a £58,000 petrol SUV",
        paragraphs: [
          "Take a new petrol SUV with a list price of £58,000 and CO₂ emissions of 145g/km. Year one: the 131–150g/km band applies, so the first-year rate is £540. From year two, it drops to the standard £200 — but because the list price is over £50,000, the £440 expensive car supplement also applies, for a combined £640 a year. That continues for five years (years two to six), adding up to £3,200 in supplement payments on top of the £1,000 of standard rate across the same period. From year seven onwards, the supplement ends and the car settles at the plain £200 standard rate for the rest of its life.",
        ],
      },
      {
        heading: "SORN and exemptions",
        paragraphs: [
          "Vehicle sitting unused off the road? Declare a SORN (Statutory Off Road Notification) and the VED stops until it's back in use. A handful of vehicle types are exempt regardless of age — certain disabled-driver schemes, and anything over 40 years old registered as a historic vehicle.",
          "Our Vehicle Tax Calculator estimates the first-year and standard-rate VED for anything registered after April 2017 — grab the CO₂ figure and list price from the V5C for the most accurate number.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming list price means what you actually paid — it means the manufacturer's list price when new, not any discount negotiated at the showroom or the price if bought second-hand.",
          "Forgetting the expensive car supplement runs for five years from year two, not forever — it stops after year six, dropping the car back to the plain standard rate.",
          "Assuming electric cars are tax-exempt — this changed from April 2025; electric cars are now taxed like petrol and diesel cars, supplement included where it applies.",
          "Mixing up the first-year rate with the standard rate — the steep CO₂-based figure only applies in year one; nearly every car settles to a flat £200 from year two regardless of emissions.",
          "Not declaring a SORN for an unused vehicle — VED keeps accruing on a car that's taxed and off the road without a SORN, even if it's never driven.",
        ],
      },
    ],
    faqs: [
      { q: "Why does my older car not fit the £200 standard rate?", a: "Cars registered before 1 April 2017 are taxed under an earlier system based on engine size or a different set of CO₂ bands, which can work out cheaper than the current flat rate for smaller or older cars." },
      { q: "Do electric cars pay vehicle tax?", a: "Yes, since April 2025 — same rules as petrol and diesel, including the expensive car supplement if the list price when new was over £50,000." },
      { q: "What happens if I don't drive my car for a while?", a: "Declare a SORN and VED stops while the vehicle is genuinely off the road and unused, rather than paying tax on a car that's just sitting there." },
      { q: "How much would a £58,000 car with 145g/km emissions cost to tax in year two?", a: "£640 for that year — the standard £200 rate plus the £440 expensive car supplement, since its list price is over £50,000. This combined rate applies for years two to six." },
      { q: "Does the expensive car supplement ever end?", a: "Yes — it only applies for five years, covering roughly years two to six of the car's life. From year seven onwards the car pays just the standard £200 rate, with no supplement." },
    ],
    sources: [{ label: "GOV.UK: Vehicle tax rate tables", href: "https://www.gov.uk/vehicle-tax-rate-tables" }],
  },
  {
    slug: "understanding-loan-repayments-and-apr",
    title: "Understanding loan repayments and APR",
    dek: "Why your monthly payment stays the same but its makeup changes, what APR actually includes, and how overpaying really saves you money.",
    published: PUBLISHED,
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
      {
        heading: "Secured vs unsecured loans",
        paragraphs: [
          "The same monthly-payment mechanics apply whether a loan is secured against an asset (like a car finance agreement or a mortgage) or unsecured (like most personal loans and credit cards). The practical difference is what happens if repayments stop: a secured loan gives the lender the right to repossess the asset used as security, which is also usually why secured loans can be offered at a somewhat lower rate than an equivalent unsecured loan — the lender is taking on less risk, not because the underlying interest calculation works any differently.",
        ],
      },
      {
        heading: "£10,000 at 6% APR, three different terms",
        paragraphs: [
          "Seeing all three terms side by side makes the trade-off concrete: a shorter term costs more each month but far less overall, while a longer term eases the monthly payment at the cost of roughly double the interest by the time it's paid off.",
        ],
        table: {
          headers: ["Term", "Monthly payment", "Total repaid", "Total interest"],
          rows: [
            ["5 years (60 months)", "£193.35", "£11,601.00", "£1,601.00"],
            ["7 years (84 months)", "£146.14", "£12,275.76", "£2,275.76"],
            ["10 years (120 months)", "£111.05", "£13,325.66", "£3,325.66"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Choosing the longest available term purely to get the lowest monthly payment — it's a legitimate choice if affordability is genuinely tight, but it roughly doubles the total interest on a typical loan compared with the shortest term.",
          "Comparing loans by their interest rate instead of their APR — a loan with a lower rate but a large arrangement fee can cost more overall than one with a slightly higher rate and no fees; APR is designed to make that comparison fair.",
          "Assuming the advertised rate is guaranteed — 'representative APR' only has to be offered to 51% of successful applicants, so plenty of people are offered a higher rate once they actually apply.",
          "Overpaying without checking the loan agreement first — many lenders allow penalty-free overpayments only up to around 10% of the balance a year, and exceeding that can trigger an early repayment charge.",
          "Assuming equal payments mean equal progress on the balance — early payments on a repayment loan are mostly interest, so the balance falls more slowly at the start than many borrowers expect.",
        ],
      },
    ],
    faqs: [
      { q: "Why is so much of my early payment just interest?", a: "Interest is charged on whatever you still owe, which is highest right at the start of the loan — so early payments are mostly interest, and later payments shift increasingly toward capital as the balance falls." },
      { q: "Is APR the same as the interest rate?", a: "No — APR bundles the interest rate with any mandatory fees into one yearly figure, which is why it's the number to compare between loans rather than the headline rate alone." },
      { q: "Does a longer loan term cost more overall?", a: "Yes, even at an identical rate, simply because you're paying interest on the outstanding balance for longer — a lower monthly payment over a longer term usually means more total interest by the end." },
      { q: "Can I pay off my loan early to save money?", a: "Generally yes, since overpaying shrinks the balance interest gets charged on. Check your loan agreement first, though — some lenders charge a fee above a certain overpayment amount." },
      { q: "How much more does a £10,000 loan cost over 10 years compared with 5 years?", a: "At 6% APR, about £1,724.66 more in total interest — £3,325.66 over 10 years compared with £1,601.00 over 5 years — even though the monthly payment is roughly £82 lower." },
    ],
    sources: [{ label: "GOV.UK: Credit, debt and managing money", href: "https://www.gov.uk/debt-help" }, { label: "FCA: Representative APR explained", href: "https://www.fca.org.uk/consumers/credit" }],
  },
  // TODO: Class 4 NI main/upper rates below (6% / 2%) follow the 2024/25 reform and are not
  // modelled anywhere in lib/tax.ts — verify against GOV.UK's current self-employed NI rates
  // before relying on this guide for a real Self Assessment calculation.
  {
    slug: "self-employed-tax-explained",
    title: "Self-employed tax explained",
    dek: "How Self Assessment, Income Tax and Class 4 National Insurance work when you're self-employed, including what payments on account actually are.",
    published: NEW,
    updated: NEW,
    related: ["income-tax-calculator", "salary-calculator"],
    sections: [
      {
        heading: "Why self-employed tax works differently",
        paragraphs: [
          "Employees have tax worked out for them automatically through PAYE, deducted before the money ever reaches their bank account. Self-employed people don't have an employer doing that job, so instead you register for Self Assessment, work out your own profit, and tell HMRC about it yourself once a year. The tax year still runs 6 April to 5 April, but the deadline to file online and pay what you owe is 31 January after the tax year ends — so the 2026/27 tax year (6 April 2026 to 5 April 2027) needs to be filed and paid by 31 January 2028.",
          "You need to register for Self Assessment by 5 October following the end of the tax year you first need to report, even if you don't owe very much — missing registration doesn't make the obligation disappear, it just means catching up later, often with penalties attached.",
        ],
      },
      {
        heading: "Income Tax on your profit",
        paragraphs: [
          "Self-employed Income Tax uses exactly the same Personal Allowance and bands as employees: £12,570 tax-free for 2026/27, then 20% up to £50,270 of total income, 40% up to £125,140, and 45% above that. The key difference is what's taxed — not your turnover, but your profit, meaning your income minus allowable business expenses like stock, equipment, travel for work, and a proportion of home office costs if you work from home.",
          "A sole trader earning £60,000 in sales with £15,000 of allowable expenses has a taxable profit of £45,000, not £60,000 — Income Tax, and the Class 4 National Insurance covered below, are both worked out on that £45,000 figure.",
        ],
      },
      {
        heading: "Class 2 and Class 4 National Insurance",
        paragraphs: [
          "Self-employed NI is a separate system from the employee Class 1 NI covered elsewhere on this site. Class 2 NI used to be a small flat weekly charge, but for most self-employed people with profits above the Small Profits Threshold it no longer has to be paid — voluntary Class 2 payments are still possible below that threshold for people who want to protect their State Pension record.",
          "Class 4 NI is the main self-employed NI charge, and it mirrors the employee system in structure: a main rate on profits between the Lower Profits Limit (£12,570) and the Upper Profits Limit (£50,270), and a lower rate on profits above that, with nothing due below £12,570. Always confirm the exact current rates on GOV.UK before filing, since self-employed NI rates have changed more than once in recent years.",
        ],
      },
      {
        heading: "Payments on account",
        paragraphs: [
          "This is the part that catches a lot of newly self-employed people out. If your Self Assessment bill is over £1,000 and less than 80% of it was already collected at source (for example through PAYE on another job), HMRC doesn't just ask for this year's bill — it asks for this year's bill plus half of next year's estimated bill in advance, split into two 'payments on account' due 31 January and 31 July.",
          "In practice, this means your first tax bill as newly self-employed can be roughly one and a half times your actual liability for the year, because you're paying for the year just finished and getting a head start on the next one. It evens out in later years, but it's worth setting money aside for specifically, rather than being caught short by a bill that looks much bigger than expected.",
        ],
      },
      {
        heading: "A worked example: £45,000 profit",
        paragraphs: [
          "Take a sole trader with a £45,000 taxable profit for 2026/27, no other income. Income Tax: the £12,570 Personal Allowance leaves £32,430 taxable, all within the 20% basic-rate band, giving £6,486 of Income Tax. Class 4 NI: assuming a 6% main rate (check the current figure on GOV.UK), the same £32,430 of profit above the Lower Profits Limit is charged at 6%, giving roughly £1,945.80. Total tax and NI for the year: about £8,431.80 — before any payments on account are factored in for the following year.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Not setting aside money for payments on account — a first Self Assessment bill can be much bigger than expected because it includes an advance payment towards the following year.",
          "Mixing personal and business expenses in one bank account — this makes it harder to prove what's genuinely an allowable business expense if HMRC ever asks.",
          "Missing the 31 January filing and payment deadline — this triggers an automatic £100 penalty even if no tax is actually owed, with further penalties and interest the longer it's left.",
          "Forgetting to register for Self Assessment by 5 October after your first year of self-employment — the tax is still due even if you never registered, it just becomes harder to sort out later.",
          "Not keeping records for long enough — HMRC generally expects Self Assessment records to be kept for at least 5 years after the filing deadline for that tax year.",
        ],
      },
    ],
    faqs: [
      { q: "When do I need to file and pay my Self Assessment tax return?", a: "By 31 January after the end of the tax year — for the 2026/27 tax year (6 April 2026 to 5 April 2027), that means filing online and paying by 31 January 2028." },
      { q: "Is self-employed Income Tax calculated differently from employed Income Tax?", a: "No — it uses the same Personal Allowance and the same 20%/40%/45% bands. The difference is what counts as taxable: your profit (income minus allowable expenses), not your full turnover." },
      { q: "What are payments on account?", a: "An advance payment towards next year's tax bill, required if your Self Assessment bill is over £1,000 and less than 80% was collected at source. It's added to your current bill and split into two instalments due 31 January and 31 July." },
      { q: "Do I still pay National Insurance if I'm self-employed?", a: "Yes, through Class 4 National Insurance on your profits, calculated using the same Lower and Upper Profits Limits as the employee NI thresholds. Check GOV.UK for the exact current rates, since these have changed in recent tax years." },
      { q: "What happens if I file my tax return late?", a: "An automatic £100 penalty applies even if you owe no tax, with further penalties and interest building up the longer the return remains unfiled." },
    ],
    sources: [
      { label: "GOV.UK: Self Assessment tax returns", href: "https://www.gov.uk/self-assessment-tax-returns" },
      { label: "GOV.UK: Self-employed National Insurance rates", href: "https://www.gov.uk/self-employed-national-insurance-rates" },
      GOVUK_INCOME_TAX,
    ],
  },
  // TODO: dividend allowance (£500) and rates (8.75% / 33.75% / 39.35%) reflect the post-2023
  // reform and are not modelled in lib/tax.ts — verify against GOV.UK before publishing.
  {
    slug: "dividend-tax-explained",
    title: "Dividend tax explained for 2026/27",
    dek: "How dividend tax is worked out, the dividend allowance, and the rates for basic, higher and additional-rate taxpayers.",
    published: NEW,
    updated: NEW,
    related: ["income-tax-calculator", "capital-gains-tax-calculator"],
    sections: [
      {
        heading: "What counts as a dividend",
        paragraphs: [
          "A dividend is a payment a company makes to its shareholders out of its profits. For most people this comes up in one of two ways: owning shares or funds outside an ISA that pay out dividends, or running a small limited company and paying yourself partly through dividends on top of a salary — a common and legitimate way for company directors to structure their pay, since dividends don't attract employee or employer National Insurance.",
          "Dividends are taxed completely separately from salary and self-employment income, with their own allowance and their own set of rates, even though they still count towards your total income for things like the Personal Allowance taper and the Scottish vs UK-wide bands question.",
        ],
      },
      {
        heading: "The dividend allowance",
        paragraphs: [
          "Everyone gets a dividend allowance each tax year — a slice of dividend income that's tax-free regardless of what tax band you're in otherwise. It's worth checking the current figure on GOV.UK, since the dividend allowance has been cut several times in recent tax years and is far smaller than it used to be.",
        ],
      },
      {
        heading: "Rates above the allowance",
        table: {
          headers: ["Tax band", "Dividend tax rate"],
          rows: [
            ["Basic rate", "8.75%"],
            ["Higher rate", "33.75%"],
            ["Additional rate", "39.35%"],
          ],
        },
      },
      {
        heading: "How dividends stack on top of other income",
        paragraphs: [
          "Dividends are always treated as the top slice of your income, taxed after your salary, self-employment profit, and other earnings have used up the Personal Allowance and basic-rate band. This matters because it means the same dividend income can be taxed at a different rate depending entirely on how much other income you have.",
          "Worked example: someone with a £20,000 salary and £10,000 of dividend income. The Personal Allowance covers £12,570 of the salary, leaving £7,430 taxed at 20% (£1,486). That uses £7,430 of the £37,700 basic-rate band, leaving £30,270 of basic-rate band available for the dividends. The dividend allowance covers the first £500 of dividends tax-free; the remaining £9,500 fits entirely within the remaining basic-rate band, so it's taxed at 8.75% — £831.25. Total tax across both income types: £2,317.25.",
        ],
      },
      {
        heading: "A second example: a higher earner",
        paragraphs: [
          "Now take someone with a £55,000 salary and the same £10,000 of dividends. Their salary alone already pushes past the £50,270 higher-rate threshold, using up the entire basic-rate band before the dividends are even considered. The £500 dividend allowance still applies, but the remaining £9,500 of dividends is taxed entirely at the 33.75% higher dividend rate — £3,206.25, nearly four times the tax on the identical dividend amount in the first example, purely because of the difference in other income.",
        ],
      },
      {
        heading: "Why small company directors often favour dividends",
        paragraphs: [
          "A common structure for director-shareholders of a small limited company is to pay themselves a low salary — often around the NI threshold — plus dividends on top, rather than a single large salary. The salary element still counts as a business expense that reduces Corporation Tax, and it can be set low enough to avoid most employee and employer NI, while the dividend element avoids NI entirely (though not Corporation Tax, which the company has already paid on its profits before anything is distributed). This isn't tax evasion — it's simply using the rates as they're set out — but it does mean two company directors earning the 'same' total amount can have very different tax bills depending on how it's split between salary and dividends.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming dividends are taxed at the same rates as salary — they have their own lower rates (8.75%/33.75%/39.35%) precisely because the company has already paid Corporation Tax on the profit before it's distributed.",
          "Forgetting the dividend allowance has shrunk significantly in recent years — relying on an old figure from a few tax years ago can lead to a real underestimate of tax due.",
          "Not registering for Self Assessment when dividend income is substantial — company directors and investors with significant dividend income generally need to file a Self Assessment return to report it.",
          "Ignoring the stacking order — dividends are taxed as the top slice of income, so a pay rise or bonus earlier in the year can push dividend income from the basic rate into the higher rate without the dividend amount itself changing at all.",
          "Treating dividends from an ISA the same as dividends outside one — dividends earned inside an ISA are always completely tax-free and don't use up the dividend allowance at all.",
          "Declaring a dividend without the company having enough retained profit to cover it — dividends can only legally be paid out of genuine distributable profits, not simply whenever a director wants cash out of the business.",
        ],
      },
    ],
    faqs: [
      { q: "What is the dividend allowance for 2026/27?", a: "A set amount of dividend income that's tax-free regardless of your tax band — check the current figure on GOV.UK, as it has been reduced several times in recent tax years." },
      { q: "What are the dividend tax rates?", a: "8.75% for basic-rate taxpayers, 33.75% for higher-rate taxpayers, and 39.35% for additional-rate taxpayers, applied to dividend income above the allowance." },
      { q: "Why are dividends taxed at a lower rate than salary?", a: "Because the company has already paid Corporation Tax on the profit before distributing it as a dividend — the lower personal rate partly accounts for that earlier company-level tax." },
      { q: "Do dividends inside an ISA get taxed?", a: "No. Dividends earned on shares or funds held inside an ISA are always tax-free and don't use up your dividend allowance, regardless of the amount." },
      { q: "How does dividend income affect my tax band?", a: "Dividends are treated as the top slice of your income, taxed after salary and other earnings have used up your Personal Allowance and basic-rate band — so the same dividend amount can be taxed at different rates depending on your other income." },
    ],
    sources: [
      { label: "GOV.UK: Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
      GOVUK_INCOME_TAX,
    ],
  },
  {
    slug: "emergency-tax-codes-explained",
    title: "Emergency tax codes explained",
    dek: "What W1, M1, 0T and BR actually mean, why HMRC or your employer might put you on one, and how to get it corrected.",
    published: NEW,
    updated: NEW,
    related: ["tax-code-checker", "salary-calculator"],
    sections: [
      {
        heading: "What an 'emergency' tax code actually is",
        paragraphs: [
          "An emergency tax code is what your employer uses when they don't yet have enough information to apply your correct, settled code — typically when you start a new job without a P45 from your previous employer, or haven't completed a new starter checklist. Rather than guessing, payroll software applies a standard temporary code so you're not left completely untaxed while things get sorted.",
          "The genuinely 'emergency' code HMRC refers to is the standard 1257L code applied on a W1, M1 or X basis — meaning you still get the normal Personal Allowance, just worked out fresh each pay period rather than cumulatively across the year so far.",
        ],
      },
      {
        heading: "Cumulative vs non-cumulative (W1/M1) codes",
        paragraphs: [
          "Most tax codes work cumulatively: your allowance builds up through the year, and each payslip looks at your total pay and total allowance since 6 April, so it self-corrects as the year goes on. A W1 (week 1) or M1 (month 1) code instead resets every pay period — you only get that period's slice of the annual allowance, with no credit for any unused allowance from earlier in the tax year.",
          "This mainly bites people who start a job partway through the tax year with significant unused allowance sitting unclaimed from the months before they started earning. On a cumulative code, that unused allowance offsets tax due now; on an M1 or W1 code, it's temporarily lost — though it's usually sorted out once HMRC issues the correct code or through a tax return.",
        ],
      },
      {
        heading: "A worked example: starting in month 7 on M1 vs cumulative",
        paragraphs: [
          "Imagine starting a new job in October (month 7 of the tax year) on £3,000 a month, with no other income earlier in the year. Under a cumulative 1257L code, your allowance to date is 7/12 of £12,570, or £7,332.50 — comfortably more than the £3,000 you've actually earned so far, so no tax is due yet. Under an M1 code, you only get 1/12 of the allowance for that single month — £1,047.50 — against that month's £3,000, leaving £1,952.50 taxable at 20%, or £390.50 of tax. Same income, same eventual correct position for the year, but a very different amount of tax taken in that first payslip.",
        ],
      },
      {
        heading: "Other common temporary codes",
        bullets: [
          "0T — no Personal Allowance at all, every pound taxed through the normal bands; often used when an employer has no starter information whatsoever.",
          "BR — everything taxed at 20% with no allowance; common for a genuine second job, but sometimes wrongly applied to a main job when the starter checklist is filled in incorrectly.",
          "D0 / D1 — everything taxed at 40% or 45%; usually correct only for a second source of income once you're already a higher or additional-rate taxpayer.",
          "1257L W1/M1/X — the standard emergency code: full allowance, but applied non-cumulatively until HMRC or payroll switches you back to a normal cumulative basis.",
        ],
      },
      {
        heading: "How to get it fixed",
        paragraphs: [
          "The fastest fix is usually giving your new employer the information they're missing: your P45 from a previous job if you have one, or a completed starter checklist stating clearly whether this is your only or main job. Once HMRC has the full picture, they issue a correct tax code directly to your employer, and most payroll systems switch back to a cumulative basis automatically, which can trigger a welcome one-off refund through your pay if you were overtaxed on an M1 or W1 basis earlier in the year.",
          "If the tax year ends before it's corrected, any overpayment is usually caught either automatically (HMRC sometimes issues a P800 calculation after the year ends) or by contacting HMRC directly — it's rarely lost for good, just delayed.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming an emergency code means something has gone wrong — it's often just a temporary placeholder while your employer waits for the right paperwork, not an error in itself.",
          "Not providing a P45 or completing a starter checklist promptly — this is usually the single fastest way to get off an emergency code.",
          "Assuming a BR or 0T code on a genuine second job is a mistake — it can be entirely correct if your Personal Allowance has already been allocated to your main job.",
          "Not checking whether an M1/W1 code has corrected itself later in the year — some employers only switch to cumulative once instructed, so it's worth checking a few payslips later if the code hasn't changed.",
          "Giving up on reclaiming overpaid tax from an emergency code — it's usually recoverable either automatically at year-end or by contacting HMRC directly.",
        ],
      },
    ],
    faqs: [
      { q: "What is the actual emergency tax code?", a: "Typically 1257L applied on a W1, M1 or X basis — the standard Personal Allowance, but worked out fresh each pay period instead of cumulatively across the tax year." },
      { q: "Why would I be put on a BR or 0T code?", a: "Usually because your employer doesn't have enough information yet — no P45, no completed starter checklist, or genuinely having a second job where your allowance is already used elsewhere." },
      { q: "Will I get back any tax I overpaid on an emergency code?", a: "Generally yes — either automatically once your correct code is applied and payroll reverts to a cumulative basis, through a P800 calculation after the tax year ends, or by contacting HMRC directly." },
      { q: "How do I get off an emergency tax code?", a: "Give your new employer your P45 from your previous job, or complete a starter checklist accurately — this gives HMRC what they need to issue your correct code." },
      { q: "Does an emergency tax code mean I'm paying the wrong amount of tax forever?", a: "No — it's a temporary measure. Once your correct code is issued, your pay is taxed correctly from that point, and any shortfall or overpayment from the emergency period is generally reconciled afterwards." },
    ],
    sources: [
      { label: "GOV.UK: Tax codes", href: "https://www.gov.uk/tax-codes" },
      { label: "GOV.UK: Emergency tax codes", href: "https://www.gov.uk/emergency-tax-code" },
    ],
  },
  {
    slug: "how-to-claim-a-tax-refund-from-hmrc",
    title: "How to claim a tax refund from HMRC",
    dek: "The most common reasons people are owed tax back, how HMRC actually pays a refund, and how long it takes.",
    published: NEW,
    updated: NEW,
    related: ["tax-code-checker", "income-tax-calculator", "salary-calculator"],
    sections: [
      {
        heading: "Common reasons people are owed a refund",
        paragraphs: [
          "Overpaid tax happens more often than people expect, usually without any mistake on the taxpayer's part. The most common causes are: being on an emergency or otherwise incorrect tax code for part of the year, stopping work partway through the tax year without using your full Personal Allowance, having too much tax deducted on a redundancy payment, claiming expenses or reliefs you were entitled to but never actually claimed, or simply having a tax code that didn't catch up with a change in your circumstances quickly enough.",
          "Work expenses are another commonly missed one — uniform laundering, professional subscriptions, or using your own vehicle for work travel beyond a normal commute can sometimes be claimed back, either through a simple online form for smaller amounts or via Self Assessment for larger or more complex claims.",
        ],
      },
      {
        heading: "How HMRC tells you a refund is due",
        paragraphs: [
          "If HMRC's own systems spot an overpayment at the end of the tax year, they usually send a P800 tax calculation letter or an equivalent digital message explaining the figures and how the refund will be paid. Not every overpayment is caught automatically, though — if you think you're owed money and haven't heard from HMRC, you can check and claim directly through your Personal Tax Account on gov.uk.",
        ],
      },
      {
        heading: "A worked example: leaving a job partway through the year",
        paragraphs: [
          "Imagine someone earning £3,000 a month who leaves their job at the end of August, five months into the tax year, and doesn't work again for the rest of that tax year. Through cumulative PAYE, their tax to date after 5 months would be worked out against 5/12 of the annual Personal Allowance (£5,237.50), on £15,000 of pay — giving taxable pay of £9,762.50 and tax paid of roughly £1,952.50 over those 5 months. But their actual income for the whole tax year, since they never work again, is just £15,000. Against the full £12,570 annual allowance, their real taxable income for the year is only £2,430, meaning their real tax bill for the year is just £486 — leaving a refund of roughly £1,466.50 due once the tax year ends or their new circumstances are reported.",
        ],
      },
      {
        heading: "How refunds are actually paid",
        table: {
          headers: ["Situation", "How the refund usually arrives"],
          rows: [
            ["Still employed, tax code corrected mid-year", "Refunded automatically through your next payslip"],
            ["Left a job, tax year still open", "Can claim directly, or wait for automatic reconciliation at year-end"],
            ["Tax year already finished", "P800 calculation, refunded by bank transfer, cheque, or online claim"],
            ["Self Assessment overpayment", "Refunded after your return is processed, usually to the bank details given on the return"],
          ],
        },
      },
      {
        heading: "How long it takes and what to watch for",
        paragraphs: [
          "Refunds through PAYE correction or Self Assessment are generally processed within a few weeks once HMRC has everything it needs, though it can take longer during busy periods. One important warning: HMRC never asks for a refund to be claimed by clicking a link in a text message or email, or asks for card or bank details that way — refund scams that mimic HMRC branding are extremely common, and genuine refunds are claimed through your official Personal Tax Account or by HMRC contacting you directly through the post.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming no letter means no refund is due — not every overpayment is automatically detected; it's worth checking yourself, especially after leaving a job partway through a tax year.",
          "Clicking links in unsolicited texts or emails claiming to be from HMRC about a refund — always go directly to gov.uk rather than following a link, since this is one of the most common tax-related scams.",
          "Forgetting that a refund claim generally has a time limit — most refund claims need to be made within four years of the end of the relevant tax year.",
          "Assuming redundancy pay is always taxed correctly at the time — large one-off payments can sometimes be taxed more heavily than necessary in the month they're paid, which may be reclaimable afterwards.",
          "Not updating your details with HMRC after a life change — an out-of-date address or bank account can delay a refund that's already been approved.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know if I'm owed a tax refund?", a: "Common signs include stopping work partway through a tax year, being on the wrong tax code for part of the year, or a large one-off payment like redundancy being taxed heavily. Check your Personal Tax Account on gov.uk, or wait for a P800 calculation if HMRC's systems catch it automatically." },
      { q: "How long does an HMRC tax refund take?", a: "Generally a few weeks once HMRC has all the information it needs, whether that's an automatic P800 refund, a mid-year tax code correction, or a Self Assessment refund — busy periods can extend this." },
      { q: "Is there a time limit to claim a tax refund?", a: "Yes — claims generally need to be made within four years of the end of the relevant tax year, so it's worth checking sooner rather than later if you think you're owed money." },
      { q: "How do I avoid tax refund scams?", a: "Never click a link in an unexpected text or email claiming to be from HMRC about a refund, and never give card or bank details that way — go directly to gov.uk and log in to your own Personal Tax Account instead." },
      { q: "Can I get a refund for tax overpaid in a previous tax year?", a: "Yes, generally for up to four previous tax years, either through your Personal Tax Account, by contacting HMRC directly, or through an amended Self Assessment return if you file one." },
    ],
    sources: [
      { label: "GOV.UK: Check how much Income Tax you paid last year", href: "https://www.gov.uk/check-income-tax-last-year" },
      { label: "GOV.UK: Claim a tax refund", href: "https://www.gov.uk/claim-tax-refund" },
    ],
  },
  // TODO: Corporation Tax rates (19%/25% with marginal relief) referenced qualitatively below
  // are not modelled in lib/tax.ts — verify the current rates and thresholds on GOV.UK.
  {
    slug: "ir35-explained-for-contractors",
    title: "IR35 explained for contractors",
    dek: "How the off-payroll working rules decide whether a contract is 'inside' or 'outside' IR35, who makes that call, and what it changes about your take-home pay.",
    published: NEW,
    updated: NEW,
    related: ["salary-calculator", "daily-rate-to-annual-salary", "income-tax-calculator"],
    sections: [
      {
        heading: "What IR35 is actually checking",
        paragraphs: [
          "IR35 — officially the off-payroll working rules — exists to answer one question: if your limited company didn't exist, would HMRC consider you an employee of the client you're working for? It looks past the paperwork at how the engagement actually works in practice: how much control the client has over how, when and where you do the work, whether you could send a substitute to do the work instead of you personally, and whether there's an expectation of ongoing work being offered and accepted (mutuality of obligation). Score closer to 'employee' on those tests and the contract is 'inside IR35'; score closer to 'genuinely in business on your own account' and it's 'outside IR35'.",
        ],
      },
      {
        heading: "Who decides your status",
        paragraphs: [
          "Since April 2021, for engagements with medium or large private-sector clients, it's the end client — not the contractor — who must assess status and issue a Status Determination Statement (SDS) explaining the decision and reasoning. If a contractor disagrees, there's a formal status disagreement process to challenge it with the client. For genuinely small clients (broadly, those meeting the Companies Act definition of a small company), the old rules still apply and the contractor's own limited company determines its own status.",
          "Whoever makes the deemed employment payment — usually the agency or client paying the limited company, known as the 'fee-payer' — is legally responsible for deducting tax and National Insurance correctly if a contract is found to be inside IR35, not the contractor's own company.",
        ],
      },
      {
        heading: "Inside vs outside IR35 at a glance",
        table: {
          headers: ["", "Inside IR35", "Outside IR35"],
          rows: [
            ["How you're paid", "Deemed employment — tax and NI deducted before payment, like a salary", "Your limited company invoices in full; you decide salary vs dividends"],
            ["National Insurance", "Employee and employer NI both apply to the deemed payment", "No employee/employer NI on dividend income"],
            ["Corporation Tax", "Not really applicable — income is taxed as deemed employment", "Company profits taxed at the Corporation Tax rate before dividends"],
            ["Expenses", "Very limited allowable expenses", "Wider range of genuine business expenses allowable"],
            ["Who decides status", "End client (for medium/large clients) via a Status Determination Statement", "Contractor's own company (for small clients only)"],
          ],
        },
      },
      {
        heading: "A worked example: deemed employment on £95,000",
        paragraphs: [
          "Say a contractor's limited company bills £95,000 for a contract found to be inside IR35. Treated as a deemed salary and taxed through the standard Income Tax bands: the £12,570 Personal Allowance leaves £82,430 taxable, with £37,700 at 20% (£7,540) and the remaining £44,730 at 40% (£17,892) — £25,432 of Income Tax. Employee National Insurance on the same figure: 8% on the £37,700 between £12,570 and £50,270 (£3,016), plus 2% on the £44,730 above £50,270 (£894.60) — £3,910.60. Together that's £29,342.60 in Income Tax and employee NI alone, before employer NI is even accounted for, leaving a net figure broadly similar to taking the same £95,000 as a straightforward PAYE salary — which is exactly the point of the rules.",
          "Outside IR35, the same £95,000 of company income would typically be split between a small salary and dividends after Corporation Tax, taxed under the lower dividend rates described in our dividend tax guide — usually leaving noticeably more in the contractor's pocket, which is why genuinely outside-IR35 engagements remain attractive despite the extra admin of running a company properly.",
        ],
      },
      {
        heading: "Why clients often decide conservatively",
        paragraphs: [
          "Since the end client carries the compliance risk for a wrong status decision, many medium and large organisations have historically erred on the side of declaring roles inside IR35 even in borderline cases, simply to avoid the administrative risk of a wrong call. This has been a genuine source of frustration for contractors who feel their working arrangement is clearly outside IR35 on the actual facts, but find the client unwilling to take that position. It's one of the main reasons the formal status disagreement process exists — to give a contractor a documented route to challenge a determination they believe doesn't reflect how the engagement actually works.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a contract clause alone settles IR35 status — HMRC looks at how the engagement actually works day to day, not just what the paperwork says.",
          "Treating the small-client exemption as a free pass — it shifts who determines status back to the contractor's own company, but the contract still needs a genuine, honest assessment against the same tests.",
          "Not keeping evidence of working practices — things like having the right to send a substitute, or evidence of working for multiple clients, can matter if a status decision is ever challenged.",
          "Confusing an umbrella company arrangement with IR35 status — umbrella company pay is simply taxed as standard employment income regardless of IR35, since there's no separate limited company involved.",
          "Forgetting that employer NI and other deductions come out of the contract rate before a deemed salary is even calculated when inside IR35 — the rate on the contract isn't the same as the income the figure is actually based on.",
        ],
      },
    ],
    faqs: [
      { q: "Who decides if I'm inside or outside IR35?", a: "For medium or large private-sector clients, the end client decides and must issue a Status Determination Statement. For small clients, your own limited company determines its own status." },
      { q: "What's the main financial difference between inside and outside IR35?", a: "Inside IR35, you're taxed broadly like an employee — Income Tax and National Insurance on a deemed salary. Outside IR35, your company pays Corporation Tax on its profits and you typically draw a mix of salary and lower-taxed dividends, which usually leaves more take-home pay." },
      { q: "Can I challenge an IR35 status decision?", a: "Yes — there's a formal status disagreement process for challenging a client's Status Determination Statement if you believe it's wrong." },
      { q: "Does being inside IR35 mean I become an employee of the client?", a: "No. You're taxed similarly to an employee for that engagement, but you don't gain employment rights like holiday pay or redundancy protection from the client." },
      { q: "Does IR35 apply if I work through an umbrella company?", a: "Not in the same way — umbrella company pay is simply treated as standard employment income, since there's no separate limited company whose status needs determining." },
    ],
    sources: [
      { label: "GOV.UK: Off-payroll working rules (IR35)", href: "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35" },
      { label: "GOV.UK: Check employment status for tax (CEST)", href: "https://www.gov.uk/guidance/check-employment-status-for-tax" },
    ],
  },
  // TODO: Child Benefit weekly rates below are an estimate and rise most years each April —
  // verify the exact current rates on GOV.UK before relying on the worked example figures.
  {
    slug: "high-income-child-benefit-charge-explained",
    title: "High Income Child Benefit Charge explained",
    dek: "How the charge claws back Child Benefit above £60,000 of income, why it's based on the higher earner alone, and why claiming is still worth it even if you opt out of being paid.",
    published: NEW,
    updated: NEW,
    related: ["income-tax-calculator", "salary-calculator"],
    sections: [
      {
        heading: "How the charge works",
        paragraphs: [
          "The High Income Child Benefit Charge (HICBC) claws back Child Benefit once the higher earner in a household has an adjusted net income above £60,000. It tapers away gradually — 1% of the Child Benefit received is charged back for every £200 of income above £60,000 — until it's fully clawed back at £80,000, at which point the charge equals 100% of the Child Benefit paid.",
          "Child Benefit itself is currently worth roughly £1,355 a year for an only or eldest child and around £897 a year for each additional child (always check the exact current weekly rates on GOV.UK, since they're uprated most years). The charge is collected through Self Assessment, not simply deducted from the benefit itself.",
        ],
      },
      {
        heading: "The part that genuinely surprises people",
        paragraphs: [
          "HICBC is based on the higher earner's individual income, not combined household income — and this is by far the most commonly misunderstood part of the charge. Two parents each earning £55,000 (£110,000 combined) pay no charge at all, because neither individual crosses £60,000. But a single-earner household with one parent on £65,000 and the other earning nothing does pay a charge, despite having less than half the first family's total household income.",
        ],
        table: {
          headers: ["Household", "Combined income", "Higher earner's income", "HICBC charge?"],
          rows: [
            ["Two earners, £55,000 each", "£110,000", "£55,000", "No — neither earner is over £60,000"],
            ["One earner on £65,000, partner not working", "£65,000", "£65,000", "Yes — 25% of Child Benefit clawed back"],
            ["One earner on £85,000, partner not working", "£85,000", "£85,000", "Yes — 100% clawed back (fully withdrawn above £80,000)"],
          ],
        },
      },
      {
        heading: "A worked example: two children, £70,000 income",
        paragraphs: [
          "Take a family with two children where the higher earner has an adjusted net income of £70,000. Their Child Benefit for the year is roughly £1,355 (eldest child) plus £897 (second child), about £2,252 in total. They're £10,000 over the £60,000 threshold, and £10,000 divided by £200 is 50 — so 50% of their Child Benefit is clawed back, a charge of roughly £1,126, paid through Self Assessment. They keep the other half, about £1,126, net of the charge.",
        ],
      },
      {
        heading: "Why it's often still worth claiming, even at £80,000+",
        paragraphs: [
          "Above £80,000, the charge equals 100% of the Child Benefit received, so some families decide to opt out of actually being paid, to avoid filing a Self Assessment return purely for this. Crucially, this is different from not claiming at all: the claim itself should still be made (even if payments are then switched off), because it's the claim that protects National Insurance credits for a parent who isn't working or earning enough to build up their own State Pension record. Not claiming at all can leave a stay-at-home parent with gaps in their NI record that are far harder to fix later than simply filing an extra Self Assessment page now.",
        ],
      },
      {
        heading: "Reporting the charge and keeping it up to date",
        paragraphs: [
          "The higher earner needs to register for Self Assessment if they aren't already filing a return, specifically to report and pay the charge — missing this isn't automatically flagged the way an employer's PAYE error might be, since HMRC doesn't necessarily know your household's Child Benefit claim is linked to your specific income in real time. It's also worth revisiting each year: a pay rise, a bonus, or a change in benefits can move the charge from a 20% claw-back one year to a 60% claw-back the next, even if the Child Benefit itself hasn't changed at all.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming combined household income decides the charge — it's based on the higher individual earner alone, which can catch single-earner households that a joint-income test wouldn't.",
          "Not claiming Child Benefit at all above £80,000 — this also switches off the National Insurance credits that come with the claim, which matters for a parent not otherwise building up a State Pension record.",
          "Forgetting a bonus or benefit in kind counts towards adjusted net income — a one-off bonus can tip someone over £60,000 or £80,000 for that specific tax year without their regular salary changing at all.",
          "Not reducing adjusted net income through pension contributions — similar to the £100,000 Personal Allowance taper, pension contributions and Gift Aid donations reduce the adjusted net income the charge is based on.",
          "Assuming the charge is collected automatically from the benefit itself — it isn't; it has to be reported and paid through Self Assessment, which is itself a reason some high earners choose to opt out of receiving payments.",
        ],
      },
    ],
    faqs: [
      { q: "Is the High Income Child Benefit Charge based on household income?", a: "No — it's based on the higher individual earner's adjusted net income alone, which can mean a single-earner household pays a charge that a two-earner household with higher combined income wouldn't." },
      { q: "At what income is Child Benefit fully clawed back?", a: "At £80,000 of adjusted net income for the higher earner, the charge equals 100% of the Child Benefit received." },
      { q: "Should I still claim Child Benefit if I know I'll have to pay it all back?", a: "Generally yes — claiming (even if you opt out of actual payments) protects National Insurance credits for a parent who isn't otherwise building up their State Pension record." },
      { q: "Can pension contributions reduce the charge?", a: "Yes. Like the £100,000 Personal Allowance taper, HICBC is based on adjusted net income, which is reduced by pension contributions and Gift Aid donations." },
      { q: "How is the charge actually paid?", a: "Through Self Assessment — it isn't simply deducted from the Child Benefit payments themselves, so the higher earner needs to register for and file a Self Assessment return to report and pay it." },
    ],
    sources: [
      { label: "GOV.UK: High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
      { label: "GOV.UK: Child Benefit rates", href: "https://www.gov.uk/child-benefit/what-youll-get" },
    ],
  },
  {
    slug: "tax-on-a-second-job-explained",
    title: "Tax on a second job explained",
    dek: "Why a second job is usually taxed at BR, how National Insurance is worked out separately for each job, and when you might be due money back.",
    published: NEW,
    updated: NEW,
    related: ["tax-code-checker", "salary-calculator", "ni-calculator"],
    sections: [
      {
        heading: "Why a second job gets a different tax code",
        paragraphs: [
          "Your tax-free Personal Allowance can only be given to one employer at a time, since PAYE needs a single place to apply it. In practice, that's almost always your main job, leaving a second job with a BR code (everything taxed at 20%, no allowance) or sometimes D0/D1 if you're already a higher or additional-rate taxpayer. This isn't a penalty for having two jobs — it's just HMRC avoiding giving you the same tax-free allowance twice.",
        ],
      },
      {
        heading: "A worked example: £30,000 main job plus £10,000 second job",
        paragraphs: [
          "Main job on the standard 1257L code, £30,000 a year: the £12,570 allowance leaves £17,430 taxable, all within the 20% basic-rate band — £3,486 of Income Tax. Second job on a BR code, £10,000 a year: there's no allowance to apply, so the whole £10,000 is taxed at 20% — £2,000. Add the two together: £5,486 total Income Tax across both jobs.",
          "Compare that with the same £40,000 coming from a single employer instead: the £12,570 allowance leaves £27,430 taxable, all still within the basic-rate band, giving exactly £5,486 of Income Tax — identical to the two-job total. As long as your combined income from both jobs stays within the basic-rate band, splitting it across two employers with a BR code on the second one gives exactly the same total Income Tax as if one employer paid it all.",
        ],
      },
      {
        heading: "National Insurance works differently — and can work in your favour",
        paragraphs: [
          "Unlike Income Tax, employee National Insurance is calculated separately for each job against its own threshold, rather than on your combined income. In the example above, the main job's £30,000 generates NI of (£30,000 − £12,570) × 8% = £1,394.40. The second job's £10,000 a year sits entirely below the £12,570 NI threshold on its own, so it generates no NI at all, even though combined income across both jobs is £40,000.",
          "Compare that with the same £40,000 from a single employer, which would generate (£40,000 − £12,570) × 8% = £2,194.40 of NI — £800 more than the two-job total in this example. Splitting modest income across multiple small jobs, each under the NI threshold on its own, can genuinely mean paying less total NI than earning the same amount from one employer.",
        ],
      },
      {
        heading: "When it works the other way",
        paragraphs: [
          "The flip side applies if both jobs individually pay well above the NI threshold: because the 8% rate applies up to £50,270 per job rather than per person, someone with two separate jobs each paying £40,000 could end up paying more combined NI than someone earning the same £80,000 from a single employer, since neither job on its own reaches the point where the rate drops to 2%. Worked through: two jobs at £40,000 each generate £2,194.40 of NI apiece — £4,388.80 combined — compared with £3,610.60 from a single £80,000 employer, a difference of £778.20 purely from how NI is split across two separate employments.",
          "HMRC allows people in this situation to apply for NI deferment on one job, which caps how much is deducted at source and avoids genuinely overpaying across the two — it's not automatic, so it has to be actively requested.",
        ],
      },
      {
        heading: "What to check if a second job becomes your main income",
        paragraphs: [
          "Job roles can change — a 'second job' that grows to pay more than your original main job doesn't automatically swap tax codes between employers. If this happens, it's worth telling HMRC directly so the Personal Allowance can be moved to whichever job genuinely is your main income now, rather than leaving the smaller job with the allowance and the larger one taxed entirely at BR.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a BR code on a second job is a mistake or a penalty — it's usually correct, simply reflecting that your Personal Allowance is already allocated to your main job.",
          "Forgetting self-employed second income needs separate reporting — a side business alongside a PAYE main job generally still needs declaring through Self Assessment, regardless of how the main job is taxed.",
          "Not checking if a second job pushes combined income into a higher tax band — Income Tax looks at everything together via Self Assessment or an adjusted code, even though each job is taxed individually through payroll in the meantime.",
          "Assuming NI deferment applies automatically — it has to be applied for if both jobs individually cross the NI threshold and you're at risk of overpaying across the two.",
          "Overlooking that multiple small jobs under the NI threshold can mean paying less total NI than one larger job — useful to know, but not something to rely on without checking your specific combined position.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my second job taxed more than my first?", a: "It isn't taxed at a higher rate in principle — your Personal Allowance is simply already applied to your main job, so the second job's BR code taxes everything at 20% with no tax-free slice of its own." },
      { q: "Does having two jobs mean I pay more tax overall?", a: "Not necessarily. As long as your combined income from both jobs stays within the same tax band it would in a single job, the total Income Tax is identical — only National Insurance, calculated per job, can genuinely differ from the single-job equivalent." },
      { q: "Can having two jobs reduce my National Insurance?", a: "Yes, if each job individually pays below the NI threshold, since NI is calculated separately for each employment — though it can also mean paying more NI if both jobs individually pay well above the threshold." },
      { q: "Do I need to declare a second job to HMRC myself?", a: "If it's PAYE employment, your new employer's starter checklist handles this. If it's self-employment or freelance income, you generally need to register for and file a Self Assessment return regardless of your main PAYE job." },
      { q: "What is NI deferment?", a: "An arrangement some people with multiple jobs, each individually above the NI threshold, can apply for to avoid overpaying combined National Insurance across their jobs." },
    ],
    sources: [
      { label: "GOV.UK: Income Tax: introduction", href: "https://www.gov.uk/income-tax" },
      GOVUK_NI,
    ],
  },
  {
    slug: "how-to-read-your-p60-and-p45",
    title: "How to read your P60 and P45",
    dek: "What's actually on these two payroll documents, why they matter, and what to do if you've lost one.",
    published: NEW,
    updated: NEW,
    related: ["salary-calculator", "tax-code-checker"],
    sections: [
      {
        heading: "What a P60 is for",
        paragraphs: [
          "A P60 is an end-of-tax-year summary your employer must give you by 31 May if you're still employed by them on 5 April. It shows your total pay and total tax deducted for that employment across the whole tax year, your final tax code, and your National Insurance number and contributions. If you had more than one job during the year, you'll get a separate P60 from each employer you were still with at the end of the tax year — it doesn't combine multiple jobs into one document.",
        ],
      },
      {
        heading: "What a P45 is for",
        paragraphs: [
          "A P45 is issued when you leave a job, at any point in the tax year, rather than at the year's end. It shows your total pay and tax for that employment up to your leaving date, along with your tax code at the point you left. Its main practical use is handing it to your next employer, so they can carry on taxing you cumulatively from where the previous job left off, rather than starting you on an emergency code.",
        ],
      },
      {
        heading: "P60 vs P45 at a glance",
        table: {
          headers: ["", "P60", "P45"],
          rows: [
            ["When it's issued", "End of the tax year (by 31 May), if still employed", "When you leave a job, at any point in the year"],
            ["What it covers", "The whole tax year for that employment", "That employment, from 6 April up to your leaving date"],
            ["Main use", "Proof of income for mortgages, loans, tax credit renewals", "Giving to your next employer to avoid an emergency tax code"],
            ["How many you get", "One per employer you're still with at year end", "One per job you leave"],
          ],
        },
      },
      {
        heading: "A worked example: checking a P60 against the Salary Calculator",
        paragraphs: [
          "A simple sanity check: take the gross pay and tax figures from your P60 and run the gross figure through the Salary Calculator with the tax code shown on the P60. If your employer applied a standard cumulative code correctly all year and your pay was steady, the Income Tax and National Insurance figures should land close to what the calculator shows. A noticeable mismatch is usually explained by a mid-year tax code change, a bonus taxed unevenly across the year, or genuine payroll rounding — but it's a useful first check before assuming an error.",
          "It's also a useful check to run every year, not just when something looks obviously wrong — payroll errors are rare but not impossible, and a quick comparison takes less time than discovering an error years later when it's much harder to put right.",
        ],
      },
      {
        heading: "Why you might need either document later",
        paragraphs: [
          "Both documents turn out to matter well beyond the tax year they cover. Mortgage lenders routinely ask for recent P60s as proof of income, especially for self-employed applicants with other PAYE income, or anyone whose salary includes a variable bonus that a single payslip doesn't fully reflect. A P45 matters most in the weeks after leaving a job — hand it over promptly and your new employer can carry on taxing you correctly from day one; without it, you're generally taxed on an emergency basis until HMRC catches up, which can mean paying more tax than necessary for a pay period or two before it's corrected.",
          "If you're ever asked for several years of income history — for a mortgage, a visa application, or a benefits assessment — your P60s are usually the quickest way to provide it, since each one is a clean, official, year-by-year summary rather than a stack of individual payslips to add up yourself.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Throwing away old P60s too soon — they're often needed as proof of income for mortgage applications, tax credit renewals, or checking State Pension records years later; keeping them for several years is sensible.",
          "Assuming you can't start a new job without a P45 — a completed starter checklist is the standard fallback, and most new employers handle this routinely.",
          "Confusing the two documents — a P60 only arrives if you're still employed at the end of the tax year, while a P45 only arrives when you leave; you won't get a P45 just for reaching 5 April in the same job.",
          "Not checking the tax code shown on a P45 before starting a new job — if it looks wrong for your circumstances, it's worth raising with your new employer or HMRC before it carries over incorrectly.",
          "Losing a P45 and assuming the information is gone — your own payslips, your employer's payroll records, or your Personal Tax Account on gov.uk can usually fill in the same figures.",
        ],
      },
    ],
    faqs: [
      { q: "When should I get my P60?", a: "By 31 May following the end of the tax year, from any employer you were still working for on 5 April — digital P60s delivered through a payroll portal are just as valid as a paper copy." },
      { q: "What do I do with a P45 when I leave a job?", a: "Give it to your new employer as soon as possible — it lets them apply your correct tax code and treat your allowance cumulatively, rather than starting you on an emergency code." },
      { q: "I've lost my P45 — what now?", a: "You generally can't get a replacement P45 itself, but your new employer can use a starter checklist instead, and your own payslips or Personal Tax Account on gov.uk will have the same pay and tax figures." },
      { q: "Do I get a P60 if I left my job partway through the year?", a: "No — if you leave before the end of the tax year, you get a P45 instead. A P60 only applies to employers you're still with on 5 April." },
      { q: "What's the difference between the pay figures on a P60 and a P45?", a: "A P60 covers the whole tax year with one employer; a P45 only covers that employment up to the date you left, which might be partway through the tax year." },
    ],
    sources: [
      { label: "GOV.UK: Get your Income Tax right if you're new to PAYE", href: "https://www.gov.uk/new-employee/getting-p45" },
      { label: "GOV.UK: Your P60", href: "https://www.gov.uk/paye-forms-p45-p60-p11d/p60" },
    ],
  },
  {
    slug: "overtime-and-bonus-tax-explained",
    title: "Overtime and bonus tax explained",
    dek: "Why a bonus payslip can look heavily taxed, and when it's just PAYE timing versus genuinely crossing into a higher tax band.",
    published: NEW,
    updated: NEW,
    related: ["overtime-pay-calculator", "salary-calculator", "income-tax-calculator"],
    sections: [
      {
        heading: "There's no special 'bonus tax rate'",
        paragraphs: [
          "A common worry is that bonuses and overtime get taxed at some special, higher rate. They don't — there's no separate bonus tax band in the UK system. A bonus or overtime payment is simply added to your normal pay and taxed through the same Income Tax bands and National Insurance thresholds as the rest of your income for the year. What can make a bonus payslip look brutal is how PAYE spreads your annual Personal Allowance and tax bands evenly across the year's pay periods — a large one-off payment in a single month can temporarily look like it's being taxed harshly, even though the year-end total works out exactly the same as if the same money had arrived as regular pay.",
        ],
      },
      {
        heading: "A worked example where the timing evens out",
        paragraphs: [
          "Take someone on a £35,000 base salary who receives a £5,000 bonus partway through the year, taking their total annual income to £40,000. Because £40,000 stays entirely within the basic-rate band (below £50,270), the bonus is taxed at exactly 20% — the same marginal rate as the rest of their income. Comparing the full tax year with and without the bonus: tax on £35,000 alone is £4,486 (20% of the £22,430 above the Personal Allowance); tax on £40,000 is £5,486 (20% of £27,430). The difference — exactly £1,000 — is exactly 20% of the £5,000 bonus. There's no hidden extra cost here, even if the specific payslip the bonus landed on looked unusually large in the tax column that month.",
        ],
      },
      {
        heading: "A worked example where the rate genuinely does change",
        paragraphs: [
          "Now take someone on a £48,000 base salary who gets a £5,000 bonus, taking their annual income to £53,000 — crossing the £50,270 higher-rate threshold. Without the bonus, their taxable income of £35,430 sits entirely in the 20% band, giving £7,086 of tax. With the bonus, taxable income of £40,430 splits across bands: £37,700 at 20% (£7,540) and the remaining £2,730 at 40% (£1,092), totalling £8,632. The bonus added £1,546 of tax on £5,000 — an average of just under 31%, because £2,270 of it stayed in the basic-rate band while the remaining £2,730 spilled into the 40% band. This is a genuine change in tax owed, caused by the bonus itself pushing total income higher — not a PAYE quirk.",
        ],
      },
      {
        heading: "National Insurance applies too",
        paragraphs: [
          "Bonuses and overtime also attract National Insurance in exactly the same way as regular pay — 8% on the portion of your combined annual earnings between £12,570 and £50,270, and 2% above that. There's no NI-free treatment for a bonus, and a large bonus crossing the £50,270 line will see the excess charged at the lower 2% NI rate even as it moves into the 40% Income Tax band — the two taxes partly offset each other right at that threshold.",
        ],
      },
      {
        heading: "Overtime that's genuinely a different arrangement",
        paragraphs: [
          "Regular, contracted overtime — the kind built into a fixed rota or shift pattern — is simply taxed as part of normal pay, with no special treatment at all. Where it gets more interesting is genuinely irregular overtime, where a worker's total pay varies significantly from one period to the next. PAYE still handles this correctly on a cumulative basis over the year, but it's worth keeping an eye on your year-to-date figures if your hours fluctuate a lot, since a few unusually high-overtime months can temporarily look like you're paying a disproportionate amount of tax, even though the full tax year will balance out correctly in the end.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a heavily-taxed bonus payslip means an error — check whether your year-end total income actually crosses a tax band threshold before assuming something's wrong; often it's just PAYE timing that self-corrects.",
          "Forgetting a bonus counts towards adjusted net income — a bonus can tip someone over the £100,000 Personal Allowance taper or the £60,000 Child Benefit threshold even if their regular salary alone wouldn't.",
          "Not considering bonus sacrifice — some employers allow a bonus to be paid into a pension instead of as cash, through salary sacrifice, which avoids Income Tax and NI on the sacrificed amount entirely, arranged before the bonus is paid.",
          "Assuming overtime is always paid at an enhanced rate — there's no legal requirement for a premium rate on overtime; it depends entirely on your employment contract.",
          "Leaving a job shortly after a heavily-taxed bonus month without checking for a refund — if your income for the rest of the tax year doesn't continue at the bonus month's level, you may be owed money back; see our guide on claiming a tax refund from HMRC.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a special tax rate for bonuses?", a: "No. Bonuses and overtime are taxed through the same Income Tax bands and NI thresholds as your regular pay — there's no separate 'bonus rate', though a large bonus can push part of your income into a higher band if your total annual income crosses a threshold." },
      { q: "Why did my bonus month look so heavily taxed?", a: "Often it's just PAYE timing — the system assumes your current pay level continues all year, which can temporarily overstate the tax due in that one period. It usually evens out over the rest of the tax year if your pay returns to normal." },
      { q: "Does overtime get taxed differently from a bonus?", a: "No — both are simply added to your pay and taxed at your normal marginal rate(s) for the year, with no special treatment for either." },
      { q: "Can I avoid tax on a bonus by putting it into my pension?", a: "Often partially, yes — if your employer allows bonus sacrifice into a pension, the sacrificed amount avoids Income Tax and National Insurance entirely, the same way salary sacrifice works." },
      { q: "Does National Insurance apply to bonuses?", a: "Yes, in exactly the same way as regular pay — 8% between £12,570 and £50,270 of combined annual earnings, 2% above that." },
    ],
    sources: [
      GOVUK_INCOME_TAX,
      GOVUK_NI,
    ],
  },
  {
    slug: "pro-rata-salary-explained-for-part-time-workers",
    title: "Pro rata salary explained for part-time workers",
    dek: "Beyond the basic salary formula — how pro rata actually affects holiday, bank holidays, sick pay, pensions and comparing part-time job offers.",
    published: NEW,
    updated: NEW,
    related: ["pro-rata-calculator", "salary-calculator", "hourly-to-yearly"],
    sections: [
      {
        heading: "The basic formula, briefly",
        paragraphs: [
          "Pro rata simply means 'in proportion'. A part-time role advertised against a full-time-equivalent salary pays that salary scaled down by the proportion of full-time hours or days you actually work: pro rata salary = full-time salary × (your hours or days ÷ full-time hours or days). Our Pro Rata Calculator handles this instantly — this guide goes further, into the entitlements that scale the same way, which is where most of the confusion about part-time pay actually comes from.",
        ],
      },
      {
        heading: "Holiday entitlement scales the same way — with one catch",
        paragraphs: [
          "By law, part-time workers get the same holiday entitlement as a full-time employee doing the same job, scaled to their hours. The UK statutory minimum is 5.6 weeks of paid holiday a year for a full-time worker — for someone working 3 days a week, that's 5.6 × 3 = 16.8 days, not a flat smaller number pulled from nowhere.",
          "The catch is bank holidays. Full-time employees in the UK get 8 bank holidays a year, usually on top of their normal leave. A part-time worker whose fixed working days never fall on a bank holiday (say, someone who only works Tuesdays to Thursdays) can end up missing out on that benefit entirely unless their contract specifically gives a pro rata bank holiday entitlement — worth checking explicitly rather than assuming it's automatic.",
        ],
      },
      {
        heading: "Pro rata across different parts of a job offer",
        table: {
          headers: ["What", "How it typically scales"],
          rows: [
            ["Salary", "Full-time salary × your hours/days ÷ full-time hours/days"],
            ["Statutory holiday", "5.6 weeks × your hours/days ÷ full-time hours/days"],
            ["Workplace pension contribution", "Employer and employee % usually applied to your actual pro rata pay, not the full-time-equivalent salary"],
            ["Statutory Sick Pay (SSP)", "A flat weekly rate, but only payable for the days you're contracted to work"],
            ["Redundancy pay", "Based on actual pro rata pay and length of service, not the full-time-equivalent salary"],
          ],
        },
      },
      {
        heading: "A worked example: comparing two part-time offers",
        paragraphs: [
          "Say you're deciding between two roles advertised at the same £33,000 full-time-equivalent salary. Role A is 3 days a week (0.6 of full-time): pro rata salary £19,800, pro rata statutory holiday 16.8 days. Role B is 4 days a week (0.8 of full-time): pro rata salary £26,400, pro rata statutory holiday 22.4 days. On a daily rate basis, Role A pays £19,800 ÷ (0.6 × 260 days) = £126.92 a day worked, while Role B pays £26,400 ÷ (0.8 × 260 days) = £126.92 a day worked too — identical, as you'd expect from the same full-time-equivalent figure. The real differences to weigh up are the extra day a week of actual time committed, and whether either role's fixed working days happen to capture any bank holidays.",
        ],
      },
      {
        heading: "Pro rata when you join or leave mid-year",
        paragraphs: [
          "The same scaling idea applies to someone joining or leaving a job partway through the year, not just to part-time hours. A £33,000 full-time role started exactly halfway through the tax year, on 6 October, would typically be paid roughly half of £33,000 for that tax year — scaled by the proportion of the year actually worked, in the same way a part-time role is scaled by the proportion of the week worked. This matters when comparing a payslip against an annual salary figure, since a part-year salary will naturally look lower than the full annual figure even though the pro rata rate itself hasn't changed.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming part-time holiday is just 'less' rather than proportionally scaled — it should match your proportion of full-time hours exactly, not an arbitrary smaller number.",
          "Forgetting to check bank holiday entitlement specifically — if your contracted days never include a bank holiday, you could lose that benefit unless your contract accounts for it separately.",
          "Comparing two part-time offers by salary alone — the effective daily or hourly rate (and how holiday, pension and other benefits scale) often matters more than the headline pro rata salary.",
          "Assuming pension contributions are based on the full-time-equivalent salary — they're almost always calculated on your actual pro rata pay, so a 5% pension contribution on a 0.6 FTE role is 5% of the pro rata salary, not the full-time figure.",
          "Not reading how a contract defines 'full-time' hours — 35, 37.5 and 40 hours a week are all common definitions, and the one your employer uses changes your pro rata proportion even at the same number of days worked.",
        ],
      },
    ],
    faqs: [
      { q: "Do part-time workers get less holiday than full-time staff?", a: "Not proportionally less — by law, part-time workers get the same holiday entitlement as a full-time employee in the same role, scaled exactly to their hours or days worked." },
      { q: "Do I get bank holidays off if I work part-time?", a: "Only if your contracted working days happen to include them, or your contract specifically gives a pro rata bank holiday allowance — it isn't automatic if your fixed working days never fall on a bank holiday." },
      { q: "Is my pension contribution based on my pro rata pay or the full-time salary?", a: "Almost always your actual pro rata pay — both your own contribution and your employer's match are typically a percentage of what you actually earn, not the full-time-equivalent figure." },
      { q: "How do I fairly compare two part-time job offers?", a: "Convert both to an effective hourly or daily rate using the same method, and compare pro rata holiday, pension and any other benefits alongside the headline salary, rather than comparing pro rata salaries alone." },
      { q: "Does redundancy pay use my pro rata salary or the full-time-equivalent figure?", a: "Your actual pro rata pay and length of service — statutory redundancy pay is based on what you actually earn, not the full-time-equivalent salary the role might have been advertised against." },
    ],
    sources: [
      { label: "GOV.UK: Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
      { label: "GOV.UK: Statutory Sick Pay", href: "https://www.gov.uk/statutory-sick-pay" },
    ],
  },
  {
    slug: "how-tax-on-savings-interest-is-collected",
    title: "How tax on savings interest is actually collected and reported",
    dek: "Beyond the Personal Savings Allowance basics — how joint accounts, fixed-rate bonds and non-taxpayers actually get taxed or reclaim tax on interest.",
    published: NEW,
    updated: NEW,
    related: ["savings-interest-calculator", "income-tax-calculator"],
    sections: [
      {
        heading: "A quick recap of the allowance",
        paragraphs: [
          "Our other guide covers the Personal Savings Allowance and starting rate for savings in full — in short, basic-rate taxpayers get £1,000 of tax-free interest a year, higher-rate taxpayers get £500, and additional-rate taxpayers get none. This guide picks up where that one leaves off: the practical mechanics of how interest actually gets reported, taxed and sometimes reclaimed in situations that aren't a single person with a single easy-access account.",
        ],
      },
      {
        heading: "Joint accounts between spouses",
        paragraphs: [
          "Interest on a joint account held by a married couple or civil partners is normally split 50/50 for tax purposes by default, regardless of who actually paid in the money, unless you've made a specific joint ownership declaration to HMRC splitting it differently to match true ownership shares. This default 50/50 split matters most when one partner is a non-taxpayer or basic-rate taxpayer and the other is in a higher band — moving savings into the lower earner's sole name, rather than a joint account, can sometimes shelter more interest from tax than leaving it split evenly.",
        ],
      },
      {
        heading: "Fixed-rate bonds and when interest actually counts",
        paragraphs: [
          "A common point of confusion: for a fixed-rate bond that locks your money away for a year or more, is the interest taxed when it's credited to the account each year, or only when the bond matures and you can finally access it? HMRC's rule is based on access — if you genuinely cannot withdraw the interest before maturity, it's treated as received (and taxable) in the tax year the bond actually matures and the interest becomes available to you, even if the account showed it accruing earlier. If you could access it earlier but chose not to, it's taxed as it's credited each year instead.",
          "This matters most for a multi-year fixed bond: a large amount of interest landing in a single tax year on maturity can push someone over their Personal Savings Allowance for that one year, even if spread over the bond's term it would have stayed comfortably within it each year.",
        ],
      },
      {
        heading: "Reclaiming tax if you're a non-taxpayer",
        table: {
          headers: ["Situation", "What to do"],
          rows: [
            ["Basic-rate or higher-rate taxpayer, interest within your allowance", "Nothing — no tax due, no reporting needed"],
            ["Taxpayer with interest above your allowance", "Usually collected automatically via a tax code adjustment, or through Self Assessment if you file one"],
            ["Non-taxpayer (income below the Personal Allowance) who's had tax wrongly deducted", "Reclaim using form R40, or through your Self Assessment return if you file one"],
            ["Child's savings account funded by a parent", "Interest over £100 a year from a parent's gift is taxed as the parent's income, not the child's, to prevent income-shifting"],
          ],
        },
      },
      {
        heading: "Multiple accounts across different banks",
        paragraphs: [
          "Since 2017, banks and building societies in the UK have reported interest figures directly to HMRC automatically, which means HMRC can generally see your total interest across every account you hold, not just one bank's view of it. This is exactly how HMRC adjusts a tax code for someone with, say, five separate savings accounts each paying a modest amount of interest that only adds up to something taxable once combined — no single bank needs to see the full picture for HMRC's own systems to work out your total position correctly.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a bank automatically knows your tax position — banks report gross interest paid to HMRC, but it's HMRC's own systems (or your Self Assessment return) that work out what's actually owed based on your total income.",
          "Not reclaiming tax as a non-taxpayer — some older or specific accounts can still have tax wrongly withheld; a non-taxpayer can reclaim this using form R40 rather than simply losing it.",
          "Forgetting the £100 rule on children's accounts — a parent gifting money into a child's account that generates more than £100 of interest a year has that interest taxed as their own income, not the child's (this doesn't apply to gifts from grandparents or other relatives).",
          "Not considering a joint ownership declaration — the default 50/50 split on joint account interest between spouses isn't always the most tax-efficient split if one partner pays a much higher marginal rate.",
          "Assuming all the interest from a multi-year fixed bond is taxed each year as it accrues — if you can't access it before maturity, it's generally all taxed in the year it matures instead, which can bunch a large amount of interest into a single tax year.",
        ],
      },
    ],
    faqs: [
      { q: "How is interest on a joint account taxed between spouses?", a: "Split 50/50 by default for tax purposes, regardless of who contributed the money, unless a specific joint ownership declaration has been made to HMRC to reflect a different split." },
      { q: "When is interest on a fixed-rate bond actually taxed?", a: "If you can't access the interest before the bond matures, it's taxed in the year it matures and becomes available — even though it may have been accruing in the account for several years before that." },
      { q: "Can a non-taxpayer reclaim tax wrongly deducted from savings interest?", a: "Yes, using form R40, or through a Self Assessment return if they already file one." },
      { q: "Does a child pay tax on interest from money their parent gave them?", a: "If the interest from a parent's gift exceeds £100 a year, it's taxed as the parent's income instead, specifically to stop income being shifted to a child's lower tax position. This rule doesn't apply to gifts from grandparents or other relatives." },
      { q: "Do banks tell HMRC about my savings interest automatically?", a: "Yes — banks and building societies report the gross interest they've paid you to HMRC each year, which is how HMRC knows to adjust your tax code or ask for Self Assessment reporting if you owe anything." },
    ],
    sources: [
      { label: "GOV.UK: Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
      { label: "GOV.UK: Claim a refund of Income Tax on savings (R40)", href: "https://www.gov.uk/guidance/claim-a-refund-of-income-tax-deducted-from-savings-and-investments-r40" },
    ],
  },
  // TODO: Corporation Tax rate / mortgage interest restriction mechanics are described
  // qualitatively; the illustrative figures below use only the Income Tax bands already in
  // lib/tax.ts. Verify current Corporation Tax rates and the exact tax-credit mechanics on
  // GOV.UK before treating this as advice for a real tax return.
  {
    slug: "rental-income-tax-for-landlords",
    title: "Rental income tax for landlords",
    dek: "How rental profit is taxed alongside your other income, what expenses are actually allowable, and why the mortgage interest rules changed what landlords really pay.",
    published: NEW,
    updated: NEW,
    related: ["income-tax-calculator", "capital-gains-tax-calculator"],
    sections: [
      {
        heading: "Rental income has no special flat rate",
        paragraphs: [
          "Rental profit is simply added to your other income — salary, self-employment profit, pensions — and taxed through the same Personal Allowance and Income Tax bands as everything else. There's no separate 'landlord tax rate'; a landlord with no other income pays the same 20%/40%/45% bands as anyone else, while a landlord who's also a higher-rate taxpayer from their main job pays 40% on their rental profit too.",
        ],
      },
      {
        heading: "What counts as an allowable expense",
        paragraphs: [
          "Allowable expenses are the day-to-day costs of running the letting: letting agent fees, buildings and contents insurance, ground rent and service charges, repairs and maintenance (like-for-like replacements, not upgrades), utility bills if the landlord pays them, and accountancy fees. These come off rental income before tax is worked out.",
          "Capital improvements — genuinely upgrading the property rather than maintaining it, like adding an extension or replacing a basic kitchen with a much higher-specification one — aren't deductible as a running expense. Instead, they reduce the taxable gain when the property is eventually sold, which is where Capital Gains Tax comes in.",
        ],
      },
      {
        heading: "The mortgage interest restriction — the single biggest change for landlords",
        paragraphs: [
          "Since April 2020, landlords with a mortgage on a residential rental property can no longer deduct mortgage interest from rental income before working out tax. Instead, the interest is left out of the expense calculation entirely, and a 20% tax credit is applied against the final tax bill instead. For a basic-rate taxpayer this makes little practical difference, but for a higher-rate taxpayer it genuinely increases the tax owed compared with the old system, because the credit is capped at 20% even though their marginal rate is 40% or 45%.",
        ],
      },
      {
        heading: "A worked example: £12,000 rent, £9,000 mortgage interest",
        paragraphs: [
          "Take a higher-rate taxpayer landlord with £12,000 of annual rent, £1,500 of other allowable expenses, and £9,000 of mortgage interest. Under the current rules, taxable rental profit is £12,000 − £1,500 = £10,500 (mortgage interest isn't deducted here at all). At their 40% marginal rate, that's £4,200 of Income Tax, minus a 20% tax credit on the £9,000 of mortgage interest (£1,800), for a net rental tax bill of £2,400.",
          "Compare that with how it would have worked under the pre-2020 rules, where mortgage interest was simply deducted like any other expense: taxable profit would have been £12,000 − £1,500 − £9,000 = £1,500, taxed at 40% for a bill of just £600. Same cash profit, same property, same mortgage — but £1,800 more tax under the current rules, purely because of how the relief is structured for a higher-rate taxpayer.",
        ],
      },
      {
        heading: "Smaller-scale alternatives",
        paragraphs: [
          "Two reliefs are worth knowing for smaller lettings. Rent-a-room relief lets you earn up to £7,500 a year tax-free from letting a room in your own main home. The property income allowance separately lets anyone with small amounts of property income claim a flat £1,000 tax-free allowance instead of deducting actual expenses — useful if your genuine expenses are low, but you can't claim both the allowance and your real expenses on the same income at once.",
        ],
      },
      {
        heading: "Furnished holiday lettings used to be different — that's changing",
        paragraphs: [
          "Furnished holiday lettings have historically had their own, more generous tax treatment, including full mortgage interest deductibility and access to certain Capital Gains Tax reliefs not available to ordinary residential lets. These rules have been under reform, with the special furnished holiday letting regime being phased out so that this type of letting is taxed more like any other residential rental business. Anyone running a holiday letting business should check the current position carefully, since the gap between the old and new treatment is significant.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Deducting mortgage capital repayments as an expense — only the interest portion of a mortgage payment was ever allowable, and since 2020 even that no longer comes off rental income directly, just via the 20% tax credit.",
          "Treating a property upgrade as a revenue expense — a genuine capital improvement reduces a future Capital Gains Tax bill on sale, not this year's rental Income Tax.",
          "Assuming the mortgage interest restriction doesn't affect basic-rate taxpayers at all — it generally doesn't change their tax bill much, but it can still push a basic-rate landlord into higher-rate territory, since the gross rental profit (before the interest credit) counts towards their income for band purposes.",
          "Forgetting the property income allowance and actual expenses can't both be claimed on the same income — it's one or the other, whichever gives the better result for your specific numbers.",
          "Not accounting for rental profit pushing total income over £100,000 or £60,000 — the same Personal Allowance taper and Child Benefit charge thresholds apply, based on total income including rental profit.",
        ],
      },
    ],
    faqs: [
      { q: "Is rental income taxed at a special landlord rate?", a: "No — it's simply added to your other income and taxed through the same Personal Allowance and Income Tax bands as salary, self-employment profit or pensions." },
      { q: "Can I still deduct mortgage interest from my rental income?", a: "No, not directly, since April 2020. Instead, mortgage interest is left out of the profit calculation and a 20% tax credit is applied to your final tax bill instead — which costs higher-rate taxpayers more than the old system did." },
      { q: "What's the difference between a repair and a capital improvement?", a: "A repair restores something to its previous condition (like-for-like) and is an allowable expense; a capital improvement genuinely upgrades the property and instead reduces a future Capital Gains Tax bill when you sell." },
      { q: "What is the property income allowance?", a: "A flat £1,000 tax-free allowance for small amounts of property income, available instead of deducting your actual expenses — you can't claim both on the same income." },
      { q: "How much tax-free income can I earn from rent-a-room relief?", a: "Up to £7,500 a year from letting a room in your own main home, tax-free, without needing to register for Self Assessment purely for that income if it's the only reason you'd need to." },
    ],
    sources: [
      { label: "GOV.UK: Renting out your property", href: "https://www.gov.uk/renting-out-a-property" },
      { label: "GOV.UK: Work out your rental income when you let property", href: "https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income" },
    ],
  },
  // TODO: pre-April-2017 VED bands (engine-size system and the 2001-2017 CO2 bands A-M) are
  // described structurally only — exact current rates per band are not modelled anywhere in
  // lib/tax.ts or tax2.ts. Verify current figures on GOV.UK before quoting a specific amount.
  {
    slug: "vehicle-tax-bands-explained",
    title: "Vehicle tax (VED) bands explained",
    dek: "How the older, pre-2017 Vehicle Excise Duty systems work for cars registered before 1 April 2017, and why they're often cheaper than the current rules.",
    published: NEW,
    updated: NEW,
    related: ["vehicle-tax-calculator"],
    sections: [
      {
        heading: "Why older cars use a different system entirely",
        paragraphs: [
          "Our other guide on Vehicle Tax covers the system used for cars registered from 1 April 2017 onward — a CO₂-based first-year rate followed by a flat standard rate. Cars registered before that date are taxed under one of two earlier systems instead, based entirely on the registration date, not the car's age today. It's worth knowing which system applies to a specific car, since the older systems can work out noticeably cheaper than the current rules for smaller, more efficient older cars.",
        ],
      },
      {
        heading: "Pre-2001: taxed by engine size",
        paragraphs: [
          "Cars registered before 1 March 2001 are taxed on engine size alone, split into two simple bands: at or below 1549cc, and above 1549cc. There's a flat annual rate for each band, with no reference to emissions at all, since CO₂ figures weren't routinely recorded for cars this old. Check the current rates on GOV.UK using the engine size shown on the car's V5C registration certificate or logbook.",
          "Because this system only has two bands, it's also the simplest of the three to check — there's no emissions figure to hunt down, and no ambiguity about which category a car falls into once you know whether its engine is above or below 1549cc.",
        ],
      },
      {
        heading: "2001 to 2017: taxed by CO₂ emissions bands",
        paragraphs: [
          "Cars registered from 1 March 2001 to 31 March 2017 use a system of CO₂ emissions bands, labelled with letters from A (the lowest emissions, historically £0) through to M (the highest emissions, the most expensive band). Unlike the current system, which only charges a CO₂-based rate in the first year, this older system applies the same emissions-based rate every single year of the car's life — it never drops to a flat standard rate the way post-2017 cars do from year two onwards.",
          "This is exactly why a well-kept, low-emissions car registered in this window can sometimes cost less to tax than an equivalent newer car under the post-2017 rules, which settle at a flat £200 regardless of how efficient the car is.",
        ],
      },
      {
        heading: "The three systems at a glance",
        table: {
          headers: ["Registration date", "What decides the rate", "How long the rate applies"],
          rows: [
            ["Before 1 March 2001", "Engine size (two bands)", "Every year, unchanged"],
            ["1 March 2001 – 31 March 2017", "CO₂ emissions band (letters A–M)", "Every year, unchanged"],
            ["From 1 April 2017", "CO₂ emissions (first year), then a flat rate", "First-year rate once, then flat from year two"],
          ],
        },
      },
      {
        heading: "Finding the right rate for a specific car",
        paragraphs: [
          "The registration date on the V5C (logbook) is the only thing that decides which of the three systems applies — not how the car looks, and not its current condition. For a car registered in the 2001–2017 window, the CO₂ emissions band letter is also shown on the V5C or on the original type-approval certificate; for an engine-size-based car from before 2001, it's the engine size in cc that matters instead. Always check the exact current rate for the relevant band or engine size directly on GOV.UK, since these figures are reviewed and can change each tax year.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming every car follows the modern first-year-then-flat-rate system — only cars registered from 1 April 2017 onward do; anything older uses one of the two systems described here, for the whole of its life.",
          "Guessing the CO₂ band rather than checking the V5C — the emissions band letter (A to M) for a 2001–2017 car is a specific, documented figure, not something to estimate from the car's size or type.",
          "Assuming an older, low-emissions car is automatically more expensive to tax than a modern one — because the pre-2017 systems don't have a flat year-two-onward rate, a genuinely efficient older car can be cheaper to tax than the current £200 standard rate.",
          "Forgetting the 40-year historic vehicle exemption — a vehicle built more than 40 years ago and registered as a historic vehicle is generally exempt from VED altogether, regardless of which system it would otherwise fall under.",
          "Not re-checking the rate every tax year — unlike the post-2017 standard rate, which rarely needs rechecking once you know it, VED bands and rates are reviewed and can change at each Budget.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know which VED system applies to my car?", a: "It's based purely on the registration date shown on your V5C — before 1 March 2001 uses engine size, 1 March 2001 to 31 March 2017 uses CO₂ emissions bands A to M, and from 1 April 2017 onward uses the current first-year-then-flat-rate system." },
      { q: "Do older cars pay the same flat £200 rate as newer ones eventually?", a: "No — only cars registered from 1 April 2017 settle into the flat standard rate from year two. Cars registered before that keep paying their engine-size or CO₂-band rate every year, for the whole life of the car." },
      { q: "Where do I find my car's CO₂ emissions band letter?", a: "On the V5C registration certificate, or on the original type-approval documentation for the car — it won't be something you need to estimate." },
      { q: "Can an older car be cheaper to tax than a brand new one?", a: "Yes, in some cases — a particularly low-emissions car registered in the 2001–2017 window can fall into a cheap CO₂ band that costs less than the current flat £200 standard rate charged on cars registered after April 2017." },
      { q: "Is my classic car exempt from vehicle tax?", a: "Vehicles built more than 40 years ago and registered as historic vehicles are generally exempt from VED, regardless of which of the three systems they'd otherwise fall under — though they still need to be taxed (at a zero rate) rather than simply ignored." },
      { q: "Does importing an older car from abroad change which system applies?", a: "No — the UK registration date is what matters, not where the car was originally built or sold, so an older design first registered in the UK more recently could still fall under a different band than its manufacture date might suggest." },
    ],
    sources: [
      { label: "GOV.UK: Vehicle tax rates", href: "https://www.gov.uk/vehicle-tax-rate-tables" },
      { label: "GOV.UK: Check vehicle tax rate", href: "https://www.gov.uk/check-tax-rate" },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForTool = (toolSlug: string) => GUIDES.filter((g) => g.related.includes(toolSlug));
