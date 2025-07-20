
'use client';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const Star = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/80"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: 1 }}
    transition={{ duration: 1.5, delay, repeat: Infinity, repeatType: 'loop' }}
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
  />
);

export default function RocketAnimation() {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 1.5,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm overflow-hidden"
    >
      {/* Starfield */}
      {stars.map(star => <Star key={star.id} {...star} />)}

      {/* Rocket Launch */}
      <motion.div
        initial={{ y: 200, rotate: -45, scale: 0.5 }}
        animate={{ y: -1000, scale: 1.5 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <Rocket className="w-24 h-24 text-accent" />
      </motion.div>

      {/* Success Text */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-20 text-2xl font-headline text-primary neon-glow-text"
      >
        Signal Transmitted!
      </motion.p>
    </motion.div>
  );
}
