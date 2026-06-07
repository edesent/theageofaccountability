import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import MobileNav from "@/components/MobileNav";
import {
  CONTACT,
  NAV_ITEMS,
  SERVICE_TIMES,
  SOCIAL_LINKS,
  type Card,
  type ChurchPage,
} from "@/lib/church";

function ExternalAwareLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ChurchShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky/20 bg-white/94 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Perth Bible Church home" className="shrink-0">
          <Image
            src="/church/logo.png"
            alt="Perth Bible Church"
            width={512}
            height={272}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="inline-flex min-h-10 items-center rounded-md px-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-deep transition hover:bg-mist hover:text-blue"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full w-64 translate-y-2 border border-sky/20 bg-white p-2 opacity-0 shadow-[0_20px_40px_rgba(17,41,92,0.14)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-ink/75 transition hover:bg-mist hover:text-deep"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link href="/imnew" className="button-primary">
            Plan a Visit
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <div>
          <Image
            src="/church/logo.png"
            alt="Perth Bible Church"
            width={512}
            height={272}
            className="h-16 w-auto brightness-125"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/78">
            Perth Bible Church exists to love God absolutely and love others
            sacrificially.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-sky/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-sky transition hover:bg-sky hover:text-deep"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <dl className="mt-4 grid gap-3 text-sm text-white/78">
            {SERVICE_TIMES.map((service) => (
              <div key={service.label} className="flex justify-between gap-4">
                <dt>{service.label}</dt>
                <dd className="font-bold text-white">{service.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="footer-heading">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-white/78">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-sky">
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phone}`} className="hover:text-sky">
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.maps}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky"
            >
              {CONTACT.address}
            </a>
            <p>Office Hours: Monday-Thursday, 8:00 AM-4:00 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue">
      {children}
    </p>
  );
}

function Hero({
  eyebrow,
  title,
  summary,
  image = "/church/hero.jpeg",
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,41,92,0.92),rgba(17,41,92,0.68)_44%,rgba(17,41,92,0.2))]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
      <div className="relative mx-auto grid min-h-[calc(88svh-81px)] max-w-7xl content-center px-5 py-20 sm:px-8 lg:min-h-[calc(86svh-81px)]">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88 sm:text-xl">
            {summary}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

function ServiceStrip() {
  return (
    <section className="relative z-10 -mt-11 px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-2 border border-sky/25 bg-white p-3 shadow-[0_18px_42px_rgba(17,41,92,0.14)] sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_TIMES.map((service) => (
          <div key={service.label} className="rounded-md bg-mist px-4 py-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue">
              {service.label}
            </p>
            <p className="mt-2 text-2xl font-black text-deep">{service.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <ChurchShell>
      <Hero
        eyebrow="Perth Bible Church"
        title="Welcome Home."
        summary="A church family in Amsterdam, New York seeking to love God absolutely and love others sacrificially."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/imnew" className="button-primary">
            Plan a Visit
          </Link>
          <Link href="/who-we-are" className="button-secondary">
            Who We Are
          </Link>
        </div>
      </Hero>
      <ServiceStrip />

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>All about Jesus</Eyebrow>
            <h2 className="section-title mt-4">A place for grace, truth, and real people.</h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-ink/75">
            <p>
              You will not be met with shame, guilt, or condemnation. Perth Bible
              is made up of imperfect people with every kind of story imaginable,
              gathered around the love, grace, and forgiveness Jesus gives.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Worship", "Discipleship", "Mission"].map((word) => (
                <div key={word} className="rounded-md border border-sky/25 bg-white px-4 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-deep">
                    {word}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Connect</Eyebrow>
              <h2 className="section-title mt-4">Ministries for every season.</h2>
            </div>
            <Link href="/connect" className="button-outline">
              View All Ministries
            </Link>
          </div>
          <CardGrid
            cards={[
              {
                title: "Children",
                text: "Safe Sunday and Wednesday environments for children to learn about Jesus.",
                href: "/children",
                image: "/church/children.jpeg",
              },
              {
                title: "Teens",
                text: "AliveYouth helps students grow in Scripture, friendship, and service.",
                href: "/aliveyouth",
                image: "/church/youth.jpeg",
              },
              {
                title: "Academy",
                text: "Perth Bible Christian Academy serves grades K3-12 with a biblical foundation.",
                href: "/pbca",
                image: "/church/im-new.jpg",
              },
            ]}
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Watch</Eyebrow>
            <h2 className="section-title mt-4">Recent sermons and media.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70">
              Stay connected with recent messages and browse sermons by series,
              topics, speakers, and Scripture.
            </p>
            <Link href="/watch" className="button-primary mt-7 inline-flex">
              Browse Sermons
            </Link>
          </div>
          <div className="overflow-hidden rounded-md border border-sky/25 bg-deep shadow-[0_22px_50px_rgba(17,41,92,0.18)]">
            <iframe
              src="https://subsplash.com/u/-BW3DWC/media/embed/d/*?"
              title="Perth Bible Church sermon player"
              className="aspect-video w-full"
              allow="clipboard-read; clipboard-write"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-deep section-pad text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Stay connected</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Get the app and follow along.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/75">
              The Perth Bible app brings sermons, events, giving, and updates
              into one place for the church family.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://subsplash.com/perthbiblechurch/app"
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Download the App
              </a>
              <Link href="/upcoming" className="button-on-dark">
                Upcoming Events
              </Link>
            </div>
          </div>
          <Image
            src="/church/app.png"
            alt="Perth Bible Church app screenshot"
            width={1220}
            height={915}
            className="w-full rounded-md border border-sky/25 object-cover"
          />
        </div>
      </section>
    </ChurchShell>
  );
}

export function GenericPage({ page }: { page: ChurchPage }) {
  return (
    <ChurchShell>
      <Hero
        eyebrow={page.eyebrow}
        title={page.title}
        summary={page.summary}
        image={page.heroImage}
      >
        {page.cta && (
          <ExternalAwareLink href={page.cta.href} className="button-primary">
            {page.cta.label}
          </ExternalAwareLink>
        )}
      </Hero>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h2 className="section-title mt-4">{page.title}</h2>
            {page.intro && (
              <p className="mt-5 text-base leading-7 text-ink/70">{page.intro}</p>
            )}
            {page.cta && (
              <div className="mt-8 rounded-md border border-sky/25 bg-white p-5">
                <p className="text-sm leading-6 text-ink/70">{page.cta.text}</p>
                <ExternalAwareLink
                  href={page.cta.href}
                  className="button-outline mt-5 inline-flex"
                >
                  {page.cta.label}
                </ExternalAwareLink>
              </div>
            )}
          </aside>
          <div className="grid gap-7">
            {page.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-md border border-sky/25 bg-white p-6 sm:p-8"
              >
                <h3 className="font-display text-3xl font-bold text-deep">
                  {section.title}
                </h3>
                {section.body && (
                  <p className="mt-4 text-base leading-8 text-ink/72">
                    {section.body}
                  </p>
                )}
                {section.items && (
                  <ul className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7 text-ink/72">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      {page.cards && page.cards.length > 0 && (
        <section className="bg-white section-pad">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Eyebrow>Explore</Eyebrow>
            <h2 className="section-title mt-4">More from this area.</h2>
            <CardGrid cards={page.cards} />
          </div>
        </section>
      )}
    </ChurchShell>
  );
}

function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <ExternalAwareLink
          key={`${card.title}-${card.href ?? ""}`}
          href={card.href ?? "#"}
          className="group overflow-hidden rounded-md border border-sky/25 bg-paper text-left transition hover:-translate-y-1 hover:border-sky hover:shadow-[0_18px_36px_rgba(17,41,92,0.14)]"
        >
          {card.image && (
            <div className="relative aspect-[16/10] overflow-hidden bg-deep">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-5">
            <h3 className="font-display text-2xl font-bold text-deep">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink/70">{card.text}</p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-blue">
              Open
            </p>
          </div>
        </ExternalAwareLink>
      ))}
    </div>
  );
}
