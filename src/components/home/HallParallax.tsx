import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import HallMotion from "./HallMotion";

// area is sq.ft.; the bar under each chamber is drawn proportional to it.
const CHAMBERS = [
  { name: "Surya Hall", area: 960, guests: 250, use: "Board meetings & mid-sized events" },
  { name: "Yashodhara Hall", area: 975, guests: 65, use: "Workshops & smaller conferences" },

];

const MAX_AREA = Math.max(...CHAMBERS.map((c) => c.area));

export default function HallParallax() {
  return (
    <section id="hall" className="relative overflow-hidden bg-brick">
      <HallMotion />
      {/* Oversized outline word + soft gold glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-6 select-none font-light leading-none text-transparent [-webkit-text-stroke:1px_var(--luxury-gold)] opacity-20 text-[clamp(6rem,17vw,16rem)]"
        style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
      >
        Events
      </span>
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:px-12 lg:grid-cols-2 lg:gap-20 lg:px-24">
        {/* Content */}
        <div>
          <div className="reveal flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
              Events &amp; Celebrations
            </span>
          </div>
          <h2 className="luxury-section-title reveal d1 mt-5">Spaces Made for Every Occasion</h2>
          <p className="reveal d2 mt-6 max-w-xl font-light leading-[1.8]">
            From corporate seminars to grand weddings, every hall comes with
            projectors, PA systems and LED displays.
          </p>

          <ul className="mt-10 border-y border-white/10">
            {CHAMBERS.map((c, i) => (
              <li
                key={c.name}
                className={`hall-row reveal group relative border-b border-white/10 py-6 last:border-b-0 d${i + 1}`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className="hall-num text-4xl font-light leading-none md:text-5xl"
                    style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3
                        className="text-xl font-light tracking-wide transition-colors group-hover:text-gold md:text-2xl"
                        style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
                      >
                        {c.name}
                      </h3>
                      <span className="shrink-0 text-xs uppercase tracking-[0.25em] text-gold">
                        {c.guests} guests · {c.area.toLocaleString("en-US")} sq.ft.
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-light">{c.use}</p>
                    {/* Area bar, to scale */}
                    <div className="mt-3 h-[3px] w-full bg-white/10">
                      <div
                        className="hall-bar h-full bg-gold"
                        style={{ width: `${(c.area / MAX_AREA) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/meeting-events" className="luxury-btn group reveal d3 mt-10 w-fit">
            Explore More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Image with offset gold frame, parallax + floating capacity card */}
        <div className="hall-media reveal d1 relative mx-auto w-full max-w-xl pb-5 pr-5 lg:max-w-none">
          <div className="hall-frame pointer-events-none absolute bottom-0 right-0 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] border border-gold" />
          <div className="relative aspect-[4/5] overflow-hidden [clip-path:polygon(0_0,calc(100%-48px)_0,100%_48px,100%_100%,0_100%)]">
            <div data-parallax className="absolute inset-x-0 -inset-y-6 will-change-transform">
              <Image
                src="/hall3.jpg"
                alt="Event hall"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="hall-img object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
