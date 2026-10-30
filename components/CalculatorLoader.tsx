"use client";
import { AfterTaxPage } from "./AfterTaxPage";
import { IncomeTaxPro } from "./IncomeTaxPro";
import { SalaryPro } from "./SalaryPro";
import {
  GrossSalaryCalculatorPro, MarriageAllowanceCalculatorPro,
  NICalculatorPro, ProRataCalculatorPro, TaxCodeCheckerPro,
} from "./calculatorsProA";
import {
  CGTCalculatorPro, DailyRateToAnnualPro, HourlyToYearlyPro,
  OvertimePayCalculatorPro, PensionReliefCalculatorPro, SalaryToHourlyPro,
} from "./calculatorsProB";
import {
  InheritanceTaxCalculatorPro, LoanRepaymentCalculatorPro, SavingsInterestCalculatorPro,
  StampDutyCalculatorPro, VehicleTaxCalculatorPro,
} from "./calculatorsProC";

const PRO_CALCULATORS: Record<string, () => React.JSX.Element> = {
  "salary-calculator": SalaryPro,
  "income-tax-calculator": IncomeTaxPro,
  "ni-calculator": NICalculatorPro,
  "after-tax": AfterTaxPage,
  "gross-salary-calculator": GrossSalaryCalculatorPro,
  "tax-code-checker": TaxCodeCheckerPro,
  "pro-rata-calculator": ProRataCalculatorPro,
  "marriage-allowance-calculator": MarriageAllowanceCalculatorPro,
  "overtime-pay-calculator": OvertimePayCalculatorPro,
  "pension-tax-relief-calculator": PensionReliefCalculatorPro,
  "hourly-to-yearly": HourlyToYearlyPro,
  "salary-to-hourly": SalaryToHourlyPro,
  "daily-rate-to-annual-salary": DailyRateToAnnualPro,
  "capital-gains-tax-calculator": CGTCalculatorPro,
  "stamp-duty-calculator": StampDutyCalculatorPro,
  "inheritance-tax-calculator": InheritanceTaxCalculatorPro,
  "loan-repayment-calculator": LoanRepaymentCalculatorPro,
  "savings-interest-calculator": SavingsInterestCalculatorPro,
  "vehicle-tax-calculator": VehicleTaxCalculatorPro,
};

export function CalculatorLoader({ slug }: { slug: string }) {
  const Calc = PRO_CALCULATORS[slug];
  return Calc ? <Calc /> : null;
}
