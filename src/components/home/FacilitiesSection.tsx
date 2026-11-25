import Image from "next/image";
import { FACILITIES_HEADER } from "@/data/data";
import { getServices } from "@/lib/data";

export default async function FacilitiesSection() {
  const header = FACILITIES_HEADER;
  const service = await getServices(1);
  const facilities = service?.[0]?.items?.slice(0, 8) ?? [];

  if (facilities.length === 0) return null;

  return (
    <section className="">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center animate-fade-in-up">
          <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
            {header.label}
          </span>
          <h2 className="luxury-section-title mt-5 text-ink">
            Hospitality <em className="text-(--color-red)">Highlights</em>
          </h2>
        </div>

        {/* No boxes: hairline rules between cells, outlined gold icon, quiet label. */}
        <div className="grid grid-cols-2 border-l border-t border-ink/10 lg:grid-cols-4">
          {facilities.map((facility: any, idx: number) => {
            const image = facility.gallery_images?.[0];

            return (
              <div
                key={idx}
                className="group flex animate-fade-in-up flex-col items-center gap-5 border-b border-r border-ink/10 px-4 py-10 text-center transition-colors duration-500 hover:bg-cream md:py-14"
                style={{ animationDelay: `${0.06 * idx}s` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 text-2xl text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-white">
                  {facility.icon ? (
                    <i className={facility.icon} />
                  ) : image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.title || facility.title || ""}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  ) : null}
                </div>
                <div
                  className="text-xs font-medium uppercase tracking-[.2em] text-ink md:text-sm"
                  dangerouslySetInnerHTML={{ __html: facility.title || "" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
