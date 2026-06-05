import type { MetadataRoute } from "next";

const SITE_URL = "https://theageofaccountability.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
