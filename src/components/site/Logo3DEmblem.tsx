import { useState, useRef, useEffect } from "react";

interface Logo3DEmblemProps {
  size?: "hero" | "nav" | "loader" | "footer";
  className?: string;
  enableMouseParallax?: boolean;
}

export function Logo3DEmblem({
  size = "hero",
  className = "",
  enableMouseParallax = true,
}: Logo3DEmblemProps) {
  const emblemRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!enableMouseParallax) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!emblemRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = emblemRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center normalized (-1 to 1)
      const x = (clientX - centerX) / (window.innerWidth / 2);
      const y = (clientY - centerY) / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));

      setRotate({
        x: clampedY * -14, // Rotate up/down
        y: clampedX * 16,  // Rotate left/right
      });
      setHasInteracted(true);
    };

    const handlePointerEnd = () => {
      setRotate({ x: 0, y: 0 });
      setIsHovered(false);
      // Let it return to smooth idle float after interaction
      setTimeout(() => setHasInteracted(false), 800);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerEnd);
    };
  }, [enableMouseParallax]);

  // Dimensions based on size variant
  const sizeStyles = {
    nav: "size-11 sm:size-12",
    footer: "size-20 sm:size-24",
    loader: "size-36 sm:size-44",
    hero: "size-20 sm:size-28 lg:size-36",
  };

  const isInteractive = size === "hero" || size === "loader";

  // Dynamic physical drop shadow calculating light source from top-left
  const dynamicShadow = isInteractive
    ? `${-rotate.y * 1.8}px ${24 + rotate.x * 1.5}px 50px rgba(0,0,0,0.92), 0 10px 25px rgba(0,0,0,0.8), 0 0 35px rgba(214,168,79,0.28)`
    : "0 15px 35px rgba(0,0,0,0.85), 0 0 25px rgba(214,168,79,0.22)";

  return (
    <div
      ref={emblemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
        setTimeout(() => setHasInteracted(false), 500);
      }}
      className={`relative select-none ${sizeStyles[size]} ${className}`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* ── 3D Floating Physical Sign Disk ── */}
      <div
        className={`relative size-full rounded-full transition-transform duration-300 ease-out will-change-transform flex items-center justify-center preserve-3d ${
          isInteractive && !hasInteracted ? "animate-emblem-float" : ""
        }`}
        style={{
          transform:
            isInteractive && hasInteracted
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${
                  isHovered ? "36px" : "16px"
                })`
              : undefined,
          boxShadow: dynamicShadow,
        }}
      >
        {/* 1. Halo Ambient Backlight (Warm champagne gold highlight glow) */}
        <div
          aria-hidden="true"
          className="absolute -inset-5 rounded-full bg-[radial-gradient(circle_at_center,rgba(241,208,138,0.45)_0%,rgba(214,168,79,0.22)_40%,transparent_72%)] blur-2xl pointer-events-none -z-20 animate-glow"
        />

        {/* 2. Simulated 3D Extrusion Side Edge (Physical Brass Thickness) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a2416] via-[#151a18] to-[#0e1110] -z-10 translate-y-2 blur-[1px]"
        />

        {/* 3. Outer Metallic Gold Beveled Rim (Multi-layered Brass Bezel) */}
        <div className="relative size-full rounded-full p-[4px] sm:p-[5px] bg-gradient-to-tr from-[#5e4318] via-[#F1D08A] via-45% to-[#3e2c10] shadow-[inset_0_3px_5px_rgba(255,255,255,0.7),inset_0_-3px_5px_rgba(0,0,0,0.85)]">
          {/* 4. Recessed Dark Architectural Groove for Depth */}
          <div className="size-full rounded-full p-[2.5px] bg-[#0E1110] shadow-[inset_0_4px_8px_rgba(0,0,0,0.95)]">
            {/* 5. Inner Golden Stepped Bezel */}
            <div className="relative size-full rounded-full overflow-hidden bg-[#151A18] p-[2.5px] border border-[#D6A84F]/50 shadow-[0_0_15px_rgba(214,168,79,0.2)]">
              {/* Actual Official Logo Image */}
              <img
                src="/uploads/official-logo.jpg"
                alt="Get To Gether Restaurant Gurdaspur - Official Brand Logo"
                className="size-full object-cover rounded-full filter contrast-[1.06] brightness-[1.02]"
                loading="eager"
              />

              {/* 6. Realistic Dynamic Metallic Specular Light Sweep */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent opacity-60 pointer-events-none mix-blend-overlay transition-transform duration-500 ease-out"
                style={{
                  transform: `translate(${rotate.y * 3}%, ${rotate.x * 3}%)`,
                }}
              />

              {/* 7. Subtle Radial Vignette & Glass Convexity */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.55),inset_0_2px_3px_rgba(255,255,255,0.45)] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
