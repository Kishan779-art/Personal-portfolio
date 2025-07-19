'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Cpu, Code, BrainCircuit } from 'lucide-react';

const Typewriter = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className="inline-block">
      <h1 className={`font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ${className} typewriter-text`}>
        {text}
      </h1>
    </div>
  );
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        <div className="mb-8 animate-slide-in-fade" style={{animationDelay: '0.2s'}}>
          <Image src="https://placehold.co/150x150.png" alt="Avatar" width={150} height={150} className="rounded-full mx-auto border-4 border-primary neon-glow" data-ai-hint="futuristic avatar" />
        </div>
        <Typewriter text="Welcome to BOLT Universe" />
        <p className="mt-4 mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-fade" style={{animationDelay: '0.8s'}}>
          A next-gen AI/ML Engineer crafting the future, one line of code at a time.
        </p>
        <div className="flex justify-center gap-4 animate-slide-in-fade" style={{animationDelay: '1s'}}>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 animate-glow-pulse">Explore Universe</Button>
          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">Hire Me</Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <Cpu className="absolute text-primary/50 w-12 h-12" style={{ top: '20%', left: '15%', animation: 'float 6s ease-in-out infinite' }}/>
        <Code className="absolute text-primary/50 w-12 h-12" style={{ top: '70%', left: '80%', animation: 'float 8s ease-in-out infinite 1s' }}/>
        <BrainCircuit className="absolute text-primary/50 w-12 h-12" style={{ top: '50%', left: '5%', animation: 'float 7s ease-in-out infinite 2s' }}/>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
