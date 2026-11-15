'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useExperience } from '@/components/ExperienceContext';

export default function SpatialBackground() {
  const { renderMode, theme } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (renderMode !== '3d') return;
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // Performance: antialias off for background particle field
        powerPreference: 'low-power',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      return; // WebGL initialization failed gracefully
    }

    // Colors based on theme
    const isDark = theme === 'dark';
    const primaryColor = isDark ? 0x9c8058 : 0x8b6d42;
    const secondaryColor = isDark ? 0x343a40 : 0x3a2a1a; // light: dark chocolate floaters

    // 1. Particle Cloud (Stars / Signal nodes)
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(primaryColor);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const mixed = Math.random() > 0.4 ? c1 : c2;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isDark ? 1.6 : 1.8,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.4,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Subtle Coordinate Grid Lines (Engineering lattice)
    const gridHelper = new THREE.GridHelper(160, 16, primaryColor, secondaryColor);
    gridHelper.rotation.x = Math.PI / 2.5;
    gridHelper.position.y = -35;
    gridHelper.position.z = -20;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = isDark ? 0.08 : 0.05;
    scene.add(gridHelper);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0003;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0003;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll parallax tracking
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY * 0.02;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Pause when page visibility is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let lastTime = 0;
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Throttle rendering slightly to save CPU/GPU (target ~60fps)
      if (time - lastTime < 16) return;
      lastTime = time;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particles.rotation.y += 0.0004;
      particles.rotation.x = mouseY * 0.5;
      particles.rotation.z = mouseX * 0.5;

      gridHelper.position.y = -35 - (scrollY % 20);

      camera.position.x = mouseX * 20;
      camera.position.y = -mouseY * 20;
      camera.lookAt(scene.position);

      renderer?.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      geometry.dispose();
      material.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      renderer?.dispose();

      if (container && renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [renderMode, theme]);

  if (renderMode !== '3d') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
