import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getAllArticles } from "@/lib/articles";
import { priceLabel } from "@/lib/ebook";
import {
  AMAZON_URL,
  ISBN,
  PAPERBACK_PRICE,
  PAPERBACK_PRICE_USD,
} from "@/lib/book";
import PurchaseButton from "@/components/PurchaseButton";
import MobileNav from "@/components/MobileNav";

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
      sameAs: ["https://www.facebook.com/jerry.boritzki"],
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
      publisher: { "@id": `${SITE_URL}/#author` },
      image: `${SITE_URL}/images/book-front.jpg`,
      abstract:
        "A biblical examination of the age of accountability — what Scripture teaches about young people, the love of God, and the moment a person becomes accountable for sin.",
      sameAs: AMAZON_URL,
      offers: {
        "@type": "Offer",
        name: "Paperback",
        url: AMAZON_URL,
        price: PAPERBACK_PRICE_USD.toFixed(2),
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
      "Knowing that Heaven is real, God’s grace is real, and Judah is in Heaven is how I make it through each day. Still sad, still missing him — but the peace I have from the Lord and His Word is ultimately what gets me through.",
    source: "A grieving parent",
  },
  {
    quote:
      "The wisest man I know, teaching on the age of accountability. I highly recommend you listen if you have children. It’s such an excellent study, and he has a book available if you’re interested.",
    source: "A listener",
  },
  {
    quote:
      "This could be the most important book any Christian has read in the past decade.",
    source: "Reader response",
  },
  {
    quote:
      "An excellent book addressing a topic that is rarely taught. An easy, brief read that helps us understand God’s wonderful grace toward man. It will help you love the God of the Bible even more than you do.",
    source: "Verified Amazon review",
  },
  {
    quote:
      "Very beautifully written, and an important topic that should be discussed in churches.",
    source: "Verified Amazon review",
  },
  {
    quote:
      "Boritzki does a great job illustrating the grace of God and reinforces everything with Scripture. A great book for anyone who wants to learn more about the love our Lord has for all of His children.",
    source: "Verified Amazon review",
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

const FAMILY_QUESTIONS = [
  {
    eyebrow: "When does it begin?",
    body: "When does a person become eternally accountable to God for their sins? We know David was confident that he would see his son again.",
  },
  {
    eyebrow: "What Heaven requires",
    body: "For an infant to be in Heaven, two things must be explained: their name must be written in the Lamb’s Book of Life, and no sin can be imputed against them.",
  },
  {
    eyebrow: "The child who never chose",
    body: "Most everyone agrees that an aborted baby, a child lost through miscarriage, or an infant has not reached the age of accountability. So when does a child become eternally accountable for their sin nature and their sins?",
  },
  {
    eyebrow: "What do you believe?",
    body: "At what age do you believe God will not take a child to Heaven if they die before exercising faith in Christ? What Scripture supports your belief?",
  },
];

// Short vertical clips on the subject. Files live in /public/videos
// (a .mp4 and matching .jpg poster per slug).
const SHORTS = [
  {
    slug: "teen-attitude",
    title: "Teen Attitude: What 17–19 Year Olds Really Think",
  },
  {
    slug: "my-journey",
    title: "My Journey: Sin, Salvation, and Forgiveness at 24",
  },
  {
    slug: "sin-of-ignorance",
    title: "The Sin of Ignorance: God’s View on Children",
  },
];

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
              The question
            </a>
            <a className="transition hover:text-brick" href="#quotes">
              Quotes
            </a>
            <a className="transition hover:text-brick" href="#preaching">
              Watch
            </a>
            <a className="transition hover:text-brick" href="#articles">
              Articles
            </a>
          </nav>
          <div className="hidden md:block">
            <PurchaseButton
              amazonUrl={AMAZON_URL}
              ebookPrice={priceLabel()}
              paperbackPrice={PAPERBACK_PRICE}
              isbn={ISBN}
              label="Buy book"
              className="min-h-10 px-5 py-2 text-xs"
            />
          </div>
          <MobileNav />
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
                <PurchaseButton
                  amazonUrl={AMAZON_URL}
                  ebookPrice={priceLabel()}
                  paperbackPrice={PAPERBACK_PRICE}
                  isbn={ISBN}
                />
                <a
                  href="#case"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-ivory/25 px-6 py-3 font-body text-sm font-semibold text-ivory transition hover:border-brass hover:text-brass"
                >
                  Explore the doctrine
                </a>
              </div>
              <p className="mt-4 font-body text-sm text-ivory/70">
                Available in paperback from Amazon.
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
                What if the &ldquo;age of accountability&rdquo; isn&rsquo;t a
                mystery &mdash; but a doctrine written plainly throughout the
                Bible?
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

        <section className="bg-ink text-ivory">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="max-w-3xl">
              <p className="font-body text-sm font-semibold uppercase text-brass">
                For young families
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                One of the most important doctrines for young families &mdash;
                so why has it been so ignored?
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {FAMILY_QUESTIONS.map((q) => (
                <div
                  key={q.eyebrow}
                  className="flex flex-col rounded-2xl border border-ivory/15 bg-ivory/[0.04] p-7 transition duration-200 hover:border-brass/45"
                >
                  <p className="font-body text-xs font-bold uppercase tracking-wide text-brass">
                    {q.eyebrow}
                  </p>
                  <p className="mt-3 font-body text-lg leading-relaxed text-ivory/85">
                    {q.body}
                  </p>
                  <p className="mt-5 font-display text-2xl font-semibold text-ivory">
                    What does the Bible say?
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="quotes" className="bg-ivory">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Quotes</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                What readers are saying.
              </h2>
            </div>

            <figure className="mx-auto mt-12 max-w-3xl text-center">
              <blockquote className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                &ldquo;A must-read for every Christian parent. It brings relief
                to parents currently raising children, comfort to those who have
                lost a child, and hope for everyone. The truths in this book
                help every reader better understand the love of God.&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-body text-sm font-bold uppercase tracking-wide text-brick">
                One reader ordered fifty more &mdash; a copy for every pastor
                and Bible college they knew
              </figcaption>
            </figure>

            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 lg:grid-cols-3">
              {QUOTES.map((item) => (
                <figure key={item.quote} className="min-w-0 bg-paper p-7 sm:p-8">
                  <blockquote className="font-display text-2xl font-semibold leading-snug text-ink">
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

        <section id="preaching" className="bg-ivory">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
            <div className="max-w-3xl">
              <SectionLabel>Watch</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Quick answers to common questions.
              </h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
                Brief clips on the age of accountability — what young people
                really think, one believer’s testimony, and how God views
                children.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {SHORTS.map((short) => (
                <figure key={short.slug} className="mx-auto w-full max-w-sm">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-[0_22px_54px_rgba(42,39,34,0.18)] ring-1 ring-ink/10">
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      poster={`/videos/${short.slug}.jpg`}
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source
                        src={`/videos/${short.slug}.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <figcaption className="mt-4 font-display text-xl font-semibold leading-tight text-ink">
                    {short.title}
                  </figcaption>
                </figure>
              ))}
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
              <div className="mt-8 max-w-xs">
                <Image
                  src="/images/author.jpg"
                  alt="Jerry Boritzki, author of The Age of Accountability"
                  width={900}
                  height={900}
                  className="w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(42,39,34,0.18)] ring-1 ring-ink/10"
                />
                <p className="mt-3 font-body text-sm text-ink-soft/80">
                  Jerry Boritzki
                </p>
              </div>
            </div>
            <div className="min-w-0 max-w-3xl">
              <figure className="border-l-2 border-brick/40 pl-6">
                <figcaption className="font-body text-xs font-bold uppercase text-brick">
                  A message from the author
                </figcaption>
                <blockquote className="mt-4 space-y-4 font-display text-2xl leading-snug text-ink">
                  <p>
                    The book I wrote brings up and answers a number of
                    questions. One unique question concerns the Book of Life.
                    Only those whose names are written in the Book of Life can
                    enter Heaven. Most believe that all infants go to Heaven
                    &mdash; so if they do, their name must be in the Book. What
                    happens, then, when they never accept Christ?
                  </p>
                  <p>
                    Order and read the book that has been a burden on my heart
                    for so many years. It will improve your family, your church,
                    and your understanding of the GRACE of God in so many ways
                    &mdash; and it will answer many other questions you may not
                    have had answers for in the past. Enjoy.
                  </p>
                </blockquote>
                <p className="mt-4 font-body text-sm font-semibold text-ink-soft">
                  &mdash; Jerry Boritzki
                </p>
              </figure>
              <p className="mt-8 font-body text-xl leading-relaxed text-ink-soft">
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
              <a
                href="https://www.facebook.com/jerry.boritzki"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-body text-base font-semibold text-brick underline-offset-4 transition hover:underline"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898v-2.892h2.54V9.797c0-2.507 1.493-3.892 3.777-3.892 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12Z" />
                </svg>
                Follow Jerry on Facebook
              </a>
            </div>
          </div>
        </section>

        <section className="bg-action text-ivory">
          <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 md:py-20">
            <p className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Let Scripture speak. Read the book carefully and prayerfully.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <PurchaseButton
                variant="inverse"
                amazonUrl={AMAZON_URL}
                ebookPrice={priceLabel()}
                paperbackPrice={PAPERBACK_PRICE}
                isbn={ISBN}
              />
              <p className="font-body text-xs font-semibold uppercase text-ivory/70">
                Paperback &middot; ISBN {ISBN}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-ivory/64">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
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
