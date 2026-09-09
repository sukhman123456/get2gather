import { useState, useRef } from "react";
import {
  BookOpen,
  Sparkles,
  MessageCircle,
  Search,
} from "lucide-react";
import { REAL_PHOTOS } from "@/lib/dawatData";

interface DigitalMenuProps {
  onOpenOriginalMenu: (pageIndex: number) => void;
}

export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  price: string;
  isVeg?: boolean;
}

// ── Exact authentic menu database from uploaded menu photographs ──
const MENU_DATABASE: Record<string, MenuItemData[]> = {
  BREAKFAST: [
    { id: "bf-1", name: "Butter Toast", price: "₹79", isVeg: true },
    { id: "bf-2", name: "Channa Bhatura (2pcs.) with Pickle", description: "Fluffy bhaturas with Amritsari channa and pickle", price: "₹149", isVeg: true },
    { id: "bf-3", name: "Mix Parantha with Curd with Pickle", description: "Stuffed Punjabi parantha with fresh curd", price: "₹99", isVeg: true },
    { id: "bf-4", name: "Plain Omelette", price: "₹79", isVeg: false },
    { id: "bf-5", name: "Omelette Masala", description: "With onions, tomatoes & green chilies", price: "₹99", isVeg: false },
    { id: "bf-6", name: "Cheese Omelette", description: "Folded with melted cheese", price: "₹119", isVeg: false },
    { id: "bf-7", name: "Boiled Eggs (2pcs.)", price: "₹49", isVeg: false },
    { id: "bf-8", name: "Egg Bhurji (2 Eggs)", description: "Scrambled with chopped onions and spices", price: "₹79", isVeg: false },
    { id: "bf-9", name: "Pav Bhaji", description: "Spiced vegetable mash with buttered pav", price: "₹129", isVeg: true },
    { id: "bf-10", name: "Channa Puri (2pcs.) with Halwa", description: "With sweet suji halwa and pickle", price: "₹149", isVeg: true },
  ],
  MOCKTAILS: [
    { id: "mo-1", name: "Blue Ocean", description: "Signature layered blue citrus cooler with crushed ice", price: "₹129", isVeg: true },
    { id: "mo-2", name: "Lovers Passion", description: "Layered tropical fruit blend with fresh lime", price: "₹129", isVeg: true },
    { id: "mo-3", name: "Virgin Mojito", description: "Fresh crushed mint, lime juice & sparkling soda", price: "₹129", isVeg: true },
    { id: "mo-4", name: "Pink Lady", description: "Strawberry & rose infused sparkling cooler", price: "₹129", isVeg: true },
    { id: "mo-5", name: "Orange Delight", price: "₹129", isVeg: true },
    { id: "mo-6", name: "Mango Delight", price: "₹129", isVeg: true },
    { id: "mo-7", name: "Green Apple Soda", description: "Crisp green apple with chilled soda", price: "₹129", isVeg: true },
    { id: "mo-8", name: "Fruit Punch", description: "Blend of tropical fruit juices", price: "₹149", isVeg: true },
    { id: "mo-9", name: "Cold Coffee with Ice Cream", description: "Rich chilled espresso with vanilla scoop", price: "₹150", isVeg: true },
  ],
  "VEG PIZZA": [
    { id: "vp-1", name: "Margherita Cheese", description: "Classic tomato sauce & mozzarella cheese", price: "₹149", isVeg: true },
    { id: "vp-2", name: "Onion, Capsicum, Tomato", price: "₹159", isVeg: true },
    { id: "vp-3", name: "Farm House", description: "Sweet corn, mushrooms, bell peppers & onions", price: "₹169", isVeg: true },
    { id: "vp-4", name: "Get 2 Gather Special Pizza", description: "Tandoori paneer, olives, jalapenos & mushrooms", price: "₹209", isVeg: true },
    { id: "vp-5", name: "Cheese Chilly Pizza", description: "Spicy paneer cubes & green chilies", price: "₹189", isVeg: true },
    { id: "vp-6", name: "Mushroom Cheese Pizza", price: "₹189", isVeg: true },
  ],
  "NON-VEG PIZZA": [
    { id: "nvp-1", name: "Chilly Chicken Pizza", description: "Spiced chicken cubes with onions and capsicum", price: "₹229", isVeg: false },
    { id: "nvp-2", name: "Non Veg Farm House", description: "Roast chicken, bell peppers, onions & olives", price: "₹249", isVeg: false },
    { id: "nvp-3", name: "Chicken Tikka Pizza", description: "Tandoori chicken tikka & mozzarella", price: "₹249", isVeg: false },
    { id: "nvp-4", name: "Chicken Salami Pizza", price: "₹249", isVeg: false },
    { id: "nvp-5", name: "Barbeque Chicken Pizza", description: "Smoky BBQ glazed chicken chunks", price: "₹259", isVeg: false },
  ],
  PASTA: [
    { id: "pa-1", name: "Veg White Sauce Alfredo", description: "Penne pasta in creamy cheese sauce", price: "₹209", isVeg: true },
    { id: "pa-2", name: "Veg Red Sauce Marinara", description: "Penne pasta in tangy herb tomato sauce", price: "₹209", isVeg: true },
    { id: "pa-3", name: "Veg Pink Mix Sauce", description: "Combination of Alfredo & marinara sauce", price: "₹229", isVeg: true },
    { id: "pa-4", name: "Non-Veg White Sauce Chicken", description: "Penne with tender chicken chunks in white sauce", price: "₹269", isVeg: false },
    { id: "pa-5", name: "Non-Veg Red Sauce Chicken", description: "Chicken penne in Italian marinara sauce", price: "₹269", isVeg: false },
    { id: "pa-6", name: "Non-Veg Pink Mix Sauce Chicken", description: "Chicken penne in creamy pink sauce", price: "₹289", isVeg: false },
  ],
  CHINESE: [
    { id: "ch-1", name: "Veg Manchurian", description: "Vegetable dumplings in savory garlic soya sauce", price: "₹229", isVeg: true },
    { id: "ch-2", name: "Spring Roll", description: "Crispy rolls served with hot garlic sauce", price: "₹229", isVeg: true },
    { id: "ch-3", name: "Honey Chilly Potato", description: "Crisp potato fingers glazed in sweet honey chili", price: "₹209", isVeg: true },
    { id: "ch-4", name: "Crispy Corn", description: "Golden fried sweet corn with peppers", price: "₹219", isVeg: true },
    { id: "ch-5", name: "Chilly Paneer", description: "Fried paneer tossed with capsicum and chili sauce", price: "₹249", isVeg: true },
    { id: "ch-6", name: "Chilly Chicken", description: "Diced chicken tossed with capsicum & green chilies", price: "₹289", isVeg: false },
    { id: "ch-7", name: "Chicken Spring Roll", price: "₹269", isVeg: false },
    { id: "ch-8", name: "Chicken Manchurian", price: "₹289", isVeg: false },
    { id: "ch-9", name: "Lemon Chicken", description: "Wok-tossed in tangy lemon pepper sauce", price: "₹319", isVeg: false },
  ],
  TANDOORI: [
    { id: "tan-1", name: "Paneer Tikka", description: "Cottage cheese cubes roasted in live charcoal tandoor", price: "₹269", isVeg: true },
    { id: "tan-2", name: "Paneer Malai Tikka", description: "Cashew cream and mild cheese marinade", price: "₹289", isVeg: true },
    { id: "tan-3", name: "Paneer Achari Tikka", description: "Pickle-spiced tandoori paneer", price: "₹279", isVeg: true },
    { id: "tan-4", name: "Mushroom Tikka", description: "Marinated button mushrooms skewered and roasted", price: "₹269", isVeg: true },
    { id: "tan-5", name: "Tandoori Soya Chaap", price: "₹229", isVeg: true },
    { id: "tan-6", name: "Tandoori Chicken", description: "Classic spiced bone-in tandoori chicken", price: "₹289", isVeg: false },
    { id: "tan-7", name: "Chicken Tikka", description: "Boneless chicken chunks in robust red marinade", price: "₹329", isVeg: false },
    { id: "tan-8", name: "Chicken Malai Tikka", description: "Creamy cashew and cheese marinade", price: "₹349", isVeg: false },
    { id: "tan-9", name: "Chicken Seekh Kebab", description: "Minced spiced chicken skewers", price: "₹329", isVeg: false },
  ],
  FISH: [
    { id: "fi-1", name: "Fish Amritsari", description: "Crispy carom-seed spiced gram flour batter fry", price: "₹449", isVeg: false },
    { id: "fi-2", name: "Fish Tikka", description: "Charcoal-roasted boneless fish fillets with mint dip", price: "₹469", isVeg: false },
    { id: "fi-3", name: "Fish Achari Tikka", description: "Tangy pickled masala marinade", price: "₹469", isVeg: false },
    { id: "fi-4", name: "Fish Malai Tikka", description: "Cashew cream and cheese glaze", price: "₹489", isVeg: false },
    { id: "fi-5", name: "Fish Finger", description: "Crumbed fish batons served with tartar dip", price: "₹389", isVeg: false },
    { id: "fi-6", name: "Fish Chilly", description: "Wok-tossed fish with capsicum & soya sauce", price: "₹429", isVeg: false },
    { id: "fi-7", name: "Fish Curry", description: "Slow-simmered in tangy onion mustard gravy", price: "₹389", isVeg: false },
    { id: "fi-8", name: "Fish Kadai", price: "₹389", isVeg: false },
  ],
  MUTTON: [
    { id: "mu-1", name: "Mutton Roganjosh", description: "Kashmiri style tender lamb in aromatic gravy", price: "₹399", isVeg: false },
    { id: "mu-2", name: "Kadai Mutton", description: "Braised in kadai with roasted ground coriander", price: "₹399", isVeg: false },
    { id: "mu-3", name: "Mutton Curry", description: "Home-style tender goat curry", price: "₹399", isVeg: false },
    { id: "mu-4", name: "Rara Mutton", description: "Mutton chunks cooked inside spiced keema gravy", price: "₹469", isVeg: false },
  ],
  "MAIN COURSE": [
    { id: "mc-1", name: "Dal Makhani", description: "Slow-simmered black lentils with butter & cream", price: "₹219", isVeg: true },
    { id: "mc-2", name: "Dal Tadka", description: "Yellow lentils tempered with cumin & desi ghee", price: "₹179", isVeg: true },
    { id: "mc-3", name: "Shahi Paneer", description: "Paneer in sweet and velvety cashew gravy", price: "₹249", isVeg: true },
    { id: "mc-4", name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato butter gravy", price: "₹269", isVeg: true },
    { id: "mc-5", name: "Kadai Paneer", description: "Tossed with bell peppers and roasted kadai masala", price: "₹259", isVeg: true },
    { id: "mc-6", name: "Palak Paneer", description: "Fresh cottage cheese in pureed spinach gravy", price: "₹249", isVeg: true },
    { id: "mc-7", name: "Malai Kofta", description: "Paneer dumplings in velvety cashew gravy", price: "₹299", isVeg: true },
    { id: "mc-8", name: "Butter Chicken", description: "Tandoori chicken in creamy tomato butter sauce", price: "Half ₹369 / Full ₹579", isVeg: false },
    { id: "mc-9", name: "Kadai Chicken", description: "Chicken with capsicum & roasted kadai masala", price: "Half ₹369 / Full ₹579", isVeg: false },
    { id: "mc-10", name: "Rara Chicken", description: "Chicken cooked in thick minced chicken gravy", price: "Half ₹389 / Full ₹589", isVeg: false },
    { id: "mc-11", name: "Chicken Tikka Butter Masala", description: "Boneless roasted tikka in butter makhani gravy", price: "Half ₹389 / Full ₹579", isVeg: false },
    { id: "mc-12", name: "Get 2 Gather Chicken", description: "Chef's exclusive house special recipe", price: "₹449", isVeg: false },
  ],
  "RICE & BIRYANI": [
    { id: "rb-1", name: "Chicken Biryani", description: "Chicken biryani with raita", price: "₹379", isVeg: false },
    { id: "rb-2", name: "Chicken Dum Biryani", description: "Slow handi cooked aromatic basmati with raita", price: "₹399", isVeg: false },
    { id: "rb-3", name: "Veg Biryani", description: "Layered basmati rice with spiced vegetables and raita", price: "₹299", isVeg: true },
    { id: "rb-4", name: "Dum Veg Biryani", description: "Slow handi cooked vegetable biryani with raita", price: "₹349", isVeg: true },
    { id: "rb-5", name: "Jeera Rice", description: "Basmati rice tempered with roasted cumin seeds", price: "₹169", isVeg: true },
    { id: "rb-6", name: "Veg Pulao", description: "Fragrant rice cooked with garden vegetables", price: "₹189", isVeg: true },
    { id: "rb-7", name: "Peas Pulao", price: "₹199", isVeg: true },
    { id: "rb-8", name: "Plain Rice", description: "Steamed long-grain basmati rice", price: "₹149", isVeg: true },
  ],
  "NOODLES & RICE": [
    { id: "nr-1", name: "Veg Hakka Noodles", description: "Wok-tossed noodles with shredded vegetables", price: "₹189", isVeg: true },
    { id: "nr-2", name: "Chilly Garlic Noodles", description: "Spicy noodles tossed with burnt garlic", price: "₹199", isVeg: true },
    { id: "nr-3", name: "Veg Fried Rice", description: "Fragrant basmati wok-tossed with diced vegetables", price: "₹189", isVeg: true },
    { id: "nr-4", name: "Schezwan Fried Rice", description: "Wok-tossed with fiery Schezwan chili paste", price: "₹199", isVeg: true },
    { id: "nr-5", name: "Chicken Hakka Noodles", description: "Noodles with shredded chicken & vegetables", price: "₹249", isVeg: false },
    { id: "nr-6", name: "Chicken Fried Rice", description: "Wok-fried rice with egg & diced chicken", price: "₹249", isVeg: false },
    { id: "nr-7", name: "Egg Fried Rice", price: "₹209", isVeg: false },
  ],
  "BURGER & SANDWICH": [
    { id: "bs-1", name: "Veg Burger", description: "Seasoned vegetable patty with lettuce & mayo", price: "₹99", isVeg: true },
    { id: "bs-2", name: "Cheese Burger", description: "Topped with melted cheese slice", price: "₹119", isVeg: true },
    { id: "bs-3", name: "Chicken Burger", description: "Grilled chicken patty with spicy mayo", price: "₹169", isVeg: false },
    { id: "bs-4", name: "Veg Grilled Sandwich", description: "Toasted sandwich with spiced vegetable filling", price: "₹149", isVeg: true },
    { id: "bs-5", name: "Club Sandwich", description: "Triple layered sandwich served with potato chips", price: "₹189", isVeg: true },
    { id: "bs-6", name: "Chicken Grilled Sandwich", description: "Stuffed with shredded chicken & cheese", price: "₹219", isVeg: false },
  ],
  SIZZLER: [
    { id: "sz-1", name: "Veg Sizzler", description: "Patties, french fries, buttered rice & saute veggies", price: "₹349", isVeg: true },
    { id: "sz-2", name: "Paneer Tikka Sizzler", description: "Tandoori paneer over buttered rice with sizzler sauce", price: "₹389", isVeg: true },
    { id: "sz-3", name: "Chinese Veg Sizzler", description: "Noodles, fried rice, manchurian & crispy fries", price: "₹369", isVeg: true },
    { id: "sz-4", name: "Chicken Sizzler", description: "Grilled chicken steak, fries, rice & black pepper sauce", price: "₹449", isVeg: false },
  ],
  SOUPS: [
    { id: "sp-1", name: "Tomato Soup", description: "Rich plum tomato soup with crunchy croutons", price: "₹119", isVeg: true },
    { id: "sp-2", name: "Veg Manchow Soup", description: "Spicy garlic broth topped with crispy noodles", price: "₹129", isVeg: true },
    { id: "sp-3", name: "Veg Hot & Sour Soup", description: "Tangy and spicy broth with mushrooms", price: "₹129", isVeg: true },
    { id: "sp-4", name: "Sweet Corn Veg Soup", description: "Gentle sweet corn broth with finely diced vegetables", price: "₹129", isVeg: true },
    { id: "sp-5", name: "Chicken Manchow Soup", description: "Hearty chicken soup with crispy noodles", price: "₹159", isVeg: false },
    { id: "sp-6", name: "Chicken Hot & Sour Soup", price: "₹159", isVeg: false },
    { id: "sp-7", name: "Chicken Sweet Corn Soup", price: "₹159", isVeg: false },
  ],
  BREADS: [
    { id: "br-1", name: "Tandoori Roti", description: "Fresh from the clay oven", price: "₹15", isVeg: true },
    { id: "br-2", name: "Butter Roti", price: "₹20", isVeg: true },
    { id: "br-3", name: "Plain Naan", price: "₹40", isVeg: true },
    { id: "br-4", name: "Butter Naan", description: "Layered with pure butter", price: "₹50", isVeg: true },
    { id: "br-5", name: "Garlic Naan", description: "Infused with minced roasted garlic", price: "₹60", isVeg: true },
    { id: "br-6", name: "Lachha Parantha", description: "Multi-layered tandoori wheat bread", price: "₹45", isVeg: true },
    { id: "br-7", name: "Stuffed Kulcha", description: "Choice of Paneer, Aloo or Mix filling", price: "₹70", isVeg: true },
    { id: "br-8", name: "Missi Roti", description: "Spiced gram flour bread with coriander & onions", price: "₹35", isVeg: true },
  ],
  DESSERTS: [
    { id: "de-1", name: "Gulab Jamun (2pcs.)", description: "Warm khoya dumplings in saffron sugar syrup", price: "₹79", isVeg: true },
    { id: "de-2", name: "Ice Cream Vanilla", price: "₹79", isVeg: true },
    { id: "de-3", name: "Ice Cream with Chocolate Sauce", price: "₹99", isVeg: true },
    { id: "de-4", name: "Tutti Frutti Sundae", price: "₹149", isVeg: true },
    { id: "de-5", name: "Cold Coffee with Ice Cream", description: "Chilled espresso with vanilla ice cream", price: "₹150", isVeg: true },
  ],
};

const CATEGORIES = [
  "BREAKFAST",
  "MOCKTAILS",
  "VEG PIZZA",
  "NON-VEG PIZZA",
  "PASTA",
  "CHINESE",
  "TANDOORI",
  "FISH",
  "MUTTON",
  "MAIN COURSE",
  "RICE & BIRYANI",
  "NOODLES & RICE",
  "BURGER & SANDWICH",
  "SIZZLER",
  "SOUPS",
  "BREADS",
  "DESSERTS",
];

export function DigitalMenu({ onOpenOriginalMenu }: DigitalMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("BREAKFAST");
  const [displayedCategory, setDisplayedCategory] = useState<string>("BREAKFAST");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const categoryBarRef = useRef<HTMLDivElement>(null);

  // Smooth 3D Z-axis Category Transition: current recedes back, new comes forward
  const handleCategorySelect = (category: string) => {
    if (category === activeCategory) return;
    setIsTransitioning(true);
    setActiveCategory(category);
    // Phase 1: Old category moves backward into deep Z space
    setTimeout(() => {
      setDisplayedCategory(category);
      // Phase 2: New category comes forward toward the viewer
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 240);
  };

  // Filter items by category & search query
  const rawItems = MENU_DATABASE[displayedCategory] || [];
  const itemsToDisplay = searchQuery.trim()
    ? Object.values(MENU_DATABASE)
        .flat()
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    : rawItems;

  // Real food photographs that belong to Get To Gether Restaurant ONLY
  const chefsPicks = [
    {
      id: "pick-1",
      title: "Blue Ocean Mocktail",
      subtitle: "Layered citrus & mint cooler handcrafted at the bar",
      price: "₹129",
      image: REAL_PHOTOS.mocktailDrink,
      tag: "Signature Drink",
    },
    {
      id: "pick-2",
      title: "Artisanal Cappuccino",
      subtitle: "Freshly brewed espresso with rich golden crema",
      price: "₹99",
      image: REAL_PHOTOS.coffeeCappuccino,
      tag: "Cafe Lounge",
    },
    {
      id: "pick-3",
      title: "Family Feasts & Celebrations",
      subtitle: "Live charcoal tandoori platters, rich curries & gatherings",
      price: "Party Specials",
      image: REAL_PHOTOS.celebrationParty,
      tag: "Celebration Lounge",
    },
  ];

  return (
    <section
      id="menu"
      className="relative bg-[#0c0a08] text-[#f7f2ea] py-24 sm:py-32 overflow-hidden border-t border-[#dfb76c]/15"
    >
      {/* ── Background Subtle Lighting: Deep espresso / almost black ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(38,28,20,0.45)_0%,rgba(12,10,8,0.98)_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 size-[500px] rounded-full bg-[#dfb76c]/5 blur-[160px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════
            MENU HEADER
            ════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#dfb76c]/30 bg-[#dfb76c]/10 mb-4">
            <Sparkles className="size-3 text-[#dfb76c]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#dfb76c]">
              Get To Gether Restaurant &bull; Gurdaspur
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#f7f2ea]">
            THE MENU
          </h2>

          <p className="mt-3 font-serif text-xl sm:text-2xl text-[#dfb76c] italic font-light">
            &ldquo;Good Food. Great Company.&rdquo;
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#bdae9c] leading-relaxed font-light max-w-xl mx-auto">
            Explore our selection of dishes, crafted for every gathering.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
            FEATURED DISHES: CHEF'S PICKS (2-3 Large Premium Cards)
            Real food photography only
            ════════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-[#dfb76c]" />
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#dfb76c]">
              CHEF&apos;S PICKS
            </h3>
            <span className="h-px flex-1 bg-[#dfb76c]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {chefsPicks.map((pick) => (
              <div
                key={pick.id}
                className="group relative overflow-hidden rounded-2xl border border-[#dfb76c]/25 bg-gradient-to-b from-[#1c1611] to-[#120e0b] p-3.5 transition-all duration-300 hover:border-[#dfb76c]/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(223,183,108,0.2)]"
              >
                {/* Real Photo */}
                <div className="relative overflow-hidden rounded-xl aspect-[16/11] bg-black/60">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-2.5 left-2.5 rounded-full border border-[#dfb76c]/40 bg-black/80 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#dfb76c] backdrop-blur-md">
                    {pick.tag}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded-md border border-[#dfb76c]/40 bg-black/90 px-2.5 py-1 font-mono text-xs font-bold text-[#dfb76c] shadow-lg">
                    {pick.price}
                  </span>
                </div>

                <div className="mt-3 px-1">
                  <h4 className="font-serif text-base font-bold text-[#f7f2ea] group-hover:text-[#dfb76c] transition-colors">
                    {pick.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#bdae9c] leading-relaxed font-light">
                    {pick.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            CATEGORY BAR: Horizontal Navigation (Mobile Scrollable Chips)
            ════════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="relative border-b border-[#dfb76c]/20 pb-3">
            <div
              ref={categoryBarRef}
              className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x select-none"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat && !searchQuery;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      handleCategorySelect(cat);
                    }}
                    className={`relative shrink-0 snap-start px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#dfb76c] to-[#c99352] text-black font-extrabold shadow-[0_0_20px_rgba(223,183,108,0.4)] scale-105"
                        : "bg-[#17120e] text-[#cfc5b6] hover:text-white hover:bg-[#241c15] border border-[#dfb76c]/20"
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <span className="absolute -bottom-3 inset-x-2 h-0.5 bg-[#dfb76c] rounded-full shadow-[0_0_8px_#dfb76c]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Search Bar (Optional quick filter) ── */}
        <div className="relative mb-10 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#dfb76c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specific dish (e.g. Chicken Biryani, Butter Chicken, Mojito)..."
            className="w-full rounded-xl border border-[#dfb76c]/20 bg-[#14100c] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#f7f2ea] placeholder:text-[#8f8272] focus:border-[#dfb76c] focus:outline-none focus:ring-1 focus:ring-[#dfb76c]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8f8272] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            MENU ITEMS: 3D Animated Grid
            Old cards move backward in Z-axis + fade slightly
            New cards come forward from Z-axis + fade in (300-500ms)
            ════════════════════════════════════════════════════════════ */}
        <div
          style={{
            transform: isTransitioning
              ? "perspective(1200px) translateZ(-80px) rotateX(3deg) scale(0.94)"
              : "perspective(1200px) translateZ(0px) rotateX(0deg) scale(1)",
            opacity: isTransitioning ? 0.2 : 1,
            transition: "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease",
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-1200 preserve-3d will-change-transform"
        >
          {itemsToDisplay.map((item) => (
            <MenuCard3D key={item.id} item={item} />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════
            ORIGINAL MENU: Secondary button to open original photos in lightbox
            ════════════════════════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#dfb76c]/15 text-center">
          <button
            type="button"
            onClick={() => onOpenOriginalMenu(0)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#dfb76c]/40 bg-[#1a140f] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#dfb76c] shadow-lg shadow-black transition-all duration-300 hover:border-[#dfb76c] hover:bg-[#dfb76c] hover:text-black hover:scale-105 active:scale-95"
          >
            <BookOpen className="size-4 transition-transform group-hover:rotate-12" />
            <span>VIEW ORIGINAL MENU</span>
            <span className="text-[10px] opacity-75 font-normal">(Uploaded Photographs)</span>
          </button>
          <p className="mt-3 text-xs text-[#8f8272] max-w-sm mx-auto">
            View the high-resolution scanned photographs of our authentic printed dining menu.
          </p>
        </div>

      </div>
    </section>
  );
}

// ── 3D Interactive Menu Card ──
function MenuCard3D({ item }: { item: MenuItemData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const whatsappHref = `https://wa.me/919988604160?text=${encodeURIComponent(
    `Hello Get To Gether Restaurant, I would like to order: ${item.name} (${item.price}).`
  )}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(800px) translateY(-4px) translateZ(12px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "perspective(800px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg)",
        boxShadow: isHovered
          ? "0 18px 36px -8px rgba(0, 0, 0, 0.95), 0 0 22px -4px rgba(223, 183, 108, 0.22)"
          : "0 6px 16px -4px rgba(0, 0, 0, 0.7)",
        borderColor: isHovered ? "rgba(223, 183, 108, 0.55)" : "rgba(223, 183, 108, 0.16)",
        transition:
          "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      className="group relative flex flex-col justify-between rounded-xl border bg-gradient-to-b from-[#18130f]/90 to-[#120e0b]/95 p-5 backdrop-blur-md will-change-transform"
    >
      <div>
        {/* Top line: Name and Veg Indicator */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            {item.isVeg !== undefined && (
              <span
                className={`mt-1 flex size-3 shrink-0 items-center justify-center rounded-sm border p-0.5 ${
                  item.isVeg ? "border-emerald-500" : "border-red-500"
                }`}
                title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    item.isVeg ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
              </span>
            )}
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#f7f2ea] group-hover:text-[#dfb76c] transition-colors leading-snug">
              {item.name}
            </h4>
          </div>

          {/* Price Tag */}
          <span className="font-mono text-base font-bold text-[#dfb76c] shrink-0">
            {item.price}
          </span>
        </div>

        {/* Description: ONLY IF PRESENT IN ORIGINAL MENU */}
        {item.description && (
          <p className="mt-1.5 text-xs text-[#cfc5b6] font-sans leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Bottom Subtle Order Action */}
      <div className="mt-4 pt-3 border-t border-[#dfb76c]/10 flex items-center justify-between text-xs">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8f8272]">
          Get To Gether
        </span>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
        >
          <MessageCircle className="size-3.5" />
          <span>Order</span>
        </a>
      </div>
    </div>
  );
}
