'use client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 -z-10" />
      
      {/* Animated floating shapes */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 w-16 h-16 z-20"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-full h-full text-primary/40" fill="none" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
        </svg>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 w-20 h-20 z-20"
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-full h-full text-accent/40" fill="none" viewBox="0 0 48 48">
          <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="4" />
        </svg>
      </motion.div>

      <Header />
      <main className="flex-grow pt-20">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-headline text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg mb-6"
          >
            Design Lab
          </motion.h1>
          <div className="flex flex-col items-center gap-8">
            {/* Animated "Coming Soon" text with typewriter effect */}
            <motion.span 
              variants={itemVariants}
              className="inline-block text-3xl md:text-4xl font-bold text-accent typewriter-text"
            >
              Coming Soon...
            </motion.span>
            
            {/* Animated loader */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mt-4"
            >
              <motion.span
                className="inline-block w-4 h-4 rounded-full bg-primary"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              />
              <motion.span
                className="inline-block w-4 h-4 rounded-full bg-accent"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.span
                className="inline-block w-4 h-4 rounded-full bg-secondary"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </motion.div>
            
            {/* Animated glowing card preview */}
            <motion.div variants={itemVariants} className="relative mt-12">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-accent/20 rounded-2xl blur-2xl opacity-50 pointer-events-none animate-glow-pulse" />
              <div className="relative z-10 bg-card/80 border border-primary/20 rounded-2xl shadow-xl p-8 backdrop-blur-lg flex flex-col items-center">
                <motion.svg
                  className="w-16 h-16 text-primary/70 mb-4"
                  fill="none"
                  viewBox="0 0 48 48"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray="32 12" />
                </motion.svg>
                <span className="text-xl text-muted-foreground font-semibold">Template Preview</span>
                <span className="mt-2 text-sm text-accent">Stay tuned for stunning UI templates!</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
