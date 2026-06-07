import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Age of Accountability",
    short_name: "Accountability",
    description:
      "A doctrine grounded in Scripture, not human reasoning — the book by Jerry Boritzki.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ee",
    theme_color: "#252821",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
