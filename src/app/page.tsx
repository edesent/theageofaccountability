import { HomePage } from "@/components/ChurchSite";
import { CONTACT, SERVICE_TIMES, SITE_URL } from "@/lib/church";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Perth Bible Church",
  url: SITE_URL,
  logo: `${SITE_URL}/church/logo.png`,
  image: `${SITE_URL}/church/hero.jpeg`,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1863 County Hwy 107",
    addressLocality: "Amsterdam",
    addressRegion: "NY",
    postalCode: "12010",
    addressCountry: "US",
  },
  openingHoursSpecification: SERVICE_TIMES.map((service) => ({
    "@type": "OpeningHoursSpecification",
    name: service.label,
    description: service.time,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <HomePage />
    </>
  );
}
