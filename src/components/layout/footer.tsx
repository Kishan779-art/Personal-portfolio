import { Github, Instagram } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.75 13.96c.25.13.42.2.55.33.13.13.2.28.25.45.05.18.03.35.0.56-.03.22-.13.43-.3.63-.18.2-.4.38-.68.5-.28.14-.6.2-1 .18-.4-.03-.78-.1-1.15-.24-.4-.13-.78-.3-1.14-.52-.35-.22-.7-.5-1.04-.83-.34-.3-.66-.64-.95-.97-.3-.33-.56-.67-.78-1-.22-.33-.4-.68-.52-1.04-.13-.36-.2-.7-.22-1s.03-.6.1-.88c.08-.28.2-.53.38-.73s.4-.35.68-.45c.28-.1.58-.13.88-.1.3 0 .58.05.82.13.24.08.45.2.6.4.15.2.23.4.28.6.03.2.03.4.0.58-.03.18-.1.35-.2.5-.1.15-.22.3-.38.42-.15.13-.3.2-.48.22-.18.03-.35.02-.5 0-.15-.02-.3-.08-.4-.18-.1-.1-.18-.2-.25-.3-.08-.1-.13-.2-.15-.28-.02-.08-.03-.17-.03-.25 0-.1.02-.18.05-.25s.1-.15.18-.2.18-.1.3-.13c.1-.03.22-.05.35-.05.13 0 .25.02.38.05.12.03.25.1.35.18.1.08.2.18.25.3.05.12.08.25.08.4zM12 2C6.477 2 2 6.477 2 12c0 1.74.44 3.38 1.25 4.84L2 22l5.34-1.42c1.4.75 2.97 1.17 4.66 1.17h.02c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.02h-.02c-1.5 0-2.94-.4-4.2-1.1L4.4 20l1.04-3.25c-.8-1.3-1.23-2.8-1.23-4.35C4.2 7.58 7.78 4 12 4s7.8 3.58 7.8 8.02-3.58 8-7.8 8z"/>
  </svg>
);

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Kishan779-art' },
  { name: 'WhatsApp', icon: WhatsAppIcon, href: 'https://wa.me/918200945102' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/kishan_patel_7799_/' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary/10 mt-24 py-12 bg-gradient-to-br from-background via-accent/10 to-primary/10">
      {/* Animated border glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] animate-border-glow bg-[linear-gradient(to_right,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--secondary)),hsl(var(--primary)))] bg-[length:200%_auto]"></div>
      {/* Decorative blurred shapes */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="font-headline text-2xl md:text-3xl text-primary mb-4 animate-fade-in">
          Thanks for visiting the Universe!
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-foreground/70 hover:text-primary transition-all duration-300"
              aria-label={link.name}
            >
              <span className="inline-block p-2 rounded-full bg-card/60 group-hover:bg-primary/10 shadow-md transition">
                {/* @ts-expect-error: icon can be a component */}
                <link.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </span>
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-primary">Kishan Patel</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
