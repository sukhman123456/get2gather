import { useState, useEffect, useRef } from "react";
import { ArrowDown, Calendar, Compass } from "lucide-react";
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
    const timer = setTimeout(() => setIsLoaded(true), 120);

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointerOffset({ x, y });
    };

    const handleScroll = () => {
      const y = Math.min(window.scrollY / 600, 1.2);
      setScrollY(y);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative isolate flex min-h-[96svh] w-full items-center justify-center overflow-hidden pt-28 pb-16 perspective-1200 preserve-3d"
    >
      {/* Subtle Atmospheric Vignette - Allows WebGL 3D World to show through */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 bg-radial-gradient from-transparent via-[#17110C]/40 to-[#17110C]/85"
      />

      {/* Floating 3D Content Container */}
      <div
        style={{
          transform: `perspective(1000px) rotateY(${pointerOffset.x * 2.8}deg) rotateX(${
            pointerOffset.y * -2.8 - scrollY * 5
          }deg) translateZ(${isLoaded ? `${20 - scrollY * 30}px` : "-40px"})`,
          opacity: Math.max(0, 1 - scrollY * 1.5),
          transition: "opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center will-change-transform z-10 preserve-3d flex flex-col items-center"
      >
        {/* Official 3D Emblem with subtle float */}
        <div
          className={`flex justify-center transition-all duration-1000 ease-out transform ${
            isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-6"
          }`}
        >
          <Logo3DEmblem size="hero" className="mx-auto" />
        </div>

        {/* Brand Identity & Headlines */}
        <div className="mt-6 sm:mt-8 preserve-3d">
          {/* Authentic Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B88952]/40 bg-[#2A1D14]/70 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(184,137,82,0.15)]">
            <span className="font-gurmukhi text-xs font-semibold text-[#D8B477]">ਜੀ ਆਇਆਂ ਨੂੰ</span>
            <span className="text-[#B88952] text-xs">&bull;</span>
            <span className="text-[10.5px] font-sans font-bold tracking-[0.28em] text-[#F3E8D2] uppercase">
              TIBRI ROAD &bull; GURDASPUR
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF9EF] leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            <span className="block">GET TO GETHER</span>
            <span className="text-sm sm:text-base lg:text-lg font-sans font-semibold tracking-[0.38em] uppercase text-[#D8B477] block mt-2">
              RESTAURANT &bull; GURDASPUR
            </span>
          </h1>

          {/* Flourish Divider */}
          <div className="flex items-center justify-center gap-4 my-4 opacity-85">
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B88952]/80 to-[#D8B477]" />
            <span className="text-[#D8B477] text-base select-none">✦</span>
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#B88952]/80 to-[#D8B477]" />
          </div>

          {/* Tagline */}
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FFF9EF] font-light tracking-wide italic">
            &ldquo;Good Food. <span className="text-[#D8B477] font-normal not-italic">Great Company.</span>&rdquo;
          </p>
          <p className="font-gurmukhi text-sm sm:text-base text-[#D8B477]/90 mt-1.5 font-normal tracking-wide">
            ਚੰਗਾ ਖਾਣਾ • ਵਧੀਆ ਮਹਿਫ਼ਿਲ
          </p>

          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light">
            Enter an immersive world of authentic charcoal tandoor, artisanal coffee, and warm Punjabi hospitality on Tibri Road.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Explore the Experience */}
          <a
            href="#experience"
            className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#B88952] to-[#D8B477] px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#17110C] shadow-[0_10px_30px_rgba(0,0,0,0.85),0_0_25px_rgba(184,137,82,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_35px_rgba(216,180,119,0.5)] active:scale-95"
          >
            <Compass className="size-4 text-[#17110C]" />
            <span>EXPLORE THE EXPERIENCE</span>
          </a>

          {/* Book a Table */}
          <a
            href="#reservation"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#B88952]/50 bg-[#2A1D14]/80 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FFF9EF] backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-[#4A3322]/80 hover:border-[#D8B477] hover:text-[#FFF9EF] active:scale-95"
          >
            <Calendar className="size-4 text-[#D8B477]" />
            <span>BOOK A TABLE</span>
          </a>
        </div>

        {/* Scroll down to enter restaurant indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 animate-bounce opacity-85">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#D8B477]">
            SCROLL TO ENTER THE RESTAURANT
          </span>
          <ArrowDown className="size-4 text-[#B88952]" />
        </div>
      </div>
    </section>
  );
}
