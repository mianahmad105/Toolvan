import type { MetadataRoute } from "next";
import { SITE_URL, TOOLS, toolHref } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tools", "/widgets", "/about", "/contact", "/privacy", "/terms", "/cookies", ...TOOLS.map((t) => toolHref(t.slug))];
  return pages.map((p) => ({ url: `${SITE_URL}${p}` }));
}
