export interface ToolContent {
  how: string[];
  faqs: { q: string; a: string }[];
}

export const CONTENT: Record<string, ToolContent> = {
  "salary-calculator": {
    how: [
      "Type in your yearly gross pay and this calculator works out what actually lands in your bank account. It takes off income tax, employee National Insurance, any pension contribution and, if you have one, your student loan repayment.",
      "The results are shown per year, month, four weeks, week and day, so you can compare a job offer against your monthly outgoings without doing any sums yourself.",
    ],
    faqs: [
      { q: "Which tax year does it use?", a: "All figures follow the 2026/27 UK tax year, which runs from 6 April 2026 to 5 April 2027." },
      { q: "Does it work for Scotland?", a: "Yes. Choose Scotland in the tax region box and the Scottish income tax bands are applied instead of the England, Wales and Northern Ireland ones." },
      { q: "How is pension treated?", a: "The percentage you enter is taken from your gross pay before tax (a net pay arrangement), so it lowers the amount of income that is taxed." },
    ],
  },
  "income-tax-calculator": {
    how: [
      "Enter the income that is liable to tax and you will see how much of it falls into each band. Every pound is taxed only at the rate of the band it sits in, never the whole amount at the top rate.",
      "The table also shows your effective rate, which is your total tax divided by your income. It is always lower than the rate of your highest band.",
    ],
    faqs: [
      { q: "What is the Personal Allowance?", a: "It is the part of your income, £12,570 for 2026/27, that is not taxed. It shrinks by £1 for every £2 you earn above £100,000." },
      { q: "What are the tax rates?", a: "In England, Wales and Northern Ireland the rates are 20%, 40% and 45%. Scotland has six bands running from 19% to 48%." },
      { q: "Is dividend or savings income included?", a: "No. This tool covers earnings and similar income taxed at standard rates only." },
    ],
  },
  "ni-calculator": {
    how: [
      "National Insurance builds your entitlement to the State Pension and some benefits. Employees pay Class 1 contributions straight from their wages.",
      "For 2026/27 you pay 8% on earnings between £12,570 and £50,270 a year, then 2% on everything above that. Enter your gross earnings to see each part and the total.",
    ],
    faqs: [
      { q: "Do I pay NI and tax on the same income?", a: "They are separate systems with different thresholds. NI is worked out on your gross earnings and is not reduced by a pension contribution in the way tax is." },
      { q: "Does this cover self-employed NI?", a: "No, this tool is for employees paying Class 1. Self-employed people pay Class 2 and Class 4 instead." },
      { q: "Is there NI over State Pension age?", a: "No. Once you reach State Pension age you stop paying employee NI, although your employer still does." },
    ],
  },
  "after-tax": {
    how: [
      "Use this page when you only want one answer: what is my pay after tax? Enter your salary and press Calculate to see your net income and the share of your gross pay that you keep.",
      "Adjust the pension percentage or student loan plan to see how each choice changes the amount you take home.",
    ],
    faqs: [
      { q: "What is the difference between gross and net pay?", a: "Gross pay is your salary before anything is taken off. Net pay, or take-home pay, is what remains after tax, National Insurance and other deductions." },
      { q: "Why is my payslip slightly different?", a: "Payslips depend on your exact tax code, pay date and benefits. This calculator gives a close estimate for a standard tax code." },
      { q: "Are bonuses included?", a: "Include any bonus in the gross figure you enter. It is taxed at your marginal rate like the rest of your pay." },
    ],
  },
  "gross-salary-calculator": {
    how: [
      "Sometimes you know the take-home pay you need and want to work backwards. Enter the yearly net figure you are aiming for and the calculator finds the gross salary that produces it.",
      "It repeats the tax, National Insurance, pension and student loan calculations until the result matches your target, so the answer already allows for all your deductions.",
    ],
    faqs: [
      { q: "Is the result exact?", a: "It is accurate to within a few pence for a standard tax code." },
      { q: "Why does gross rise faster than net?", a: "Once you cross a tax band, each extra pound of gross pay is taxed at a higher rate, so you need a bigger raise to get the same extra take-home." },
      { q: "Can I include a pension?", a: "Yes. Enter the percentage and it is built into the required gross salary." },
    ],
  },
  "tax-code-checker": {
    how: [
      "Your tax code tells your employer how much tax-free pay you get. Type in the code from your payslip or HMRC letter and we explain what each part means.",
      "The number is your tax-free allowance divided by ten, plus nine. The letter shows your situation, and a prefix of S or C indicates Scotland or Wales.",
    ],
    faqs: [
      { q: "What does 1257L mean?", a: "It is the standard code for 2026/27. It gives you £12,570 of tax-free income." },
      { q: "What is a K code?", a: "A K code means you owe tax on income or benefits that is not taxed elsewhere, so an amount is added to your taxable pay instead of an allowance being given." },
      { q: "What do BR, D0 and D1 mean?", a: "They tax all your income at 20%, 40% and 45% respectively with no allowance. They are often used for a second job." },
    ],
  },
  "pro-rata-calculator": {
    how: [
      "Part-time jobs are usually advertised with a full-time salary. Pro rata means paid in proportion, so your pay is the full-time salary multiplied by the share of the week you work.",
      "Enter the full-time salary, the days in a full-time week and the days you actually work to see your yearly, monthly and weekly pay.",
    ],
    faqs: [
      { q: "Can I use hours instead of days?", a: "Yes. Enter full-time hours in the first box and your own hours in the second; the proportion works the same way." },
      { q: "Is holiday pay pro rata too?", a: "Yes. Part-time staff receive the same holiday entitlement in proportion to the time they work." },
      { q: "Is this before or after tax?", a: "It is your gross pro rata salary. Put it into the salary calculator to see take-home pay." },
    ],
  },
  "marriage-allowance-calculator": {
    how: [
      "Marriage Allowance lets one partner give £1,260 of their unused Personal Allowance to the other. It can cut the receiving partner's tax bill by up to £252 a year.",
      "Enter both incomes to check the basic conditions: one partner earns less than the Personal Allowance and the other is a basic-rate taxpayer.",
    ],
    faqs: [
      { q: "Who can claim?", a: "Married couples and civil partners where one partner earns under £12,570 and the other earns between £12,571 and £50,270 in England, Wales and Northern Ireland." },
      { q: "Can I backdate a claim?", a: "You can usually claim for up to four previous tax years if you were eligible in each of them." },
      { q: "How do I apply?", a: "Apply through the official government website. This tool only estimates whether you are likely to qualify." },
    ],
  },
  "overtime-pay-calculator": {
    how: [
      "Enter your normal hourly rate, how many overtime hours you worked and the multiplier your employer pays. The calculator gives your gross overtime pay and a rough take-home figure.",
      "Common multipliers are time and a half (1.5), double time (2) and time and a quarter (1.25).",
    ],
    faqs: [
      { q: "Do employers have to pay extra for overtime?", a: "Not by law. Whether overtime is paid at a higher rate is set by your contract." },
      { q: "How is the take-home estimate worked out?", a: "It assumes a basic-rate taxpayer, so 20% tax and 8% National Insurance are taken from the overtime." },
      { q: "Does overtime affect my tax band?", a: "It can. Extra pay may push part of your income into the higher-rate band." },
    ],
  },
  "pension-tax-relief-calculator": {
    how: [
      "When you pay into a pension, the government adds tax relief. In a relief-at-source scheme your provider adds 20% to what you pay in.",
      "Higher and additional-rate taxpayers can claim back the extra 20% or 25% through Self Assessment. Enter your salary and payment to see the totals.",
    ],
    faqs: [
      { q: "What is the annual limit?", a: "You can normally receive tax relief on pension payments up to 100% of your earnings, subject to the £60,000 annual allowance." },
      { q: "What is relief at source?", a: "You pay in 80% of the gross amount and the provider claims the remaining 20% from HMRC and adds it to your pot." },
      { q: "Is my workplace pension different?", a: "Many workplace schemes use a net pay arrangement, where tax relief is given by taking the payment out of your pay before tax." },
    ],
  },
  "hourly-to-yearly": {
    how: [
      "Multiply your hourly rate by the hours you work each week and by the weeks in the year to get your annual pay.",
      "The default is 52 weeks. Lower it if you are not paid for some weeks.",
    ],
    faqs: [
      { q: "How many hours is full time?", a: "There is no legal definition, but 37.5 to 40 hours a week is typical in the UK." },
      { q: "Does this include holiday pay?", a: "If you are paid for your holiday, keep it at 52 weeks. If not, reduce the weeks accordingly." },
      { q: "Is the result before tax?", a: "Yes, it is a gross amount." },
    ],
  },
  "salary-to-hourly": {
    how: [
      "Divide your annual salary by the number of hours you work in a year to find your hourly rate.",
      "This is helpful for comparing a salaried role with a job that pays by the hour.",
    ],
    faqs: [
      { q: "What if my hours change?", a: "Use your average weekly hours across the year." },
      { q: "Should unpaid breaks count?", a: "No. Only count the hours you are paid for." },
      { q: "Is this before tax?", a: "Yes, it shows gross pay per hour." },
    ],
  },
  "daily-rate-to-annual-salary": {
    how: [
      "Multiply your day rate by the number of days you expect to work in the year. Contractors rarely bill all 260 working days.",
      "Allowing for bank holidays, holiday and gaps between contracts, around 220 days is a common planning figure.",
    ],
    faqs: [
      { q: "Why not use 260 days?", a: "Contractors are not paid for holidays, bank holidays or sick days, so fewer days are billable." },
      { q: "Is IR35 relevant?", a: "It can change how much of your day rate you keep. Take advice on your own status." },
      { q: "Is VAT included?", a: "No. Enter your rate excluding VAT." },
    ],
  },
  "capital-gains-tax-calculator": {
    how: [
      "Capital gains tax is charged on the profit when you sell something that has gone up in value, such as shares or a second property.",
      "Each person has a yearly tax-free amount of £3,000 in 2026/27. The rest of your gain is taxed at 18% or 24% depending on your income.",
    ],
    faqs: [
      { q: "Do I pay CGT on my main home?", a: "Usually not. Private Residence Relief covers most homes you have lived in." },
      { q: "How is my rate decided?", a: "The part of your gain that fits inside your remaining basic-rate band is taxed at 18%; anything above is taxed at 24%." },
      { q: "Can I deduct losses?", a: "Yes. Losses on other disposals can reduce your gain, but they must be reported to HMRC." },
    ],
  },
  "vehicle-tax-calculator": {
    how: [
      "Vehicle tax, also called road tax or VED, depends on when the car was registered. For newer cars the first year is charged by CO₂ emissions, and every later year uses a flat standard rate.",
      "Enter the emissions figure from the car's logbook and its list price when new. Cars with a list price above £40,000 pay an extra supplement for five years.",
    ],
    faqs: [
      { q: "Are electric cars exempt?", a: "Not any more. Electric cars now pay the same standard rate as other cars, and the expensive car supplement can apply too." },
      { q: "Where do I find CO₂ emissions?", a: "They are shown on the V5C registration certificate and on the car's listing." },
      { q: "Are these figures official?", a: "They are estimates based on published rates. Check the current rates on GOV.UK before paying." },
    ],
  },
  "inheritance-tax-calculator": {
    how: [
      "Inheritance Tax is charged at 40% on the part of an estate worth more than the tax-free allowances. Everyone has a £325,000 nil-rate band.",
      "If you leave your home to children or grandchildren you may also get a residence nil-rate band of up to £175,000. Married couples and civil partners can often combine their unused allowances.",
    ],
    faqs: [
      { q: "Does everything I leave count?", a: "Gifts to a spouse or civil partner and to charities are usually exempt. This tool works on the value that is left to others." },
      { q: "What happens to large estates?", a: "The residence nil-rate band is reduced by £1 for every £2 the estate is worth over £2 million." },
      { q: "Is this legal advice?", a: "No. Estates can be complicated, so speak to a solicitor for anything important." },
    ],
  },
  "savings-interest-calculator": {
    how: [
      "Compound interest means you earn interest on your interest. Enter a starting amount, what you add each month and the yearly rate to see how your pot could grow.",
      "The calculator adds interest every month, which is how many savings accounts work.",
    ],
    faqs: [
      { q: "Is savings interest taxed?", a: "Many people can earn some interest tax-free through the Personal Savings Allowance. Interest in an ISA is always tax-free." },
      { q: "Does the result include inflation?", a: "No. The figures are in cash terms, so what the money can buy will be lower." },
      { q: "Can the rate change?", a: "Yes. Variable rates move, so treat the result as an example rather than a promise." },
    ],
  },
  "loan-repayment-calculator": {
    how: [
      "Enter how much you want to borrow, the yearly interest rate and how long you will take to repay it. The calculator finds the fixed monthly payment that clears the loan exactly at the end.",
      "Try a longer term to see a lower monthly payment, then compare the extra interest you would pay in total.",
    ],
    faqs: [
      { q: "What is APR?", a: "APR is the yearly cost of borrowing including interest and mandatory fees." },
      { q: "Does this cover mortgages?", a: "It works for any loan repaid in equal monthly instalments, including a repayment mortgage." },
      { q: "Can I overpay?", a: "Overpaying reduces the balance sooner and saves interest, but check your lender's early repayment charges first." },
    ],
  },
  "stamp-duty-calculator": {
    how: [
      "Stamp Duty Land Tax is paid when you buy a home in England or Northern Ireland. It is charged in slices, so you only pay each rate on the part of the price that falls in that slice.",
      "First-time buyers pay less on homes up to £500,000, and buying an additional property adds a 5% surcharge on the full price.",
    ],
    faqs: [
      { q: "Does this cover Scotland and Wales?", a: "No. Scotland has Land and Buildings Transaction Tax and Wales has Land Transaction Tax, both with different rates." },
      { q: "Who pays Stamp Duty?", a: "The buyer pays it, usually within 14 days of completion." },
      { q: "Is the result exact?", a: "It is an estimate. Your solicitor will confirm the final figure." },
    ],
  },
};
