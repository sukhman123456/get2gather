import { useState, useMemo, useRef, useEffect } from "react";
import { Maximize2 } from "lucide-react";
import { ALL_GALLERY_PHOTOS, GalleryPhoto } from "@/lib/galleryData";
import { Reveal } from "./Reveal";

const CATEGORIES = [
  "ALL",
  "INTERIORS",
  "AMBIENCE",
  "COFFEE",
  "DINING",
  "EXTERIOR",
  "FOOD / MENU",
] as const;

interface GallerySectionProps {
  onOpenPhoto: (photoIndex: number) => void;
}

interface GalleryDepthTier {
  baseZ: number;
  hoverZ: number;
  shadow: string;
  border: string;
  parallaxMultiplier: number;
}

export function GallerySection({ onOpenPhoto }: GallerySectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = useMemo(() => {
    if (selectedCat === "ALL") return ALL_GALLERY_PHOTOS;
    return ALL_GALLERY_PHOTOS.filter((p) => p.category === selectedCat);
  }, [selectedCat]);

  const [scrollDolly, setScrollDolly] = useState(0);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!galleryRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = galleryRef.current.getBoundingClientRect();
      // Check if mouse/touch is near the gallery section
      if (clientY < rect.top - 200 || clientY > rect.bottom + 200) return;

      const x = (clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleScroll = () => {
      if (!galleryRef.current) return;
      const rect = galleryRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0) {
        const progress = (vh - rect.top) / (vh + rect.height);
        setScrollDolly((progress - 0.5) * 45);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Depth tiers for true multi-plane layout:
  // 0: Recessed (-15px), 1: Midground (+12px), 2: Elevated Foreground (+36px)
  const getDepthTier = (index: number): GalleryDepthTier => {
    const tier = index % 3;
    if (tier === 0) {
      return {
        baseZ: 12,
        hoverZ: 55,
        shadow: "shadow-[0_15px_35px_rgba(0,0,0,0.85)]",
        border: "border-[#D6A84F]/18",
        parallaxMultiplier: 1.0,
      };
    } else if (tier === 1) {
      return {
        baseZ: 36,
        hoverZ: 70,
        shadow: "shadow-[0_25px_50px_rgba(0,0,0,0.92),0_0_30px_rgba(214,168,79,0.2)]",
        border: "border-[#D6A84F]/35",
        parallaxMultiplier: 1.4,
      };
    } else {
      return {
        baseZ: -10,
        hoverZ: 45,
        shadow: "shadow-[0_10px_25px_rgba(0,0,0,0.75)]",
        border: "border-[#D6A84F]/12",
        parallaxMultiplier: 0.7,
      };
    }
  };

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="relative bg-background py-24 sm:py-32 overflow-hidden perspective-1400 preserve-3d"
    >
      {/* Warm volumetric background lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 size-[500px] rounded-full bg-[#D6A84F]/5 blur-[160px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-10 size-[400px] rounded-full bg-[#18201C]/40 blur-[140px] pointer-events-none -z-10"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 preserve-3d">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Visual Tour</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F1E8]">
              Moments Captured at Get To Gether
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-base sm:text-lg text-[#A9A59B] leading-relaxed font-light">
              Explore 100% authentic photography from Get To Gether Restaurant Gurdaspur: our
              coffee lounge, bamboo garden terrace, mandala art dining, and charcoal tandoor
              feasts.
            </p>
          </Reveal>
        </div>

        {/* Category Pills */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedCat === cat
                    ? "bg-[#D6A84F] text-[#0E1110] shadow-lg shadow-[#D6A84F]/25 hover:bg-[#F1D08A] scale-105"
                    : "bg-[#18201C] text-[#A9A59B] hover:bg-[#151A18] hover:text-[#F5F1E8] border border-[#D6A84F]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Multi-Plane 3D Spatial Gallery Grid with Scroll Camera Dolly */}
        <div
          style={{
            transform: `perspective(1200px) translateZ(${scrollDolly}px) rotateY(${mousePos.x * 2.2}deg) rotateX(${mousePos.y * -2.2}deg)`,
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-7 space-y-7 preserve-3d will-change-transform"
        >
          {filteredPhotos.map((photo, index) => {
            const originalIndex = ALL_GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
            const depth = getDepthTier(index);

            return (
              <GalleryCard3D
                key={photo.id}
                photo={photo}
                index={index}
                depth={depth}
                mousePos={mousePos}
                onOpen={() => onOpenPhoto(originalIndex >= 0 ? originalIndex : 0)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryCard3D({
  photo,
  index,
  depth,
  mousePos,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  depth: GalleryDepthTier;
  mousePos: { x: number; y: number };
  onOpen: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax translation based on its specific Z-depth plane
  const currentZ = isHovered ? depth.hoverZ : depth.baseZ;
  const parallaxX = mousePos.x * 8 * depth.parallaxMultiplier;
  const parallaxY = mousePos.y * 6 * depth.parallaxMultiplier;

  return (
    <Reveal delay={index * 35}>
      <div
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, ${currentZ}px)`,
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease",
        }}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${depth.border} bg-[#151A18]/80 break-inside-avoid ${depth.shadow} preserve-3d will-change-transform`}
      >
        {/* Photo with 3D Depth Zoom */}
        <div className="overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-[1.04]"
          />
        </div>

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top Category Tag (Elevated Z: +20px inside card) */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="absolute top-4 left-4 preserve-3d"
        >
          <span className="rounded-full border border-[#D6A84F]/40 bg-[#0E1110]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D6A84F] backdrop-blur-md shadow-lg">
            {photo.category}
          </span>
        </div>

        {/* Expand Icon (Elevated Z: +25px) */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="absolute top-4 right-4 size-8 rounded-full bg-[#0E1110]/80 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-md border border-[#D6A84F]/30 shadow-lg"
        >
          <Maximize2 className="size-4 text-[#D6A84F]" />
        </div>

        {/* Bottom Captions (Elevated Z: +24px) */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="absolute bottom-0 inset-x-0 p-5 transition-transform duration-300 preserve-3d"
        >
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#F5F1E8] group-hover:text-[#D6A84F] transition-colors">
            {photo.title}
          </h3>
          <p className="mt-1 text-xs text-[#A9A59B] line-clamp-2 leading-relaxed font-light">
            {photo.subtitle}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
