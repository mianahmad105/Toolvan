import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/tools";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Free UK Tax & Salary Calculators`, template: `%s | ${SITE_NAME}` },
  description: "Free UK salary, income tax, National Insurance, pension and capital gains tax calculators for 2026/27.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}
