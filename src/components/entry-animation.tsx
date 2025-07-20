
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePageTransition } from '@/hooks/use-page-transition';

const MatrixCode = ({ onFinished }: { onFinished: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*+-/@#$%&';
  
    useEffect(() => {
      const generateLines = () => {
        const newLines = Array.from({ length: 20 }, () =>
          Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
        );
        setLines(newLines);
      };
  
      const interval = setInterval(generateLines, 100);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        onFinished();
      }, 1000); // Reduced duration for faster transitions
  
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [onFinished]);
  
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="font-code text-primary/50 text-xs md:text-sm leading-tight"
      >
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </motion.div>
    );
  };

const WelcomeMessage = ({ onFinished, text }: { onFinished: () => void, text: string }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(onFinished, words.length * 100 + 500); // Reduced duration
    return () => clearTimeout(timeout);
  }, [onFinished, words.length]);

  return (
    <motion.h1
      className="font-headline text-2xl md:text-4xl text-center text-foreground"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};


export default function EntryAnimation() {
  const { isTransitioning, transitionStep, endTransition } = usePageTransition();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // This ensures the full intro only runs once per session.
  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => setIsFirstLoad(false), 4000); // Duration of the full intro
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);
  
  if (!isTransitioning) return null;

  const messages: { [key: number]: string } = {
    0: "Entering The BOLT Universe...",
    1: "Welcome to the world of Kishan Patel.",
    2: "Time-traveling to the About section...",
    3: "Compiling project data...",
    4: "Loading design templates...",
    5: "Establishing neural link...",
  };

  const message = messages[transitionStep] || "Loading...";

  return (
    <motion.div
      className={cn("fixed inset-0 z-[100] flex items-center justify-center bg-background")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <AnimatePresence mode="wait">
            {isFirstLoad ? (
                 <motion.div key="full-intro">
                    <AnimatePresence mode="wait">
                        {transitionStep === 0 && <MatrixCode key="matrix" onFinished={endTransition} />}
                        {transitionStep === 1 && <WelcomeMessage key="welcome" onFinished={endTransition} text={message} />}
                    </AnimatePresence>
                 </motion.div>
            ) : (
                <WelcomeMessage key="page-transition" onFinished={endTransition} text={message} />
            )}
        </AnimatePresence>
    </motion.div>
  );
}
