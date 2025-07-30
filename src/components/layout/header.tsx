
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
                                    "text-2xl font-medium text-foreground/80 hover:text-primary relative group transition-all duration-200",
                                    pathname === item.href && "text-primary"
                                )}
                            >
                                {item.name}
                                <span className={cn(
                                  "absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                                  pathname === item.href ? "w-full" : "w-0"
                                )}></span>
                            </Link>
                        </SheetClose>
                    ))}
                </nav>
            </div>
        </SheetContent>
    </Sheet>
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-primary/20 shadow-lg shadow-primary/10' : 'bg-transparent'
      )}
    >
      {/* Decorative blurred glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl opacity-30 pointer-events-none -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl opacity-20 pointer-events-none -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" onClick={(e) => handleLinkClick(e, '/', 0)} className="text-2xl font-bold font-headline text-primary hover:text-accent transition-colors duration-300 neon-glow-text tracking-tight drop-shadow-lg">
            <span className="inline-block animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Kishan Patel
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href, item.step)}
                  className={cn(
                    "text-lg font-medium text-foreground/80 hover:text-primary relative group transition-all duration-200",
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
