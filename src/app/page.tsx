import Image from "next/image";

const AMAZON_URL =
  "https://www.amazon.com/Age-Accountability-Jerry-Boritzki/dp/B0DN8962YR";

const QUESTIONS = [
  "What is the significance of the age of accountability?",
  "What does the Old Testament teach about this subject?",
  "What does the New Testament teach on this subject?",
  "Does this doctrine impact the church’s role in young people’s lives?",
  "Should this doctrine affect how parents teach and train their children?",
  "Most importantly… when does the age of accountability begin for a person?",
];

const AUDIENCE = [
  { label: "Seminaries", note: "A doctrine its scholars have left undefined." },
  { label: "Bible Colleges", note: "Questions professors couldn’t answer." },
  { label: "Churches", note: "How we shepherd our youngest members." },
  { label: "Sunday Schools", note: "What we teach the children in our care." },
  { label: "Parents", note: "How we raise and train our own." },
  { label: "Every Believer", note: "Seeing the love of God in a new way." },
];

function BuyButton({
  className = "",
  children = "Buy on Amazon",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-paper shadow-lg shadow-rose-deep/20 transition-all hover:bg-ink hover:shadow-xl hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="font-display text-xl font-semibold leading-none tracking-tight"
          >
            The Age of Accountability
          </a>
          <BuyButton className="hidden px-5 py-2.5 sm:inline-flex" />
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative overflow-hidden bg-chalk text-paper"
      >
        <div className="absolute inset-0 chalk-rule opacity-70" aria-hidden />
        <div className="absolute inset-0 chalk-grain" aria-hidden />
        <div
          className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-rose/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-[0.18em] text-paper/70">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" />
              A Lost Doctrine, Recovered
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The Age of
              <br />
              Accountability
            </h1>
            <p className="mt-5 font-body text-base text-paper/70">
              by{" "}
              <span className="font-semibold text-paper">Jerry Boritzki</span>
            </p>
            <p className="mt-7 max-w-md font-display text-2xl font-medium leading-snug text-paper/90">
              What does Scripture truly teach about young people &mdash; and
              when does God begin to hold us accountable?
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <BuyButton>Buy on Amazon &mdash; $12.95</BuyButton>
              <a
                href="#why"
                className="font-body text-sm font-medium text-paper/80 underline-offset-4 transition hover:text-paper hover:underline"
              >
                Why this book?
              </a>
            </div>
            <p className="mt-8 font-body text-xs uppercase tracking-[0.16em] text-paper/45">
              Paperback &middot; English &middot; Published Oct 16, 2023
            </p>
          </div>

          <div className="fade-up flex justify-center md:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-2xl bg-rose/15 blur-2xl"
                aria-hidden
              />
              <Image
                src="/images/book-front.jpg"
                alt="The Age of Accountability book cover"
                width={331}
                height={500}
                priority
                className="relative w-64 rounded-md shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:w-72 lg:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Endorsement quote */}
      <section className="bg-paper-warm">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <span className="font-display text-6xl leading-none text-rose">
            &ldquo;
          </span>
          <blockquote className="-mt-4 font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">
            This could be the most important book any Christian has read in the
            past decade.
          </blockquote>
          <p className="mt-6 font-body text-sm uppercase tracking-[0.16em] text-ink-soft">
            On a subject no one has ever written on &mdash; until now
          </p>
        </div>
      </section>

      {/* Why this book */}
      <section id="why" className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-rose-deep">
              Why this book?
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              An all-important missing link in our understanding of God.
            </h2>
            <div className="mt-6 space-y-4 font-body text-lg leading-relaxed text-ink-soft">
              <p>
                Every Christian seems familiar with the term &ldquo;age of
                accountability.&rdquo; Over many years, each pastor the author
                asked could offer only a vague definition. Bible college
                professors had no answers for questions like these:
              </p>
            </div>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {QUESTIONS.map((q, i) => (
              <li
                key={q}
                className="flex items-start gap-4 bg-paper p-6 transition-colors hover:bg-paper-warm"
              >
                <span className="mt-0.5 font-display text-2xl font-semibold leading-none text-rose">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-base leading-snug text-ink">
                  {q}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two decades feature */}
      <section className="bg-chalk text-paper">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-5 md:py-28">
          <div className="absolute inset-0 chalk-grain" aria-hidden />
          <div className="relative md:col-span-2">
            <Image
              src="/images/book-back.jpg"
              alt="Back cover of The Age of Accountability"
              width={597}
              height={900}
              className="mx-auto w-64 rounded-md shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:w-72"
            />
          </div>
          <div className="relative md:col-span-3">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-7xl font-semibold leading-none text-rose">
                20+
              </span>
              <span className="font-body text-sm uppercase tracking-[0.18em] text-paper/60">
                years in
                <br />
                the making
              </span>
            </div>
            <p className="mt-8 max-w-xl font-display text-2xl font-medium leading-snug text-paper/90">
              Though the book is small in size, the author has put over two
              decades into its creation.
            </p>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-paper/70">
              To say an understanding of this truth will be life-changing to the
              reader might be an understatement. If successful in spreading this
              biblical truth, this book should change the way we all see the
              world around us &mdash; and help us understand the love of God in
              a new and exciting way.
            </p>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-rose-deep">
              Where change should come
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Written for everyone who shapes a young life.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((a) => (
              <div key={a.label} className="bg-paper p-7">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {a.label}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  {a.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the author */}
      <section className="bg-paper-warm">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-rose-deep">
            About the Author
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink">
            Jerry Boritzki
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
            Jerry Boritzki spent over twenty years studying a doctrine the
            church has long overlooked. <em>The Age of Accountability</em> is
            his first release &mdash; a self-published work on a subject that,
            so far as he can find, no one has ever written on before. His prayer
            is simple: that the reader&rsquo;s understanding of God, the
            church&rsquo;s role in training young people, and the calling of
            parents would be greatly enhanced.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-chalk text-paper">
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="absolute inset-0 chalk-rule opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Recover the lost doctrine.
            </h2>
            <p className="mx-auto mt-5 max-w-md font-body text-lg leading-relaxed text-paper/70">
              Read it carefully and prayerfully, and consider the abundance of
              Scripture on how God views young people.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3">
              <BuyButton>Get the book on Amazon &mdash; $12.95</BuyButton>
              <p className="font-body text-xs uppercase tracking-[0.16em] text-paper/45">
                Paperback &middot; ISBN 979-8-9894804-0-1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chalk-deep text-paper/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="font-display text-lg text-paper/80">
            The Age of Accountability
          </p>
          <p className="font-body text-xs">
            &copy; {new Date().getFullYear()} Jerry Boritzki. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
