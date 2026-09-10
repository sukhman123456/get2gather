import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Navbar } from "@/components/site/Navbar";
import { Hero3D } from "@/components/site/Hero3D";
import { AboutExperience } from "@/components/site/AboutExperience";
import { MenuIntroSection } from "@/components/site/MenuIntroSection";
import { DigitalMenu } from "@/components/site/DigitalMenu";
import { FoodCoffeeSection } from "@/components/site/FoodCoffeeSection";
import { BambooCelebrationSection } from "@/components/site/BambooCelebrationSection";
import { Promo3DBoard } from "@/components/site/Promo3DBoard";
import { GallerySection } from "@/components/site/GallerySection";
import { ALL_GALLERY_PHOTOS } from "@/lib/galleryData";
import { Floating3DExperience } from "@/components/site/Floating3DExperience";
import { ReservationSection } from "@/components/site/ReservationSection";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { LightboxModal, LightboxImage } from "@/components/site/LightboxModal";
import { FloatingWhatsAppButton } from "@/components/site/FloatingWhatsAppButton";
import { CustomCursor } from "@/components/site/CustomCursor";
import { RestaurantWorldCanvas, RestaurantCanvasHandle } from "@/components/site/RestaurantWorldCanvas";

import { DAWAT_INFO, ORIGINAL_MENU_PAGES } from "@/lib/dawatData";

const TITLE = "Get To Gether Restaurant Gurdaspur | Good Food • Great Company";
const DESCRIPTION =
  "Experience authentic North Indian flavours, live charcoal tandoor, artisanal coffee and vibrant dining at Get To Gether Restaurant on Tibri Road, Gurdaspur, Punjab.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/uploads/official-logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: DAWAT_INFO.name,
          image: "/uploads/official-logo.jpg",
          logo: "/uploads/official-logo.jpg",
          servesCuisine: [
            "North Indian",
            "Punjabi",
            "Tandoori",
            "Mughlai",
            "Chinese",
            "Continental",
            "Coffee & Cafe",
          ],
          priceRange: "₹₹ (₹100–₹500)",
          telephone: DAWAT_INFO.phoneDisplay,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Tibri Rd, near Punjab Nursery",
            addressLocality: "Gurdaspur",
            addressRegion: "Punjab",
            postalCode: "143521",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 32.0409,
            longitude: 75.4053,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "10:00",
              closes: "23:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "147",
          },
          hasMenu: "/#menu",
        }),
      },
    ],
  }),
  component: HomePage,
});

const ZONE_NAMES = [
  "Restaurant Entrance",
  "Dining Sanctuary",
  "Mandala Feature Wall",
  "Artisanal Coffee Lounge",
  "Live Charcoal Tandoor",
  "Signature Food Showcase",
  "3D Menu Experience",
  "Signature Sips Mocktail Bar",
  "Al-Fresco Bamboo Garden",
  "Celebration Banquet Suite",
  "3D Photo Exhibition",
  "VIP Table Reservation",
];

function HomePage() {
  const canvasRef = useRef<RestaurantCanvasHandle>(null);
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Open original printed menu in lightbox
  const handleOpenOriginalMenu = (initialPageIndex: number = 0) => {
    const images: LightboxImage[] = ORIGINAL_MENU_PAGES.map((page) => ({
      id: page.id,
      title: page.title,
      subtitle: page.subtitle,
      image: page.image,
    }));
    setLightboxImages(images);
    setLightboxIndex(initialPageIndex);
    setLightboxOpen(true);
  };

  // Open photo gallery in lightbox
  const handleOpenGalleryPhoto = (initialPhotoIndex: number = 0) => {
    const images: LightboxImage[] = ALL_GALLERY_PHOTOS.map((photo) => ({
      id: photo.id,
      title: photo.title,
      subtitle: `${photo.category} — ${photo.subtitle}`,
      image: photo.image,
    }));
    setLightboxImages(images);
    setLightboxIndex(initialPhotoIndex);
    setLightboxOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-[#17110C] text-[#FFF9EF] overflow-x-hidden relative">
      {/* ── 1. Real Continuous 3D WebGL Restaurant Canvas (Three.js & GSAP ScrollTrigger) ── */}
      <RestaurantWorldCanvas
        ref={canvasRef}
        onZoneChange={(idx) => setCurrentZoneIndex(idx)}
      />

      {/* ── 2. Premium 3D Loading Screen with Drawing Copper Line ── */}
      <LoadingScreen />

      {/* ── 3. Desktop Luxury Custom Cursor with Dynamic Badges ('EXPLORE' / 'VIEW') ── */}
      <CustomCursor />

      {/* ── 4. Sticky Floating Minimal Navbar with Active 3D Room Tracker & Sound Toggle ── */}
      <Navbar currentZoneName={ZONE_NAMES[currentZoneIndex]} />

      <main className="relative z-10">
        {/* ── ZONE 0: 3D Entrance & Grand Façade Hero ── */}
        <Hero3D onOpenPoster={() => handleOpenOriginalMenu(0)} />

        {/* ── ZONE 1 & 2: Dining Sanctuary & Mandala Feature Wall + 3D Virtual Tour ── */}
        <AboutExperience
          onEnterSpace={(zoneIdx) => canvasRef.current?.flyToZone(zoneIdx)}
        />

        {/* ── ZONE 4 & 3: Live Charcoal Tandoor, Food Showcase, Coffee & Mocktails ── */}
        <FoodCoffeeSection />

        {/* ── ZONE 6: Full 3D Interactive Menu Room ── */}
        <MenuIntroSection onOpenOriginalMenu={handleOpenOriginalMenu} />
        <DigitalMenu onOpenOriginalMenu={handleOpenOriginalMenu} />

        {/* ── ZONE 8 & 9: Al-Fresco Bamboo Garden & Celebration Banquet Suite ── */}
        <BambooCelebrationSection />

        {/* ── Floating 3D Promotional Board for Specials ── */}
        <Promo3DBoard onOpenPoster={() => handleOpenOriginalMenu(5)} />

        {/* ── ZONE 10: 3D Multi-Plane Photography Exhibition ── */}
        <GallerySection onOpenPhoto={handleOpenGalleryPhoto} />

        {/* ── 3D Floating Interactive Image Space ── */}
        <Floating3DExperience />

        {/* ── ZONE 11: VIP Candlelit Table Reservation & Booking ── */}
        <ReservationSection />

        {/* ── ZONE 12: Contact, Location & Driving Directions ── */}
        <ContactSection />
      </main>

      {/* ── Footer with 3D Emblem & Luxury Copper Links ── */}
      <Footer />

      {/* ── Fullscreen Interactive Lightbox Modal ── */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* ── Floating WhatsApp Reservation CTA ── */}
      <FloatingWhatsAppButton />
    </div>
  );
}
