'use client';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, to, {
      duration: 1.8,
      ease: [0.77, 0, 0.175, 1], // smoother, more natural
    });
    return animation.stop;
  }, [count, to]);

  return (
    <motion.span
      className="inline-block font-headline text-5xl md:text-6xl font-bold text-primary drop-shadow-lg animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent neon-glow-text"
      initial={{ scale: 0.85, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10 }}
    >
      {rounded}
    </motion.span>
  );
}
