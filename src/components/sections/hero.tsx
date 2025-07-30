
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cpu, Code, BrainCircuit, Rocket, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useClickSound } from '@/hooks/useClickSound';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExploring, setIsExploring] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const router = useRouter();
  const playClickSound = useClickSound();
  const playWhooshSound = useClickSound({ type: 'whoosh' });

  const handleExploreClick = () => {
    playWhooshSound();
    setIsExploring(true);
    setTimeout(() => {
      router.push('/about');
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

    const particles: {x: number, y: number, size: number, speedX: number, speedY: number, base_x: number, base_y: number}[] = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x: x,
        y: y,
        base_x: x,
        base_y: y,
        size: Math.random() * 2.5 + 1,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let dx = mouse.current.x - p.x;
        let dy = mouse.current.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;

        if(distance < maxDistance) {
          p.x -= forceDirectionX * force * 1.5;
          p.y -= forceDirectionY * force * 1.5;
        } else {
          if (p.x !== p.base_x) {
            let dx = p.x - p.base_x;
            p.x -= dx/10;
          }
          if (p.y !== p.base_y) {
            let dy = p.y - p.base_y;
            p.y -= dy/10;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(181 100% 62% / 0.6)';
        ctx.shadowColor = 'hsl(181 100% 62% / 0.7)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const handleResize = () => {
      if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particles.push({
            x: x,
            y: y,
            base_x: x,
            base_y: y,
            size: Math.random() * 2.5 + 1,
            speedX: Math.random() * 0.6 - 0.3,
            speedY: Math.random() * 0.6 - 0.3,
          });
        }
      }
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  const headlineVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2,
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      scale: 1.05,
      color: "hsl(var(--accent))",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/10 to-primary/10">
      {/* Canvas Particle Background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
      {/* Decorative blurred shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>
      {/* Hero Content */}
      <div className="relative z-10 text-center container mx-auto px-4">
        
        <motion.h1
          variants={headlineVariants}
          initial="initial"
          animate="animate"
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-lg"
        >
          {"Welcome to the BOLT Universe".split(" ").map((word, i) => (
            <motion.span key={i} variants={wordVariants} whileHover="hover" className="inline-block mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          An AI-Powered Portfolio by Kishan Patel
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 animate-glow-pulse w-48 shadow-xl"
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
                    className="flex items-center"
                  >
                    Explore Universe
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* Animated floating icons */}
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
