'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useExperience } from '@/components/ExperienceContext';

interface ProjectCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProjectCard3D({ children, className = '' }: ProjectCard3DProps) {
  const { renderMode } = useExperience();
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (renderMode !== '3d' || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (degrees)
      const rotateX = -((y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
        transition: 'transform 0.1s ease-out',
      });

      // Glare lighting position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, var(--color-accent-bronze-glow), transparent 60%)`,
      });
    },
    [renderMode]
  );

  const handleMouseLeave = useCallback(() => {
    if (renderMode !== '3d') return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease',
    });
  }, [renderMode]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={renderMode === '3d' ? style : undefined}
      className={`relative preserve-3d will-change-transform ${className}`}
    >
      {/* Dynamic 3D Glare Lighting overlay */}
      {renderMode === '3d' && (
        <div
          style={glareStyle}
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
