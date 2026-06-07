import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GenericPage } from "@/components/ChurchSite";
import { getPage, PAGE_SLUGS, SITE_URL } from "@/lib/church";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.summary,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | Perth Bible Church`,
      description: page.summary,
      url: `${SITE_URL}/${page.slug}`,
      images: [
        {
          url: page.heroImage ?? "/church/hero.jpeg",
          width: 1200,
          height: 800,
          alt: page.title,
        },
      ],
    },
  };
}

export default async function ChurchPage({ params }: { params: Params }) {
  const { slug } = await params;

  if (slug === "home") {
    redirect("/");
  }

  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return <GenericPage page={page} />;
}
