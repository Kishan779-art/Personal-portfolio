
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Projects from '@/components/sections/projects';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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

export default function ProjectsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground">
            <Header />
            <main className="flex-grow pt-24">
                <motion.section
                    className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {/* Futuristic blurred shapes */}
                    <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl opacity-20 -z-10"></div>
                    <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>

                    {/* Animated border glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[2px] animate-border-glow bg-[linear-gradient(to_right,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--secondary)),hsl(var(--primary)))] bg-[length:200%_auto] rounded-full"></div>

                    <motion.div variants={itemVariants} className="text-center mb-16 space-y-3">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-primary/20 text-primary font-semibold shadow-md animate-fade-in">
                            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                            Project Universe
                        </span>
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
                            My Projects
                        </h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore some of the work I’ve done across different technologies and domains.<br />
                            Each project is a blend of creativity, code, and futuristic vision.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        {/* Glassmorphism effect & animated glow */}
                        <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-3xl blur-2xl opacity-40 pointer-events-none"></div>

                        <div className="relative z-10 bg-card/80 border border-primary/20 rounded-3xl shadow-2xl p-8 backdrop-blur-lg animate-slide-in-fade">
                            <Projects />
                        </div>

                        {/* Floating icons for extra flair */}
                        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-20">
                            <svg className="absolute left-10 top-10 w-10 h-10 text-primary/30 animate-float" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <svg className="absolute right-16 bottom-16 w-12 h-12 text-accent/30 animate-float-slow" fill="none" viewBox="0 0 24 24">
                                <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </motion.div>
                </motion.section>
            </main>
            <Footer />
        </div>
    );
}
