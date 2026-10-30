import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { SITE_URL, TOOLS, toolHref } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/tools", "/widgets", "/about", "/contact", "/privacy", "/gdpr", "/terms", "/cookies", "/salary", "/guides",
    ...TOOLS.map((t) => toolHref(t.slug)),
    // /salary/[amount] pages are noindex'd (templated, same figures as the Salary Calculator)
    // and deliberately excluded here so the sitemap only lists indexable URLs.
    ...GUIDES.map((g) => `/guides/${g.slug}`),
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p}` }));
}
