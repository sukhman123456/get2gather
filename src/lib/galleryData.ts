import { REAL_PHOTOS } from "./dawatData";

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "INTERIORS" | "AMBIENCE" | "COFFEE" | "DINING" | "EXTERIOR" | "FOOD / MENU";
  subtitle: string;
  image: string;
  aspect: "tall" | "wide" | "square" | "normal";
}

export const ALL_GALLERY_PHOTOS: GalleryPhoto[] = [
  // ── Authentic Get To Gether Restaurant Gurdaspur Photos ──
  {
    id: "gtg-1",
    title: "Artisanal Cafe Lighting & Coffee Lounge",
    category: "COFFEE",
    subtitle: "Overhead rustic wooden beams with amber ribbed globe pendants and signature Coffee wall art",
    image: REAL_PHOTOS.gurdaspurCafeCeiling,
    aspect: "tall",
  },
  {
    id: "gtg-2",
    title: "Outdoor Bamboo Garden Terrace",
    category: "EXTERIOR",
    subtitle: "Shaded bamboo cane pergola with relaxed garden benches and lush green planters",
    image: REAL_PHOTOS.gurdaspurBambooGarden,
    aspect: "tall",
  },
  {
    id: "gtg-3",
    title: "Mandala Patterned Feature Wall Dining",
    category: "AMBIENCE",
    subtitle: "Vibrant mandala accent wall with modern spherical chandelier and plush olive green seating",
    image: REAL_PHOTOS.gurdaspurMandalaWall,
    aspect: "tall",
  },
  {
    id: "gtg-4",
    title: "Luxury Dining Sanctuary & Booth Lounge",
    category: "DINING",
    subtitle: "Plush leather booth seating, warm glowing chandeliers and intimate ambient dining atmosphere",
    image: REAL_PHOTOS.luxuryDiningLounge,
    aspect: "wide",
  },
  {
    id: "gtg-sizzler",
    title: "Charcoal Sizzling Tandoori Platter & Kebabs",
    category: "FOOD / MENU",
    subtitle: "Sizzling cast-iron platter with charcoal-grilled Paneer & Chicken Tikka, charred peppers and mint chutney",
    image: REAL_PHOTOS.tandooriSizzler,
    aspect: "wide",
  },
  {
    id: "gtg-punjabi-feast",
    title: "Royal Punjabi Handi Dal Makhani & Garlic Naan",
    category: "FOOD / MENU",
    subtitle: "Slow-simmered rich Dal Makhani with fresh cream, golden buttered garlic naan and fragrant pulao",
    image: REAL_PHOTOS.punjabiRoyalFeast,
    aspect: "wide",
  },
  {
    id: "gtg-pizza-pasta",
    title: "Artisan Wood-Fired Pizza & Creamy Alfredo Pasta",
    category: "FOOD / MENU",
    subtitle: "Crispy blistered gourmet pizza with mozzarella & fresh basil, alongside silky fettuccine alfredo",
    image: REAL_PHOTOS.pizzaPastaFeast,
    aspect: "wide",
  },
  {
    id: "gtg-vip-table",
    title: "VIP Reserved Candlelight Dining Table",
    category: "DINING",
    subtitle: "Fine glassware, warm candlelight, fresh floral arrangement and premium leather seating",
    image: REAL_PHOTOS.vipReservation,
    aspect: "square",
  },
  {
    id: "gtg-5",
    title: "Handcrafted Layered Coolers & Mocktails",
    category: "FOOD / MENU",
    subtitle: "Signature layered Blue Ocean citrus cooler garnished with fresh lemon, served on the counter",
    image: REAL_PHOTOS.mocktailDrink,
    aspect: "tall",
  },
  {
    id: "gtg-6",
    title: "Freshly Frothed Artisanal Cappuccino",
    category: "COFFEE",
    subtitle: "Steaming hot cappuccino with creamy golden crema, served with natural brown sugar",
    image: REAL_PHOTOS.coffeeCappuccino,
    aspect: "normal",
  },
  {
    id: "gtg-7",
    title: "Festive Celebration & Party Hall",
    category: "AMBIENCE",
    subtitle: "Custom superhero & balloon arch celebration setups for birthdays and family gatherings",
    image: REAL_PHOTOS.celebrationParty,
    aspect: "square",
  },
  {
    id: "gtg-8",
    title: "Official Specials & Food Highlights Poster",
    category: "FOOD / MENU",
    subtitle: "Get 2 Gather Breakfast, Handcrafted Mocktails, Veg Pizzas, Pastas & Tandoori",
    image: REAL_PHOTOS.breakfastPoster,
    aspect: "tall",
  },
  {
    id: "gtg-9",
    title: "Printed Menu: Breakfast & Mocktails",
    category: "FOOD / MENU",
    subtitle: "Authentic printed menu with morning toasts, paranthas, mocktails and gourmet pizzas",
    image: REAL_PHOTOS.menuPage1,
    aspect: "tall",
  },
  {
    id: "gtg-10",
    title: "Printed Menu: Pizzas, Pastas & Tit Bites",
    category: "FOOD / MENU",
    subtitle: "Authentic printed menu with Non-Veg pizzas, Italian pastas, burgers and sizzlers",
    image: REAL_PHOTOS.menuPage2,
    aspect: "tall",
  },
  {
    id: "gtg-11",
    title: "Printed Menu: Chinese & Tandoori Starters",
    category: "FOOD / MENU",
    subtitle: "Authentic printed menu with Chinese delicacies, Amritsari Fish and tandoori tikka",
    image: REAL_PHOTOS.menuPage3,
    aspect: "tall",
  },
  {
    id: "gtg-12",
    title: "Printed Menu: Main Course Gravies & Biryani",
    category: "FOOD / MENU",
    subtitle: "Authentic printed menu with Butter Chicken, Dal Makhani, Mutton and Dum Biryani",
    image: REAL_PHOTOS.menuPage4,
    aspect: "tall",
  },
];
