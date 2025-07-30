
'use client';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const Star = ({
  x,
  y,
  size,
  delay,
}: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-primary/80 via-accent/60 to-secondary/70 shadow-lg"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: [0, 1, 0.7, 0], scale: [0.5, 1.1, 0.9, 0.5] }}
    transition={{ duration: 2.2, delay, repeat: Infinity, repeatType: 'loop' }}
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, filter: 'blur(0.5px)' }}
  />
);

const Trail = () => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0.7 }}
    animate={{ opacity: [0.7, 1, 0.7, 0], scaleY: [0.7, 1.2, 0.8, 0.7] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 w-6 h-64 bg-gradient-to-b from-accent/70 via-primary/40 to-transparent rounded-full blur-2xl opacity-70 z-0"
    style={{ pointerEvents: 'none' }}
  />
);

export default function RocketAnimation() {
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.2 + 1.2,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-2xl overflow-hidden"
    >
      {/* Starfield */}
      {stars.map(star => <Star key={star.id} {...star} />)}

      {/* Animated blurred nebula shapes */}
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl opacity-30 -z-10 animate-glow-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10 animate-glow-pulse" />

      {/* Rocket Launch with animated trail */}
      <div className="relative flex flex-col items-center z-10">
        <Trail />
        <motion.div
          initial={{ y: 200, rotate: -45, scale: 0.5, filter: 'brightness(0.7) blur(0.5px)' }}
          animate={{ y: -1000, scale: 1.5, filter: 'brightness(1) blur(0px)' }}
          transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
        >
          <Rocket className="w-28 h-28 text-accent drop-shadow-xl neon-glow animate-spin-slow" />
        </motion.div>
      </div>

      {/* Success Text with animated gradient */}
      <motion.p
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1.08 }}
        transition={{ duration: 1.2, delay: 0.7, type: 'spring', stiffness: 120, damping: 10 }}
        className="absolute bottom-20 text-3xl md:text-4xl font-headline font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent neon-glow-text drop-shadow-lg animate-gradient-x"
      >
        Signal Transmitted!
      </motion.p>
      <style jsx global>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.5); }
          50% { box-shadow: 0 0 24px 8px hsl(var(--primary) / 0.7); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 1.8s infinite cubic-bezier(0.77, 0, 0.175, 1);
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow { animation: spin-slow 5s linear infinite; }
      `}</style>
    </motion.div>
  );
}
