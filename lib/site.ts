// Single source of truth for business details — edit here and it flows
// through the page, metadata, JSON-LD, sitemap and footer.
export const site = {
  name: "Al-Makkawi Hajj & Umrah Travel",
  shortName: "Al-Makkawi Travel",
  url: "https://www.almakkawitravel.com",
  description:
    "ATOL-protected Hajj and Umrah packages from Birmingham, UK. Guided pilgrimages to Makkah and Madinah, plus heritage tours to Al-Aqsa, Turkey, Spain, Egypt, Morocco, Dubai and Bosnia.",
  director: "Dr Mohammad Arif Almakkawi",
  phone: "0121 753 0378",
  phoneHref: "tel:+441217530378",
  mobile: "07939 034 162",
  mobileHref: "tel:+447939034162",
  email: "info@almakkawitravel.com",
  address: {
    street: "380 Green Lane",
    locality: "Small Heath",
    city: "Birmingham",
    postcode: "B9 5DT",
    country: "GB",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=380+Green+Lane+Small+Heath+Birmingham+B9+5DT",
  hours: [
    { days: "Monday to Friday", time: "10:00am to 4:00pm" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "https://www.facebook.com/almakkawitravel",
    twitter: "https://twitter.com/almakkawitravel",
    linkedin: "https://www.linkedin.com/company/almakkawitravel",
  },
} as const;

export const nav = [
  { label: "Hajj", href: "#hajj" },
  { label: "Umrah", href: "#umrah" },
  { label: "Tours", href: "#tours" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const faqs = [
  {
    q: "Are your Hajj and Umrah packages ATOL protected?",
    a: "Yes. All flights and flight-inclusive holidays we sell are financially protected by the ATOL scheme. You'll receive an ATOL Certificate when you book. Please keep it safe.",
  },
  {
    q: "When should I register my interest for Hajj?",
    a: "As early as possible. Hajj places are limited by quota each year, so registering early gives us the best chance to secure your preferred package, hotels and dates.",
  },
  {
    q: "Can you arrange Umrah outside of Ramadan and school holidays?",
    a: "Yes. We arrange Umrah throughout the year, including quieter off-peak dates, Ramadan departures and school-holiday trips for families.",
  },
  {
    q: "Which hotels do you use in Makkah and Madinah?",
    a: "We suggest hotels close to the Haramain to suit your budget and the comfort level you prefer. Call or visit the office and we'll talk you through the current options.",
  },
  {
    q: "Do you offer tours beyond Saudi Arabia?",
    a: "Yes. We run Islamic heritage tours to Al-Aqsa, Turkey, Spain, Egypt, Morocco, Dubai and Bosnia. Many can be combined with Umrah.",
  },
  {
    q: "Can I visit your office?",
    a: "Yes. Our office is at 380 Green Lane, Small Heath, Birmingham. We're open Monday to Friday, 10am to 4pm, and Saturdays by appointment. We recommend booking an appointment before visiting.",
  },
];
