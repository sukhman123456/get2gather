import { DAWAT_INFO } from "@/lib/dawatData";

export function FloatingWhatsAppButton() {
  return (
    <aside
      aria-label="Floating Social Actions"
      className="fixed z-50 flex flex-col items-end gap-3 pointer-events-auto select-none"
      style={{
        bottom: "max(20px, env(safe-area-inset-bottom, 20px))",
        right: "max(20px, env(safe-area-inset-right, 20px))",
      }}
    >
      {/* ════════════════════════════════════════════════════════════
          1. FLOATING INSTAGRAM BUTTON (ABOVE WHATSAPP)
          ════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 group">
        {/* Desktop Hover Tooltip */}
        <div
          className="pointer-events-none hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full border border-[#D6A84F]/25 bg-[#151A18]/95 backdrop-blur-md text-xs font-medium text-pink-300 shadow-[0_8px_20px_rgba(0,0,0,0.5)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap"
          aria-hidden="true"
        >
          <span className="inline-block size-2 rounded-full bg-pink-400 animate-pulse" />
          <span>Follow {DAWAT_INFO.instagramHandle} on Instagram</span>
        </div>

        {/* 3D Circular Floating Instagram Button */}
        <a
          href={DAWAT_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Get To Gether Restaurant Instagram (@get2gather.gsp)"
          className="relative flex size-[52px] sm:size-14 items-center justify-center rounded-full text-white transition-all duration-300 animate-float hover:scale-110 active:scale-95 focus-visible:ring-4 focus-visible:ring-pink-400/50"
          style={{
            animationDelay: "1.4s",
            background:
              "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
            boxShadow:
              "inset 0 2px 2px rgba(255, 255, 255, 0.45), inset 0 -2px 3px rgba(0, 0, 0, 0.32), 0 10px 25px -4px rgba(225, 48, 108, 0.45), 0 6px 14px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Instagram Brand SVG Glyph */}
          <svg
            className="size-6 sm:size-7 fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </div>

      {/* ════════════════════════════════════════════════════════════
          2. FLOATING WHATSAPP BUTTON (BELOW INSTAGRAM)
          ════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 group">
        {/* Desktop Hover Tooltip */}
        <div
          className="pointer-events-none hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full border border-[#D6A84F]/25 bg-[#151A18]/95 backdrop-blur-md text-xs font-medium text-emerald-300 shadow-[0_8px_20px_rgba(0,0,0,0.5)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap"
          aria-hidden="true"
        >
          <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Book a Table on WhatsApp</span>
        </div>

        {/* 3D Circular Floating WhatsApp Button */}
        <a
          href={DAWAT_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Get To Gether Restaurant on WhatsApp (+91 99886 04160)"
          className="relative flex size-[52px] sm:size-14 items-center justify-center rounded-full text-white transition-all duration-300 animate-float hover:scale-110 active:scale-95 focus-visible:ring-4 focus-visible:ring-emerald-400/50"
          style={{
            background:
              "linear-gradient(145deg, #2ae270 0%, #25D366 50%, #169e46 100%)",
            boxShadow:
              "inset 0 2px 2px rgba(255, 255, 255, 0.45), inset 0 -2px 3px rgba(0, 0, 0, 0.28), 0 10px 25px -4px rgba(37, 211, 102, 0.45), 0 6px 14px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle Online Pulsing Dot */}
          <span className="absolute top-0 right-0 flex size-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className="relative inline-flex rounded-full size-3 bg-white shadow-sm" />
          </span>

          {/* WhatsApp Official Brand SVG Icon */}
          <svg
            className="size-6 sm:size-7 fill-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
