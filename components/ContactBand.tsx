import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function ContactBand() {
  return (
    <section className="text-white" style={{ background: "linear-gradient(100deg,#052e2b 0%,#0f4f48 55%,#7c4a03 100%)" }}>
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Stuck on a number?</h2>
        <p className="mt-4 text-lg leading-8 text-emerald-100">
          If a result looks odd, or you need a calculator we have not built yet, send us a message and we will take a look.
        </p>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg hover:-translate-y-0.5 transition">
          <MessageCircle size={18} /> Send us a message
        </Link>
      </div>
    </section>
  );
}
