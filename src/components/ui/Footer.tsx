import {
  getMenuItems,
  getSiteRegulars,
  getSocialGroup,
  getVirtualTour,
} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "./Floating";
import Newsletter from "./Newsletter";
import { MapPin, Phone, Mail } from "lucide-react";

import visa from "@/assets/visa.png";
import mastercard from "@/assets/mastercard.png";
import amerciaexpress from "@/assets/americaexpress.png";
import fonepay from "@/assets/fonepage.png";

import { site, contact, address } from "@/config/site";

interface SocialLink {
  title?: string;
  url?: string;
  image?: string;
  icon?: string;
}

const cards = [visa, amerciaexpress, mastercard, fonepay];
const cardAlt = ["Visa", "American Express", "Mastercard", "Fonepay"];

export default async function Footer() {
  const [menuItems, siteRegulars, socialLinks, virtualTour] = await Promise.all([
    getMenuItems(2),
    getSiteRegulars(),
    getSocialGroup(1),
    getVirtualTour<any>(),
  ]);

  // The virtual tour endpoint returns [] (or an object with no scenes) until
  // the CMS has a tour configured — hide the floating 360° button in that case.
  const hasVirtualTour = Array.isArray(virtualTour)
    ? virtualTour.length > 0
    : !!virtualTour && Object.keys(virtualTour?.scenes || {}).length > 0;

  const brandName = siteRegulars?.sitetitle || site.name;
  const logoUrl = siteRegulars?.footer_logo_upload || "";
  const description = siteRegulars?.brief || site.description;

  // fetchAPI fails soft (→ null when the CMS is unreachable): never read
  // fields directly, fall back to config and never .split a missing value.
  const fiscalAddress = siteRegulars?.fiscal_address || address.full;
  const toList = (value?: string) =>
    (value ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const phoneNumbers = toList(siteRegulars?.contact_info || contact.phone);
  const emailAddresses = toList(siteRegulars?.email_address || contact.email);

  const label = "mb-4 flex items-center gap-2 border-b-2 border-orange pb-2 text-xs font-bold uppercase tracking-[.25em] text-neutral-900";

  return (
    <>
      <footer className=" text-neutral-900">
        {/* Dark feature bar: brand + newsletter + call button */}
        <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
          <div className="grid items-center gap-10 rounded-3xl  lg:grid-cols-12 ">
            <div className="lg:col-span-4">
              <Link href="/" className="mb-5 inline-block">
                {logoUrl && (
                  <Image src={logoUrl} alt={brandName} width={80} height={80} className="object-contain" />
                )}
              </Link>
              {description && (
                <p className="line-clamp-4 text-sm font-light leading-relaxed">{description}</p>
              )}
            </div>
            <div className="lg:col-span-5">
              <Newsletter />
            </div>
            {phoneNumbers[0] && (
              <div className="lg:col-span-3 lg:text-right">
                <a
                  href={`tel:${phoneNumbers[0].replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-3 rounded-full bg-red px-6 py-3 text-white font-semibold text-neutral-900 transition hover:bg-orange/55"
                >
                  <Phone className="h-5 w-5" />
                  {phoneNumbers[0]}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <h4 className={label}>Explore</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="group inline-flex items-center gap-2 font-medium transition-colors hover:text-orange"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange transition-transform group-hover:scale-150" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <h4 className={label}>Contact</h4>
            {fiscalAddress && (
              <p className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {fiscalAddress}
              </p>
            )}
            {phoneNumbers.length > 0 && (
              <div className="flex gap-3 text-sm">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {phoneNumbers.map((phone, i) => (
                    <span key={phone} className="flex gap-2">
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-orange">
                        {phone}
                      </a>
                      {i < phoneNumbers.length - 1 && <span aria-hidden="true">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {emailAddresses.length > 0 && (
              <div className="flex gap-3 text-sm">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="flex flex-col gap-1">
                  {emailAddresses.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="break-all hover:text-orange">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {socialLinks?.items?.length > 0 && (
            <div className="lg:col-span-3">
              <h4 className={label}>Follow us</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.items.map((item: SocialLink, index: number) => (
                  <a
                    key={index}
                    href={item?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item?.title || "Social media link"}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-orange  text-white transition hover:-translate-y-0.5 hover:bg-orange hover:text-white"
                  >
                    {item?.image ? (
                      <Image src={item.image} alt={item.title || ""} width={16} height={16} />
                    ) : (
                      <i className={`${item?.icon} text-sm`}></i>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-900/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm md:flex-row lg:px-10">
            <p>
              &copy; {new Date().getFullYear()} {brandName}. All Rights Reserved. Developed by{" "}
              <a
                href="https://longtail.info"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:text-orange"
              >
                Longtail e media
              </a>
              .
            </p>
            <div className="flex items-center gap-3">
              <span>We Accept</span>
              <div className="flex items-center gap-2">
                {cards.map((src, i) => (
                  <div key={cardAlt[i]} className="rounded-sm bg-white px-2 py-0.5">
                    <Image className="h-auto w-auto object-contain" src={src} alt={cardAlt[i]} width={32} height={32} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FloatingButtons whatsappNumber={siteRegulars?.whatsapp_a} hasVirtualTour={hasVirtualTour} />
    </>
  );
}
