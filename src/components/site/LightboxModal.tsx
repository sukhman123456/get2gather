import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";

export interface LightboxImage {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [isOpen, onClose, currentIndex, images.length, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex w-full max-w-6xl items-center justify-between text-white/90 z-10 pb-2 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-md truncate">
          <p className="font-display text-base sm:text-lg text-primary font-semibold truncate">
            {current.title}
          </p>
          {current.subtitle && (
            <p className="text-xs text-white/60 truncate">{current.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/60 px-2 py-1 bg-white/10 rounded">
            {currentIndex + 1} / {images.length}
          </span>
          <a
            href={current.image}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Full Image"
            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition"
          >
            <ExternalLink className="size-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:scale-105"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div
        className="relative flex flex-1 w-full max-w-5xl items-center justify-center py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev button */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={() => onNavigate(currentIndex - 1)}
            aria-label="Previous image"
            className="absolute left-2 sm:-left-12 z-20 flex size-11 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-primary hover:text-black transition duration-200"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        {/* Current Image */}
        <div className="relative max-h-[72vh] max-w-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl border border-white/10">
          <img
            src={current.image}
            alt={current.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-md select-none transition-transform duration-300"
          />
        </div>

        {/* Next button */}
        {currentIndex < images.length - 1 && (
          <button
            type="button"
            onClick={() => onNavigate(currentIndex + 1)}
            aria-label="Next image"
            className="absolute right-2 sm:-right-12 z-20 flex size-11 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-primary hover:text-black transition duration-200"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        className="flex w-full max-w-4xl items-center justify-center gap-2 overflow-x-auto py-2 px-4 scrollbar-none z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => onNavigate(idx)}
            className={`relative flex-shrink-0 size-14 sm:size-16 rounded overflow-hidden border-2 transition-all ${
              idx === currentIndex
                ? "border-primary scale-105 shadow-md shadow-primary/30"
                : "border-white/20 opacity-50 hover:opacity-100"
            }`}
          >
            <img src={img.image} alt={img.title} className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
