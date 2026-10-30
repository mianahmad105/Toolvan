import Link from "next/link";
import {
  Clock3, Mail, MessageCircle, ShieldCheck, Sparkles, Zap,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_EMAIL } from "@/lib/tools";

export const metadata = { title: "Contact" };

const WHY = [
  "Free to use, no registration required",
  "Estimates based on published HMRC tax rates",
  "Regular updates with the latest tax rates",
  "Friendly, responsive support",
];

const TRIO = [
  { icon: MessageCircle, title: "Live Chat", body: "Coming soon! We're working on adding live chat support for instant help." },
  { icon: ShieldCheck, title: "Privacy First", body: "Your privacy is our priority. We don't store personal information unnecessarily." },
  { icon: Zap, title: "Quick Response", body: "We aim to respond to all inquiries within 24-48 hours during business days." },
];

export default function Contact() {
  return (
    <>
      <section className="text-white text-center px-4 py-16 md:py-20" style={{ background: "linear-gradient(120deg,#0f172a 0%,#16a34a 55%,#65a30d 130%)" }}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-5 text-white/90 leading-7">
            Have questions about our tax calculators? Need support or want to suggest improvements?
            Our team is here to help you navigate the complex world of UK taxation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-20 lg:grid-cols-[1fr_1.3fr] items-start">
        <div className="space-y-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold flex items-center gap-2.5"><MessageCircle size={20} className="text-accent" /> Contact Information</h2>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3.5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface2 text-accent shrink-0"><Mail size={18} /></span>
                <div>
                  <div className="font-bold">Email Support</div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
                  <div className="text-xs text-muted mt-0.5">We typically respond within 24 hours</div>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface2 text-accent shrink-0"><Clock3 size={18} /></span>
                <div>
                  <div className="font-bold">Response Time</div>
                  <div>24-48 hours</div>
                  <div className="text-xs text-muted mt-0.5">Monday to Friday, 9 AM - 6 PM GMT</div>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-surface2 text-accent shrink-0"><ShieldCheck size={18} /></span>
                <div>
                  <div className="font-bold">Data Security</div>
                  <div>Your information is safe</div>
                  <div className="text-xs text-muted mt-0.5">We never store sensitive personal data</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold flex items-center gap-2.5"><Zap size={20} className="text-accent" /> Why Choose Us</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {WHY.map((w) => (
                <li key={w} className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />{w}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-6 text-white text-center" style={{ background: "linear-gradient(120deg,#16a34a,#a3e635)" }}>
            <h3 className="text-lg font-extrabold">Need Quick Answers?</h3>
            <p className="text-white/90 text-sm mt-1.5">Check our comprehensive FAQ section for common questions</p>
            <Link href="/tools" className="inline-block mt-4 rounded-xl bg-white text-accent2 px-5 py-2.5 font-bold text-sm">View FAQ</Link>
          </div>
        </div>

        <ContactForm />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold">Other Ways to Get Help</h2>
          <p className="text-muted mt-2">We&apos;re committed to providing you with the best possible support experience</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 text-center mt-10">
          {TRIO.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="inline-grid place-items-center w-12 h-12 rounded-2xl bg-surface2 text-accent mb-3"><Icon size={22} /></span>
              <div className="font-bold">{title}</div>
              <p className="text-sm text-muted mt-1.5 leading-6">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
