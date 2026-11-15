'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

export type Theme = 'dark' | 'light';
export type RenderMode = '3d' | '2d';

interface ExperienceContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  renderMode: RenderMode;
  setRenderMode: (mode: RenderMode) => void;
  toggleRenderMode: () => void;
  isWebGLAvailable: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
}

const ExperienceContext = createContext<ExperienceContextType>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  renderMode: '3d',
  setRenderMode: () => {},
  toggleRenderMode: () => {},
  isWebGLAvailable: true,
  prefersReducedMotion: false,
  saveData: false,
});

export const useExperience = () => useContext(ExperienceContext);

/** Check if WebGL context can be created */
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [renderMode, setRenderModeState] = useState<RenderMode>('3d');
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<boolean>(false);

  // Initialize preferences on client mount
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    const timer = setTimeout(() => {
      // 1. WebGL capability check
      const webglSupported = checkWebGLSupport();
      setIsWebGLAvailable(webglSupported);

      // 2. Reduced motion detection
      setPrefersReducedMotion(motionQuery.matches);

      // 3. Save-Data network detection
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      const hasSaveData = !!nav.connection?.saveData;
      setSaveData(hasSaveData);

      // 4. Resolve initial theme
      try {
        const storedTheme = localStorage.getItem('signal_theme') as Theme | null;
        if (storedTheme === 'dark' || storedTheme === 'light') {
          setThemeState(storedTheme);
          document.documentElement.setAttribute('data-theme', storedTheme);
          if (storedTheme === 'light') {
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
          }
        } else {
          const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
          const initialTheme: Theme = systemLight ? 'light' : 'dark';
          setThemeState(initialTheme);
          document.documentElement.setAttribute('data-theme', initialTheme);
          if (initialTheme === 'light') {
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
          }
        }
      } catch {
        // Fallback to dark
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      // 5. Resolve initial rendering mode
      try {
        const storedMode = localStorage.getItem('signal_render_mode') as RenderMode | null;
        if (storedMode === '3d' || storedMode === '2d') {
          setRenderModeState(storedMode);
          document.documentElement.setAttribute('data-render-mode', storedMode);
        } else {
          // Default logic: If motion reduced, saveData enabled, or WebGL missing -> default 2D; else 3D
          const shouldDefault2D = motionQuery.matches || hasSaveData || !webglSupported;
          const initialMode: RenderMode = shouldDefault2D ? '2d' : '3d';
          setRenderModeState(initialMode);
          document.documentElement.setAttribute('data-render-mode', initialMode);
        }
      } catch {
        document.documentElement.setAttribute('data-render-mode', '3d');
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('signal_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const setRenderMode = useCallback((newMode: RenderMode) => {
    setRenderModeState(newMode);
    try {
      localStorage.setItem('signal_render_mode', newMode);
      document.documentElement.setAttribute('data-render-mode', newMode);
    } catch {
      // Ignore
    }
  }, []);

  const toggleRenderMode = useCallback(() => {
    setRenderMode(renderMode === '3d' ? '2d' : '3d');
  }, [renderMode, setRenderMode]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      renderMode,
      setRenderMode,
      toggleRenderMode,
      isWebGLAvailable,
      prefersReducedMotion,
      saveData,
    }),
    [
      theme,
      setTheme,
      toggleTheme,
      renderMode,
      setRenderMode,
      toggleRenderMode,
      isWebGLAvailable,
      prefersReducedMotion,
      saveData,
    ]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}
