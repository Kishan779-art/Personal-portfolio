'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Templates', href: '/templates' },
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Adjust for header height
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-primary/20 shadow-lg shadow-primary/10' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold font-headline text-primary hover:text-accent transition-colors duration-300 neon-glow-text">
            BOLT
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg font-medium text-foreground/80 hover:text-primary relative group"
                >
                  {item.name}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full neon-glow"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex border-primary text-primary hover:bg-primary hover:text-background neon-glow">
              Hire Me
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
