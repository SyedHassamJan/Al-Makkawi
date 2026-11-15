import Image, { type StaticImageData } from "next/image";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import ToursSection from "@/components/ToursSection";
import RevealObserver from "@/components/RevealObserver";
import EnquiryForm from "@/components/EnquiryForm";
import { Logo } from "@/components/Logo";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/Icons";
import { faqs, nav, site } from "@/lib/site";
import makkah from "@/public/images/makkah-kaaba.jpg";
import madinah from "@/public/images/madinah-green-dome.jpg";
import domeOfTheRock from "@/public/images/dome-of-the-rock.jpg";

const destinations: {
  name: string;
  arabic: string;
  text: string;
  photo: StaticImageData;
  alt: string;
  focus?: string;
}[] = [
  {
    name: "Makkah",
    arabic: "مكة المكرمة",
    text: "Home of Masjid al-Haram and the Kaaba, where every Umrah begins.",
    photo: makkah,
    alt: "Pilgrims in white ihram on the marble courtyard before the Kaaba at Masjid al-Haram",
    focus: "50% 40%",
  },
  {
    name: "Madinah",
    arabic: "المدينة المنورة",
    text: "The City of the Prophet ﷺ and Masjid an-Nabawi.",
    photo: madinah,
    alt: "The Green Dome of Masjid an-Nabawi in Madinah beside a minaret in evening light",
    focus: "45% 60%",
  },
  {
    name: "Al-Aqsa",
    arabic: "المسجد الأقصى",
    text: "The third holiest site in Islam, visited on its own or alongside Umrah.",
    photo: domeOfTheRock,
    alt: "The Dome of the Rock in Jerusalem between olive trees",
  },
];

const steps = [
  { title: "Register your interest", text: "Tell us your dates and who is travelling." },
  { title: "Talk it through", text: "We call you back, or you visit the office." },
  { title: "Book with an ATOL Certificate", text: "Issued to you when your booking is confirmed." },
];

const umrahTimes = [
  { title: "Ramadan", text: "Departures during the blessed month." },
  { title: "School holidays", text: "Trips planned around term dates for families." },
  { title: "Quieter dates", text: "Off-peak travel through the rest of the year." },
  { title: "Umrah with Al-Aqsa", text: "Combine your Umrah with a visit to Jerusalem." },
];

