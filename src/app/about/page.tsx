
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useTypewriter } from "@/hooks/use-typewriter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animated-counter";

const skills = [
  { name: 'Python & AI/ML', value: 95, details: 'TensorFlow, PyTorch, Scikit-learn, LangChain' },
  { name: 'React & Next.js', value: 90, details: 'TypeScript, Tailwind CSS, Redux, Framer Motion' },
  { name: 'Backend & DevOps', value: 85, details: 'Node.js, Firebase, Docker, Google Cloud' },
  { name: 'Automation', value: 80, details: 'CI/CD Pipelines, GitHub Actions, Selenium' },
];

const timeline = [
    { year: 'Present', title: 'B.Tech in AI & Machine Learning', institution: 'University Name (To be updated)' },
    { year: '2023', title: 'Lead ML Engineer', institution: 'InnovateAI Corp.' },
    { year: '2022', title: 'AI Research Intern', institution: 'Future Systems Inc.' },
];

const stats = [
    { value: 10, label: 'Projects Done' },
    { value: 25, label: 'Tech Stacks Used' },
    { value: 1500, label: 'Hours Coded' },
]

export default function AboutPage() {
  const titles = ["ML Enthusiast", "Resume Ranker Dev", "Hackathon Winner"];
  const typewriterText = useTypewriter(titles, 100, 50, 2000);
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow pt-24">
            <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
                <div className="text-center">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-pulse">About Me</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The Origin Story</p>
                </div>

                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2 flex justify-center items-center">
                        <div className="relative">
                            <Image src="https://drive.google.com/uc?export=view&id=1ggWqofoAf23pggn6vSEQn3OKVDyd1Cho" alt="Kishan Patel" width={300} height={400} className="rounded-lg z-10 object-cover" />
                            <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-lg blur-xl opacity-30 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                    <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                        <CardHeader>
                        <CardTitle className="text-accent font-headline">My Journey</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground space-y-4">
                        <p className="text-xl">
                            Hi, I’m Kishan Patel – <span className="text-primary font-semibold h-6 inline-block">{typewriterText}</span>
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
                            className="bg-card/50 p-8 rounded-lg border border-primary/20"
                        >
                            <h3 className="font-headline text-5xl font-bold text-primary">
                                <AnimatedCounter to={stat.value} />+
                            </h3>
                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>


                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                    <h3 className="font-headline text-3xl font-bold text-primary mb-8">Timeline</h3>
                    <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-primary neon-glow"></div>
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
                            <AccordionTrigger className="font-semibold text-lg hover:no-underline hover:text-accent">
                                {skill.name}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 p-4 bg-background/50 rounded-md">
                                    <Progress value={skill.value} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
                                    <p className="text-sm text-muted-foreground">{skill.details}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}
