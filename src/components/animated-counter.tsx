
'use client';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, to, {
      duration: 1.5,
      ease: 'easeOut',
    });
    return animation.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}
