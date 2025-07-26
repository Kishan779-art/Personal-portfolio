import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Contact from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground">
      <Header />
      <main className="flex-grow pt-24">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          {/* Futuristic blurred shapes */}
          <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>
          {/* Animated border glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[2px] animate-border-glow bg-[linear-gradient(to_right,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--secondary)),hsl(var(--primary)))] bg-[length:200%_auto] rounded-full"></div>
          <div className="text-center mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-primary/20 text-primary font-semibold shadow-md animate-fade-in">
              <svg className="w-5 h-5 text-accent animate-pulse" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Contact Portal
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              Send a Signal
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, proposal, or just want to say hello? <br />
              Fill out the form below and I’ll get back to you soon!
            </p>
          </div>
          <div className="relative flex flex-col md:flex-row items-stretch gap-12">
            {/* Contact Form Card */}
            <div className="flex-1 relative z-10 bg-card/80 border border-primary/20 rounded-3xl shadow-2xl p-8 backdrop-blur-lg animate-slide-in-fade">
              <Contact />
            </div>
            {/* Contact Info / Socials Card */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8 relative z-10">
              <div className="w-full bg-card/70 border border-accent/20 rounded-3xl shadow-xl p-8 backdrop-blur-md animate-fade-in">
                <h3 className="font-headline text-2xl text-accent font-bold mb-4">Let’s Connect</h3>
                <ul className="space-y-4 text-left">
                  <li>
                    <span className="font-semibold text-primary">Email:</span>
                    <a
                      href="mailto:kishansujalkumarpatel@gmail.com"
                      className="ml-2 text-accent underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      kishansujalkumarpatel@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-primary">WhatsApp:</span>
                    <a
                      href="https://wa.me/918200945102"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-accent underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      +91 82009 45102
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-primary">Location:</span>
                    <span className="ml-2 text-muted-foreground">Gujarat, India</span>
                  </li>
                </ul>
                <div className="flex justify-center gap-6 mt-8">
                  <a
                    href="https://github.com/Kishan779-art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-full bg-background/70 border border-primary/20 hover:bg-primary/10 shadow-md transition"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-7 h-7 text-primary group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/918200945102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-full bg-background/70 border border-accent/20 hover:bg-accent/10 shadow-md transition"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-7 h-7 text-accent group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.75 13.96c.25.13.42.2.55.33.13.13.2.28.25.45.05.18.03.35.0.56-.03.22-.13.43-.3.63-.18.2-.4.38-.68.5-.28.14-.6.2-1 .18-.4-.03-.78-.1-1.15-.24-.4-.13-.78-.3-1.14-.52-.35-.22-.7-.5-1.04-.83-.34-.3-.66-.64-.95-.97-.3-.33-.56-.67-.78-1-.22-.33-.4-.68-.52-1.04-.13-.36-.2-.7-.22-1s.03-.6.1-.88c.08-.28.2-.53.38-.73s.4-.35.68-.45c.28-.1.58-.13.88-.1.3 0 .58.05.82.13.24.08.45.2.6.4.15.2.23.4.28.6.03.2.03.4.0.58-.03.18-.1.35-.2.5-.1.15-.22.3-.38.42-.15.13-.3.2-.48.22-.18.03-.35.02-.5 0-.15-.02-.3-.08-.4-.18-.1-.1-.18-.2-.25-.3-.08-.1-.13-.2-.15-.28-.02-.08-.03-.17-.03-.25 0-.1.02-.18.05-.25s.1-.15.18-.2.18-.1.3-.13c.1-.03.22-.05.35-.05.13 0 .25.02.38.05.12.03.25.1.35.18.1.08.2.18.25.3.05.12.08.25.08.4zM12 2C6.477 2 2 6.477 2 12c0 1.74.44 3.38 1.25 4.84L2 22l5.34-1.42c1.4.75 2.97 1.17 4.66 1.17h.02c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.02h-.02c-1.5 0-2.94-.4-4.2-1.1L4.4 20l1.04-3.25c-.8-1.3-1.23-2.8-1.23-4.35C4.2 7.58 7.78 4 12 4s7.8 3.58 7.8 8.02-3.58 8-7.8 8z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/kishan_patel_7799_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-full bg-background/70 border border-secondary/20 hover:bg-secondary/10 shadow-md transition"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-7 h-7 text-secondary group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="hidden md:block mt-8">
                <div className="w-full h-40 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl blur-2xl opacity-60 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
