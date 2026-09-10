import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, select, [role='button'], .cursor-pointer");
      const card3D = target.closest(".perspective-1000, .perspective-1200, [data-explore]");
      const imgTarget = target.closest("img, [data-view]");

      if (card3D) {
        setCursorText("EXPLORE");
        setIsHovered(true);
      } else if (imgTarget && interactive) {
        setCursorText("VIEW");
        setIsHovered(true);
      } else if (interactive) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Warm ambient candlelight halo on surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-40 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,137,82,0.07)_0%,transparent_75%)] blur-2xl"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Luxury Minimal Cursor with dynamic badge text */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 ease-out select-none ${
          cursorText
            ? "size-14 border border-[#D8B477] bg-[#17110C]/90 shadow-[0_0_20px_rgba(184,137,82,0.4)]"
            : isHovered
            ? "size-9 border border-[#B88952]/80 bg-[#B88952]/15 shadow-[0_0_15px_rgba(184,137,82,0.3)]"
            : "size-2.5 bg-[#D8B477] shadow-[0_0_8px_rgba(216,180,119,0.7)]"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {cursorText && (
          <span className="font-sans text-[8.5px] font-bold tracking-widest text-[#D8B477] uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
