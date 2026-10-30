import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { AUTHOR_SLUG, SITE_URL, TOOLS, toolHref } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/tools", "/widgets", "/about", "/contact", "/privacy", "/gdpr", "/terms", "/cookies",
    "/editorial-policy", `/author/${AUTHOR_SLUG}`, "/after-tax", "/guides",
    ...TOOLS.map((t) => toolHref(t.slug)),
    // /after-tax/[amount] pages are noindex'd (templated, same figures as the After Tax hub table)
    // and deliberately excluded here so the sitemap only lists indexable URLs.
    ...GUIDES.map((g) => `/guides/${g.slug}`),
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p}` }));
}
