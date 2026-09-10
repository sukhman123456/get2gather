import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain for subtle gentle ambience (never loud)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 2); // Soft fade-in
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Generate 5-second seamless warm restaurant atmospheric pink/brown noise
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filtering: warm low rumble like comfortable restaurant interior
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Scale
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Warm lowpass filter to emulate cozy interior & gentle fire warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filterNodeRef.current = filter;

      noiseSource.connect(filter);
      filter.connect(masterGain);
      noiseSource.start();
      noiseSourceRef.current = noiseSource;

      setIsPlaying(true);
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  };

  const stopAmbientSound = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          noiseSourceRef.current?.stop();
          ctx.close();
          audioCtxRef.current = null;
          gainNodeRef.current = null;
          setIsPlaying(false);
        }, 850);
      } catch {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? "Mute Ambient Restaurant Atmosphere" : "Listen to Restaurant Atmosphere"}
      aria-label={isPlaying ? "Mute Ambient Restaurant Atmosphere" : "Listen to Restaurant Atmosphere"}
      className="group relative flex items-center gap-2 rounded-full border border-[#B88952]/30 bg-[#17110C]/85 px-3 py-1.5 text-xs font-medium text-[#F3E8D2] backdrop-blur-md transition-all duration-300 hover:border-[#D8B477] hover:bg-[#2A1D14] hover:text-[#FFF9EF] hover:shadow-[0_0_15px_rgba(184,137,82,0.25)]"
    >
      <span className="relative flex size-3 items-center justify-center">
        {isPlaying ? (
          <>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#B88952] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#D8B477]" />
          </>
        ) : (
          <span className="size-1.5 rounded-full bg-[#B88952]/60 group-hover:bg-[#D8B477]" />
        )}
      </span>

      {isPlaying ? (
        <Volume2 className="size-3.5 text-[#D8B477] transition-transform group-hover:scale-110" />
      ) : (
        <VolumeX className="size-3.5 text-[#D3C4AF] transition-transform group-hover:scale-110" />
      )}

      <span className="hidden font-sans text-[11px] tracking-wider uppercase sm:inline-block">
        {isPlaying ? "Ambience On" : "Ambience"}
      </span>
    </button>
  );
}
