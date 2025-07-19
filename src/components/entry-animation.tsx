'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      }, 2000);
  
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

const WelcomeMessage = ({ onFinished }: { onFinished: () => void }) => {
  const text = "Welcome to the world of Kishan Patel.";
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
    const timeout = setTimeout(onFinished, words.length * 150 + 1000);
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
  const [step, setStep] = useState(0); // 0: matrix, 1: welcome, 2: flash, 3: done
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (step === 2) {
      const timeout = setTimeout(() => setStep(3), 500); // flash duration
      return () => clearTimeout(timeout);
    }
    if (step === 3) {
      const timeout = setTimeout(() => setIsVisible(false), 500); // fade out duration
      return () => clearTimeout(timeout);
    }
  }, [step]);
  
  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background",
        step >= 2 && "bg-primary-foreground"
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: step < 3 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
        <AnimatePresence mode="wait">
            {step === 0 && (
                <MatrixCode key="matrix" onFinished={() => setStep(1)} />
            )}
            {step === 1 && (
                <WelcomeMessage key="welcome" onFinished={() => setStep(2)} />
            )}
        </AnimatePresence>
    </motion.div>
  );
}
