import { CookieConsent } from "@/components/CookieConsent";
import { Footer, Header } from "@/components/SiteChrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
