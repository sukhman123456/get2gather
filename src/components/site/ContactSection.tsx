import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Facebook, Instagram } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0a0806] py-24 sm:py-32 overflow-hidden border-t border-[#dfb76c]/15">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-10 size-[500px] rounded-full bg-[#dfb76c]/5 blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 size-[400px] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN: Official Logo & Contact Details
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Official 3D Logo Emblem & Branding */}
              <div className="flex items-center gap-4 mb-5">
                <Logo3DEmblem size="nav" enableMouseParallax={false} />
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#f7f2ea] leading-tight">
                    Get To Gether
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#dfb76c]">
                    Restaurant &bull; Gurdaspur
                  </p>
                </div>
              </div>

              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#dfb76c]/30 bg-[#dfb76c]/10 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#dfb76c]">
                    FIND &bull; CONNECT
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f7f2ea]">
                  Visit Get To Gether
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-xs sm:text-sm text-[#cfc5b6] leading-relaxed font-light">
                  Conveniently situated on Tibri Road near Punjab Nursery in Gurdaspur, Punjab. Join
                  us for indoor dining, garden terrace, takeaway, or private parties.
                </p>
              </Reveal>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Address */}
              <Reveal delay={200}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#dfb76c]/20 bg-[#14100c]/85 backdrop-blur-md transition-all duration-300 hover:border-[#dfb76c]/45">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dfb76c]/15 text-[#dfb76c]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#dfb76c]">
                      Address
                    </h3>
                    <p className="mt-1 text-sm text-[#f7f2ea] font-medium leading-snug">
                      {DAWAT_INFO.address}
                    </p>
                    <a
                      href={DAWAT_INFO.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#dfb76c] hover:underline font-semibold"
                    >
                      <span>Get Driving Directions</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Phone Numbers */}
              <Reveal delay={260}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#dfb76c]/20 bg-[#14100c]/85 backdrop-blur-md transition-all duration-300 hover:border-[#dfb76c]/45">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dfb76c]/15 text-[#dfb76c]">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#dfb76c]">
                      Phone Inquiries
                    </h3>
                    <p className="mt-1 text-sm text-[#f7f2ea]">
                      Mobile:{" "}
                      <a href={DAWAT_INFO.phoneHref} className="hover:text-[#dfb76c] transition font-mono font-semibold">
                        {DAWAT_INFO.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-xs text-[#bdae9c] mt-0.5">
                      Landline:{" "}
                      <a href={DAWAT_INFO.landlineHref} className="hover:text-[#dfb76c] transition font-mono">
                        {DAWAT_INFO.landlineDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* WhatsApp, Instagram & Facebook Channels */}
              <Reveal delay={320}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* WhatsApp */}
                  <a
                    href={DAWAT_INFO.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-500/30 bg-[#14100c]/80 hover:bg-emerald-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md">
                      <MessageCircle className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        WhatsApp
                      </p>
                      <p className="text-xs font-semibold text-[#f7f2ea] truncate font-mono">
                        {DAWAT_INFO.whatsappDisplay}
                      </p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={DAWAT_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-pink-500/30 bg-[#14100c]/80 hover:bg-pink-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-md">
                      <Instagram className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-400">
                        Instagram
                      </p>
                      <p className="text-xs font-semibold text-[#f7f2ea] truncate">
                        {DAWAT_INFO.instagramHandle}
                      </p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href={DAWAT_INFO.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-blue-500/30 bg-[#14100c]/80 hover:bg-blue-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                      <Facebook className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400">
                        Facebook
                      </p>
                      <p className="text-xs font-semibold text-[#f7f2ea] truncate">
                        {DAWAT_INFO.facebookHandle}
                      </p>
                    </div>
                  </a>
                </div>
              </Reveal>

              {/* Opening Hours */}
              <Reveal delay={380}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#dfb76c]/20 bg-[#14100c]/50">
                  <Clock className="size-4 text-[#dfb76c] shrink-0" />
                  <span className="text-xs text-[#cfc5b6]">
                    <strong className="text-[#f7f2ea] font-medium">Opening Hours:</strong> {DAWAT_INFO.openingHours}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Location Map
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 h-full min-h-[440px]">
            <Reveal delay={200} className="size-full">
              <div className="relative size-full overflow-hidden rounded-2xl border-2 border-[#dfb76c]/25 bg-black shadow-2xl min-h-[440px]">
                <iframe
                  title="Get To Gether Restaurant Gurdaspur Location Map"
                  src={DAWAT_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="size-full min-h-[440px] filter brightness-[0.85] contrast-[1.15] border-0"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-4 rounded-xl border border-[#dfb76c]/40 bg-[#0e0c0a]/95 shadow-xl flex items-center justify-between sm:justify-start gap-4 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-bold text-white leading-tight">
                      {DAWAT_INFO.name}
                    </p>
                    <p className="text-[11px] text-[#dfb76c] font-mono">Tibri Road, Gurdaspur</p>
                  </div>
                  <a
                    href={DAWAT_INFO.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#dfb76c] text-[#18120a] px-3.5 py-2 rounded-md hover:bg-[#ecd299] transition shadow-md"
                  >
                    <span>Directions</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
