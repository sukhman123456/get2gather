export interface RestaurantInfo {
  name: string;
  tagline: string;
  subtagline: string;
  address: string;
  city: string;
  state: string;
  phoneDisplay: string;
  phoneHref: string;
  landlineDisplay: string;
  landlineHref: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappHref: string;
  facebookUrl: string;
  facebookHandle: string;
  instagramUrl: string;
  instagramHandle: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  openingHours: string;
  rating: number;
  reviewsCount: number;
  logo: string;
}

export const DAWAT_INFO: RestaurantInfo = {
  name: "Get To Gether Restaurant",
  tagline: "Good Food. Great Company.",
  subtagline: "Authentic North Indian & Multi-Cuisine Dining, Live Charcoal Tandoor & Coffee Lounge in Gurdaspur",
  address: "Tibri Rd, near Punjab Nursery, Gurdaspur, Punjab 143521",
  city: "Gurdaspur",
  state: "Punjab",
  phoneDisplay: "+91 99886 04160",
  phoneHref: "tel:+919988604160",
  landlineDisplay: "094637 17523",
  landlineHref: "tel:+919463717523",
  whatsappNumber: "919988604160",
  whatsappDisplay: "+91 99886 04160",
  whatsappHref:
    "https://wa.me/919988604160?text=Hello%20Get%20To%20Gether%20Restaurant,%20I%20would%20like%20to%20book%20a%20table.",
  facebookUrl: "https://www.facebook.com/GetToGetherRestaurantGurdaspur",
  facebookHandle: "@GetToGetherRestaurantGurdaspur",
  instagramUrl: "https://www.instagram.com/get2gather.gsp/",
  instagramHandle: "@get2gather.gsp",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Get To Gether Restaurant, Tibri Road, near Punjab Nursery, Gurdaspur, Punjab 143521"),
  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Tibri Road, near Punjab Nursery, Gurdaspur, Punjab 143521") +
    "&output=embed",
  openingHours: "10:00 AM – 11:00 PM (Everyday)",
  rating: 4.5,
  reviewsCount: 147,
  logo: "/uploads/official-logo.jpg",
};

// All real restaurant photos & official 3D emblem
export const REAL_PHOTOS = {
  // Official 3D physical emblem logo
  officialLogo: "/uploads/official-logo.jpg",

  // Real photos of Get To Gether Restaurant Gurdaspur
  gurdaspurCafeCeiling: "/uploads/gurdaspur-cafe-ceiling.jpg",
  gurdaspurDiningCustomer: "/uploads/gtg-luxury-dining-lounge.jpg",
  luxuryDiningLounge: "/uploads/gtg-luxury-dining-lounge.jpg",
  gurdaspurMandalaWall: "/uploads/gurdaspur-mandala-wall.jpg",
  gurdaspurBambooGarden: "/uploads/gurdaspur-bamboo-garden.jpg",
  mocktailDrink: "/uploads/gtg-mocktail-drink.jpg",
  coffeeCappuccino: "/uploads/gtg-coffee-cappuccino.jpg",
  celebrationParty: "/uploads/gtg-party-celebration.jpg",
  breakfastPoster: "/uploads/gtg-breakfast-poster.jpg",
  heroLuxuryAmbience: "/uploads/hero-luxury-ambience.jpg",

  // Signature culinary & dining visuals
  tandooriSizzler: "/uploads/gtg-tandoori-sizzler.jpg",
  punjabiRoyalFeast: "/uploads/gtg-punjabi-royal-feast.jpg",
  pizzaPastaFeast: "/uploads/gtg-pizza-pasta-feast.jpg",
  vipReservation: "/uploads/gtg-vip-reservation.jpg",

  // Aliases for seamless component compatibility
  heroInterior: "/uploads/hero-luxury-ambience.jpg",
  interiorStoneWall: "/uploads/gurdaspur-mandala-wall.jpg",
  skyLoungeTerrace: "/uploads/gurdaspur-bamboo-garden.jpg",
  reservedDiningHall: "/uploads/gtg-vip-reservation.jpg",
  celebrationPartyHall: "/uploads/gtg-party-celebration.jpg",
  mocktailTandooriTable: "/uploads/gtg-tandoori-sizzler.jpg",
  punjabiSaagRotiDish: "/uploads/gtg-punjabi-royal-feast.jpg",
  barReceptionCounter: "/uploads/gurdaspur-cafe-ceiling.jpg",
  menuPosterBreakfast: "/uploads/gtg-breakfast-poster.jpg",

  // Menu printed pages (high-res for lightbox and viewing)
  menuPage1: "/uploads/media_1788981666919.jpg",
  menuPage2: "/uploads/gtg-menu-page-2.jpg",
  menuPage3: "/uploads/media_1788981667068.jpg",
  menuPage4: "/uploads/media_1788981667132.jpg",
  menuPage5: "/uploads/media_1788981667148.jpg",
  menuBar: "/uploads/gtg-breakfast-poster.jpg",
};

export const ORIGINAL_MENU_PAGES = [
  {
    id: 1,
    title: "Page 1: Breakfast, Mocktails & Veg Pizzas",
    subtitle: "Morning toasts, paranthas, omelettes, handcrafted mocktails & pizzas",
    image: REAL_PHOTOS.menuPage1,
  },
  {
    id: 2,
    title: "Page 2: Non-Veg Pizza, Pasta, Tit Bites, Burgers & Noodles",
    subtitle: "Italian pastas, crispy tit bites, sizzlers, and Chinese noodles & fried rice",
    image: REAL_PHOTOS.menuPage2,
  },
  {
    id: 3,
    title: "Page 3: Soups, Chinese Specialties, Fresh Fish & Tandoori Starters",
    subtitle: "Hot soups, Manchurian, Crispy Chicken, Amritsari Fish, Paneer & Mushroom Tikka",
    image: REAL_PHOTOS.menuPage3,
  },
  {
    id: 4,
    title: "Page 4: Tandoori Fish, Main Course Veg & Non-Veg, Mutton & Biryani",
    subtitle: "Dal Makhani, Butter Chicken, Kadai Paneer, Rara Mutton, Fish Curry & Veg Biryani",
    image: REAL_PHOTOS.menuPage4,
  },
  {
    id: 5,
    title: "Page 5: Non-Veg Biryani, Fresh Salads, Tandoori Breads & Desserts",
    subtitle: "Dum Chicken Biryani, Butter Naan, Missi Roti, Gulab Jamun, Ice Creams & Sundaes",
    image: REAL_PHOTOS.menuPage5,
  },
  {
    id: 6,
    title: "Official Specials & Food Highlights Poster",
    subtitle: "Handcrafted Mocktails, Veg Pizzas, Pastas, Chinese Veg & Fish Tandoori",
    image: REAL_PHOTOS.breakfastPoster,
  },
];
