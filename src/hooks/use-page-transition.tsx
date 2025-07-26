'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useClickSound } from './useClickSound';

type PageTransitionContextType = {
  isTransitioning: boolean;
  transitionStep: number;
  startTransition: (path: string, step?: number) => void;
  endTransition: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionStep, setTransitionStep] = useState(0); // 0: Matrix, 1: Welcome, etc.
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();
  const playTransitionSound = useClickSound({ type: 'transition' });

  // Start a transition with optional step (default 0)
  const startTransition = useCallback((path: string, step: number = 0) => {
    playTransitionSound();
    setTransitionStep(step);
    setNextPath(path);
    setIsTransitioning(true);
  }, [playTransitionSound]);

  // End transition, handle initial load and navigation
  const endTransition = useCallback(() => {
    if (nextPath) {
      router.push(nextPath);
      setNextPath(null);
      setTimeout(() => setIsTransitioning(false), 500); // Allow animation to finish
    } else {
      // Initial load: step 0 -> 1, then finish
      if (transitionStep === 0) {
        setTransitionStep(1);
      } else {
        setIsTransitioning(false);
      }
    }
  }, [nextPath, router, transitionStep]);

  // Sync with browser navigation (back/forward)
  useEffect(() => {
    const handleRouteChange = () => setIsTransitioning(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Optionally, you can add a global keyboard shortcut to skip transitions
  // useEffect(() => {
  //   const handleKey = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') setIsTransitioning(false);
  //   };
  //   window.addEventListener('keydown', handleKey);
  //   return () => window.removeEventListener('keydown', handleKey);
  // }, []);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, transitionStep, startTransition, endTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};
