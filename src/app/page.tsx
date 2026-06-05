import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { createCheckoutSession } from "@/app/actions";
import { getAllArticles } from "@/lib/articles";
import { priceLabel } from "@/lib/ebook";

const AMAZON_URL =
  "https://www.amazon.com/Age-Accountability-Jerry-Boritzki/dp/B0DN8962YR";

const SITE_URL = "https://www.theageofaccountability.com";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "The Age of Accountability",
      description:
        "A doctrine grounded in Scripture, not human reasoning — the official book site for The Age of Accountability by Jerry Boritzki.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Jerry Boritzki",
      jobTitle: "Author",
      description:
        "Author of The Age of Accountability, a self-published study built over two decades on what Scripture teaches about young people and the love of God.",
    },
    {
      "@type": "Book",
      "@id": `${SITE_URL}/#book`,
      name: "The Age of Accountability",
      url: `${SITE_URL}/`,
      author: { "@id": `${SITE_URL}/#author` },
      inLanguage: "en",
      isbn: "9798989480401",
      bookFormat: "https://schema.org/Paperback",
      datePublished: "2023-10-16",
      genre: "Religion & Spirituality",
      image: `${SITE_URL}/images/book-front.jpg`,
      abstract:
        "A biblical examination of the age of accountability — what Scripture teaches about young people, the love of God, and the moment a person becomes accountable for sin.",
      sameAs: AMAZON_URL,
      offers: {
        "@type": "Offer",
        url: AMAZON_URL,
        price: "12.95",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: "Amazon" },
      },
    },
  ],
};

const QUESTIONS = [
  "What is the significance of the age of accountability?",
  "What does the Old Testament teach about this subject?",
  "What does the New Testament teach on this subject?",
  "Does this doctrine impact the church's role in young people's lives?",
  "Should this doctrine affect how parents teach and train their children?",
  "When does the age of accountability begin for a person?",
];

const QUOTES = [
  {
    quote:
      "This could be the most important book any Christian has read in the past decade.",
    source: "Reader response",
  },
  {
    quote:
      "A small book with a large claim: Scripture has not been silent about young people.",
    source: "Study note",
  },
  {
    quote:
      "The doctrine is not merely academic. It reaches the church nursery, the Sunday school room, and the dinner table.",
    source: "From the argument",
  },
];

const AUDIENCE = [
  "Parents",
  "Pastors",
  "Sunday schools",
  "Bible colleges",
  "Seminaries",
  "Every believer",
];

