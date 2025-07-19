import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

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

export default function About() {
  return (
    <section id="about" className="space-y-16">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-pulse">About Me</h2>
        <p className="mt-4 text-lg text-muted-foreground">The Origin Story</p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 flex justify-center items-center">
            <div className="relative">
                <Image src="https://placehold.co/300x400.png" alt="Kishan Patel's Hologram Avatar" width={300} height={400} className="rounded-lg z-10" data-ai-hint="futuristic hologram" />
                <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-lg blur-xl opacity-30 animate-pulse"></div>
            </div>
        </div>
        <div className="md:col-span-3">
          <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-accent font-headline">My Journey</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Hi, I’m Kishan Patel – an AI/ML Engineer and the creator of the BOLT Universe.
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
  );
}
