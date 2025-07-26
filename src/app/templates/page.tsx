import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 -z-10" />
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-headline text-5xl font-bold text-primary animate-pulse">Design Lab</h1>
            <p className="mt-4 text-lg text-muted-foreground">Templates coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
