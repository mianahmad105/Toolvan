import { Smartphone } from "lucide-react";

export function AppPromo() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-16">
      <div className="rounded-2xl border border-line bg-surface px-5 py-4 flex items-center gap-3 text-sm">
        <span className="grid place-items-center w-9 h-9 rounded-xl bg-surface2 text-accent shrink-0"><Smartphone size={17} /></span>
        <span className="text-muted">A mobile app is on our roadmap — for now, every calculator works smoothly in any mobile browser.</span>
      </div>
    </div>
  );
}
