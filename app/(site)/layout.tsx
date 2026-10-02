import { CookieConsent } from "@/components/CookieConsent";
import { Footer, Header } from "@/components/SiteChrome";
import { ADSENSE_CLIENT_ID } from "@/lib/tools";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/*
        Once AdSense is live (NEXT_PUBLIC_ADSENSE_CLIENT_ID is set) and "Privacy & messaging"
        is turned on in the AdSense account, Google's own certified consent message handles ad
        consent for UK/EEA/Swiss visitors. Showing our own banner on top of that would be a
        conflicting double prompt, so it only renders before AdSense is switched on.
      */}
      {!ADSENSE_CLIENT_ID && <CookieConsent />}
    </>
  );
}
