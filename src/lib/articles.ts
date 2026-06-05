import fs from "node:fs";
import path from "node:path";

export type ArticleBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  source: string;
  wordCount: number;
  readingMinutes: number;
  blocks: ArticleBlock[];
};

const ARTICLES_DIR = path.join(process.cwd(), "articles");

function parseFrontMatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { metadata: {}, body: source };
  }

  const metadata = Object.fromEntries(
    match[1].split("\n").flatMap((line) => {
      const separator = line.indexOf(":");

      if (separator === -1) {
        return [];
      }

      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^"|"$/g, "");

      return [[key, value]];
    }),
  );

  return { metadata, body: match[2] };
}

function parseBlocks(body: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraph.join(" "),
    });
    paragraph = [];
  };

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ type: "heading", text: line.replace(/^##\s+/, "") });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function readArticle(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const { metadata, body } = parseFrontMatter(source);
  const text = body.replace(/^# .+$/m, "").trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: metadata.title ?? slug,
    excerpt: metadata.excerpt ?? "",
    status: metadata.status ?? "draft",
    source: metadata.source ?? "",
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
    blocks: parseBlocks(body),
  };
}

export function getAllArticles() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort()
    .map(readArticle);
}

export function getArticle(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}
