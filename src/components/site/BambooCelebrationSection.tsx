import { useState } from "react";
import { Trees, PartyPopper, Calendar, ArrowUpRight, MessageCircle } from "lucide-react";
import { REAL_PHOTOS, DAWAT_INFO } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

export function BambooCelebrationSection() {
  const handlePlanCelebration = () => {
    const text = encodeURIComponent(
      `Hello Get To Gether Restaurant, I would like to plan a celebration / banquet gathering (Birthday / Anniversary / Reunion).`
    );
    window.open(`https://wa.me/${DAWAT_INFO.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* ── 12. BAMBOO GARDEN — AL-FRESCO MOMENTS ── */}
          <Reveal>
            <div
              id="bamboo-garden"
              className="group relative h-full overflow-hidden rounded-3xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-8 sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-[#D8B477] hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(184,137,82,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-[#B88952]/40 bg-[#17110C]/80 text-[#D8B477]">
                    <Trees className="size-4" />
                  </div>
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#D8B477]">
                    OUTDOOR TERRACE
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF9EF]">
                  AL-FRESCO MOMENTS
                </h3>
                <p className="mt-2 font-serif italic text-base sm:text-lg text-[#D8B477]">
                  &ldquo;Open-air dining under natural bamboo cane canopy.&rdquo;
                </p>

                {/* Real Bamboo Garden Photo with 3D Depth */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-[#B88952]/25 shadow-xl">
                  <img
                    src={REAL_PHOTOS.gurdaspurBambooGarden}
                    alt="Real Outdoor Bamboo Garden Terrace at Get To Gether Restaurant Gurdaspur"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17110C]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#D8B477] bg-[#17110C]/85 px-3 py-1 rounded-full border border-[#B88952]/30">
                      GURDASPUR TERRACE &bull; FRESH BREEZE
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light">
                  Dine beneath a rustic pergola framed by swaying bamboo stalks and glowing festoon
                  fairy lights. Enjoy the evening breeze while sharing hot charcoal tandoori platters
                  under the open night sky.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-[#B88952]/20 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-serif italic text-[#D3C4AF]">
                  Perfect for romantic dinners &amp; family evenings
                </span>
                <a
                  href="#reservation"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#B88952] px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#17110C] hover:bg-[#D8B477] transition-all hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <span>RESERVE TERRACE</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── 13. CELEBRATION / BANQUET — CELEBRATE TOGETHER ── */}
          <Reveal delay={150}>
            <div
              id="celebrations"
              className="group relative h-full overflow-hidden rounded-3xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-8 sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-[#D8B477] hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(184,137,82,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-[#B88952]/40 bg-[#17110C]/80 text-[#D8B477]">
                    <PartyPopper className="size-4" />
                  </div>
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#D8B477]">
                    BANQUET &amp; PRIVATE GATHERINGS
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF9EF]">
                  CELEBRATE TOGETHER
                </h3>
                <p className="mt-2 font-serif italic text-base sm:text-lg text-[#D8B477]">
                  &ldquo;Birthdays, anniversaries and unforgettable gatherings.&rdquo;
                </p>

                {/* Real Celebration Photo with 3D Depth */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-[#B88952]/25 shadow-xl">
                  <img
                    src={REAL_PHOTOS.celebrationParty}
                    alt="Real birthday party and festive celebration hall at Get To Gether Restaurant Gurdaspur"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17110C]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#D8B477] bg-[#17110C]/85 px-3 py-1 rounded-full border border-[#B88952]/30">
                      EXCLUSIVE PRIVATE HALL &bull; CUSTOM DECOR
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light">
                  Celebrate life&apos;s special milestones in our dedicated banquet hall. We provide
                  personalized balloon installations, custom seating arrangements, curated group
                  buffet menus, and attentive royal service.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-[#B88952]/20 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-serif italic text-[#D3C4AF]">
                  Hosting 10 to 60+ guests seamlessly
                </span>
                <button
                  type="button"
                  onClick={handlePlanCelebration}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#B88952] to-[#D8B477] px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-[#17110C] hover:scale-105 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <Calendar className="size-3.5" />
                  <span>PLAN YOUR CELEBRATION</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