function BuyButton({
  className = "",
  children = "Buy on Amazon",
  variant = "solid",
}: {
  className?: string;
  children?: ReactNode;
  variant?: "solid" | "inverse";
}) {
  const variantClasses =
    variant === "inverse"
      ? "bg-ivory text-action shadow-none hover:bg-ink hover:text-ivory"
      : "bg-action text-ivory shadow-[0_14px_34px_rgba(47,107,79,0.28)] hover:bg-ink";

  return (
    <a
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass ${variantClasses} ${className}`}
    >
      {children}
      <svg
        className="ml-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

function BuyEbookButton({
  className = "",
  children,
  variant = "solid",
}: {
  className?: string;
  children?: ReactNode;
  variant?: "solid" | "inverse";
}) {
  const variantClasses =
    variant === "inverse"
      ? "bg-ivory text-action shadow-none hover:bg-ink hover:text-ivory"
      : "bg-action text-ivory shadow-[0_14px_34px_rgba(47,107,79,0.28)] hover:bg-ink";

  // A Server Action creates the Stripe Checkout session and redirects, so no
  // secret keys or pricing logic ever reach the browser. Works without JS.
  return (
    <form action={createCheckoutSession} className="inline-flex">
      <button
        type="submit"
        className={`group inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass ${variantClasses} ${className}`}
      >
        {children ?? `Buy the ebook — ${priceLabel()}`}
        <svg
          className="ml-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-xs font-bold uppercase text-brick">
      {children}
    </p>
  );
}

export default function Home() {
  const articles = getAllArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <a href="#top" aria-label="The Age of Accountability — home">
            <Image
              src="/age-of-accountability.png"
              alt="The Age of Accountability"
              width={673}
              height={200}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </a>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 font-body text-sm font-semibold text-ink-soft md:flex"
          >
            <a className="transition hover:text-brick" href="#case">
              The case
            </a>
            <a className="transition hover:text-brick" href="#quotes">
              Quotes
            </a>
            <a className="transition hover:text-brick" href="#articles">
              Articles
            </a>
          </nav>
          <div className="hidden sm:block">
            <BuyEbookButton className="min-h-10 px-5 py-2 text-xs">
              Buy ebook
            </BuyEbookButton>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-ink text-ivory">
          <div className="absolute inset-0 slate-grid opacity-80" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ivory to-transparent" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-9 px-5 pb-14 pt-12 sm:px-8 sm:pb-18 md:gap-12 lg:min-h-[calc(90svh-73px)] lg:grid-cols-[1.04fr_0.96fr] lg:py-10">
            <div className="min-w-0 max-w-3xl">
              <p className="font-body text-sm font-semibold uppercase text-brass">
                Rooted in Scripture, not human reasoning
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-[3rem] font-semibold leading-[0.96] text-balance sm:text-[6.4rem] lg:text-[7.7rem]">
                The Age of Accountability
              </h1>
              <p className="mt-6 max-w-2xl font-display text-2xl font-medium leading-snug text-ivory/86 sm:text-3xl">
                What does Scripture truly teach about young people, the love of
                God, and the moment accountability begins?
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BuyEbookButton>Buy the ebook — {priceLabel()}</BuyEbookButton>
                <a
                  href="#case"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-ivory/25 px-6 py-3 font-body text-sm font-semibold text-ivory transition hover:border-brass hover:text-brass"
                >
                  Explore the doctrine
                </a>
              </div>
              <p className="mt-4 font-body text-sm text-ivory/70">
                Prefer paperback?{" "}
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brass underline-offset-4 hover:underline"
                >
                  Buy it on Amazon
                </a>
              </p>
              <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-ivory/16">
                <div className="py-4 pr-4">
                  <p className="font-display text-3xl font-semibold text-brass">
                    20+
                  </p>
                  <p className="mt-1 font-body text-xs font-semibold uppercase text-ivory/58">
                    years
                  </p>
                </div>
                <div className="border-x border-ivory/16 px-4 py-4">
                  <p className="font-display text-3xl font-semibold text-brass">
                    6
                  </p>
                  <p className="mt-1 font-body text-xs font-semibold uppercase text-ivory/58">
                    questions
                  </p>
                </div>
                <div className="py-4 pl-4">
                  <p className="font-display text-3xl font-semibold text-brass">
                    1
                  </p>
                  <p className="mt-1 font-body text-xs font-semibold uppercase text-ivory/58">
                    doctrine
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto flex w-full min-w-0 max-w-[31rem] items-center justify-center lg:justify-end">
              <div className="book-stage w-full">
                <div className="book-shadow" aria-hidden />
                <Image
                  src="/images/book-front.jpg"
                  alt="The Age of Accountability book cover"
                  width={331}
                  height={500}
                  priority
                  className="relative mx-auto w-[68%] max-w-[16rem] rounded-md shadow-[0_34px_90px_rgba(0,0,0,0.54)] ring-1 ring-white/15 sm:max-w-[22rem] lg:w-[74%]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:py-20">
            <div className="min-w-0">
              <SectionLabel>The book</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                A compact work with a very large question at its center.
              </h2>
            </div>
            <div className="grid min-w-0 gap-6 font-body text-lg leading-relaxed text-ink-soft sm:grid-cols-2">
              <p>
                Every Christian seems familiar with the phrase, but the author
                found that many pastors and professors could only give a vague
                definition when pressed.
              </p>
              <p>
                Jerry Boritzki spent more than two decades studying the subject
                and gathering the biblical case into a small, direct,
                self-published book.
              </p>
            </div>
          </div>
        </section>

        <section id="case" className="bg-paper border-y border-ink/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="min-w-0 max-w-xl">
                <SectionLabel>The case</SectionLabel>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                  The questions the book refuses to leave vague.
                </h2>
                <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                  The argument moves through Scripture, doctrine, and practical
                  ministry with one aim: to recover a clearer understanding of
                  how God views young people.
                </p>
              </div>

              <ol className="grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {QUESTIONS.map((question, index) => (
                  <li
                    key={question}
                    className="group min-h-36 bg-ivory p-6 transition duration-200 hover:bg-sage/16"
                  >
                    <p className="font-display text-4xl font-semibold text-brick">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-5 font-body text-base font-semibold leading-snug text-ink">
                      {question}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="quotes" className="bg-ivory">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Quotes</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Lines that carry the weight of the subject.
              </h2>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 lg:grid-cols-3">
              {QUOTES.map((item) => (
                <figure key={item.quote} className="min-w-0 bg-paper p-7 sm:p-8">
                  <blockquote className="font-display text-3xl font-semibold leading-tight text-ink">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 border-t border-ink/10 pt-4 font-body text-sm font-bold uppercase text-brick">
                    {item.source}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink text-ivory">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="order-2 min-w-0 lg:order-1">
              <Image
                src="/images/book-back.jpg"
                alt="Back cover of The Age of Accountability"
                width={800}
                height={1207}
                className="mx-auto w-full max-w-[21rem] rounded-md shadow-[0_34px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
              />
            </div>
            <div className="order-1 min-w-0 max-w-3xl lg:order-2">
              <p className="font-body text-sm font-semibold uppercase text-brass">
                The intended reader
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">
                Written for everyone who shapes a young life.
              </h2>
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ivory/72">
                If the doctrine is true, it belongs in classrooms, churches,
                family conversations, and the quiet work of discipleship.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {AUDIENCE.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ivory/18 px-4 py-2 font-body text-sm font-semibold text-ivory/82"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="min-w-0 max-w-2xl">
                <SectionLabel>Articles</SectionLabel>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                  Study notes for readers, teachers, and churches.
                </h2>
              </div>
              <p className="max-w-md font-body text-base leading-relaxed text-ink-soft">
                A starter collection for future essays, discussion guides, and
                excerpts connected to the book.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="min-h-72 rounded-lg border border-ink/10 bg-ivory p-7 transition duration-200 hover:-translate-y-1 hover:border-brick/35 hover:shadow-[0_22px_54px_rgba(42,39,34,0.1)]"
                >
                  <p className="font-body text-xs font-bold uppercase text-brick">
                    {article.readingMinutes} min read
                  </p>
                  <h3 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="transition hover:text-brick"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="mt-8 inline-flex font-body text-sm font-bold text-ink transition hover:text-brick"
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/articles"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 py-3 font-body text-sm font-semibold text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                View all articles
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-ivory">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="min-w-0">
              <SectionLabel>About the author</SectionLabel>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-ink">
                Jerry Boritzki
              </h2>
            </div>
            <div className="min-w-0 max-w-3xl">
              <p className="font-body text-xl leading-relaxed text-ink-soft">
                Jerry Boritzki spent over twenty years studying a doctrine the
                church has long overlooked. <em>The Age of Accountability</em>{" "}
                is his first release, a self-published work on a subject that,
                so far as he can find, no one has ever written on before.
              </p>
              <p className="mt-6 font-body text-xl leading-relaxed text-ink-soft">
                His prayer is simple: that the reader&rsquo;s understanding of
                God, the church&rsquo;s role in training young people, and the
                calling of parents would be greatly enhanced.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-action text-ivory">
          <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 md:py-20">
            <p className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Let Scripture speak. Read the book carefully and prayerfully.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <BuyEbookButton variant="inverse">
                  Buy the ebook — {priceLabel()}
                </BuyEbookButton>
                <BuyButton variant="inverse">Paperback on Amazon</BuyButton>
              </div>
              <p className="font-body text-xs font-semibold uppercase text-ivory/70">
                Paperback - ISBN 979-8-9894804-0-1
              </p>
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
