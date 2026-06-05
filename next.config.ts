import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The ebook source files live in /private (never in /public). They aren't
  // imported as modules, so Next's tracer can't see them — list them here so
  // they get bundled into the /api/download serverless function on Vercel.
  outputFileTracingIncludes: {
    "/api/download": ["./private/**/*"],
  },
};

export default nextConfig;
