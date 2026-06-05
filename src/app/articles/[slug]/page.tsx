import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getAllArticles, getArticle } from "@/lib/articles";

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

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
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
          <Link
            href="/articles"
            className="font-body text-sm font-semibold text-ink-soft transition hover:text-brick"
          >
            All articles
          </Link>
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
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-action px-5 py-2 font-body text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                >
                  Back to all articles
                </Link>
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
