/**
 * ============================================================================
 *  SITE CONFIG — the single source of truth for this property's identity.
 * ============================================================================
 */

export const SITE_URL =
  // process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoteldiamond.vercel.app/"
  ).replace(/\/$/, "");

/** Core brand identity. */
export const site = {
  name: "Surya Heritage Hotel Pvt. Ltd",
  shortName: "Surya Heritage Hotel",
  title: "Surya Heritage Hotel Pvt. Ltd | Thamel, Kathmandu, Nepal",
  description:
    "Discover a harmonious blend of tradition and modernity at Surya Heritage Hotel, a prestigious 4-star boutique in Kathmandu. Located just 1.5 km from historic Hanuman Dhoka, guests can explore heritage while enjoying serene rooms, elegant banquet halls, exquisite dining, and panoramic rooftop views.",
  keywords:
    "Surya Heritage Hotel, Kathmandu hotel, Thamel hotel, Hanuman Dhoka, boutique hotel Kathmandu, 4-star hotel Kathmandu, banquet hall Kathmandu",
  locale: "en",
  schemaType: ["Hotel", "LodgingBusiness"] as readonly string[],
} as const;

/** Contact channels. */
export const contact = {
  phone: "+977 1 4541113",
  phoneE164: "+97714541113",
  whatsapp: "+9779802369201",
  email: "info@suryaheritage.com",
} as const;

/** Physical location. */
export const address = {
  street: "Thamel-26, Gahitee, Kapurbot",
  locality: "Kathmandu",
  region: "Bagmati Province",
  postalCode: "44600",
  country: "NP",
  full: "Thamel-26, Gahitee, Kapurbot, Kathmandu, Nepal",
  geo: { latitude: 27.7154, longitude: 85.3123 }, // approximate Thamel coords
  mapUrl: "https://maps.app.goo.gl/yourhotelmaplink",
} as const;

/** Operational facts. */
export const business = {
  priceRange: "$$",
  currency: "NPR",
  starRating: 4,
  checkinTime: "14:00",
  checkoutTime: "12:00",
  numberOfRooms: 95,
  languages: ["English", "Nepali"],
  amenities: [
    "Swimming Pool",
    "Fitness Center",
    "Sauna & Steam",
    "Free WiFi",
    "Restaurant",
    "Coffee Shop",
    "Parking",
    "24-Hour Front Desk",
  ],
  aggregateRating: {
    ratingValue: "4.5",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
} as const;

/** Booking + social links. */
export const links = {
  booking:
    "https://www.mayurstay.com/parklandhotel/result.php?hotel_code=OGUhbL7",
  social: [
    "https://www.facebook.com/SuryaHeritage",
    "https://www.instagram.com/surya_heritage_hotel",
    "https://www.tiktok.com/@suryaheritagehotel",
  ] as string[],
} as const;

/**
 * Routes whose top banner has a background image/dark hero (navbar stays
 * light/transparent until scroll). Add a route here — e.g. "/about-us" —
 * whenever it grows a hero banner; anything not listed defaults to the
 * plain-white treatment (navbar text/icons black from the start), like
 * "/contact-us" which uses BreadcrumbNoBanner.
 * A listed path also matches its own sub-routes, so "/offers" covers
 * "/offers/summer-sale" too.
 */

/** CMS category IDs. */
export const CATEGORY_IDS = {
  rooms: "1",
  events: "3",
  restaurant: "2",
} as const;
