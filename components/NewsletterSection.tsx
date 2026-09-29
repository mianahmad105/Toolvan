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
          Leave your email and we will tell you when tax rates change, when a new calculator goes live and when there is a simple way to keep more of your pay.
        </p>
        <Newsletter />
        <p className="text-xs text-muted mt-6 max-w-md mx-auto">We respect your privacy and will only use your email address to send tax updates.</p>
      </div>
    </section>
  );
}
