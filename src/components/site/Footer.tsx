import { MapPin, Phone, MessageCircle, Facebook, Instagram } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "About Experience", href: "#about" },
  { label: "Digital Menu", href: "#menu" },
  { label: "Coffee & Lounge", href: "#coffee" },
  { label: "Photo Gallery", href: "#gallery" },
  { label: "Reserve Table", href: "#reservation" },
  { label: "Location & Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#080605] text-[#cfc5b6] border-t border-[#dfb76c]/15">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* ── Brand Column with Official 3D Logo Emblem ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Logo3DEmblem size="footer" enableMouseParallax={false} />
            <div>
              <span className="font-display text-xl font-bold tracking-wider text-[#f7f2ea] uppercase block leading-tight">
                Get To Gether
              </span>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#dfb76c] block mt-0.5">
                Restaurant &bull; Gurdaspur
              </span>
            </div>
          </div>

          <p className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#dfb76c]">
            Authentic Dining &bull; Cafe Lounge &bull; Charcoal Tandoor
          </p>

          <p className="max-w-xs text-xs leading-relaxed text-[#bdae9c] font-light">
            &ldquo;{DAWAT_INFO.tagline}&rdquo; <br />
            Gurdaspur&apos;s premier culinary destination on Tibri Road. Slow-simmered Punjabi
            curries, charcoal-roasted tandoori specialties, artisanal coffees, and celebrations.
          </p>
        </div>

        {/* ── Visit & Contact ── */}
        <div>
          <h4 className="text-[11px] font-mono font-bold tracking-[0.28em] uppercase text-[#dfb76c] mb-5">
            VISIT US
          </h4>
          <address className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#cfc5b6] not-italic font-light">
            <p className="flex items-start gap-2.5">
              <MapPin className="size-4 text-[#dfb76c] shrink-0 mt-0.5" />
              <span>{DAWAT_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2.5 pt-1">
              <Phone className="size-4 text-[#dfb76c] shrink-0" />
              <a href={DAWAT_INFO.phoneHref} className="hover:text-[#dfb76c] transition font-mono">
                {DAWAT_INFO.phoneDisplay}
              </a>
            </p>
            <p className="text-[#a89782] text-xs pl-6">
              Landline:{" "}
              <a href={DAWAT_INFO.landlineHref} className="hover:text-[#dfb76c] transition font-mono">
                {DAWAT_INFO.landlineDisplay}
              </a>
            </p>
            <p className="text-[#a89782] text-xs pl-6">Open Everyday: 10:00 AM – 11:00 PM</p>
          </address>
        </div>

        {/* ── Quick Navigation ── */}
        <div>
          <h4 className="text-[11px] font-mono font-bold tracking-[0.28em] uppercase text-[#dfb76c] mb-5">
            NAVIGATION
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#cfc5b6] font-light">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-[#dfb76c]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Social & Connect ── */}
        <div>
          <h4 className="text-[11px] font-mono font-bold tracking-[0.28em] uppercase text-[#dfb76c] mb-5">
            CONNECT WITH US
          </h4>
          <p className="text-xs text-[#bdae9c] leading-relaxed font-light mb-4">
            Connect via WhatsApp or visit our social channels for instant table reservations and
            special party bookings.
          </p>

          <div className="flex flex-col gap-2.5">
            {/* WhatsApp */}
            <a
              href={DAWAT_INFO.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition w-fit"
            >
              <MessageCircle className="size-3.5" />
              <span>WhatsApp ({DAWAT_INFO.whatsappDisplay})</span>
            </a>

            {/* Instagram */}
            <a
              href={DAWAT_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-pink-500/30 bg-pink-950/40 px-3.5 py-2 text-xs font-semibold text-pink-300 hover:bg-pink-900/50 transition w-fit"
            >
              <Instagram className="size-3.5" />
              <span>Instagram ({DAWAT_INFO.instagramHandle})</span>
            </a>

            {/* Facebook */}
            <a
              href={DAWAT_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-950/40 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-900/50 transition w-fit"
            >
              <Facebook className="size-3.5" />
              <span>Facebook ({DAWAT_INFO.facebookHandle})</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#dfb76c]/10 bg-black/60">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row items-center justify-between gap-3 px-5 py-6 text-xs text-[#8f8272] sm:px-8">
          <p>© {new Date().getFullYear()} Get To Gether Restaurant, Gurdaspur, Punjab. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#8f8272]">
            Official Brand &bull; Good Food &bull; Great Company
          </p>
        </div>
      </div>
    </footer>
  );
}
