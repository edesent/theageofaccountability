import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/articles";

// Per-article social share image, generated at build time.
export const alt = "The Age of Accountability";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "The Age of Accountability";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#252821",
          color: "#fbf7ee",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c9a24b",
            fontFamily: "sans-serif",
            fontWeight: 700,
          }}
        >
          The Age of Accountability
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 64 : 78,
            lineHeight: 1.05,
            fontWeight: 600,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(251,247,238,0.72)",
            fontFamily: "sans-serif",
          }}
        >
          A study from the book by Jerry Boritzki
        </div>
      </div>
    ),
    { ...size },
  );
}
