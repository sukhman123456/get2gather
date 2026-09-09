import { ArrowUpRight, Coffee, Sparkles, Flame, Check } from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface MenuPromotionalPosterProps {
  onOpenOriginalMenu: (pageIndex: number) => void;
}

export function MenuPromotionalPoster({ onOpenOriginalMenu }: MenuPromotionalPosterProps) {
  const featuredOfferings = [
    {
      title: "Handcrafted Mocktails",
      items: "Lovers Passion, Blue Ocean, Virgin Mojito, Pink Lady",
      price: "From ₹129/-",
    },
    {
      title: "Fresh Baked Veg Pizzas",
      items: "Margherita, Farm House, Get 2 Gather Special, Cheese Chilly",
      price: "From ₹149/-",
    },
    {
      title: "Italian Gourmet Pastas",
      items: "Rich White Sauce Alfredo, Red Sauce Marinara & Pink Mix Sauce",
      price: "From ₹209/-",
    },
    {
      title: "Crispy Chinese Veg",
      items: "Veg Manchurian, Spring Rolls, Mushroom Duplex, Honey Chilly Potato",
      price: "From ₹229/-",
    },
    {
      title: "Charcoal Fish Tandoori",
      items: "Fish Amritsari, Ajwani Fish Tikka, Fish Achari & Malai Tikka",
      price: "From ₹449/-",
    },
  ];

  return (
    <section className="relative bg-[#0d0f14] py-20 sm:py-28 overflow-hidden border-y border-gold/15">
      {/* Background soft glow */}
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 -translate-y-1/2 size-[450px] rounded-full bg-gold/10 blur-[130px] pointer-events-none"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Poster Showcase with interactive zoom button */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal className="group relative max-w-sm sm:max-w-md w-full">
              {/* Poster frame with gold accent border and realistic shadow */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-black/70 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] card-3d">
                <img
                  src={REAL_PHOTOS.menuPosterBreakfast}
                  alt="Real printed Get 2 Gather Breakfast &amp; Special Menu Poster"
                  className="w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Overlay hover badge */}
                <button
                  type="button"
                  onClick={() => onOpenOriginalMenu(0)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black shadow-xl">
                    <Sparkles className="size-4" />
                    Click to View Full Poster
                  </span>
                </button>
              </div>

              {/* Verified badge pill */}
              <div className="absolute -bottom-4 right-4 rounded-full border border-gold/40 bg-black/90 px-4 py-1.5 text-xs font-semibold text-gold shadow-lg backdrop-blur-md">
                ✓ Authentic Printed Menu
              </div>
            </Reveal>
          </div>

          {/* Right Column: Promotional Details & Offerings */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-bold tracking-widest uppercase text-gold">
                <Flame className="size-3.5 text-amber-400" />
                Featured Promotion
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                GET 2 GATHER
                <span className="block gold-gradient-text text-3xl sm:text-4xl mt-1">
                  BREAKFAST &amp; CHEF SPECIALS
                </span>
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed font-light">
                Start your mornings or recharge your afternoons with Get To Gether&apos;s special
                breakfast spreads, oven-baked pizzas, vibrant mocktails, and fresh clay oven
                tandoori starters.
              </p>
            </Reveal>

            {/* List of highlighted categories from the poster */}
            <Reveal delay={200}>
              <div className="mt-8 space-y-4">
                {featuredOfferings.map((feat) => (
                  <div
                    key={feat.title}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-gold/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold mt-0.5">
                        <Check className="size-3.5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">
                          {feat.title}
                        </h3>
                        <p className="text-xs text-white/60">{feat.items}</p>
                      </div>
                    </div>
                    <span className="self-end sm:self-center font-mono text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-md border border-gold/20 shrink-0">
                      {feat.price}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTA Button */}
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-black shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                >
                  Explore Menu
                  <ArrowUpRight className="size-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenOriginalMenu(0)}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-black/40 px-6 py-3.5 text-sm font-semibold tracking-wider uppercase text-white hover:border-gold hover:text-gold transition-colors"
                >
                  View Original Menu
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
