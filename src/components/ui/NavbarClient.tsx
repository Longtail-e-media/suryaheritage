"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Sidebar from "./Sidebar";
import { links } from "@/config/site";
import { usePathname } from "next/navigation";
import { getSiteRegulars } from "@/lib/data";

import { NavItem } from "@/types";
interface NavbarClientProps {
  menu: NavItem[];
  logoUrl?: string;
  children?: React.ReactNode;
}
const siteRegulars = await getSiteRegulars();
console.log(siteRegulars);
export default function NavbarClient({ menu, logoUrl, children }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll(); // sync on mount (scroll restoration / refresh mid-page)
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tone = isScrolled || pathname !== "/" ? "text-brand-base" : "text-white";
  const hidden = isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] py-1"
          : pathname === "/"
            ? "bg-gradient-to-b from-black/50 to-transparent py-4"
            : " py-3"
      }`}
    >
      {/* Logo on the left; booking + hamburger on the right */}
              <p
          className={`hidden ${ !isScrolled && "lg:block"}  text-white flex-1 px-6 text-center font-[family-name:var(--font-script),cursive] text-[18px] xl:text-[26px] ${tone} ${hidden} transition-opacity duration-200`}
        >
          Where Heritage Meets Comfort - Experience the Heart of Kathmandu.
        </p>

      <div className="container mx-auto flex items-center justify-between px-4">
        <div className={`flex items-center ${hidden} transition-opacity duration-200`}>
          <Link href="/" className="flex-shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteRegulars?.sitetitle ?? "logo"}
                width={200}
                loading="eager"
                height={200}
                className={`transition-all duration-300 object-contain w-auto ${
                  isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"
                }`}
              />
            ) : (
              <span className={`text-xl font-light tracking-[0.3em] uppercase ${tone}`}>
                {siteRegulars?.sitetitle ?? "Hotel"}
              </span>
            )}
          </Link>
        </div>

        {/* Brand message: hidden below lg where there's no room next to logo + buttons */}

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="book"
            target="_blank"
            tabIndex={isSidebarOpen ? -1 : 0}
            className={`group flex items-center gap-2 rounded-full bg-red py-3 pl-6 pr-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${hidden}`}
          >
            Book Now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            className={`group grid h-12 w-12 place-items-center rounded-full border border-current/30 backdrop-blur-sm transition-all duration-300 hover:border-brand-base hover:bg-brand-base hover:text-brand-orange hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${tone} ${hidden}`}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-menu"
            tabIndex={isSidebarOpen ? -1 : 0}
          >
            {/* Animated bars: staggered widths that swap on hover */}
            <span className="flex flex-col items-start gap-[5px]">
              <span className="block h-[2px] w-5 bg-current transition-all duration-300 group-hover:w-3" />
              <span className="block h-[2px] w-3 bg-current transition-all duration-300 group-hover:w-5" />
              <span className="block h-[2px] w-4 bg-current transition-all duration-300 group-hover:w-2" />
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menu={menu}
        bookingHref={siteRegulars?.booking_code ?? links.booking}
      />

      {children}
    </nav>
  );
}
