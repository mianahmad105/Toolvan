import { CheckCircle2, Mail } from "lucide-react";
import { Newsletter } from "./Newsletter";

const AUDIENCE = ["Employees", "Contractors", "Landlords", "Website owners"];

export function NewsletterSection() {
  return (
    <section className="band">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm text-muted">Made for people who earn, save and invest in the UK</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-4 text-sm text-muted">
          {AUDIENCE.map((a) => (
            <span key={a} className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" />{a}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center pt-28 pb-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-sm shadow-sm text-accent">
          <Mail size={15} /> Newsletter
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-6 leading-tight">Tax changes and new tools, straight to your inbox</h2>
        <p className="text-muted text-lg mt-5 max-w-2xl mx-auto">
          Want to hear when tax rates change or a new calculator goes live? Enter your email below — it opens an
          email to us from your own mail app, so you&apos;re in control of what gets sent.
        </p>
        <Newsletter />
        <p className="text-xs text-muted mt-6 max-w-md mx-auto">
          This doesn&apos;t submit anything to our servers — it just drafts an email from you to us. See our{" "}
          <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a> for how we handle it from there.
        </p>
      </div>
    </section>
  );
}
