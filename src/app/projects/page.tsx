import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Projects from '@/components/sections/projects';

export default function ProjectsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 md:space-y-48">
                    <Projects />
                </div>
            </main>
            <Footer />
        </div>
    );
}
