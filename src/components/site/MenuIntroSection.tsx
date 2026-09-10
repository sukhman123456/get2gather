import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, BookOpen, Sparkles, Utensils } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface MenuIntroSectionProps {
  onOpenOriginalMenu: (pageIndex: number) => void;
}

const CATEGORY_PILLS = [
  "BREAKFAST",
  "MOCKTAILS",
  "PIZZA",
  "PASTA",
  "CHINESE",
  "TANDOORI",
  "FISH",
  "DESSERTS",
];

export function MenuIntroSection({ onOpenOriginalMenu }: MenuIntroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: Math.max(-0.5, Math.min(0.5, x)), y: Math.max(-0.5, Math.min(0.5, y)) });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0E1110] py-20 sm:py-28 overflow-hidden border-t border-[#D6A84F]/15"
    >
      {/* ── Ambient Background Lighting ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-32 -translate-y-1/2 size-[450px] rounded-full bg-[#D6A84F]/5 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 size-[400px] rounded-full bg-[#18201C]/50 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ════════════════════════════════════════════════════════════
              LEFT SIDE: Text, Categories & Buttons
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10">
                <Utensils className="size-3 text-[#D6A84F]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
                  OUR MENU
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F1E8] leading-[1.15]">
                A TABLE FULL OF
                <span className="block gold-gradient-text mt-1">
                  GOOD THINGS
                </span>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-4 max-w-xl text-sm sm:text-base text-[#A9A59B] leading-relaxed font-light">
                From comforting classics to indulgent favourites, discover something for every
                gathering.
              </p>
            </Reveal>

            {/* ── Category Preview Pills ── */}
            <Reveal delay={240}>
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl">
                {CATEGORY_PILLS.map((pill) => (
                  <a
                    key={pill}
                    href="#menu"
                    className="px-3.5 py-1.5 rounded-full border border-[#D6A84F]/20 bg-[#18201C] text-[11px] font-semibold tracking-wider text-[#F5F1E8]/85 transition-all duration-300 hover:border-[#D6A84F] hover:bg-[#D6A84F]/15 hover:text-[#D6A84F] active:scale-95"
                  >
                    {pill}
                  </a>
                ))}
              </div>
            </Reveal>

            {/* ── Action Buttons ── */}
            <Reveal delay={300}>
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {/* Explore Menu */}
                <a
                  href="#menu"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0E1110] shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-[#F1D08A] hover:shadow-[0_0_20px_rgba(214,168,79,0.35)] hover:scale-105 active:scale-95"
                >
                  <span>EXPLORE MENU</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* View Full Menu (Opens Lightbox) */}
                <button
                  type="button"
                  onClick={() => onOpenOriginalMenu(0)}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg border border-[#D6A84F]/40 bg-[#151A18]/80 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5F1E8] backdrop-blur-md transition-all duration-300 hover:border-[#D6A84F] hover:bg-[#18201C] hover:text-[#F1D08A] active:scale-95"
                >
                  <BookOpen className="size-4 text-[#D6A84F] transition-transform group-hover:rotate-6" />
                  <span>VIEW FULL MENU</span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT SIDE: Premium 3D Floating Food/Restaurant Visual
              Uses ONLY real authentic photography of Get To Gether Restaurant
              ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex justify-center perspective-1000 preserve-3d">
            <Reveal delay={200} className="w-full max-w-sm sm:max-w-md">
              <div
                style={{
                  transform: `perspective(1000px) rotateY(${mouseOffset.x * 12}deg) rotateX(${
                    mouseOffset.y * -12
                  }deg) translateZ(20px)`,
                  transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="relative preserve-3d will-change-transform select-none"
              >
                {/* ── Primary 3D Food Card: Handcrafted Layered Mocktail ── */}
                <div
                  style={{
                    transform: "translateZ(30px)",
                    boxShadow:
                      "-14px 22px 45px -8px rgba(0, 0, 0, 0.95), 0 0 30px -4px rgba(214, 168, 79, 0.22)",
                  }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-[#D6A84F]/35 bg-[#151A18] p-3 transition-transform duration-500 hover:scale-[1.02]"
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/80">
                    <img
                      src={REAL_PHOTOS.mocktailDrink}
                      alt="Handcrafted Mocktails at Get To Gether Restaurant Gurdaspur"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Corner Tag */}
                    <span className="absolute top-3 left-3 rounded-full border border-[#D6A84F]/40 bg-[#0E1110]/85 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#D6A84F] backdrop-blur-md">
                      Signature Mocktail
                    </span>

                    {/* Price Tag */}
                    <span className="absolute bottom-3 right-3 rounded-md border border-[#D6A84F]/40 bg-[#0E1110]/90 px-2.5 py-1 font-mono text-xs font-bold text-[#D6A84F] shadow-lg">
                      From ₹129/-
                    </span>

                    <div className="absolute bottom-3 left-3">
                      <p className="font-serif text-base font-bold text-[#F5F1E8]">
                        Blue Ocean &amp; Citrus Coolers
                      </p>
                      <p className="text-[11px] text-[#A9A59B]">
                        Handcrafted with fresh mint &amp; lemon
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Secondary 3D Floating Coffee Card (Overlapping at Z: +60px) ── */}
                <div
                  style={{
                    transform: `translate3d(${mouseOffset.x * -16}px, ${
                      mouseOffset.y * -14
                    }px, 65px) rotate(-4deg)`,
                    boxShadow:
                      "-12px 18px 40px -8px rgba(0, 0, 0, 0.9), 0 0 25px -4px rgba(214, 168, 79, 0.22)",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="group absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-52 overflow-hidden rounded-xl border border-[#D6A84F]/40 bg-[#18201C] p-2 backdrop-blur-md hidden xs:block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={REAL_PHOTOS.coffeeCappuccino}
                      alt="Artisanal Cappuccino at Get To Gether Restaurant"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2">
                      <p className="text-xs font-serif font-bold text-[#F5F1E8] leading-tight">
                        Artisanal Coffee
                      </p>
                      <p className="text-[9px] text-[#D6A84F] font-mono">From ₹50/-</p>
                    </div>
                  </div>
                </div>

                {/* ── Floating Gold Trust Badge (Z: +80px) ── */}
                <div
                  style={{
                    transform: `translate3d(${mouseOffset.x * 12}px, ${
                      mouseOffset.y * 12
                    }px, 80px)`,
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full border border-[#D6A84F]/50 bg-[#151A18]/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md"
                >
                  <Sparkles className="size-3 text-[#D6A84F]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D6A84F]">
                    Live Charcoal Tandoor
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
