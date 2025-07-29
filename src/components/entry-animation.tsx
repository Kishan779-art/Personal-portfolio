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

    const interval = setInterval(generateLines, 80); // Faster for more dynamic effect
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onFinished();
    }, 900);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1.04 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
      className="font-code text-primary/70 text-xs md:text-sm leading-tight select-none"
      style={{
        textShadow: '0 0 8px hsl(var(--primary)), 0 0 24px hsl(var(--accent)/0.5)',
        letterSpacing: '0.08em',
        filter: 'drop-shadow(0 0 8px hsl(var(--primary)/0.5))',
      }}
    >
      {lines.map((line, i) => (
        <p key={i} className="animate-fade-in">{line}</p>
      ))}
    </motion.div>
  );
};

const WelcomeMessage = ({
  onFinished,
  text,
}: {
  onFinished: () => void;
  text: string;
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      textShadow: '0 0 8px hsl(var(--primary)), 0 0 24px hsl(var(--accent)/0.5)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(onFinished, words.length * 90 + 700);
    return () => clearTimeout(timeout);
  }, [onFinished, words.length]);

  return (
    <motion.h1
      className="font-headline text-2xl md:text-4xl text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg animate-gradient-x neon-glow"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '7px', display: 'inline-block' }}
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

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => setIsFirstLoad(false), 3500);
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
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-2xl"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated blurred shapes for extra depth */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -z-10 animate-glow-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10 animate-glow-pulse" />
      {/* Floating SVG for extra flair */}
      <svg className="absolute left-1/4 top-1/4 w-16 h-16 text-primary/30 animate-float" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
      </svg>
      <svg className="absolute right-1/4 bottom-1/4 w-20 h-20 text-accent/30 animate-float-slow" fill="none" viewBox="0 0 48 48">
        <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="4" />
      </svg>
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
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-18px);}
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(24px);}
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.5); }
          50% { box-shadow: 0 0 24px 8px hsl(var(--primary) / 0.7); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 1.8s infinite cubic-bezier(0.77, 0, 0.175, 1);
        }
      `}</style>
    </motion.div>
  );
}
