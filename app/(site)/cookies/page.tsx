export const metadata = { title: "Cookie Policy", alternates: { canonical: "/cookies" } };

export default function Cookies() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-extrabold">Cookie policy</h1>
      <p className="text-muted">This site does not use advertising or tracking cookies. The only thing we store in your browser is your light or dark theme choice, and it never leaves your device.</p>
      <p className="text-muted">If we add analytics in future, this page will be updated to explain what is collected and how to opt out.</p>
    </div>
  );
}
