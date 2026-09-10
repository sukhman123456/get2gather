import { useState, useEffect } from "react";
import { Menu, X, Calendar, Phone } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";
import { AmbientSoundToggle } from "./AmbientSoundToggle";

interface NavbarProps {
  currentZoneName?: string;
}

const navLinks = [
  { label: "HOME", href: "#top" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "MENU", href: "#menu" },
  { label: "COFFEE", href: "#coffee" },
  { label: "GALLERY", href: "#gallery" },
  { label: "RESERVE", href: "#reservation" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar({ currentZoneName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#top");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple hash tracking for active link
      const sections = ["#contact", "#reservation", "#gallery", "#coffee", "#menu", "#experience", "#top"];
      for (const s of sections) {
        const el = document.querySelector(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveHash(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-dark py-2.5 shadow-2xl shadow-black/90 border-b border-[#B88952]/20"
            : "bg-gradient-to-b from-[#17110C]/95 via-[#17110C]/60 to-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* ── Brand with 3D Logo Emblem ── */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Get To Gether Restaurant Gurdaspur Home"
          >
            <Logo3DEmblem size="nav" enableMouseParallax={false} />

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-base sm:text-lg font-bold tracking-wider text-[#FFF9EF] uppercase leading-tight group-hover:text-[#D8B477] transition-colors">
                  Get To Gether
                </span>
                <span className="font-gurmukhi text-[10.5px] sm:text-xs font-semibold text-[#D8B477]">
                  ਗੈੱਟ ਟੂਗੈਦਰ
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D3C4AF] font-sans flex items-center gap-1">
                <span>Restaurant</span>
                <span>&bull;</span>
                <span>Gurdaspur</span>
              </span>
            </div>
          </a>

          {/* ── Current 3D Camera Room Badge (Desktop) ── */}
          {currentZoneName && (
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-[#B88952]/30 bg-[#2A1D14]/80 px-3 py-1 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#D8B477] animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#F3E8D2] uppercase">
                {currentZoneName}
              </span>
            </div>
          )}

          {/* ── Minimal Navigation Links ── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200 py-1 ${
                    isActive ? "text-[#D8B477]" : "text-[#F3E8D2]/80 hover:text-[#FFF9EF]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D8B477] rounded-full shadow-[0_0_8px_#D8B477]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Right Actions: Sound & Book a Table ── */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Synthesizer Toggle */}
            <AmbientSoundToggle />

            {/* Book a Table CTA */}
            <a
              href="#reservation"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#B88952] to-[#D8B477] px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#17110C] shadow-[0_4px_15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Calendar className="size-3.5" />
              <span>BOOK A TABLE</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex size-9 items-center justify-center rounded-lg border border-[#B88952]/30 bg-[#2A1D14]/80 text-[#FFF9EF]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay Navigation ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-[#17110C]/95 backdrop-blur-2xl pt-24 px-6 pb-8 lg:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-xl font-bold tracking-wider text-[#FFF9EF] hover:text-[#D8B477] border-b border-[#B88952]/15 pb-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#B88952] py-3 text-xs font-bold uppercase tracking-wider text-[#17110C]"
            >
              <Calendar className="size-4" />
              <span>BOOK A TABLE</span>
            </a>

            <a
              href={DAWAT_INFO.phoneHref}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#B88952]/30 py-3 text-xs font-bold uppercase tracking-wider text-[#FFF9EF]"
            >
              <Phone className="size-4 text-[#D8B477]" />
              <span>{DAWAT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
