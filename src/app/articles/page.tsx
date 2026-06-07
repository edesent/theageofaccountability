import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

const SITE_URL = "https://www.theageofaccountability.com";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Study notes and articles based on The Age of Accountability by Jerry Boritzki.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    type: "website",
    title: "Articles · The Age of Accountability",
    description:
      "Study notes and articles based on The Age of Accountability by Jerry Boritzki.",
    url: "/articles",
    siteName: "The Age of Accountability",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles · The Age of Accountability",
    description:
      "Study notes and articles based on The Age of Accountability by Jerry Boritzki.",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/articles#collection`,
        url: `${SITE_URL}/articles`,
        name: "Articles · The Age of Accountability",
        description:
          "Study notes and articles based on The Age of Accountability by Jerry Boritzki.",
        inLanguage: "en-US",
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
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
            href="/"
            className="font-body text-sm font-semibold text-ink-soft transition hover:text-brick"
          >
            Back to book
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-ink text-ivory">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
            <p className="font-body text-sm font-semibold uppercase text-brass">
              Articles
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-tight sm:text-7xl">
              Study notes from The Age of Accountability.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ivory/72">
              A growing collection of essays based on the book&apos;s central
              arguments about Scripture, young people, grace, and ministry.
            </p>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
            <div className="grid gap-5 lg:grid-cols-2">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="min-w-0 rounded-lg border border-ink/10 bg-ivory p-7 transition duration-200 hover:-translate-y-1 hover:border-brick/35 hover:shadow-[0_22px_54px_rgba(42,39,34,0.1)] sm:p-8"
                >
                  <p className="font-body text-xs font-bold uppercase text-brick">
                    {article.readingMinutes} min read
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="transition hover:text-brick"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-action px-5 py-2 font-body text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-ivory/64">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
