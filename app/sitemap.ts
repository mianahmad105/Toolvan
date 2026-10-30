import type { MetadataRoute } from "next";
import { COMMON_SALARIES } from "@/lib/salaries";
import { SITE_URL, TOOLS, toolHref } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/tools", "/widgets", "/about", "/contact", "/privacy", "/gdpr", "/terms", "/cookies", "/salary",
    ...TOOLS.map((t) => toolHref(t.slug)),
    ...COMMON_SALARIES.map((a) => `/salary/${a}`),
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p}` }));
}
