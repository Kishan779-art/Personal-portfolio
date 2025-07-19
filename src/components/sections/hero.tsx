'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cpu, Code, BrainCircuit, Rocket, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExploring, setIsExploring] = useState(false);

  const handleExploreClick = () => {
    setIsExploring(true);
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      setIsExploring(false);
    }, 1500); 
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {x: number, y: number, size: number, speedX: number, speedY: number}[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
        });
    }

    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
            if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(181 100% 62% / 0.5)';
            ctx.fill();
        }
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    const handleResize = () => {
        if(canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10 text-center container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
        >
            Welcome to the BOLT Universe
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          An AI-Powered Portfolio for the Future.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 animate-glow-pulse w-48" 
            onClick={handleExploreClick}
            disabled={isExploring}
          >
            <AnimatePresence mode="wait">
              {isExploring ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Entering...
                </motion.div>
              ) : (
                <motion.span
                  key="explore"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  Explore Universe
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">Hire Me</Button>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <Cpu className="absolute text-primary/50 w-12 h-12" style={{ top: '20%', left: '15%', animation: 'float 6s ease-in-out infinite' }}/>
        <Code className="absolute text-primary/50 w-12 h-12" style={{ top: '70%', left: '80%', animation: 'float 8s ease-in-out infinite 1s' }}/>
        <BrainCircuit className="absolute text-primary/50 w-12 h-12" style={{ top: '50%', left: '5%', animation: 'float 7s ease-in-out infinite 2s' }}/>
        <Rocket className="absolute text-accent/50 w-12 h-12" style={{ top: '80%', left: '10%', animation: 'float-rocket 10s ease-in-out infinite' }}/>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-rocket {
          0% { transform: translateY(0px) rotate(-45deg); opacity: 1; }
          50% { transform: translateY(-100vh) rotate(-45deg); opacity: 0.5; }
          51% { transform: translateY(100vh) rotate(-45deg); opacity: 0; }
          100% { transform: translateY(0px) rotate(-45deg); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
