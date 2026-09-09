import { useState, useEffect } from "react";
import { Logo3DEmblem } from "./Logo3DEmblem";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out after 1.1s
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 1100);

    // Completely unmount after 1.65s (strictly under 2 seconds)
    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 1650);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090706] transition-opacity duration-500 cursor-pointer ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Cinematic Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute size-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(223,183,108,0.22)_0%,rgba(184,126,62,0.08)_40%,transparent_75%)] blur-3xl animate-pulse"
      />

      {/* 3D Logo Emblem with Cinematic Depth Reveal */}
      <div
        style={{
          transform: fading ? "scale(0.96) translateZ(-20px)" : "scale(1) translateZ(0px)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10 flex flex-col items-center select-none"
      >
        <Logo3DEmblem size="loader" enableMouseParallax={false} />

        {/* Brand Typography */}
        <div className="mt-7 text-center">
          <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-[#dfb76c] block">
            GET TO GETHER
          </span>
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-widest text-[#f7f2ea] uppercase mt-1 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            RESTAURANT &bull; GURDASPUR
          </h1>
          <p className="font-serif italic text-xs text-[#cfc5b6]/80 mt-1 tracking-wider">
            &ldquo;Good Food. Great Company.&rdquo;
          </p>
        </div>

        {/* Golden Hairline Shimmer Line */}
        <div className="mt-6 w-40 h-[1.5px] bg-[#dfb76c]/15 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
