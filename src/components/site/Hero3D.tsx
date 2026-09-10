import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { DAWAT_INFO, REAL_PHOTOS } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";

interface Hero3DProps {
  onOpenPoster?: () => void;
}

export function Hero3D({ onOpenPoster }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Entrance forward motion animation trigger
    const timer = setTimeout(() => setIsLoaded(true), 80);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setPointerOffset({ x, y });
    };

    const handleScroll = () => {
      // Smooth normalized scroll for cinematic camera dolly
      const y = Math.min(window.scrollY / 700, 1.2);
      setScrollY(y);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ── 3D Camera & Layer Spatial Transformations ──

  // Layer 1: Background photo recedes into deep Z space on scroll (camera dolly)
  const bgTransform = `translate3d(${pointerOffset.x * -16}px, ${
    pointerOffset.y * -14 + scrollY * 60
  }px, ${-120 - scrollY * 130}px) scale(${1.09 + scrollY * 0.08})`;

  // Layer 2: Main camera pitch, yaw & dolly in 3D perspective
  const stageTransform = `perspective(1200px) rotateY(${pointerOffset.x * 3.8}deg) rotateX(${
    pointerOffset.y * -3.8 - scrollY * 4
  }deg) translateZ(${isLoaded ? `${15 + scrollY * 25}px` : "-50px"})`;

  // Dynamic warm restaurant spotlight reacting to pointer coordinates
  const lightPosition = {
    x: 50 + pointerOffset.x * 16,
    y: 36 + pointerOffset.y * 14,
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[92svh] sm:min-h-[96svh] w-full items-center justify-center overflow-hidden bg-[#0E1110] pt-24 pb-16 sm:pt-28 sm:pb-20 perspective-1400 preserve-3d"
    >
      {/* ── 1. Deepest Layer: Real Luxury Restaurant Interior (Z: -120px to -250px) ── */}
      <div
        style={{
          transform: bgTransform,
          transition: "transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute inset-0 -z-30 size-full pointer-events-none will-change-transform preserve-3d"
      >
        <img
          src={REAL_PHOTOS.heroInterior}
          alt="Get To Gether Restaurant Gurdaspur - Warm dining lounge and ambience"
          className="size-full object-cover object-center filter brightness-[0.70] contrast-[1.14]"
          loading="eager"
        />
      </div>

      {/* ── 2. Cinematic Volumetric Lighting & Darkening Gradients ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-[#0E1110] via-[#0E1110]/60 to-[#0E1110]/80 pointer-events-none"
      />
      {/* Warm Ambient Spotlight following pointer */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, rgba(214, 168, 79, 0.20) 0%, rgba(24, 32, 28, 0.25) 40%, rgba(14, 17, 16, 0.88) 80%)`,
          transition: "background 0.3s ease-out",
        }}
        className="absolute inset-0 -z-20 pointer-events-none"
      />

      {/* Warm Glow halo over foreground candle (bottom-left region) */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-1/4 -translate-x-1/2 size-72 rounded-full bg-[#D6A84F]/10 blur-3xl pointer-events-none -z-10"
      />

      {/* ── 3. Left Flank: Vertical Brand Motto (GOOD FOOD GREAT COMPANY) ── */}
      <div
        style={{
          transform: `translate3d(${pointerOffset.x * 6}px, ${
            pointerOffset.y * 6 - scrollY * 20
          }px, 40px)`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="hidden md:flex flex-col items-start absolute left-8 lg:left-14 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none text-[#A9A59B] font-sans text-xs lg:text-sm font-semibold tracking-[0.24em] uppercase space-y-2.5"
      >
        <span>GOOD</span>
        <span>FOOD</span>
        <span>GREAT</span>
        <span>COMPANY</span>
        <span className="w-9 h-[1.5px] bg-[#A9A59B]/70 mt-1" />
      </div>

      {/* ── 4. Bottom-Left: Minimalist Scroll Indicator (| SCROLL) ── */}
      <div
        style={{
          transform: `translate3d(${pointerOffset.x * 4}px, ${pointerOffset.y * 4}px, 35px)`,
        }}
        className="absolute bottom-8 left-8 lg:left-14 z-20 hidden sm:flex items-center gap-2.5 select-none pointer-events-none"
      >
        <span className="w-[1.5px] h-6 bg-[#D6A84F]/80" />
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#A9A59B]">
          SCROLL
        </span>
      </div>

      {/* ── 5. Right Flank: Luxury Signature Script ("More Than A Meal ♡") ── */}
      <div
        style={{
          transform: `translate3d(${pointerOffset.x * -7}px, ${
            pointerOffset.y * -7 - scrollY * 15
          }px, 45px) rotate(-4deg)`,
          transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="hidden md:flex flex-col items-center absolute right-8 lg:right-16 bottom-24 z-20 pointer-events-none select-none text-[#D6A84F]/85"
      >
        <span className="font-serif italic text-2xl lg:text-3xl font-light tracking-wide drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)] leading-tight">
          More
        </span>
        <span className="font-serif italic text-2xl lg:text-3xl font-light tracking-wide drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)] leading-tight">
          Than
        </span>
        <span className="font-serif italic text-2xl lg:text-3xl font-light tracking-wide drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)] leading-tight">
          A Meal
        </span>
        <span className="text-xl lg:text-2xl mt-1 text-[#D6A84F]/75">
          ♡
        </span>
      </div>

      {/* ── 6. Main 3D Stage (Perspective Viewport - Centered Majestic Composition) ── */}
      <div
        style={{
          transform: stageTransform,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center will-change-transform z-10 preserve-3d flex flex-col items-center"
      >
        {/* ── 3D Physical Logo Emblem (Elevated at Z: +65px) ── */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * 7}px, ${
              pointerOffset.y * 6 + scrollY * 12
            }px, ${65 - scrollY * 20}px)`,
          }}
          className={`flex justify-center transition-all duration-700 ease-out transform preserve-3d ${
            isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-4"
          }`}
        >
          <Logo3DEmblem size="hero" className="mx-auto" />
        </div>

        {/* ── Brand Typography: Floating at Z: +35px ── */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * 3.5}px, ${
              pointerOffset.y * 3.5
            }px, ${35 - scrollY * 10}px)`,
          }}
          className="mt-6 sm:mt-7 preserve-3d"
        >
          {/* Authentic Warm Punjabi Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6A84F]/35 bg-[#D6A84F]/10 mb-3">
            <span className="font-gurmukhi text-xs font-semibold text-[#D6A84F]">ਜੀ ਆਇਆਂ ਨੂੰ</span>
            <span className="text-[#D6A84F]/60 text-xs">&bull;</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D6A84F] uppercase">
              AUTHENTIC DINING &bull; CAFE LOUNGE
            </span>
          </div>

          {/* Main Brand Title with Gurmukhi & English */}
          <h1 className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F1E8] leading-[1.1]">
            <span className="block drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
              GET TO GETHER
            </span>
            <span className="font-gurmukhi text-xl sm:text-2xl lg:text-3xl font-medium text-[#D6A84F] tracking-wide block mt-1">
              ਗੈੱਟ ਟੂਗੈਦਰ ਰੈਸਟੋਰੈਂਟ
            </span>
            <span className="text-xs sm:text-sm font-serif font-light text-[#A9A59B] tracking-[0.25em] uppercase block mt-1">
              TIBRI ROAD &bull; GURDASPUR (ਗੁਰਦਾਸਪੁਰ)
            </span>
          </h1>

          {/* Decorative Floral / Leaf Flourish Divider */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-3.5 opacity-85">
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D6A84F]/60 to-[#D6A84F]" />
            <span className="text-[#D6A84F] text-sm sm:text-base select-none">❦</span>
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#D6A84F]/60 to-[#D6A84F]" />
          </div>

          {/* Tagline & Authentic Punjabi Proverb */}
          <p className="font-serif text-lg sm:text-2xl lg:text-2xl text-[#F5F1E8] font-light tracking-wide">
            &ldquo;Good Food. <span className="italic text-[#D6A84F] font-normal">Great Company.</span>&rdquo;
          </p>
          <p className="font-gurmukhi text-sm sm:text-base text-[#D6A84F]/90 mt-1 font-normal tracking-wide">
            ਚੰਗਾ ਖਾਣਾ • ਵਧੀਆ ਮਹਿਫ਼ਿਲ
          </p>

          {/* Story Narrative Description */}
          <p className="mx-auto mt-3.5 max-w-2xl text-xs sm:text-sm lg:text-[15px] text-[#A9A59B] leading-relaxed font-light">
            Gurdaspur&apos;s premier culinary destination on Tibri Road. Enjoy authentic
            charcoal-roasted tandoori recipes, flavourful Punjabi curries, artisanal coffees, and
            heartwarming hospitality.
          </p>
        </div>

        {/* ── Action CTAs: Elevated at Z: +50px with Realistic 3D Elevation ── */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4 preserve-3d"
        >
          {/* Explore Menu */}
          <a
            href="#menu"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#0E1110] shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_25px_rgba(214,168,79,0.25)] transition-all duration-300 hover:bg-[#F1D08A] hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.9),0_0_35px_rgba(241,208,138,0.4)] active:scale-95"
          >
            <span>ਸਾਡਾ ਮੀਨੂ &bull; EXPLORE MENU</span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Book a Table */}
          <a
            href="#reservation"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D6A84F]/40 bg-[#151A18]/80 px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F5F1E8] backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-[#18201C] hover:border-[#D6A84F] hover:text-[#F1D08A] active:scale-95"
          >
            <Calendar className="size-4 text-[#D6A84F]" />
            <span>ਟੇਬਲ ਬੁੱਕ ਕਰੋ &bull; BOOK TABLE</span>
          </a>
        </div>
      </div>
    </section>
  );
}
