'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playChime: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playChime: () => {},
});

export const useSound = () => useContext(SoundContext);

// Global audio context singleton (lazy initialized only upon user gesture)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('signal_sound_enabled');
        if (stored === 'true') {
          setSoundEnabled(true);
        }
      } catch {
        // Ignore localStorage access restrictions
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.015);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Non-blocking fail-safe
    }
  }, [soundEnabled]);

  const playChime = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Soft warm dual harmonic tone on opt-in
      [528, 660].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.035, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.4);
      });
    } catch {
      // Non-blocking fail-safe
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('signal_sound_enabled', String(next));
      } catch {
        // Ignore
      }
      if (next) {
        setTimeout(playChime, 50);
      }
      return next;
    });
  }, [playChime]);

  // Global listener for interactive sound elements
  useEffect(() => {
    if (!soundEnabled) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, [role="button"], [data-sound="click"]')) {
        playClick();
      }
    };

    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, [soundEnabled, playClick]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick, playChime }}>
      {children}
    </SoundContext.Provider>
  );
}

export function SoundToggle({ className = '' }: { className?: string }) {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider border transition-all duration-300 shadow-sm cursor-pointer ${
        soundEnabled
          ? 'bg-bg-tertiary border-accent-bronze/60 text-text-primary shadow-[0_0_10px_var(--color-accent-bronze-glow)]'
          : 'bg-bg-card border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent-bronze/40'
      } ${className}`}
      aria-label={soundEnabled ? 'Mute ambient sound design' : 'Enable ambient sound design'}
      title={soundEnabled ? 'Sound is ON (Click to mute)' : 'Sound is OFF (Click to enable subtle audio)'}
    >
      <span className="relative flex h-2 w-2">
        {soundEnabled && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-bronze opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            soundEnabled ? 'bg-accent-bronze' : 'bg-border-subtle'
          }`}
        />
      </span>
      <span className="hidden sm:inline">AUDIO:</span>
      <span className={soundEnabled ? 'text-accent-bronze font-bold' : 'text-text-secondary'}>
        {soundEnabled ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
