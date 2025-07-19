import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary/10 mt-24 py-12">
      <div className="absolute top-0 left-0 w-full h-[2px] animate-border-glow"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-headline text-2xl text-primary mb-4">
          Thanks for visiting the Universe!
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <link.icon className="w-8 h-8" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Kishan Patel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}