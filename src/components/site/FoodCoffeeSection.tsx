import { useState } from "react";
import { Coffee, Flame, Sparkles, GlassWater, ArrowUpRight, MessageCircle } from "lucide-react";
import { REAL_PHOTOS, DAWAT_INFO } from "@/lib/dawatData";
import { Reveal } from "./Reveal";

interface SignatureDish {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: "dish-1",
    name: "Special Tandoori Sizzler Platter",
    category: "Tandoori Starters",
    description:
      "Smoky charcoal-roasted paneer & chicken tikkas, seekh kebabs on a steaming hot sizzler plate with mint chutney.",
    price: "₹340",
    image: REAL_PHOTOS.tandooriSizzler,
  },
  {
    id: "dish-2",
    name: "Punjabi Royal Feast & Dal Makhani",
    category: "Main Course Punjabi",
    description:
      "Slow-simmered black lentils in white butter and cream, accompanied by rich royal handi gravies and tandoori rotis.",
    price: "₹280",
    image: REAL_PHOTOS.punjabiRoyalFeast,
  },
  {
    id: "dish-3",
    name: "Gourmet Wood-Fired Pizza & Pasta",
    category: "Italian & Continental",
    description:
      "Hand-stretched stone oven pizza loaded with mozzarella and gourmet toppings, paired with creamy Italian penne arrabbiata.",
    price: "₹260",
    image: REAL_PHOTOS.pizzaPastaFeast,
  },
  {
    id: "dish-4",
    name: "Blue Ocean Layered Cooler",
    category: "Signature Sips",
    description:
      "Chilled ocean curacao, crushed ice crystals, muddled garden mint, and sparkling citrus fizz.",
    price: "₹120",
    image: REAL_PHOTOS.mocktailDrink,
  },
];

