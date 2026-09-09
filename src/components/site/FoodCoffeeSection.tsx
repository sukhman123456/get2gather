import { useState, useRef, useEffect } from "react";
import { Coffee, Sparkles, PartyPopper } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

export function FoodCoffeeSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const el = cardRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const card3dStyle = {
    transform: `perspective(900px) rotateY(${mousePos.x * 12}deg) rotateX(${
      mousePos.y * -12
    }deg) translateY(-4px)`,
    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <section className="relative bg-[#0a0c10] py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Warm volumetric lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/4 -translate-y-1/2 size-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-1/4 size-[400px] rounded-full bg-gold/10 blur-[130px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Artisanal Brews &amp; Handcrafted Dishes</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              More Than A Meal
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              At Get To Gether Restaurant, every cup of coffee is an invitation to pause, and every
              plate is a tribute to culinary craftsmanship and shared conversations.
            </p>
          </Reveal>
        </div>

        {/* ── Main Showcase: 3D Coffee Card + Real Food Spreads ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: 3D Cinematic Coffee Card */}
          <div className="lg:col-span-6 flex justify-center">
            <Reveal className="w-full max-w-lg">
              <div
                ref={cardRef}
                style={card3dStyle}
                className="group relative overflow-hidden rounded-2xl border-2 border-gold/30 bg-gradient-to-b from-[#1c1712] via-[#12100d] to-[#0d0c0b] p-6 sm:p-8 shadow-2xl shadow-black/80 will-change-transform"
              >
                {/* Subtle amber rim light */}
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 size-48 rounded-full bg-gold/25 blur-3xl"
                />

                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold">
                    <Coffee className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Get To Gether Cafe
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gold/80 bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                    From ₹50/-
                  </span>
                </div>

                {/* Floating Coffee Image Container */}
                <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <img
                    src={REAL_PHOTOS.coffeeCappuccino}
                    alt="Freshly Frothed Artisanal Cappuccino at Get To Gether Restaurant Gurdaspur"
                    className="h-64 sm:h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-serif italic text-xl text-white">
                      Freshly Brewed &bull; Silky Crema
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      Roasted beans, perfectly frothed milk &amp; comforting warmth
                    </p>
                  </div>
                </div>

                {/* Coffee Offerings breakdown */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-white font-medium">Hot Artisanal Coffee</span>
                    <span className="font-mono text-gold font-semibold">₹50/-</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-white font-medium">Chilled Cold Coffee</span>
                    <span className="font-mono text-gold font-semibold">₹90/-</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">Cold Coffee with Ice Cream</span>
                    <span className="font-mono text-gold font-semibold">₹150/-</span>
                  </div>
                </div>

                {/* Subtext */}
                <p className="mt-5 text-xs text-muted-foreground italic leading-relaxed">
                  Steaming cups for quiet conversations or cold creamy blends to cool down your
                  afternoons.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Real Food Visuals & Culinary Story */}
          <div className="lg:col-span-6 space-y-6">
            {/* Real Dish 1: Blue Ocean Mocktail Cooler */}
            <Reveal delay={150}>
              <div className="group relative flex flex-col sm:flex-row items-center gap-5 glass-panel p-4 rounded-xl border border-white/10 card-3d">
                <div className="size-full sm:size-36 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <img
                    src={REAL_PHOTOS.mocktailDrink}
                    alt="Real Get To Gether Restaurant signature layered Blue Ocean Mocktail cooler"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      Signature Sips
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    Layered Blue Ocean Coolers &amp; Mocktails
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    Sip on mint-muddled citrus mocktails, Lovers Passion, and vibrant layered
                    coolers freshly handcrafted at the bar counter.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Real Dish 2: Festive Celebrations & Party Hall */}
            <Reveal delay={250}>
              <div className="group relative flex flex-col sm:flex-row items-center gap-5 glass-panel p-4 rounded-xl border border-white/10 card-3d">
                <div className="size-full sm:size-36 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <img
                    src={REAL_PHOTOS.celebrationParty}
                    alt="Festive superhero celebration party setup at Get To Gether Restaurant Gurdaspur"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <PartyPopper className="size-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Celebrations &amp; Events
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    Festive Celebrations &amp; Private Gatherings
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    From custom superhero balloon arches to intimate family birthdays and
                    anniversaries, celebrate your milestones in our dedicated party spaces.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Philosophy quote */}
            <Reveal delay={350}>
              <div className="p-5 rounded-xl border border-gold/20 bg-gold/[0.04]">
                <p className="font-serif italic text-base text-white/90 leading-relaxed">
                  &ldquo;We don&apos;t just serve meals — we craft memories over steaming cups,
                  charcoal smoke, and warmth that feels like coming home.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
