import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";

const SITE_URL = "https://www.theageofaccountability.com";
const LAST_MODIFIED = new Date("2026-06-05");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getPublishedArticles().map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
