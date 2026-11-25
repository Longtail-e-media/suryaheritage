"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, ExternalLink } from "lucide-react";

interface TestimonialData {
  id: string | number;
  name: string;
  title: string;
  via?: string;
  linksrc?: string;
  rating: number;
  image: string;
  content: string;
}

export default function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const syncScrollSnaps = () => setScrollSnaps(emblaApi.scrollSnapList());

    syncScrollSnaps();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", syncScrollSnaps);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", syncScrollSnaps);
    };
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream">
      <Quote
        className="pointer-events-none absolute right-10 top-16 hidden h-48 w-48 text-gold opacity-30 lg:block"
        strokeWidth={0.75}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-ember/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">

        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
              Guest Experiences
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="luxury-section-title mt-5 text-ink">
            What Our Guests <em className="text-(--color-red)">Say</em>
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-3 md:-mx-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] sm:flex-[0_0_85%] md:flex-[0_0_50%] min-w-0 px-3 md:px-4"
              >
                <div className="group relative h-full pb-4 pl-4 [--cut:polygon(8%_0,100%_0,100%_92%,92%_100%,0_100%,0_8%)]">
                <div className="pointer-events-none absolute bottom-0 left-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] bg-gold/70 transition-colors group-hover:bg-gold [clip-path:var(--cut)]" />
                <div className="relative flex h-full flex-col bg-white px-8 pb-8 pt-12 [clip-path:var(--cut)]">
                  <Quote className="absolute right-8 top-6 h-10 w-10 text-gold/40 transition group-hover:text-gold" strokeWidth={1.25} />

                  {/* Author row */}
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-(--color-red) text-gold font-serif text-lg">
                        {t.image ? (
                          // eslint-disable-next-line @next/next/no-img-element -- reviewer avatars come from arbitrary external hosts
                          <img
                            src={t.image}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{t.name?.charAt(0)?.toUpperCase()}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h6 className="truncate font-serif text-lg text-ink">
                            {t.name}
                          </h6>
                          {t.linksrc && (
                            <a
                              href={t.linksrc}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Read ${t.name}'s review${t.via ? ` on ${t.via}` : ""}`}
                              className="shrink-0 hover:text-gold-text transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        {t.title && (
                          <span className="text-xs tracking-wider uppercase">
                            {t.title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-0.5 shrink-0 pt-1 mt-4" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-gold"
                          fill={i < Math.round(t.rating ?? 5) ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="flex-1 line-clamp-6 font-light leading-relaxed text-ink/75">
                    {t.content?.replace(/<[^>]+>/g, "")}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-brick/10">
                    <span className="text-xs tracking-wider uppercase text-gold-text">
                      {t.via}
                    </span>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-6 bg-(--color-red)" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
