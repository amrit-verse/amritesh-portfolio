'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { useExperience } from '@/components/ExperienceContext';

export default function Hero3DVisual() {
  const { renderMode, theme } = useExperience();
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (renderMode !== '3d') return;
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Pulled back so the outer horizon ring (r=3.05) projects fully inside the canvas
    camera.position.z = 8.1;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const isDark = theme === 'dark';
    const bronzeColor = isDark ? 0x9c8058 : 0x8b6d42;
    const steelColor = isDark ? 0x343a40 : 0xd6d0c4;
    const ivoryColor = isDark ? 0xf1eee8 : 0x20252b;

    // 1. Central Core Wireframe Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: bronzeColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Gimbal Orbital Ring 1 (Outer Torus)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: bronzeColor,
      transparent: true,
      opacity: isDark ? 0.7 : 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // 3. Gimbal Orbital Ring 2 (Middle Torus)
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: steelColor,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 4. Gimbal Orbital Ring 3 (Outer Horizon)
    const ring3Geo = new THREE.TorusGeometry(3.05, 0.018, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: bronzeColor,
      transparent: true,
      opacity: isDark ? 0.4 : 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // 5. Data Packet Nodes (Spheres traveling on orbits)
    const nodeCount = 5;
    const nodeSpheres: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; plane: 'xy' | 'xz' | 'yz' }[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: ivoryColor });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(mesh);
      nodeSpheres.push({
        mesh,
        angle: (i * (Math.PI * 2)) / nodeCount,
        speed: 0.01 + (i % 3) * 0.005,
        radius: 2.35 + (i % 2) * 0.35,
        plane: i % 3 === 0 ? 'xy' : i % 3 === 1 ? 'xz' : 'yz',
      });
    }

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;
    };
    container.addEventListener('mousemove', onPointerMove);

    // Visibility observer to pause scene when out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const onResize = () => {
      if (!renderer || !container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;

      clock.getDelta();
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      // Rotate orbital rings
      ring1.rotation.z += 0.006;
      ring1.rotation.x = Math.PI / 3 + mouseY * 0.4;
      ring1.rotation.y = mouseX * 0.4;

      ring2.rotation.x += 0.004;
      ring2.rotation.y = Math.PI / 4 + mouseX * 0.3;

      ring3.rotation.z -= 0.005;
      ring3.rotation.x = -Math.PI / 4 - mouseY * 0.3;

      coreMesh.rotation.y += 0.008;
      coreMesh.rotation.x += 0.004;

      // Move data nodes along orbits
      for (const node of nodeSpheres) {
        node.angle += node.speed;
        if (node.plane === 'xy') {
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.y = Math.sin(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle * 2) * 0.4;
        } else if (node.plane === 'xz') {
          node.mesh.position.x = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * node.radius;
          node.mesh.position.y = Math.cos(node.angle * 2) * 0.4;
        } else {
          node.mesh.position.y = Math.cos(node.angle) * node.radius;
          node.mesh.position.z = Math.sin(node.angle) * node.radius;
          node.mesh.position.x = Math.sin(node.angle * 2) * 0.4;
        }
      }

      scene.rotation.y = mouseX * 0.3;
      scene.rotation.x = -mouseY * 0.3;

      renderer?.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer?.dispose();

      if (container && renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [renderMode, theme]);

  return (
    <div
      className="relative w-72 h-72 sm:w-88 sm:h-88 xl:w-96 xl:h-96 flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Mode Canvas Container */}
      {renderMode === '3d' && (
        <div
          ref={mountRef}
          className="absolute -inset-10 sm:-inset-12 xl:-inset-16 z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
          aria-hidden="true"
        />
      )}

      {/* 2D Mode Architectural SVG Blueprint Diagram */}
      {renderMode === '2d' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full text-accent-bronze/40"
            fill="none"
          >
            {/* Outer coordinate ring with tick marks */}
            <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="200" r="155" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <circle cx="200" cy="200" r="125" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />

            {/* Crosshair guidelines */}
            <line x1="200" y1="5" x2="200" y2="395" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
            <line x1="5" y1="200" x2="395" y2="200" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

            {/* Orbital degree markers */}
            <text x="205" y="24" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.8">000° // NOR</text>
            <text x="365" y="196" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.8">090°</text>
            <text x="205" y="388" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.8">180° // SOU</text>
            <text x="12" y="196" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.8">270°</text>

            {/* Mechanical accent notches */}
            <rect x="198" y="12" width="4" height="6" fill="currentColor" opacity="0.7" />
            <rect x="382" y="198" width="6" height="4" fill="currentColor" opacity="0.7" />
            <rect x="198" y="382" width="4" height="6" fill="currentColor" opacity="0.7" />
            <rect x="12" y="198" width="6" height="4" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
      )}

      {/* Central Avatar Portal */}
      <div
        className={`relative w-44 h-44 sm:w-52 sm:h-52 xl:w-60 xl:h-60 rounded-full p-2 z-10 transition-transform duration-500 ${
          renderMode === '3d' && isHovered ? 'scale-105' : 'scale-100'
        } bg-gradient-to-b from-accent-bronze/40 via-bg-tertiary to-bg-primary shadow-2xl`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border-subtle bg-bg-primary">
          <Image
            src="/avatar.png"
            alt="Amritesh Mishra"
            fill
            className="object-cover object-center scale-[1.08] transition-transform duration-700 hover:scale-115"
            priority
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
          />
        </div>
      </div>

      {/* Satellite Node 1: Top-Right (Status) */}
      <div className="hidden sm:flex absolute -top-2 right-0 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card/95 border border-border-subtle shadow-lg backdrop-blur-md transition-all hover:border-accent-bronze">
        <span className="w-2 h-2 rounded-full bg-accent-bronze animate-ping" />
        <span className="text-[11px] font-mono text-text-primary font-medium">Open for 2027 Internships</span>
      </div>

      {/* Satellite Node 2: Top-Left (Security Lab) */}
      <div className="hidden sm:flex absolute top-6 -left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card/95 border border-border-subtle shadow-lg backdrop-blur-md transition-all hover:border-accent-bronze">
        <span className="w-2 h-2 rounded-full bg-accent-bronze shrink-0" />
        <span className="text-[11px] font-mono text-text-primary">QEMU virbr0 NAT</span>
      </div>

      {/* Satellite Node 3: Bottom-Left (Kernel) */}
      <div className="hidden sm:flex absolute bottom-6 -left-2 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card/95 border border-border-subtle shadow-lg backdrop-blur-md transition-all hover:border-accent-bronze">
        <span className="w-2 h-2 rounded-full bg-accent-bronze shrink-0" />
        <span className="text-[11px] font-mono text-text-primary">Debian 13 · Linux 6.12</span>
      </div>

      {/* Satellite Node 4: Bottom-Right (SIH) */}
      <div className="hidden sm:flex absolute -bottom-3 right-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card/95 border border-border-subtle shadow-lg backdrop-blur-md transition-all hover:border-accent-bronze">
        <span className="w-2 h-2 rounded-full bg-accent-bronze shrink-0" />
        <span className="text-[11px] font-mono text-text-primary">Team Leader (Team Sudo)</span>
      </div>
    </div>
  );
}
