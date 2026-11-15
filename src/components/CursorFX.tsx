'use client';

import { useEffect, useRef } from 'react';

/*
 * Tuk-tuk cursor: a springy bronze ring that trails the pointer with a
 * slight overshoot bounce, and swells over interactive elements.
 * Desktop only (hover + fine pointer), skipped under reduced motion.
 */
export default function CursorFX() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let targetX = -100, targetY = -100; // off-screen until first move
    let x = -100, y = -100;
    let scale = 1, targetScale = 1;
    let rafId = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        ring.style.opacity = '1';
      }
      const el = e.target instanceof Element ? e.target : null;
      targetScale = el?.closest('a, button, [role="button"], input, textarea, select, label') ? 1.6 : 1;
    };

    const onLeave = () => {
      ring.style.opacity = '0';
      visible = false;
    };

    const tick = () => {
      // Springy follow: position eases, scale overshoots slightly
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      scale += (targetScale - scale) * 0.2;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-fx pointer-events-none fixed top-0 left-0 z-[200] w-8 h-8 rounded-full border border-accent-bronze/50 opacity-0 transition-opacity duration-300 motion-reduce:hidden max-md:hidden"
      style={{ willChange: 'transform' }}
    />
  );
}
