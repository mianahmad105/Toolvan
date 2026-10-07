import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ADSENSE_CLIENT_ID, SITE_NAME, SITE_URL } from "@/lib/tools";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

// Google Search Console verification. Not a secret — this value is meant to be publicly
// visible in the page source, which is how Search Console confirms ownership. Hardcoded as
// the default so it works without needing an env var set on the host; still overridable via
// NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION if the verification code is ever rotated.
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "wkwXk0RsWvss_nDpVvWYbY813v7oTAS3egDGOZB3cFU";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Free UK Tax & Salary Calculators`, template: `%s | ${SITE_NAME}` },
  description: "Free UK salary, income tax, National Insurance, pension and capital gains tax calculators for 2026/27.",
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={jakarta.variable}>
        {/*
          Loads once the site is approved for Google AdSense and NEXT_PUBLIC_ADSENSE_CLIENT_ID
          (e.g. "ca-pub-1234567890123456") is set. This same script also serves Google's
          certified consent message (Privacy & messaging) to UK/EEA/Swiss visitors once that
          is turned on for this account at adsense.google.com -> Privacy & messaging -> GDPR.
        */}
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
