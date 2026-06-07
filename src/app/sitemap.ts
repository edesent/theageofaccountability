import type { MetadataRoute } from "next";
import { PAGE_SLUGS, SITE_URL } from "@/lib/church";

const LAST_MODIFIED = new Date("2026-06-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PAGE_SLUGS.filter((slug) => slug !== "home").map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: slug === "imnew" || slug === "who-we-are" ? 0.9 : 0.7,
    })),
  ];
}
