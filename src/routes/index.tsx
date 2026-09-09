import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Navbar } from "@/components/site/Navbar";
import { Hero3D } from "@/components/site/Hero3D";
import { AboutExperience } from "@/components/site/AboutExperience";
import { MenuIntroSection } from "@/components/site/MenuIntroSection";
import { DigitalMenu } from "@/components/site/DigitalMenu";
import { FoodCoffeeSection } from "@/components/site/FoodCoffeeSection";
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

function HomePage() {
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
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── 3. Premium Loading Screen with Official 3D Logo & Light Sweep ── */}
      <LoadingScreen />

      {/* ── Subtle Desktop Custom Cursor & Ambient Candlelight Follower ── */}
      <CustomCursor />

      {/* ── 2. Sticky Premium Navbar with crisp, uncropped 3D Logo Emblem ── */}
      <Navbar />

      <main>
        {/* ── 1 & 4. Premium 3D Hero with Floating 3D Logo Emblem & 3D Promotional Board ── */}
        <Hero3D onOpenPoster={() => handleOpenOriginalMenu(0)} />

        {/* ── The Get To Gether Experience: Ambience, dining, family, celebrations ── */}
        <AboutExperience />

        {/* ── Premium Menu Intro Section (Replaces Old Featured Board) ── */}
        <MenuIntroSection onOpenOriginalMenu={handleOpenOriginalMenu} />

        {/* ── Digital Menu with exact items, prices, search, filters & original menu lightbox ── */}
        <DigitalMenu onOpenOriginalMenu={handleOpenOriginalMenu} />

        {/* ── Food & Coffee Section: "More Than A Meal" with 3D floating presentation ── */}
        <div id="coffee">
          <FoodCoffeeSection />
        </div>

        {/* ── 3D Promotion: Floating 3D Promotional Board for Specials ── */}
        <Promo3DBoard onOpenPoster={() => handleOpenOriginalMenu(5)} />

        {/* ── Gallery: All real photos including Gurdaspur cafe & garden patio ── */}
        <GallerySection onOpenPhoto={handleOpenGalleryPhoto} />

        {/* ── 3D Floating Image Space ── */}
        <Floating3DExperience />

        {/* ── Book a Table: WhatsApp reservation form & Call Now ── */}
        <ReservationSection />

        {/* ── Contact Section: Map, directions, WhatsApp, Facebook ── */}
        <ContactSection />
      </main>

      {/* ── 5. Footer with Official 3D Logo Emblem ── */}
      <Footer />

      {/* ── Fullscreen Interactive Lightbox Modal ── */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* ── Persistent Floating WhatsApp CTA (Desktop & Mobile) ── */}
      <FloatingWhatsAppButton />
    </div>
  );
}