export function FoodCoffeeSection() {
  const [hoveredDish, setHoveredDish] = useState<string | null>(null);

  const handleOrderWhatsApp = (dishName: string) => {
    const text = encodeURIComponent(
      `Hello Get To Gether Restaurant, I would like to order "${dishName}" for dining / takeaway.`
    );
    window.open(`https://wa.me/${DAWAT_INFO.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── SECTION A: LIVE CHARCOAL TANDOOR ── */}
        <div id="tandoor" className="mb-28">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B88952]/40 bg-[#2A1D14]/80 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(184,137,82,0.15)]">
                <Flame className="size-3.5 text-[#B88952]" />
                <span className="text-[10.5px] font-sans font-bold tracking-[0.3em] text-[#D8B477] uppercase">
                  CLAY OVEN MASTERY
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#FFF9EF]">
                LIVE CHARCOAL TANDOOR
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#F3E8D2]/90">
                &ldquo;Fire, smoke and flavour.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm text-[#D3C4AF] leading-relaxed font-light">
                Traditional earthenware clay pots fired with slow-burning glowing charcoal embers.
                Marinated meats, fresh paneer, and fluffy buttery naans blistered to perfection.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── SECTION B: SIGNATURE FOOD SHOWCASE ── */}
        <div className="mb-28">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#B88952]/25 pb-4 mb-10">
              <div>
                <span className="text-xs font-sans font-bold tracking-[0.35em] text-[#B88952] uppercase block mb-1">
                  FLOATING 3D PRESENTATION
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF9EF]">
                  Signature Culinary Creations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#D3C4AF] mt-2 sm:mt-0 font-light">
                Hover to inspect 3D depth &bull; Click &lsquo;Order Now&rsquo; to order directly
              </p>
            </div>
          </Reveal>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <Reveal key={dish.id} delay={120 * idx}>
                <div
                  onMouseEnter={() => setHoveredDish(dish.id)}
                  onMouseLeave={() => setHoveredDish(null)}
                  className="group relative overflow-hidden rounded-2xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#D8B477] hover:bg-[#2A1D14] hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(184,137,82,0.3)] hover:-translate-y-2 flex flex-col justify-between perspective-1000"
                >
                  {/* Photo with 3D Depth Hover */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-[#B88952]/20">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17110C] via-transparent to-transparent opacity-85" />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 rounded-full border border-[#B88952]/40 bg-[#17110C]/85 px-3.5 py-1 backdrop-blur-md">
                      <span className="font-display text-sm font-bold text-[#D8B477]">
                        {dish.price}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] font-sans font-bold tracking-widest text-[#D8B477] uppercase bg-[#17110C]/80 px-2.5 py-1 rounded border border-[#B88952]/30">
                        {dish.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="mt-5">
                    <h4 className="font-display text-xl font-bold text-[#FFF9EF] group-hover:text-[#D8B477] transition-colors">
                      {dish.name}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light line-clamp-2">
                      {dish.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#B88952]/20">
                      <span className="text-xs text-[#D3C4AF] font-serif italic">
                        Freshly Prepared to Order
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOrderWhatsApp(dish.name)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#B88952] px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#17110C] transition-all duration-300 hover:bg-[#D8B477] hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                      >
                        <MessageCircle className="size-3.5" />
                        <span>ORDER NOW</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── SECTION C: COFFEE LOUNGE & SIGNATURE SIPS ── */}
        <div id="coffee" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Coffee Experience Card */}
          <Reveal>
            <div className="group relative h-full rounded-2xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#D8B477] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
              <div>
                <div className="flex items-center gap-2 text-[#D8B477] mb-3">
                  <Coffee className="size-5" />
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]">
                    ARTISANAL ROASTS
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF9EF]">
                  COFFEE &amp; CONVERSATIONS
                </h3>

                <p className="mt-2 font-serif italic text-base sm:text-lg text-[#D8B477]">
                  &ldquo;Every cup is an invitation to pause.&rdquo;
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light">
                  From steaming espresso with velvety crema to thick chilled coffees with rich ice
                  cream, our coffee lounge is crafted for meaningful pauses and conversations.
                </p>

                {/* Offerings list */}
                <div className="mt-6 space-y-2.5 border-t border-[#B88952]/20 pt-4">
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Hot Artisanal Coffee</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹50</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Chilled Cold Coffee</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹90</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Cold Coffee with Ice Cream</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹150</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-[#B88952]/20">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#B88952] px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#17110C] hover:bg-[#D8B477] transition-all hover:scale-105"
                >
                  <span>EXPLORE COFFEE</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#B88952]/40 bg-[#17110C]/80 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FFF9EF] hover:border-[#D8B477] hover:text-[#D8B477] transition-all"
                >
                  <span>VIEW MENU</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Mocktails Experience Card */}
          <Reveal delay={150}>
            <div className="group relative h-full rounded-2xl border border-[#B88952]/30 bg-[#2A1D14]/85 p-8 backdrop-blur-md flex flex-col justify-between hover:border-[#D8B477] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
              <div>
                <div className="flex items-center gap-2 text-[#55ccff] mb-3">
                  <GlassWater className="size-5" />
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#D8B477]">
                    HANDCRAFTED REFRESHMENT
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF9EF]">
                  SIGNATURE SIPS
                </h3>

                <p className="mt-2 font-serif italic text-base sm:text-lg text-[#D8B477]">
                  &ldquo;Handcrafted coolers &amp; mocktails.&rdquo;
                </p>

                <p className="mt-4 text-xs sm:text-sm text-[#F3E8D2]/80 leading-relaxed font-light">
                  Vibrant, refreshing, and muddled with garden mint, citrus zest, and tropical fruit
                  nectars. Perfect companions for tandoori platters and summer afternoons.
                </p>

                {/* Offerings list */}
                <div className="mt-6 space-y-2.5 border-t border-[#B88952]/20 pt-4">
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Virgin Mojito &bull; Mint &amp; Lime</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹110</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Blue Ocean Cooler &bull; Layered Fizz</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹120</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-[#FFF9EF]">
                    <span>Lovers Passion &bull; Exotic Fruit Blend</span>
                    <span className="font-mono text-[#D8B477] font-semibold">₹130</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-[#B88952]/20">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#B88952] px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#17110C] hover:bg-[#D8B477] transition-all hover:scale-105"
                >
                  <span>ORDER MOCKTAILS</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
