'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTypewriter } from "@/hooks/use-typewriter";
import { motion } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animated-counter";
import { useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import Testimonials from "@/components/sections/testimonials";

const skills = [
  { name: 'Python & AI/ML', value: 95, details: 'TensorFlow, PyTorch, Scikit-learn, LangChain' },
  { name: 'React & Next.js', value: 90, details: 'TypeScript, Tailwind CSS, Redux, Framer Motion' },
  { name: 'Backend & DevOps', value: 85, details: 'Node.js, Firebase, Docker, Google Cloud' },
  { name: 'Automation', value: 80, details: 'CI/CD Pipelines, GitHub Actions, Selenium' },
];

const timeline = [
  { year: 'Present', title: 'B.Tech in Artificial Intelligence & Machine Learning', institution: 'Charusat' },
  { year: '2024', title: 'Completed Higher Studies', institution: 'Knowledge High school' },
  { year: '2023', title: 'Started Learning AI', institution: 'Self-Study & Online Courses' },
];

const stats = [
  { value: 10, label: 'Projects Done' },
  { value: 25, label: 'Tech Stacks Used' },
  { value: 1500, label: 'Hours Coded' },
];

export default function AboutPage() {
  const titles = ["ML Enthusiast", "Resume Ranker Dev", "Hackathon Winner"];
  const typewriterText = useTypewriter(titles, 100, 50, 2000);
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground">
      <Header />
      <main className="flex-grow pt-24">
        <motion.section
          id="about"
          className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-20 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative blurred shapes */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>

          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-primary/20 text-primary font-semibold shadow-md animate-fade-in">
              <Sparkles className="w-5 h-5 text-accent" />
              About Me
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg">
              The Origin Story
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey through code, creativity, and curiosity.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 flex justify-center items-center">
              <div className="relative group">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1ggWqofoAf23pggn6vSEQn3OKVDyd1Cho"
                  alt="Kishan Patel"
                  width={300}
                  height={400}
                  className="rounded-xl z-10 object-cover shadow-xl border-4 border-primary/30 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -inset-3 bg-gradient-to-br from-primary to-accent rounded-xl blur-2xl opacity-40 group-hover:opacity-60 animate-glow-pulse transition" />
              </div>
            </div>
            <div className="md:col-span-3">
              <Card className="bg-card/60 border-primary/20 backdrop-blur-md shadow-lg">
                <CardHeader>
                  <CardTitle className="text-accent font-headline text-2xl">My Journey</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-lg">
                  <p>
                    Hi, I’m Kishan Patel –{" "}
                    <span className="text-primary font-semibold h-6 inline-block typewriter-text">{typewriterText}</span>
                  </p>
                  <p>
                    From a young age, I was fascinated by the potential of technology to solve complex problems. This passion led me to pursue a degree in Artificial Intelligence and Machine Learning, where I'm constantly exploring the transformative power of intelligent systems.
                  </p>
                  <p>
                    My professional journey has been a thrilling adventure through the landscapes of machine learning, web development, and automation. I thrive on building intelligent systems that are not only powerful but also intuitive and beautiful.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card/60 p-10 rounded-xl border border-primary/20 shadow-md hover:shadow-primary/30 transition-shadow duration-300"
              >
                <h3 className="font-headline text-5xl font-bold text-primary drop-shadow-lg">
                  <AnimatedCounter to={stat.value} />+
                </h3>
                <p className="text-muted-foreground mt-2 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-headline text-3xl font-bold text-primary mb-8">Timeline</h3>
              <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative group hover:scale-105 transition-transform duration-300" aria-label={`${item.year} - ${item.title} at ${item.institution}`} tabIndex={0}>
                    <div className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent neon-glow group-hover:scale-125 transition-transform"></div>
                    <p className="font-bold text-accent">{item.year}</p>
                    <h4 className="font-semibold text-lg text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-3xl font-bold text-primary mb-8">Skills</h3>
              <Accordion type="single" collapsible className="w-full">
                {skills.map((skill) => (
                  <AccordionItem value={skill.name} key={skill.name} className="border-primary/20">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline hover:text-accent transition-colors">
                      {skill.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4 bg-background/60 rounded-md">
                        <Progress
                          value={skill.value}
                          className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent transition-all duration-700 hover:brightness-110"
                          aria-valuenow={skill.value}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          role="progressbar"
                          tabIndex={0}
                        />
                        <p className="text-sm text-muted-foreground">{skill.details}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <Testimonials />

          <div className="text-center mt-20">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-white font-bold rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-glow-pulse"
              aria-label="Contact me"
            >
              Let’s Connect!
            </a>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
