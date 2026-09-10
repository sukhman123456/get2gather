import { useState, useRef } from "react";
import { Sparkles, Heart, Users, Coffee, Wine, PartyPopper, Compass, ArrowRight } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface AboutExperienceProps {
  onEnterSpace?: (zoneIndex: number) => void;
}

const experiencePillars = [
  {
    icon: Sparkles,
    title: "Dining Sanctuary",
    description: "Crafted with dark timber ceiling beams, intimate candlelight, and plush dining seating.",
    tag: "Aesthetic & Cozy",
    zoneIndex: 1,
  },
  {
    icon: Heart,
    title: "Mandala Wall Feature",
    description: "Handcrafted architectural centerpiece with multi-layered depth, brass rim, and spherical chandelier.",
    tag: "Architectural Marvel",
    zoneIndex: 2,
  },
  {
    icon: Coffee,
    title: "Artisanal Coffee Lounge",
    description: "Freshly frothed espresso, delicate steam, and chilled artisan brews for memorable conversations.",
    tag: "Cafe & Conversations",
    zoneIndex: 3,
  },
  {
    icon: Wine,
    title: "Live Charcoal Tandoor",
    description: "Authentic earthenware clay oven with glowing coals, fiery embers, and succulent kebabs.",
    tag: "Fire & Smoke",
    zoneIndex: 4,
  },
  {
    icon: Users,
    title: "Al-Fresco Bamboo Terrace",
    description: "Gentle breeze swaying natural bamboo stalks beneath warm evening festoon fairy lights.",
    tag: "Open-Air Garden",
    zoneIndex: 8,
  },
  {
    icon: PartyPopper,
    title: "Celebration Suite",
    description: "Festive private banquet space adorned with metallic balloons and custom celebration decor.",
    tag: "Banquet & Events",
    zoneIndex: 9,
  },
];

const virtualTourSpaces = [
  {
    number: "01",
    title: "ARTISANAL CAFE & COFFEE LOUNGE",
    description: "Exposed wood beams, glowing espresso bar, floating porcelain coffee cup & aromatic roasted beans.",
    image: REAL_PHOTOS.gurdaspurCafeCeiling,
    zoneIndex: 3,
  },
  {
    number: "02",
    title: "OUTDOOR BAMBOO GARDEN TERRACE",
    description: "Natural bamboo canopy, ambient fairy lights, open sky, and serene outdoor evening dining.",
    image: REAL_PHOTOS.gurdaspurBambooGarden,
    zoneIndex: 8,
  },
  {
    number: "03",
    title: "MANDALA FEATURE WALL DINING",
    description: "Intimate dining lounge framed by the monumental 3D sculpted mandala and brass spherical chandelier.",
    image: REAL_PHOTOS.gurdaspurMandalaWall,
    zoneIndex: 2,
  },
];

export function AboutExperience({ onEnterSpace }: AboutExperienceProps) {
  const [activeTourIndex, setActiveTourIndex] = useState<number | null>(null);

  const handleEnter = (zoneIndex: number) => {
    onEnterSpace?.(zoneIndex);
  };

  return (
    <section id="experience" className="relative isolate py-24 sm:py-32 overflow-hidden">
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B88952]/40 bg-[#2A1D14]/80 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(184,137,82,0.15)]">
              <Compass className="size-3.5 text-[#D8B477]" />
              <span className="text-[10.5px] font-sans font-bold tracking-[0.3em] text-[#D8B477] uppercase">
                THE 3D RESTAURANT EXPERIENCE
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9EF] leading-tight">
              A Warm Sanctuary of <span className="text-[#D8B477]">Flavour & Ambiance</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 font-serif italic text-lg sm:text-xl text-[#F3E8D2]/90">
              &ldquo;Step through our doors and into an atmosphere designed for unforgettable memories.&rdquo;
            </p>
          </Reveal>
        </div>

        {/* ── STEP INSIDE GET TO GETHER: 3 Interactive 3D Virtual Tour Portals ── */}
        <div className="mt-16 sm:mt-24">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#B88952]/25 pb-4 mb-8">
              <div>
                <span className="text-xs font-sans font-bold tracking-[0.35em] text-[#B88952] uppercase block mb-1">
                  INTERACTIVE 3D VIRTUAL TOUR
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF9EF]">
                  Step Inside Get To Gether
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#D3C4AF] mt-2 sm:mt-0 font-light">
                Hover to preview &bull; Click to glide 3D camera into the space
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {virtualTourSpaces.map((space, idx) => (
              <Reveal key={space.number} delay={150 * idx}>
                <div
                  onMouseEnter={() => {
                    setActiveTourIndex(idx);
                  }}
                  onMouseLeave={() => setActiveTourIndex(null)}
                  onClick={() => handleEnter(space.zoneIndex)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#D8B477] hover:bg-[#2A1D14] hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(184,137,82,0.3)] hover:-translate-y-2 flex flex-col justify-between min-h-[380px]"
                >
                  {/* Background Image Preview with Ambient Overlay */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="size-full object-cover filter brightness-[0.45] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-[0.6]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17110C] via-[#17110C]/60 to-transparent" />
                  </div>

                  {/* Top Bar: Number & Tag */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-[#D8B477]">
                      {space.number}
                    </span>
                    <span className="rounded-full border border-[#B88952]/40 bg-[#17110C]/80 px-3 py-1 text-[10px] font-sans font-semibold tracking-wider text-[#F3E8D2] uppercase">
                      3D SPACE
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div>
                    <h4 className="font-display text-xl font-bold text-[#FFF9EF] group-hover:text-[#D8B477] transition-colors leading-snug">
                      {space.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed line-clamp-3">
                      {space.description}
                    </p>

                    {/* Interactive CTA */}
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-[#D8B477] uppercase transition-all duration-300 group-hover:text-[#FFF9EF] group-hover:translate-x-1.5">
                      <span>ENTER SPACE</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Hospitality Pillars Grid (Glassmorphic) ── */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiencePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={100 * idx}>
                <div
                  onClick={() => handleEnter(pillar.zoneIndex)}
                  className="group relative cursor-pointer rounded-xl border border-[#B88952]/20 bg-[#17110C]/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#B88952]/60 hover:bg-[#2A1D14]/85 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-10 items-center justify-center rounded-lg border border-[#B88952]/30 bg-[#2A1D14] text-[#D8B477] group-hover:scale-110 group-hover:border-[#D8B477] transition-all">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-[#B88952]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#FFF9EF] group-hover:text-[#D8B477] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#D3C4AF] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
