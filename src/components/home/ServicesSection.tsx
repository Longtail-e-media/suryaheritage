import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  PartyPopper,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import { SERVICES_HEADER } from "@/data/data";
import { getServices } from "@/lib/data";

function getServiceIcon(item: { slug?: string; title?: string }) {
  const key = `${item.slug || ""} ${item.title || ""}`.toLowerCase();
  if (/dining|restaurant|food|cafe|bar/.test(key)) return Utensils;
  if (/event|meeting|conference|hall|banquet|wedding/.test(key))
    return PartyPopper;
  if (/pool|swim/.test(key)) return Waves;
  if (/room|suite|stay/.test(key)) return BedDouble;
  return Sparkles;
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  apos: "'",
  nbsp: " ",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const code =
        entity[1]?.toLowerCase() === "x"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return HTML_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function getFeaturePoints(text: string): string[] {
  return decodeHtmlEntities(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default async function ServicesSection() {
  const servicesData = (await getServices(2)) || [];
  const services = servicesData[0]?.items || [];
  const header = SERVICES_HEADER;

  if (services.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Single concierge-bell image anchored to the section's left edge, behind the content */}

      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-ember/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center animate-fade-in-up relative">
            <Image
        src="/service-bell.svg"
        alt=""
        aria-hidden
        width={112}
        height={90}
        unoptimized
        className="pointer-events-none absolute bottom-16 left-2 hidden lg:block"
      />
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
              {header.label}
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="luxury-section-title mt-5 text-ink">{header.title}</h2>
        </div>

        {/* Service Rows — alternating arched image / content */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {services?.map((item: any, idx: number) => {
            const imgSrc =
              item.gallery_images?.[0]?.src ||
              (Array.isArray(item.img) ? item.img[0] : item.img) ||
              item.image;
            const altText =
              item.gallery_images?.[0]?.title || item.title || "Service";
            const href = item.linksrc ?? "/";
            const description = (item.content_0 || item.description || "")
              .replace(/<\/?[^>]+>/g, "")
              .trim();
            const features = getFeaturePoints(description);
            const Icon = getServiceIcon(item);
            const reversed = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 animate-fade-in-up`}
                style={{ animationDelay: `${0.12 * idx}s` }}
              >
                {/* Chamfered image with offset gold plate (same as Rooms) */}
                <div className="w-full lg:w-1/2">
                  <div className="relative mx-auto max-w-xl pb-5 pl-5 [--cut:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)]">
                    <div className="pointer-events-none absolute bottom-0 left-0 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] bg-gold/70 [clip-path:var(--cut)]" />
                    <Link
                      href={href}
                      className="img-zoom group relative block h-[360px] overflow-hidden bg-brick [clip-path:var(--cut)] md:h-[480px]"
                    >
                      {imgSrc && (
                        <Image
                          src={imgSrc}
                          alt={altText}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brick/50 via-transparent to-transparent" />
                      <span className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brick text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
                      {String(idx + 1).padStart(2, "0")} — {item.sub_title}
                    </span>
                  </div>

                  <h3 className="luxury-section-title mb-6 text-ink" style={{ fontSize: "clamp(1.8rem, 3vw, 2.75rem)" }}>
                    {item.title}
                  </h3>

                  {features.length > 0 && (
                    <ul className="mb-8 space-y-3">
                      {features.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 rounded-2xl border border-brick/10 bg-white/60 px-5 py-4 text-base font-light leading-relaxed text-ink/75 transition hover:border-gold/60 hover:shadow-lg"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={href}
                    className="group inline-flex items-center gap-3 rounded-full bg-(--color-red) px-7 py-3.5 text-xs font-medium uppercase tracking-[.2em] text-white shadow-lg shadow-(--color-red)/30 transition hover:bg-ember"
                  >
                    Explore {item.title}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
