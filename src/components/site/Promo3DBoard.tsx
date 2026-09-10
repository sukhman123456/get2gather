import { useState, useRef, useEffect } from "react";
import { Sparkles, Maximize2, Coffee, Utensils } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface Promo3DBoardProps {
  onOpenPoster?: () => void;
}

export function Promo3DBoard({ onOpenPoster }: Promo3DBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        setScrollY((progress - 0.5) * 20);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const rect = boardRef.current.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    setRotate({
      x: Math.max(-1, Math.min(1, y)) * -9,
      y: Math.max(-1, Math.min(1, x)) * 11,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative bg-[#0E1110] py-24 sm:py-32 overflow-hidden border-t border-[#D6A84F]/15">
      {/* Background Volumetric Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/3 -translate-y-1/2 size-[550px] rounded-full bg-[#D6A84F]/5 blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 size-[450px] rounded-full bg-[#18201C]/40 blur-[140px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT SIDE: Promotional Narrative & Details
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10">
                <Sparkles className="size-3 text-[#D6A84F]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
                  SEASONAL PROMOTION
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F1E8] leading-tight">
                Morning Flavours &amp;
                <span className="block text-[#D6A84F]">
                  All-Day Specials
                </span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-sm sm:text-base text-[#A9A59B] leading-relaxed font-light max-w-xl">
                Start your mornings on Tibri Road with freshly rolled stuffed paranthas, steaming
                channa bhature, fluffy omelettes, and artisanal coffees. Pair your meals with our
                signature handcrafted citrus mocktails and wood-fired pizzas throughout the day.
              </p>
            </Reveal>

            {/* Highlights List */}
            <Reveal delay={300}>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <div className="rounded-xl border border-[#D6A84F]/20 bg-[#151A18]/85 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[#D6A84F]">
                    <Coffee className="size-4" />
                    <span className="font-serif font-bold text-sm text-[#F5F1E8]">Morning Breakfast</span>
                  </div>
                  <p className="mt-1 text-xs text-[#A9A59B]">From ₹49 &bull; Amritsari channa bhatura, toasts &amp; teas</p>
                </div>

                <div className="rounded-xl border border-[#D6A84F]/20 bg-[#151A18]/85 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[#D6A84F]">
                    <Utensils className="size-4" />
                    <span className="font-serif font-bold text-sm text-[#F5F1E8]">Mocktails &amp; Pizzas</span>
                  </div>
                  <p className="mt-1 text-xs text-[#A9A59B]">From ₹129 &bull; Handcrafted coolers &amp; tandoori pizzas</p>
                </div>
              </div>
            </Reveal>

            {/* Button */}
            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={onOpenPoster}
                  className="group inline-flex items-center gap-2.5 rounded-lg bg-[#D6A84F] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0E1110] shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_20px_rgba(214,168,79,0.25)] transition-all duration-300 hover:bg-[#F1D08A] hover:shadow-[0_15px_30px_rgba(0,0,0,0.9),0_0_35px_rgba(241,208,138,0.4)] hover:scale-105 active:scale-95"
                >
                  <Maximize2 className="size-4 transition-transform group-hover:scale-110" />
                  <span>VIEW FULL PROMOTIONAL POSTER</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT SIDE: Floating 3D Promotional Easel Board
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex justify-center perspective-1200 preserve-3d">
            <Reveal delay={200} className="w-full max-w-sm sm:max-w-md">
              <div
                ref={boardRef}
                onMouseMove={handlePointerMove}
                onTouchMove={handlePointerMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handlePointerLeave}
                onTouchEnd={handlePointerLeave}
                onClick={onOpenPoster}
                style={{
                  transform: `perspective(1200px) rotateX(${rotate.x + scrollY * 0.2}deg) rotateY(${
                    rotate.y
                  }deg) translateZ(${isHovered ? "36px" : "10px"})`,
                  boxShadow: isHovered
                    ? `${-rotate.y * 2.5}px ${25 + rotate.x * 2}px 60px rgba(0,0,0,0.95), 0 0 40px rgba(214,168,79,0.28)`
                    : "0 20px 45px rgba(0,0,0,0.85), 0 0 25px rgba(214,168,79,0.15)",
                  transition: isHovered
                    ? "transform 0.15s ease-out, box-shadow 0.2s ease"
                    : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease",
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#D6A84F]/35 bg-[#151A18] p-3.5 backdrop-blur-md will-change-transform preserve-3d select-none"
              >
                {/* 3D Outer Brass Beveled Rim */}
                <div className="relative overflow-hidden rounded-xl bg-black/90 p-1 border border-[#D6A84F]/30 shadow-inner">
                  {/* Poster Image */}
                  <img
                    src={REAL_PHOTOS.breakfastPoster}
                    alt="Get 2 Gather Breakfast & Handcrafted Mocktails promotional board"
                    className="w-full object-cover rounded-lg filter contrast-[1.05] brightness-[1.02] transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Specular sheen sweep */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      transform: `translate(${rotate.y * 3}%, ${rotate.x * 3}%)`,
                    }}
                  />
                </div>

                {/* Floating Brass Label Plaque (Elevated Z: +40px) */}
                <div
                  style={{ transform: "translateZ(40px)" }}
                  className="mt-3.5 flex items-center justify-between px-1 preserve-3d"
                >
                  <div>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#F5F1E8] group-hover:text-[#D6A84F] transition-colors">
                      Get To Gether Specials
                    </p>
                    <p className="text-[11px] text-[#A9A59B]">
                      Tibri Road, Gurdaspur
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#D6A84F] group-hover:underline">
                    <span>Tap to zoom</span>
                    <Maximize2 className="size-3" />
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
