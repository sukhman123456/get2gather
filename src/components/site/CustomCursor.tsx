import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports true hover pointer (desktop mouse)
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

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check if mouse is over clickable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, input, select, [role='button'], .cursor-pointer");
      setIsHovered(!!isInteractive);
    };

    const animate = () => {
      // Smooth lerp following
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
      {/* 1. Subtle warm ambient light follower (simulates candle aura on surfaces) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-40 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(223,183,108,0.06)_0%,rgba(201,147,82,0.02)_45%,transparent_75%)] blur-2xl transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* 2. Precision luxury cursor dot & ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "36px" : "8px",
          height: isHovered ? "36px" : "8px",
          backgroundColor: isHovered ? "rgba(223, 183, 108, 0.08)" : "#dfb76c",
          border: isHovered ? "1px solid rgba(223, 183, 108, 0.55)" : "none",
          boxShadow: isHovered
            ? "0 0 15px rgba(223, 183, 108, 0.3)"
            : "0 0 8px rgba(223, 183, 108, 0.6)",
        }}
      />
    </>
  );
}
