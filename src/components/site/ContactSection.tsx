import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Facebook, Instagram } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0E1110] py-24 sm:py-32 overflow-hidden border-t border-[#D6A84F]/15">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-10 size-[500px] rounded-full bg-[#D6A84F]/5 blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 size-[400px] rounded-full bg-[#18201C] blur-[140px] pointer-events-none"
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
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F5F1E8] leading-tight">
                    Get To Gether
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D6A84F]">
                    Restaurant &bull; Gurdaspur
                  </p>
                </div>
              </div>

              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
                    FIND &bull; CONNECT
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F1E8]">
                  Visit Get To Gether
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-3 text-xs sm:text-sm text-[#A9A59B] leading-relaxed font-light">
                  Conveniently situated on Tibri Road near Punjab Nursery in Gurdaspur, Punjab. Join
                  us for indoor dining, garden terrace, takeaway, or private parties.
                </p>
              </Reveal>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Address */}
              <Reveal delay={200}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#D6A84F]/20 bg-[#151A18]/90 backdrop-blur-md transition-all duration-300 hover:border-[#D6A84F]/45">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#D6A84F]/15 text-[#D6A84F]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D6A84F]">
                      Address
                    </h3>
                    <p className="mt-1 text-sm text-[#F5F1E8] font-medium leading-snug">
                      {DAWAT_INFO.address}
                    </p>
                    <a
                      href={DAWAT_INFO.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#D6A84F] hover:underline font-semibold"
                    >
                      <span>Get Driving Directions</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Phone Numbers */}
              <Reveal delay={260}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#D6A84F]/20 bg-[#151A18]/90 backdrop-blur-md transition-all duration-300 hover:border-[#D6A84F]/45">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#D6A84F]/15 text-[#D6A84F]">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D6A84F]">
                      Phone Inquiries
                    </h3>
                    <p className="mt-1 text-sm text-[#F5F1E8]">
                      Mobile:{" "}
                      <a href={DAWAT_INFO.phoneHref} className="hover:text-[#D6A84F] transition font-mono font-semibold">
                        {DAWAT_INFO.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-xs text-[#A9A59B] mt-0.5">
                      Landline:{" "}
                      <a href={DAWAT_INFO.landlineHref} className="hover:text-[#D6A84F] transition font-mono">
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
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-500/30 bg-[#151A18]/80 hover:bg-emerald-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md">
                      <MessageCircle className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                        WhatsApp
                      </p>
                      <p className="text-xs font-semibold text-[#F5F1E8] truncate font-mono">
                        {DAWAT_INFO.whatsappDisplay}
                      </p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={DAWAT_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-pink-500/30 bg-[#151A18]/80 hover:bg-pink-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-md">
                      <Instagram className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-400">
                        Instagram
                      </p>
                      <p className="text-xs font-semibold text-[#F5F1E8] truncate">
                        {DAWAT_INFO.instagramHandle}
                      </p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href={DAWAT_INFO.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-blue-500/30 bg-[#151A18]/80 hover:bg-blue-950/30 transition-all duration-300 group"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                      <Facebook className="size-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400">
                        Facebook
                      </p>
                      <p className="text-xs font-semibold text-[#F5F1E8] truncate">
                        {DAWAT_INFO.facebookHandle}
                      </p>
                    </div>
                  </a>
                </div>
              </Reveal>

              {/* Opening Hours */}
              <Reveal delay={380}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#D6A84F]/20 bg-[#151A18]/70">
                  <Clock className="size-4 text-[#D6A84F] shrink-0" />
                  <span className="text-xs text-[#A9A59B]">
                    <strong className="text-[#F5F1E8] font-medium">Opening Hours:</strong> {DAWAT_INFO.openingHours}
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
              <div className="relative size-full overflow-hidden rounded-2xl border border-[#D6A84F]/25 bg-[#0E1110] shadow-2xl min-h-[440px]">
                <iframe
                  title="Get To Gether Restaurant Gurdaspur Location Map"
                  src={DAWAT_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="size-full min-h-[440px] filter brightness-[0.85] contrast-[1.15] border-0"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-4 rounded-xl border border-[#D6A84F]/40 bg-[#151A18]/95 shadow-xl flex items-center justify-between sm:justify-start gap-4 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-bold text-[#F5F1E8] leading-tight">
                      {DAWAT_INFO.name}
                    </p>
                    <p className="text-[11px] text-[#D6A84F] font-mono">Tibri Road, Gurdaspur</p>
                  </div>
                  <a
                    href={DAWAT_INFO.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#D6A84F] text-[#0E1110] px-3.5 py-2 rounded-md hover:bg-[#F1D08A] transition shadow-md"
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
