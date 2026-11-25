import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGalleryImages } from "@/lib/data";

const MAX_ITEMS = 5;

export default async function HomeGallery() {
  const images = await getGalleryImages("Home Page");
  const items = images.filter((item: any) => item.image).slice(0, MAX_ITEMS);

  if (items.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--luxury-ivory)" }}
    >
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {/* Centered header with link on the right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="luxury-label text-gold-text mb-4">
              Visual Journey
            </div>
            <h2 className="luxury-section-title text-5xl! leading-[1.2]">
              Moments Captured in <span className="italic">Time</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="luxury-subtitle mb-5 text-base! font-normal! text-black leading-[1.9]">
              Explore our rooms, dining and event spaces through the details
              that make the property special.
            </p>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border-b border-black/40 pb-1 text-black/60 hover:text-black transition-colors"
            >
              View Full Gallery
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Staggered, swipeable strip */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible md:items-start">
          {items.map((item: any, idx: number) => (
            <Link
              key={item.id ?? idx}
              href="/gallery"
              className={`group relative shrink-0 snap-start w-[75%] sm:w-[45%] md:w-0 md:flex-1 ${
                idx % 2 ? "md:mt-14" : ""
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden luxury-img-zoom">
                <Image
                  src={item.image}
                  alt={item.title || "Hotel gallery"}
                  fill
                  sizes="(max-width: 768px) 75vw, 20vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
              <div className="mt-3 flex items-baseline gap-3 text-xs uppercase tracking-[0.2em] text-black/60">
                <span className="text-gold-text">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
