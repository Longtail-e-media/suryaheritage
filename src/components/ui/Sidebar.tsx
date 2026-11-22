"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, Phone, Mail } from "lucide-react";
import NavLink from "./NavLink";
import { NavItem } from "@/types";
import { usePathname } from "next/navigation";
import { contact } from "@/config/site";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menu: NavItem[];
  bookingHref?: string;
}

/** Full-screen menu that opens as a circular reveal from the toggle button. */
export default function Sidebar({
  isOpen,
  onClose,
  menu,
  bookingHref,
}: SidebarProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActiveLink = (link: string) =>
    pathname === link || (link !== "/" && pathname.startsWith(link));

  return (
    <div
      id="sidebar-menu"
      aria-hidden={!isOpen}
      style={{
        clipPath: isOpen
          ? "circle(150% at calc(100% - 3.5rem) 3rem)"
          : "circle(0% at calc(100% - 3.5rem) 3rem)",
      }}
      className={`fixed inset-0 z-[60] flex flex-col bg-brand-orange transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:flex-row ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Close button: two bars rotate into a cross */}
      <button
        onClick={onClose}
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        className="group absolute right-5 top-5 z-10 h-12 w-12 rounded-full border border-brand-base/40 text-brand-base transition-all duration-300 hover:cursor-pointer hover:bg-brand-base hover:text-brand-base sm:right-8 sm:top-6"
      >
        {[45, -45].map((deg) => (
          <span
            key={deg}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -ml-2.5 block h-[2px] w-5 bg-current transition-transform duration-500 delay-300"
            style={{
              transform: isOpen
                ? `rotate(${deg}deg)`
                : `translateY(${deg > 0 ? -4 : 4}px)`,
            }}
          />
        ))}
      </button>

      {/* Links */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-6 pb-10 pt-24 sm:px-12 lg:px-20 lg:pt-28">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-brand-base">
          Navigate
        </p>
        <ul>
          {menu?.map((item, index) => {
            const hasSub = !!item.subLinks?.length;
            const active =
              isActiveLink(item.link) ||
              !!item.subLinks?.some((s) => isActiveLink(s.link));
            const expanded = openDropdown === item.title;
            const submenuId = `submenu-${item.id}`;

            return (
              <li
                key={item.id}
                style={{
                  transitionDelay: isOpen ? `${350 + index * 70}ms` : "0ms",
                }}
                className={`border-b border-brand-base/15 transition-all duration-700 ease-out ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="group flex items-center gap-4 py-3 sm:gap-6">
                  <span
                    className={`w-8 text-xs tabular-nums transition-colors ${
                      active ? "text-brand-base" : "text-brand-base/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <NavLink
                    href={item.link}
                    linktype={item.linktype}
                    onClick={onClose}
                    className="min-w-0 flex-1"
                  >
                    <span
                      className={`inline-block font-display text-3xl transition-all duration-300 group-hover:translate-x-3 group-hover:text-brand-base sm:text-5xl ${
                        active ? "text-brand-base" : "text-brand-base/60"
                      }`}
                    >
                      {item.title}
                    </span>
                  </NavLink>
                  {hasSub ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(expanded ? null : item.title)
                      }
                      aria-expanded={expanded}
                      aria-controls={submenuId}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${item.title} submenu`}
                      tabIndex={isOpen ? 0 : -1}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-base/30 text-brand-base transition-all hover:cursor-pointer hover:bg-brand-base hover:text-brand-base"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-base opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  )}
                </div>

                {hasSub && (
                  <div
                    id={submenuId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      expanded
                        ? "grid-rows-[1fr] pb-4 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    {/* Sub links as pill chips */}
                    <div className="flex min-h-0 flex-wrap gap-2 overflow-hidden pl-12 sm:pl-14">
                      {item.subLinks!.map((sub) => (
                        <NavLink
                          key={sub.id}
                          href={sub.link}
                          linktype={sub.linktype}
                          onClick={onClose}
                          className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                            isActiveLink(sub.link)
                              ? "border-brand-base bg-brand-base text-brand-base"
                              : "border-brand-base/30 text-brand-base/80 hover:border-brand-base hover:bg-brand-base hover:text-brand-base"
                          }`}
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Contact panel */}
      <aside className="relative shrink-0 overflow-hidden bg-white/40 px-6 py-10 text-brand-base sm:px-12 lg:flex lg:w-[36%] lg:flex-col lg:justify-end lg:px-14 lg:py-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-base/10"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/30 blur-3xl"
        />
        <div className="relative">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-brand-base/70">
            Reservations
          </p>
          <p className="mb-8 font-display text-3xl leading-tight sm:text-4xl">
            Plan your stay with us.
          </p>
          {bookingHref && (
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className="group mb-10 inline-flex items-center gap-3 rounded-full bg-brand-base py-4 pl-7 pr-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-orange transition-all hover:-translate-y-0.5"
            >
              Book Now
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
          <div className="flex flex-col gap-4 text-sm text-brand-base/80">
            <a
              href={`tel:${contact.phoneE164.replace(/\s+/g, "")}`}
              tabIndex={isOpen ? 0 : -1}
              className="flex items-center gap-3 transition-colors hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-brand-base" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              tabIndex={isOpen ? 0 : -1}
              className="flex items-center gap-3 transition-colors hover:underline"
            >
              <Mail className="h-4 w-4 shrink-0 text-brand-base" />
              {contact.email}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
