
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname } from 'next/navigation';
import { useClickSound } from '@/hooks/useClickSound';
import { usePageTransition } from '@/hooks/use-page-transition';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', step: 0 },
  { name: 'About', href: '/about', step: 2 },
  { name: 'Projects', href: '/projects', step: 3 },
  { name: 'Templates', href: '/templates', step: 4 },
  { name: 'Contact', href: '/contact', step: 5 },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const playClickSound = useClickSound();
  const { startTransition } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, step: number) => {
    e.preventDefault();
    playClickSound();
    if (pathname !== href) {
        startTransition(href, step);
    }
  };
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    playClickSound();
    if (pathname !== '/contact') {
        startTransition('/contact', 5);
    }
  };

  const MobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-primary/20">
                    <h2 className="font-headline text-2xl text-primary">Navigation</h2>
                    <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                </div>
                <nav className="flex-grow flex flex-col justify-center items-center gap-8">
                    {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href, item.step)}
                                className={cn(
                                    "text-2xl font-medium text-foreground/80 hover:text-primary relative group",
                                    pathname === item.href && "text-primary"
                                )}
                            >
                                {item.name}
                            </Link>
                        </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background neon-glow w-4/5 mt-8" onClick={(e) => {
                          e.preventDefault();
                          playClickSound();
                          if (pathname !== '/contact') {
                              startTransition('/contact', 5);
                          }
                      }}>
                        Hire Me
                      </Button>
                    </SheetClose>
                </nav>
            </div>
        </SheetContent>
    </Sheet>
  );

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
          <Link href="/" onClick={(e) => handleLinkClick(e, '/', 0)} className="text-2xl font-bold font-headline text-primary hover:text-accent transition-colors duration-300 neon-glow-text">
            Kishan Patel
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href, item.step)}
                  className={cn(
                    "text-lg font-medium text-foreground/80 hover:text-primary relative group",
                    pathname === item.href && "text-primary"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    pathname === item.href ? "w-full" : "w-0"
                  )}></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:inline-flex border-primary text-primary hover:bg-primary hover:text-background neon-glow" onClick={handleButtonClick}>
              Hire Me
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
