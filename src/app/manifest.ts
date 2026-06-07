import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Perth Bible Church",
    short_name: "Perth Bible",
    description:
      "Perth Bible Church in Amsterdam, New York exists to love God absolutely and love others sacrificially.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fbfd",
    theme_color: "#11295c",
    icons: [
      { src: "/church/favicon.png", sizes: "512x512", type: "image/png" },
      {
        src: "/church/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
