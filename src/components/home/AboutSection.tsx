import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Building2, Dumbbell } from "lucide-react";
import { getHomeArticleById, getSiteRegulars } from "@/lib/data";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";
import { contact } from "@/config/site";
import AboutMotion from "./AboutMotion";

const HIGHLIGHTS = [
  { icon: BedDouble, label: "95 Rooms & Suites" },
  { icon: Building2, label: "3 Event Halls" },
  { icon: Dumbbell, label: "Wellness & Fitness" },
];

export default async function AboutSection() {
  const data = await getHomeArticleById(1);
  const siteRegulars = await getSiteRegulars();

  // CMS unreachable / block missing → skip the section instead of crashing.
  if (!data) return null;

  const phoneNumber = siteRegulars?.whatsapp_a || contact.phone;
  const featured = HIGHLIGHTS[0];

  return (
<section
  id="about"
  className="relative overflow-hidden bg-cream py-20 sm:py-28 before:pointer-events-none before:absolute before:bottom-0 before:right-0 before:h-64 before:w-64 before:bg-[url('/dhara.png')] before:bg-contain before:bg-top-right before:bg-no-repeat before:opacity-20 before:content-['']"
>
  <AboutMotion />
  <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-ember/10 blur-3xl" />
  <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
    {/* Image collage */}
    <div className="reveal lg:col-span-6">
      <div className="relative mx-auto max-w-xl pb-12 pr-6 sm:pr-10">
        {/* Arched hero image (Newari window shape) */}
        <div className="img-zoom relative overflow-hidden rounded-t-[999px] rounded-b-3xl bg-(--color-red) shadow-2xl ">
          <img
            src="https://www.suryaheritage.com/images/articles/OyNaE-hotel.jpg"
            alt="Surya Heritage Hotel, Thamel, Kathmandu"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brick/50 via-transparent to-transparent" />
        </div>
        {/* Gold offset frame */}
        <div className="pointer-events-none absolute -left-4 top-10 -z-10 h-[88%] w-[88%] rounded-t-[999px] rounded-b-3xl border border-gold/60" />
        {/* Small overlapping image */}
        <div className="img-zoom absolute -bottom-0 -right-0 w-40 overflow-hidden rounded-2xl border-[6px]  border-amber-50 shadow-xl sm:w-52">
          <img
            src="https://www.suryaheritage.com/images/slideshow/ik05H-Bar.jpg"
            alt="Rooftop bar at Surya Heritage"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        {/* Floating badge */}
        <div className="floaty absolute left-2 bottom-4 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-red) text-gold">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
              <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
            </svg>
          </div>
          <div>
            <p className="font-serif text-lg leading-none text-(--color-red)">
              4-Star Boutique
            </p>
            <p className="mt-1 text-xs text-ink/60">Thamel, Kathmandu</p>
          </div>
        </div>
      </div>
    </div>
    {/* Text */}
    <div className="lg:col-span-6">
      <div className="reveal flex items-center gap-4">
        <span className="h-px w-12 bg-gold" />
        <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
         {data.title}
        </span>
      </div>
      <h2 className="reveal d1 mt-5 font-serif text-4xl font-medium leading-tight text-ink lg:text-5xl mb-6">
        Where Newari <em className="text-red">tradition</em>
        <br className="hidden sm:block" /> meets modern comfort
      </h2>
            {data.content ? (
              <div dangerouslySetInnerHTML={{ __html: data.content }}/>
            ) : (
              <p>Content Not Available</p>
            )}
      {/* Feature pillars */}
      <div className="reveal d3 mt-10 grid gap-4 sm:grid-cols-3">
        <div className="group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg bg-white">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red transition  group-hover:text-gold">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6" />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-ink">Heritage Design</h3>
          <p className="mt-1 text-sm font-light text-ink/65">
            Authentic Newari character in every room.
          </p>
        </div>
        <div className="group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg bg-white">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red transition  group-hover:text-gold">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
              <circle cx={12} cy={12} r={3} />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-ink">Rooftop Views</h3>
          <p className="mt-1 text-sm font-light text-ink/65">
            360° over the Kathmandu valley.
          </p>
        </div>
        <div className="group rounded-2xl border p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg bg-white">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red transition  group-hover:text-gold">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
              <circle cx={12} cy={10} r="2.5" />
            </svg>
          </div>
          <h3 className="font-serif text-lg text-ink">Heart of Thamel</h3>
          <p className="mt-1 text-sm font-light text-ink/65">
            Walk to Durbar Square and Indra Chowk.
          </p>
        </div>
      </div>
      {/* CTAs */}
      <div className="reveal d3 mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/about-us"
          className="group inline-flex items-center gap-3 rounded-full bg-red px-7 py-3.5 text-xs font-medium uppercase tracking-[.2em] text-white shadow-lg shadow-(--color-red)/30 transition hover:bg-ember"
        >
          Explore Our Story
          <svg
            className="h-4 w-4 transition group-hover:translate-x-1"
            fill="none"
            stroke="white"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>

  </div>
  {/* Stats band */}
  <div className="relative mx-auto mt-20 max-w-7xl px-6 lg:px-10">
    <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-gold/30 shadow-xl lg:grid-cols-4">
      <div className="bg-[#f5eae7] px-6 py-9 text-center text-gold ">
        <p className="font-serif text-5xl">
          <span data-count={102}>102</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[.25em] text-cream/85">
          Rooms
        </p>
      </div>
      <div className="bg-[#f5eae7] px-6 py-9 text-center text-gold">
        <p className="font-serif text-5xl">
          <span data-count={3}>3</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[.25em] text-cream/85">
          Event Halls
        </p>
      </div>
      <div className="bg-[#f5eae7] px-6 py-9 text-center text-gold">
        <p className="font-serif text-5xl">
          <span data-count={3}>3</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[.25em] text-cream/85">
          Dining Venues
        </p>
      </div>
      <div className="bg-[#f5eae7] px-6 py-9 text-center text-gold">
        <p className="font-serif text-5xl">360°</p>
        <p className="mt-2 text-xs uppercase tracking-[.25em] text-cream/85">
          Rooftop on the 7th Floor
        </p>
      </div>
    </div>
    {/* Guest quote */}
    <figure className="reveal mx-auto mt-14 max-w-2xl text-center">
      <svg
        className="mx-auto h-8 w-8 text-gold"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9.5 6C6 7 4 9.6 4 13v5h6v-6H7c0-2 1-3 3-3.6zm9 0c-3.5 1-5.5 3.600-5.500 7v5h6v-6h-3c0-2 1-3 3-3.600z" />
      </svg>
      <blockquote className="mt-4 font-serif text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
        Excellent location with one of the best city views of entire Kathmandu
        Valley.
      </blockquote>
      <figcaption className="mt-4 text-xs uppercase tracking-[.25em] text-ink/50">
        Rezaul Karim R., India
      </figcaption>
    </figure>
  </div>
</section>

  );
}
