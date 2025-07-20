'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useClickSound } from './useClickSound';

type PageTransitionContextType = {
  isTransitioning: boolean;
  transitionStep: number;
  startTransition: (path: string, step: number) => void;
  endTransition: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionStep, setTransitionStep] = useState(0); // 0: Matrix, 1: Welcome
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();
  const playTransitionSound = useClickSound({ type: 'transition' });

  const startTransition = useCallback((path: string, step: number) => {
    playTransitionSound();
    setTransitionStep(step);
    setNextPath(path);
    setIsTransitioning(true);
  }, [playTransitionSound]);

  const endTransition = useCallback(() => {
    if (nextPath) {
      router.push(nextPath);
      setNextPath(null);
      // Wait for router to push and component to unmount before finishing transition
      setTimeout(() => setIsTransitioning(false), 500); 
    } else {
        // This handles the initial load animation
        if(transitionStep === 0) {
            setTransitionStep(1); // Move to welcome message
        } else {
            setIsTransitioning(false);
        }
    }
  }, [nextPath, router, transitionStep]);

  // Handle back/forward browser navigation
  useEffect(() => {
    const handleRouteChange = () => {
        setIsTransitioning(false);
    };
    // Using a simple event listener on popstate, though more robust solutions exist
    window.addEventListener('popstate', handleRouteChange);
    return () => {
        window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);


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