const reasons = [
  { title: "ATOL protected", text: "Flight-inclusive bookings come with an ATOL Certificate." },
  { title: `Led by ${site.director}`, text: "Our director oversees the journeys we plan." },
  { title: "An office in Small Heath", text: "Talk your plans through face to face on Green Lane." },
  { title: "Planned around you", text: "Shaped around your budget, your dates and your family." },
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${site.url}/#agency`,
        name: site.name,
        url: site.url,
        image: `${site.url}/images/mecca-hero-poster.jpg`,
        email: site.email,
        telephone: "+441217530378",
        description: site.description,
        founder: { "@type": "Person", name: site.director },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: "West Midlands",
          postalCode: site.address.postcode,
          addressCountry: site.address.country,
        },
        areaServed: ["Birmingham", "West Midlands", "United Kingdom"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "16:00",
          },
        ],
        sameAs: Object.values(site.social),
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Hajj packages from the UK" } },
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Umrah packages from the UK" } },
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Al-Aqsa & Islamic heritage tours" } },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <RevealObserver />

      <main id="top">
        {/* ───────────── HERO: Poster, the owner's Kaaba film behind the headline ───────────── */}
        <section aria-labelledby="hero-title" className="on-field-deep relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <HeroVideo />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

          <div className="mx-auto w-full max-w-7xl px-5 pt-36 pb-28 sm:px-8 lg:pb-24">
            <h1 id="hero-title" className="hero-in max-w-[16ch]" style={i(0)}>
              <span lang="ar" dir="rtl" className="mb-4 block text-left font-outlier text-3xl font-normal tracking-normal sm:text-4xl">
                لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
              </span>
              Hajj and Umrah from Birmingham
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lead text-on-field-2" style={i(1)}>
              ATOL-protected pilgrimages, planned with you at our Small Heath office.
            </p>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={i(2)}>
              <a href="#contact" className="btn-primary">
                Register for Hajj 2027
              </a>
              <a href="#umrah" className="btn-quiet">
                Umrah enquiries
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── THE SACRED CITIES: grid of three ───────────── */}
        <section className="py-24 lg:py-36" aria-labelledby="dest-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 id="dest-title" className="lg:col-span-7">
                Makkah, Madinah and Al-Aqsa
              </h2>
              <p className="text-lead text-ink-2 lg:col-span-4 lg:col-start-9">
                We arrange flights, visas, hotels and transport between each city.
              </p>
            </div>

            <ul className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {destinations.map((d, n) => (
                <li key={d.name} className="reveal" style={i(n)}>
                  <div className="slow-zoom relative aspect-[4/5] overflow-hidden arch bg-field">
                    <Image
                      src={d.photo}
                      alt={d.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={d.focus ? { objectPosition: d.focus } : undefined}
                    />
                  </div>
                  <div className="mt-8 flex items-baseline justify-between gap-4">
                    <h3>{d.name}</h3>
                    <span lang="ar" dir="rtl" className="font-outlier text-xl text-accent-deep">
                      {d.arabic}
                    </span>
                  </div>
                  <p className="mt-2 text-ink-2">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── HAJJ: pine band, verse and the three booking steps ───────────── */}
        <section id="hajj" className="on-field py-24 lg:py-32" aria-labelledby="hajj-title">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-6">
              <h2 id="hajj-title">Register early for Hajj 2027</h2>
              <p className="mt-6 max-w-md text-lead text-on-field-2">
                Places are limited by quota each year, so register early.
              </p>
              <figure className="mt-12 border-l-2 border-accent pl-6">
                <blockquote>
                  <p className="font-display text-xl text-on-field">
                    &ldquo;And pilgrimage to the House is a duty owed to Allah by all who are able to make the
                    journey.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-sm text-accent-soft">Surah Āl ʿImrān 3:97</figcaption>
              </figure>
            </div>

            <div className="reveal lg:col-span-5 lg:col-start-8" style={i(1)}>
              <ol className="border-t border-on-field-rule">
                {steps.map((s, n) => (
                  <li key={s.title} className="grid grid-cols-[3rem_minmax(0,1fr)] border-b border-on-field-rule py-7">
                    <span className="font-display text-3xl text-accent-soft tabular-nums" aria-hidden="true">
                      {n + 1}
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="mt-2 text-on-field-2">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="#contact" className="btn-primary mt-10">
                Register your interest
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── UMRAH: head block beside four rows ───────────── */}
        <section id="umrah" className="py-24 lg:py-44" aria-labelledby="umrah-title">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-4">
              <h2 id="umrah-title">Umrah throughout the year</h2>
              <p className="mt-6 text-lead text-ink-2">
                Tailored to your dates and budget. Ask us for today&apos;s prices.
              </p>
              <a href="#contact" className="btn-primary mt-10">
                Ask for a quote
              </a>
            </div>
            <dl className="reveal border-t border-rule lg:col-span-7 lg:col-start-6" style={i(1)}>
              {umrahTimes.map((t) => (
                <div key={t.title} className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8">
                  <dt className="font-display text-title">{t.title}</dt>
                  <dd className="text-lead text-ink-2 sm:pt-1">{t.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────────── TOURS: band, background follows the card ───────────── */}
        <ToursSection />

        {/* ───────────── THE PROMISE: statement, then four reasons ───────────── */}
        <section id="why-us" className="py-24 lg:py-40" aria-labelledby="why-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="why-title" className="sr-only">
              Our promise
            </h2>
            <figure className="reveal">
              <blockquote>
                <p className="max-w-[26ch] font-display text-section leading-[1.1] font-medium tracking-tight">
                  To make your pilgrimage easier, more comfortable and within reach, so you can give it your whole
                  heart.
                </p>
              </blockquote>
              <figcaption className="mt-8 text-ink-2">
                <span className="font-semibold text-ink">{site.director}</span>, Director
              </figcaption>
            </figure>

            <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r, n) => (
                <li key={r.title} className="reveal border-t border-rule pt-6" style={i(n)}>
                  <h3>{r.title}</h3>
                  <p className="mt-3 text-ink-2">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── QUESTIONS: rows ───────────── */}
        <section id="faq" className="bg-paper-2 py-24 lg:py-32" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-4">
              <h2 id="faq-title">Before you travel</h2>
              <p className="mt-6 text-lead text-ink-2">
                Something else? Call{" "}
                <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-link underline underline-offset-4">
                  {site.phone}
                </a>
                .
              </p>
            </div>
            <div className="reveal border-t border-rule lg:col-span-7 lg:col-start-6" style={i(1)}>
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-rule [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-title">
                    {f.q}
                    <PlusIcon className="h-5 w-5 shrink-0 text-accent-deep transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pr-10 pb-6 text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── CONTACT: the enquiry, beside the office details ───────────── */}
        <section id="contact" className="on-field-deep py-24 lg:py-36" aria-labelledby="contact-title">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="reveal lg:col-span-5">
              <h2 id="contact-title">Register your interest</h2>
              <p className="mt-6 max-w-md text-lead text-on-field-2">
                Tell us your plans and we will come back with options.
              </p>

              <ul className="mt-12 space-y-6">
                <li className="flex gap-4">
                  <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-accent-soft" />
                  <div>
                    <a href={site.phoneHref} className="block text-lg font-semibold hover:text-accent-soft">
                      {site.phone}
                    </a>
                    <a href={site.mobileHref} className="block text-on-field-2 hover:text-accent-soft">
                      Mobile {site.mobile}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MailIcon className="mt-1 h-5 w-5 shrink-0 text-accent-soft" />
                  <a href={`mailto:${site.email}`} className="text-lg break-all hover:text-accent-soft">
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-4">
                  <PinIcon className="mt-1 h-5 w-5 shrink-0 text-accent-soft" />
                  <address className="text-on-field-2 not-italic">
                    {site.address.street}, {site.address.locality}
                    <br />
                    {site.address.city} {site.address.postcode}
                    <a
                      href={site.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-accent-soft underline underline-offset-4"
                    >
                      Get directions
                    </a>
                  </address>
                </li>
                <li className="flex gap-4">
                  <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-accent-soft" />
                  <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-1 text-sm">
                    {site.hours.map((h) => (
                      <div key={h.days} className="contents">
                        <dt className="text-on-field-2">{h.days}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              </ul>
            </div>

            <div className="reveal rounded-card bg-paper p-6 text-ink sm:p-10 lg:col-span-6 lg:col-start-7" style={i(1)}>
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── FOOTER: mast, the wordmark over the links, the ATOL notice ───────────── */}
      <footer className="on-field-deep border-t border-on-field-rule pt-16 pb-28 lg:pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <Logo />
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="whitespace-nowrap text-on-field-2 hover:text-accent-soft">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-3">
              {(
                [
                  ["Facebook", site.social.facebook, "M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8z"],
                  ["Twitter / X", site.social.twitter, "M4 4l16 16M20 4L4 20"],
                  ["LinkedIn", site.social.linkedin, "M6 9v11M6 5v.01M10 20v-6a3 3 0 016 0v6M10 9v11"],
                ] as const
              ).map(([label, href, d]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-on-field-rule transition-colors hover:border-accent hover:text-accent-soft"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <p className="mt-12 max-w-4xl border-t border-on-field-rule pt-6 text-sm text-on-field-2">
            <strong className="text-on-field">Financial protection:</strong> All the flights and flight-inclusive
            holidays on this website are financially protected by the ATOL scheme. When you pay you will be supplied
            with an ATOL Certificate. Please ask for it and check to ensure that everything you booked (flights, hotels
            and other services) is listed on it. Please see our booking conditions for further information.
          </p>

          <p className="mt-6 text-sm text-on-field-2">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>

      {/* Mobile quick-action bar */}
      <div className="on-field-deep fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full p-1.5 shadow-lg lg:hidden">
        <a href={site.phoneHref} className="btn flex-1 text-sm">
          <PhoneIcon className="h-4 w-4 text-accent-soft" /> Call us
        </a>
        <a href="#contact" className="btn-primary flex-1 text-sm">
          Enquire now
        </a>
      </div>
    </>
  );
}
