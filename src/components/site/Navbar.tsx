import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { DAWAT_INFO } from "@/lib/dawatData";
import { Logo3DEmblem } from "./Logo3DEmblem";

const navLinks = [
  { label: "Home", punjabi: "ਮੁੱਖ ਪੰਨਾ", href: "#top" },
  { label: "About", punjabi: "ਸਾਡੇ ਬਾਰੇ", href: "#about" },
  { label: "Menu", punjabi: "ਮੀਨੂ", href: "#menu" },
  { label: "Coffee", punjabi: "ਕੈਫੇ", href: "#coffee" },
  { label: "Gallery", punjabi: "ਗੈਲਰੀ", href: "#gallery" },
  { label: "Reserve", punjabi: "ਬੁਕਿੰਗ", href: "#reservation" },
  { label: "Contact", punjabi: "ਸੰਪਰਕ", href: "#contact" },
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
            ? "glass-dark py-2.5 sm:py-3 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-[#0E1110]/95 via-[#0E1110]/60 to-transparent py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-8">
          {/* ── Brand with Official 3D Logo Emblem & Punjabi Monogram ── */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Get To Gether Restaurant Gurdaspur Home"
          >
            {/* Crisp 3D Logo Emblem */}
            <Logo3DEmblem size="nav" enableMouseParallax={false} />

            {/* Royal Gurmukhi Monogram Badge */}
            <div className="hidden sm:flex size-9 items-center justify-center rounded-lg border border-[#D6A84F]/60 bg-gradient-to-b from-[#2A0E12] via-[#1A0A0C] to-[#0E1110] shadow-[0_0_15px_rgba(214,168,79,0.25)] text-[#D6A84F] font-gurmukhi font-bold text-base select-none shrink-0">
              ਗ
            </div>

            {/* Brand Title with Authentic Punjabi Identity */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-base sm:text-xl font-bold tracking-wider text-[#F5F1E8] gold-gradient-text uppercase leading-tight">
                  Get To Gether
                </span>
                <span className="font-gurmukhi text-[11px] sm:text-xs font-semibold text-[#D6A84F] tracking-normal">
                  ਗੈੱਟ ਟੂਗੈਦਰ
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#A9A59B] font-mono flex items-center gap-1">
                <span>Restaurant</span>
                <span>&bull;</span>
                <span>Gurdaspur (ਗੁਰਦਾਸਪੁਰ)</span>
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links with Elegant Punjabi Subscript ── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center transition-colors duration-200"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#F5F1E8]/90 group-hover:text-gold transition-colors">
                  {link.label}
                </span>
                <span className="font-gurmukhi text-[9px] font-medium text-[#D6A84F]/75 group-hover:text-gold transition-colors -mt-0.5">
                  {link.punjabi}
                </span>
              </a>
            ))}
          </nav>

          {/* ── Desktop Right Action CTAs ── */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone link */}
            <a
              href={DAWAT_INFO.phoneHref}
              className="flex items-center gap-1.5 text-xs text-[#F5F1E8]/85 hover:text-gold transition px-2 py-1 font-mono"
              title="Call Get To Gether Restaurant"
            >
              <Phone className="size-3.5 text-gold" />
              <span>{DAWAT_INFO.phoneDisplay}</span>
            </a>

            {/* View Menu quick link */}
            <a
              href="#menu"
              className="hidden xl:inline-flex items-center gap-1 rounded-md border border-[#D6A84F]/40 bg-[#151A18] px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#D6A84F] hover:bg-[#18201C] hover:border-[#D6A84F] transition"
            >
              <span>ਮੀਨੂ</span>
              <span className="text-[10px] text-[#A9A59B]">&bull; View Menu</span>
            </a>

            {/* Book a Table */}
            <a
              href="#reservation"
              className="inline-flex items-center gap-2 rounded-md bg-[#D6A84F] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-[#0E1110] shadow-md shadow-black/40 transition-all duration-300 hover:bg-[#F1D08A] hover:shadow-[0_0_20px_rgba(214,168,79,0.35)] hover:scale-105 active:scale-95"
            >
              <Calendar className="size-3.5 text-[#0E1110]" />
              <span>ਟੇਬਲ ਬੁੱਕ ਕਰੋ &bull; BOOK TABLE</span>
            </a>
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex lg:hidden size-10 items-center justify-center rounded-lg border border-[#D6A84F]/25 bg-[#151A18]/80 text-[#F5F1E8] transition hover:bg-[#18201C]"
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
          className="fixed inset-0 z-50 flex flex-col bg-[#0E1110]/98 backdrop-blur-2xl p-6 lg:hidden"
        >
          {/* Top close bar with Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-[#D6A84F]/15">
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
              className="size-10 rounded-full bg-white/10 flex items-center justify-center text-[#F5F1E8]"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-3 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between font-display text-lg text-[#F5F1E8]/90 hover:text-gold transition py-2.5 border-b border-[#D6A84F]/10"
              >
                <span>{link.label}</span>
                <span className="font-gurmukhi text-sm font-medium text-[#D6A84F]">{link.punjabi}</span>
              </a>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="pt-6 border-t border-[#D6A84F]/15 space-y-3">
            <a
              href="#reservation"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-[#0E1110] shadow-lg shadow-primary/20 hover:bg-[#F1D08A]"
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
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#D6A84F]/20 bg-[#151A18] py-3 text-xs font-semibold uppercase text-[#F5F1E8]"
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
