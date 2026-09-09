import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Coffee", href: "#coffee" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-dark py-3 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-8">
          {/* ── Brand with Official 3D Logo Emblem ── */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Get To Gether Restaurant Gurdaspur Home"
          >
            {/* Crisp 3D Logo Emblem */}
            <Logo3DEmblem size="nav" enableMouseParallax={false} />

            {/* Brand Title */}
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-xl font-bold tracking-wider text-white gold-gradient-text uppercase leading-tight">
                Get To Gether
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/70 font-mono">
                Restaurant &bull; Gurdaspur
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop Right Action CTAs ── */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone link */}
            <a
              href={DAWAT_INFO.phoneHref}
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-gold transition px-2.5 py-1 font-mono"
              title="Call Get To Gether Restaurant"
            >
              <Phone className="size-3.5 text-gold" />
              <span>{DAWAT_INFO.phoneDisplay}</span>
            </a>

            {/* Book a Table */}
            <a
              href="#reservation"
              className="inline-flex items-center gap-2 rounded-md bg-[#dfb76c] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#18120a] shadow-md shadow-black/40 transition-all duration-300 hover:bg-[#ecd299] hover:scale-105 active:scale-95"
            >
              <Calendar className="size-3.5 text-[#18120a]" />
              <span>BOOK A TABLE</span>
            </a>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex lg:hidden size-10 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white transition hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Slideout Drawer ── */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl p-6 lg:hidden"
        >
          {/* Top close bar with Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Logo3DEmblem size="nav" enableMouseParallax={false} />
              <div>
                <span className="font-display text-lg font-bold gold-gradient-text uppercase block">
                  Get To Gether
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-gold/80 block">
                  Restaurant &bull; Gurdaspur
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-4 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="font-display text-xl text-white/90 hover:text-gold transition py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="#reservation"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-primary/20"
            >
              <Calendar className="size-4" />
              Book a Table
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={DAWAT_INFO.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 py-3 text-xs font-semibold uppercase text-emerald-300"
              >
                WhatsApp
              </a>
              <a
                href={DAWAT_INFO.phoneHref}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 py-3 text-xs font-semibold uppercase text-white"
              >
                <Phone className="size-3.5 text-gold" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
