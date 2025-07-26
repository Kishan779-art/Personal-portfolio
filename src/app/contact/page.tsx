import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Contact from '@/components/sections/contact';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground">
            <Header />
            <main className="flex-grow pt-24">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-pulse">
                            Get in Touch
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Have a question, proposal, or just want to say hello? <br />
                            Fill out the form below and I’ll get back to you soon!
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-3xl blur-2xl opacity-40 pointer-events-none"></div>
                        <div className="relative z-10 bg-card/70 border border-primary/20 rounded-3xl shadow-xl p-8 backdrop-blur-md">
                            <Contact />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
