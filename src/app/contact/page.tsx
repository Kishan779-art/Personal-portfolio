import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Contact from '@/components/sections/contact';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow pt-24">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Contact />
                </div>
            </main>
            <Footer />
        </div>
    );
}
