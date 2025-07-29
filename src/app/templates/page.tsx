'use client';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 -z-10" />
      {/* Animated floating shapes */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 w-16 h-16 z-20 animate-float">
        <svg className="w-full h-full text-primary/40" fill="none" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 w-20 h-20 z-20 animate-float-slow">
        <svg className="w-full h-full text-accent/40" fill="none" viewBox="0 0 48 48">
          <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
          <h1 className="font-headline text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg mb-6">
            Design Lab
          </h1>
          <div className="flex flex-col items-center gap-8">
            {/* Animated "Coming Soon" text with typewriter effect */}
            <span className="inline-block text-3xl md:text-4xl font-bold text-accent typewriter-text">
              Coming Soon...
            </span>
            {/* Animated loader */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="inline-block w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '.1s' }} />
              <span className="inline-block w-4 h-4 rounded-full bg-accent animate-bounce" style={{ animationDelay: '.3s' }} />
              <span className="inline-block w-4 h-4 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '.5s' }} />
            </div>
            {/* Animated glowing card preview */}
            <div className="relative mt-12">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-accent/20 rounded-2xl blur-2xl opacity-50 pointer-events-none animate-glow-pulse" />
              <div className="relative z-10 bg-card/80 border border-primary/20 rounded-2xl shadow-xl p-8 backdrop-blur-lg flex flex-col items-center">
                <svg className="w-16 h-16 text-primary/70 mb-4 animate-spin-slow" fill="none" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray="32 12" />
                </svg>
                <span className="text-xl text-muted-foreground font-semibold">Template Preview</span>
                <span className="mt-2 text-sm text-accent">Stay tuned for stunning UI templates!</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-18px);}
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(24px);}
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes spin-slow {
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-16px);}
        }
        .animate-bounce { animation: bounce 1.2s infinite cubic-bezier(0.77,0,0.175,1); }
      `}</style>
    </div>
  );
}
