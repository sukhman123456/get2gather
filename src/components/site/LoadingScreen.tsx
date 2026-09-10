import { useState, useEffect } from "react";
import { Logo3DEmblem } from "./Logo3DEmblem";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [lineDrawn, setLineDrawn] = useState(false);

  useEffect(() => {
    const lineTimer = setTimeout(() => setLineDrawn(true), 150);
    const fadeTimer = setTimeout(() => setFading(true), 1100);
    const unmountTimer = setTimeout(() => setVisible(false), 1500);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#17110C] transition-opacity duration-500 cursor-pointer ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle Warm Espresso & Amber Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute size-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,137,82,0.18)_0%,rgba(42,29,20,0.35)_45%,transparent_75%)] blur-3xl animate-pulse"
      />

      {/* 3D Emblem & Animated Typography */}
      <div
        style={{
          transform: fading ? "scale(0.96) translateZ(-30px)" : "scale(1) translateZ(0px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10 flex flex-col items-center select-none px-4 text-center"
      >
        <Logo3DEmblem size="loader" enableMouseParallax={false} />

        {/* Brand Titles */}
        <div className="mt-7 text-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.38em] uppercase text-[#D8B477] block">
            GET TO GETHER
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-[#FFF9EF] uppercase mt-1 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            RESTAURANT &bull; GURDASPUR
          </h1>

          {/* Glowing Copper Line slowly drawing */}
          <div className="mx-auto my-3.5 h-[1.5px] w-36 overflow-hidden rounded-full bg-[#2A1D14]">
            <div
              className={`h-full bg-gradient-to-r from-[#B88952] via-[#D8B477] to-[#B88952] shadow-[0_0_12px_#D8B477] transition-all duration-1000 ease-out ${
                lineDrawn ? "w-full" : "w-0"
              }`}
            />
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-[#F3E8D2]/80 tracking-wider">
            &ldquo;Good Food. Great Company.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
