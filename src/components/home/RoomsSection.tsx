"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// TODO: replace with the real API response shape once the rooms endpoint is filled in.
interface RoomImage {
  src?: string;
  url?: string;
}

interface RoomAmenityFeature {
  img?: string;
  title?: string;
}

interface RoomAmenityGroup {
  items?: RoomAmenityFeature[];
}

interface RoomData {
  label?: string;
  title?: string;
  sub_title?: string;
  description?: string;
  slug?: string;
  gallery_images?: (string | RoomImage)[];
  img?: (string | RoomImage)[];
  amenities?: RoomAmenityGroup[];
}

function getImageSrc(image?: string | RoomImage): string | undefined {
  return typeof image === "string" ? image : image?.src || image?.url;
}

export default function RoomsSection({
  rooms,
  packageTitle,
}: {
  rooms: RoomData[] | null;
  packageTitle?: string;
}) {
  const packagename = packageTitle;
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: (rooms?.length ?? 0) > 1 },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (!rooms || rooms.length === 0) return null;

  const activeRoom = rooms[activeIndex] || rooms[0];
  const features = activeRoom.amenities?.[0]?.items?.slice(0, 6) || [];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-brick xt-white">
      {/* Layered backdrop: lattice pattern + warm glows */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-gold/15 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-ember/40 blur-[140px]" aria-hidden="true" />

      {/* Ghost numeral of the active room */}
      <span
        key={`n${activeIndex}`}
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 select-none font-serif text-[10rem] leading-none text-transparent opacity-60 md:text-[18rem] animate-fade-in-up [-webkit-text-stroke:1px_rgba(212,175,55,0.35)]"
      >
        {pad(activeIndex + 1)}
      </span>

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-12 lg:px-24 relative before:absolute before:bottom-0 before:right-0 before:h-80 before:w-80 before:bg-[url('/stupa.png')] before:bg-contain before:bg-bottom-right before:bg-no-repeat before:opacity-30 before:content-['']">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between animate-fade-in-up">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
                {activeRoom.label || "Your Comfort, Our Priority"}
              </span>
            </div>
            <h2 className="luxury-section-title mt-5">{packagename}</h2>
          </div>

          <Link
            href="/accommodations"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-xs uppercase tracking-[0.25em] transition-colors  md:inline-flex"
          >
            View All Rooms
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Arched carousel (Newari window shape) */}
          <div className="lg:col-span-6 animate-scale-in">
            <div className="relative mx-auto max-w-xl pl-5 pb-5 [--cut:polygon(14%_0,100%_0,100%_86%,86%_100%,0_100%,0_14%)]">
              {/* Offset gold plate in the same chamfered shape */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] bg-gold/70 [clip-path:var(--cut)]" />
              <div className="relative overflow-hidden [clip-path:var(--cut)]">
                <div className="aspect-[4/5] w-full overflow-hidden" ref={emblaRef}>
                  <div className="flex h-full">
                    {rooms.map((room: RoomData, index: number) => {
                      const src = getImageSrc(room.img?.[0]);
                      return (
                        <div key={room.slug || index} className="relative h-full min-w-0 flex-[0_0_100%]">
                          {src && (
                            <Image
                              src={src}
                              alt={room.title || `Room ${index + 1}`}
                              fill
                              priority={index === 0}
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brick/60 via-transparent to-transparent" />

                {rooms.length > 1 && (
                  <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3">
                    <button
                      onClick={() => emblaApi?.scrollPrev()}
                      aria-label="Previous room"
                      className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-brick"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => emblaApi?.scrollNext()}
                      aria-label="Next room"
                      className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-brick"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6">
            {/* Numbered room index: click to jump */}
            {rooms.length > 1 && (
              <ol className="mb-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 pb-5">
                {rooms.map((room: RoomData, i: number) => (
                  <li key={room.slug || i}>
                    <button
                      onClick={() => emblaApi?.scrollTo(i)}
                      aria-current={i === activeIndex}
                      className={`relative  text-xs uppercase tracking-[0.2em] transition-colors ${
                        i === activeIndex ? "text-black border-1 rounded-2xl px-3 py-2" : "text-black/30"
                      }`}
                    >
                      <span className="mr-2 font-serif text-sm">{pad(i + 1)}</span>
                      {room.title}
                      <span
                        className={`absolute inset-x-0 -bottom-[21px] h-px origin-left bg-gold transition-transform duration-500 ${
                          i === activeIndex ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ol>
            )}

            {/* key re-mounts the block so each room fades in fresh */}
            <div key={activeIndex} className="animate-fade-in-up">
              {activeRoom.title && (
                <h3
                  className="mb-5 text-3xl font-light tracking-wide md:text-5xl"
                  style={{ fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif" }}
                >
                  {activeRoom.title}
                </h3>
              )}
              <p className="mb-10 max-w-xl font-light leading-relaxed ">
                {(activeRoom.sub_title || activeRoom.description)?.replace(/<\/?p[^>]*>/g, "")}
              </p>

              {features.length > 0 && (
                <ul className="mb-10 flex flex-wrap gap-3">
                  {features.map((feature: RoomAmenityFeature, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-2 transition-colors duration-300 hover:border-gold hover:bg-gold/10"
                    >
                      {feature.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={feature.img}
                          alt=""
                          className="h-4 w-4 shrink-0 object-contain opacity-80 brightness-0 invert"
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      )}
                      <span className="text-sm font-light tracking-wid">{feature.title}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Link href={`/accommodations/${activeRoom.slug}`} className="luxury-btn group w-fit">
                  Explore Room
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/accommodations"
                  className="w-fit text-xs uppercase tracking-[0.25em] underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold md:hidden"
                >
                  View All Rooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
