import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getAllArticles, getArticle } from "@/lib/articles";
import { priceLabel } from "@/lib/ebook";
import { AMAZON_URL, ISBN, PAPERBACK_PRICE } from "@/lib/book";
import PurchaseButton from "@/components/PurchaseButton";

const SITE_URL = "https://www.theageofaccountability.com";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const isPublished = article.status === "published";

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    // Drafts stay reachable but are kept out of the index until finished.
    robots: isPublished ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      siteName: "The Age of Accountability",
      authors: ["Jerry Boritzki"],
      section: "The Age of Accountability",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        url: articleUrl,
        inLanguage: "en-US",
        image: `${SITE_URL}/images/og.jpg`,
        wordCount: article.wordCount,
        articleSection: "The Age of Accountability",
        author: {
          "@type": "Person",
          name: "Jerry Boritzki",
          url: `${SITE_URL}/#author`,
        },
        publisher: { "@type": "Person", name: "Jerry Boritzki" },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
        about: { "@type": "Book", "@id": `${SITE_URL}/#book` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: `${SITE_URL}/articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <Link href="/" aria-label="The Age of Accountability - home">
            <Image
              src="/age-of-accountability.png"
              alt="The Age of Accountability"
              width={673}
              height={200}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/articles"
              className="hidden font-body text-sm font-semibold text-ink-soft transition hover:text-brick sm:inline"
            >
              All articles
            </Link>
            <PurchaseButton
              amazonUrl={AMAZON_URL}
              ebookPrice={priceLabel()}
              paperbackPrice={PAPERBACK_PRICE}
              isbn={ISBN}
              label="Buy book"
              className="min-h-10 px-5 py-2 text-xs"
            />
          </div>
        </div>
      </header>

      <main>
        <article>
          <section className="bg-ink text-ivory">
            <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
              <p className="font-body text-sm font-semibold uppercase text-brass">
                {article.readingMinutes} min read
              </p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-7xl">
                {article.title}
              </h1>
              <p className="mt-6 font-body text-xl leading-relaxed text-ivory/76">
                {article.excerpt}
              </p>
            </div>
          </section>

          <section className="bg-ivory">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
              <div className="font-body text-lg leading-relaxed text-ink-soft">
                {article.blocks.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={`${block.text}-${index}`}
                        className="mb-4 mt-12 font-display text-4xl font-semibold leading-tight text-ink first:mt-0"
                      >
                        {renderInline(block.text)}
                      </h2>
                    );
                  }

                  return (
                    <p key={index} className="mb-7">
                      {renderInline(block.text)}
                    </p>
                  );
                })}
              </div>

              <div className="mt-14 border-t border-ink/10 pt-8">
                <Link
                  href="/articles"
                  className="font-body text-sm font-semibold text-ink-soft underline-offset-4 transition hover:text-brick hover:underline"
                >
                  &larr; Back to all articles
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-ink text-ivory">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16">
              <div className="min-w-0">
                <p className="font-body text-sm font-semibold uppercase text-brass">
                  Keep reading
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  The full case is in the book.
                </h2>
                <p className="mt-3 font-body text-base leading-relaxed text-ivory/76">
                  Read the whole biblical argument in{" "}
                  <em>The Age of Accountability</em> &mdash; available as an
                  ebook or paperback.
                </p>
              </div>
              <div className="shrink-0">
                <PurchaseButton
                  variant="inverse"
                  amazonUrl={AMAZON_URL}
                  ebookPrice={priceLabel()}
                  paperbackPrice={PAPERBACK_PRICE}
                  isbn={ISBN}
                />
              </div>
            </div>
          </section>
        </article>
      </main>

      <footer className="bg-ink text-ivory/64">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Image
            src="/age-of-accountability.png"
            alt="The Age of Accountability"
            width={673}
            height={200}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="font-body text-sm">
            &copy; {new Date().getFullYear()} Jerry Boritzki. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
