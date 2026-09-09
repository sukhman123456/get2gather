import { useState, useRef, useEffect } from "react";
import { Heart, Sparkles, Coffee, Users, Wine, PartyPopper, Eye } from "lucide-react";
import { DAWAT_INFO, REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

const experiencePillars = [
  {
    icon: Sparkles,
    title: "Premium Ambience",
    description:
      "Crafted with warm wood ceilings, contemporary pendant lighting, textured stone walls, and our signature illuminated lounge.",
    tag: "Aesthetic & Cozy",
  },
  {
    icon: Heart,
    title: "Comfortable Dining",
    description:
      "Spacious dining layouts, plush seating, and attentive hospitality tailored for relaxing lunches and late evening dinners.",
    tag: "Relax & Unwind",
  },
  {
    icon: Users,
    title: "Family-Friendly Environment",
    description:
      "A respected dining destination in Gurdaspur loved by families across generations for safe, wholesome, and welcoming dining.",
    tag: "For All Ages",
  },
  {
    icon: Wine,
    title: "Authentic Food & Flavours",
    description:
      "Charcoal-roasted tandoori snacks, rich slow-simmered handi gravies, sizzling platters, and authentic Punjabi cooking.",
    tag: "Clay Oven Mastery",
  },
  {
    icon: Coffee,
    title: "Coffee & Conversations",
    description:
      "Freshly frothed espresso, artisanal latte art, chilled thick coffees with ice cream, and refreshing mocktails for casual meetups.",
    tag: "Cafe & Mocktails",
  },
  {
    icon: PartyPopper,
    title: "Celebrations & Gatherings",
    description:
      "Dedicated banquet hall and vibrant party space with customized festive balloon setups for birthdays, anniversaries, and reunions.",
    tag: "Private Events",
  },
];

const photoPanels = [
  {
    id: "p1",
    title: "Warm Dining Sanctuary",
    subtitle: "Plush leather seating, ambient lighting & intimate table settings",
    image: REAL_PHOTOS.gurdaspurDiningCustomer,
    baseZ: 25,
    tag: "Dining Lounge",
  },
  {
    id: "p2",
    title: "Artisan Mandala Wall",
    subtitle: "Hand-painted traditional mandala motif with spherical modern chandelier",
    image: REAL_PHOTOS.gurdaspurMandalaWall,
    baseZ: 50,
    tag: "Architectural Feature",
  },
  {
    id: "p3",
    title: "Outdoor Bamboo Courtyard",
    subtitle: "Open-air pergola dining under natural bamboo cane canopy and greenery",
    image: REAL_PHOTOS.gurdaspurBambooGarden,
    baseZ: 18,
    tag: "Al-Fresco Terrace",
  },
  {
    id: "p4",
    title: "Rustic Coffee Lounge",
    subtitle: "Exposed wood beams, glowing amber glass pendants & coffee mural",
    image: REAL_PHOTOS.gurdaspurCafeCeiling,
    baseZ: 40,
    tag: "Cafe Experience",
  },
];

export function AboutExperience() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!showcaseRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = showcaseRef.current.getBoundingClientRect();

      if (clientY < rect.top - 150 || clientY > rect.bottom + 150) return;

      const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      setMouseOffset({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  return (
    <section id="about" className="relative bg-[#0c0a08] text-[#f7f2ea] py-24 sm:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 -translate-y-1/2 size-96 rounded-full bg-[#dfb76c]/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 size-80 rounded-full bg-amber-600/5 blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#dfb76c]">
              The Get To Gether Experience
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              A Dining Sanctuary Crafted for Moments Worth Sharing
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-sm sm:text-base text-[#cfc5b6] leading-relaxed font-light">
              Rooted on Tibri Road in Gurdaspur, Get To Gether Restaurant brings together timeless
              hospitality, multi-cuisine culinary craftsmanship, and an inviting atmosphere designed
              for every occasion.
            </p>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            3D FLOATING PHOTO PANELS SHOWCASE
            Real photographs of Get To Gether Restaurant at staggered Z-depths
            ════════════════════════════════════════════════════════════ */}
        <div
          ref={showcaseRef}
          className="mt-16 sm:mt-20 perspective-1200 preserve-3d"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 preserve-3d">
            {photoPanels.map((panel, idx) => (
              <PhotoPanel3D
                key={panel.id}
                panel={panel}
                index={idx}
                globalMouse={mouseOffset}
              />
            ))}
          </div>
        </div>

        {/* ── Experience Pillars Grid ── */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiencePillars.map((pillar, idx) => (
            <Reveal
              key={pillar.title}
              delay={idx * 70}
              className="rounded-xl border border-[#dfb76c]/15 bg-[#14100c]/80 p-7 backdrop-blur-md hover:border-[#dfb76c]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-[#dfb76c]/10 text-[#dfb76c] group-hover:bg-[#dfb76c] group-hover:text-black transition-colors duration-300">
                  <pillar.icon className="size-6" />
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#a89782] px-2.5 py-0.5 rounded border border-[#dfb76c]/20">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#bdae9c] leading-relaxed font-light">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Direct Quote Banner */}
        <Reveal delay={400} className="mt-16 text-center">
          <div className="mx-auto max-w-4xl p-8 rounded-2xl border border-[#dfb76c]/30 bg-[#14100c]/90 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <p className="font-serif italic text-xl sm:text-2xl text-[#dfb76c] font-light">
                &ldquo;Whether meeting friends for coffee at the lounge, enjoying a relaxed family
                Sunday dinner, or celebrating a milestone anniversary, Get To Gether welcomes you
                with open arms and memorable flavours.&rdquo;
              </p>
              <p className="mt-4 text-xs tracking-widest uppercase text-[#cfc5b6]">
                — {DAWAT_INFO.name}, Gurdaspur
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 3D Floating Photo Panel with Depth, Perspective & Thickness ──
function PhotoPanel3D({
  panel,
  index,
  globalMouse,
}: {
  panel: (typeof photoPanels)[0];
  index: number;
  globalMouse: { x: number; y: number };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [localTilt, setLocalTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setLocalTilt({ x: y * -9, y: x * 9 });
  };

  const currentZ = isHovered ? panel.baseZ + 32 : panel.baseZ;
  const parallaxX = globalMouse.x * (index % 2 === 0 ? 8 : -8);
  const parallaxY = globalMouse.y * 6;

  return (
    <Reveal delay={index * 100}>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          setLocalTilt({ x: 0, y: 0 });
        }}
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, ${currentZ}px) rotateX(${
            localTilt.x + globalMouse.y * -3
          }deg) rotateY(${localTilt.y + globalMouse.x * 4}deg)`,
          boxShadow: isHovered
            ? "0 25px 50px -10px rgba(0, 0, 0, 0.95), 0 0 35px rgba(223, 183, 108, 0.28)"
            : "0 15px 35px -8px rgba(0, 0, 0, 0.85), 0 0 15px rgba(0, 0, 0, 0.5)",
          transition: isHovered
            ? "transform 0.18s ease-out, box-shadow 0.25s ease"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
        }}
        className="group relative overflow-hidden rounded-2xl border-2 border-[#dfb76c]/30 bg-[#16120e] p-3 backdrop-blur-md will-change-transform preserve-3d cursor-pointer"
      >
        {/* Real Photo with Depth Zoom */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/80">
          <img
            src={panel.image}
            alt={panel.title}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-[1.04]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Floating Tag (Elevated Z: +20px) */}
          <div
            style={{ transform: "translateZ(20px)" }}
            className="absolute top-3 left-3 preserve-3d"
          >
            <span className="rounded-full border border-[#dfb76c]/40 bg-black/80 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#dfb76c] backdrop-blur-md">
              {panel.tag}
            </span>
          </div>

          {/* Bottom Captions (Elevated Z: +25px) */}
          <div
            style={{ transform: "translateZ(25px)" }}
            className="absolute bottom-3 left-3 right-3 preserve-3d"
          >
            <h4 className="font-serif text-base font-bold text-[#f7f2ea] group-hover:text-[#dfb76c] transition-colors">
              {panel.title}
            </h4>
            <p className="mt-1 text-[11px] text-[#bdae9c] line-clamp-2 leading-relaxed font-light">
              {panel.subtitle}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
