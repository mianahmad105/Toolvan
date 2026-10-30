import { ADSENSE_CLIENT_ID } from "@/lib/tools";

/** Required by Google AdSense once approved — set NEXT_PUBLIC_ADSENSE_CLIENT_ID to populate this. */
export function GET() {
  const pubId = ADSENSE_CLIENT_ID.replace(/^ca-/, "");
  const body = pubId ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n` : "";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
