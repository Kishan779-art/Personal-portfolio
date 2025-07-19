import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
