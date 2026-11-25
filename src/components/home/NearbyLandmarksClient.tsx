"use client";

import { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Landmark } from "@/types";

interface NearbyLandmarksClientProps {
  landmarks: Landmark[];
}

/** `map_url` sometimes arrives as a bare embed src, sometimes as a whole
 * `<iframe src="...">` tag pasted into the CMS field — and some of those
 * are missing their closing quote, so don't require one to find the end. */
function extractMapSrc(mapUrl?: string): string | null {
  if (!mapUrl) return null;
  const match = mapUrl.match(/src=["']([^"'>]+)/i);
  return match ? match[1] : mapUrl;
}

export default function NearbyLandmarksClient({
  landmarks,
}: NearbyLandmarksClientProps) {
  const [activeTab, setActiveTab] = useState(landmarks[0]?.id || "");
  const activeIndex = Math.max(
    landmarks.findIndex((l) => l.id === activeTab),
    0,
  );
  const activeLandmark = landmarks[activeIndex];

  if (!activeLandmark) return null;

  const mapSrc = extractMapSrc(activeLandmark.map_url);

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Single pin anchored to the section's left edge, behind the content */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/map-pointer.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-2 hidden h-36 w-28 lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center animate-fade-in-up">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[.35em] text-gold">
              Explore The Area
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="luxury-section-title mt-5 text-ink">
            Nearby <em className="text-gold">Landmarks</em>
          </h2>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-ink/70">
            Everything worth seeing is only a short ride away — here&apos;s how
            close you really are.
          </p>
        </div>

        {/* Landmark selector: horizontal tabs, scrolls on small screens */}
        <div className="-mx-6 mb-8 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
          <div className="flex gap-3 ">
            {landmarks.map((landmark, idx) => {
              const active = landmark.id === activeLandmark.id;
              return (
                <button
                  key={landmark.id}
                  onClick={() => setActiveTab(landmark.id)}
                  aria-pressed={active}
                  className={`flex shrink-0 items-center gap-3 rounded-full border py-2.5 pr-5 pl-2.5 transition hover:cursor-pointer ${
                    active
                      ? "border-dark bg-brick shadow-lg shadow-brick/25"
                      : "border-dark/15 text-ink/75 hover:border-gold"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm ${active ? "bg-red text-white" : "bg-brick/5 text-gold"}`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap">
                    {landmark.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* One joined card: detail panel + map */}
        <div
          key={activeLandmark.id}
          className="animate-fade-in-up grid overflow-hidden rounded-3xl  shadow-2xl shadow-brick/15 lg:grid-cols-5"
        >
          <div className="flex flex-col justify-center bg-brick p-8  sm:p-10 lg:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
              <MapPin className="h-5 w-5" />
            </span>
            {activeLandmark.distance && (
              <p className="mt-8 font-serif text-5xl leading-none text-gold">
                {activeLandmark.distance}
              </p>
            )}
            <p className="mt-2 text-xs uppercase tracking-[.3em] ">
              From the hotel
            </p>
            <h3
              className="luxury-section-title mt-6 "
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)" }}
            >
              {activeLandmark.title}
            </h3>
            {activeLandmark.content && (
              <div
                className="mt-4 line-clamp-5 text-sm font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: activeLandmark.content }}
              />
            )}
            {mapSrc && (
              <a
                href={mapSrc}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[.2em] text-ink transition "
              >
                View on Map
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          <div className="relative min-h-[320px] bg-brick/10 lg:col-span-3 lg:min-h-[520px]">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google map of ${activeLandmark.title}`}
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center text-xs uppercase tracking-widest text-ink/50">
                Map unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
