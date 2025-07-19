import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import ChatAssistant from '@/components/chat-assistant';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 md:space-y-48 mt-16">
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
