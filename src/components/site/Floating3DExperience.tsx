import { useState, useRef } from "react";
import { Sparkles, Eye } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface FloatingCardItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  badge: string;
}

const cardsData: FloatingCardItem[] = [
  {
    id: "c1",
    title: "Artisanal Cafe & Coffee Lounge",
    category: "Indoor Ambience",
    image: REAL_PHOTOS.gurdaspurCafeCeiling,
    description: "Rustic wood beams, glowing amber globe pendants, and signature Coffee wall art.",
    badge: "Signature Space",
  },
  {
    id: "c2",
    title: "Outdoor Bamboo Garden Terrace",
    category: "Al-Fresco Dining",
    image: REAL_PHOTOS.gurdaspurBambooGarden,
    description: "Relaxed open-air pergola dining under natural bamboo cane canopy and lush planters.",
    badge: "Garden Terrace",
  },
  {
    id: "c3",
    title: "Mandala Feature Wall Dining",
    category: "Family & Dining",
    image: REAL_PHOTOS.gurdaspurMandalaWall,
    description: "Intricate mandala motif backdrop with modern sphere chandelier and plush olive seating.",
    badge: "Aesthetic Dining",
  },
];

export function Floating3DExperience() {
  return (
    <section className="relative bg-[#08090c] py-24 sm:py-32 overflow-hidden border-y border-white/10">
      {/* Background radial spotlights */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-gold/5 blur-[160px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Interactive Space</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Step Inside Get To Gether
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Hover over or tap any card to experience the depth, textures, and atmosphere of our
              real dining spaces in Gurdaspur.
            </p>
          </Reveal>
        </div>

        {/* 3D Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1200">
          {cardsData.map((card, idx) => (
            <Interactive3DCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Interactive3DCard({ card, index }: { card: FloatingCardItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * -12, y: x * 12 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleReset = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Reveal delay={index * 120} className="h-full">
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleReset}
        onTouchStart={() => setIsHovered(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleReset}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${
            isHovered ? "28px" : "0px"
          })`,
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease",
          boxShadow: isHovered
            ? `${-rotation.y * 2}px ${15 + rotation.x * 2}px 45px rgba(0,0,0,0.9), 0 0 35px rgba(201,147,82,0.22)`
            : "0 15px 35px rgba(0,0,0,0.75)",
        }}
        className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/15 bg-gradient-to-b from-[#181a22] to-[#101217] p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-gold/60 will-change-transform preserve-3d"
      >
        {/* Dynamic Specular Sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: `translate(${rotation.y * 2}%, ${rotation.x * 2}%)`,
          }}
        />

        {/* Top Badges (Elevated Z: +20px) */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="flex items-center justify-between pb-3.5 preserve-3d"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30 shadow-md">
            {card.badge}
          </span>
          <span className="text-[11px] font-mono text-white/60">{card.category}</span>
        </div>

        {/* Real Image Canvas (Elevated Z: +24px) */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="relative overflow-hidden rounded-xl h-64 sm:h-72 w-full border border-white/15 shadow-2xl preserve-3d"
        >
          <img
            src={card.image}
            alt={card.title}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        </div>

        {/* Content Box (Elevated Z: +22px) */}
        <div
          style={{ transform: "translateZ(22px)" }}
          className="mt-4 pt-2 preserve-3d"
        >
          <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
            {card.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
            {card.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
