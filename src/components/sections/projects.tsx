'use client'

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'AI Resume Ranker & Builder',
    category: 'AI',
    description: 'Optimize your resume for any job description with our AI-powered tool. Get insights, suggestions, and a professional resume to land your dream job.',
    image: 'https://drive.google.com/uc?export=view&id=1o-n5yXXopi-_TS5axF25WoRPvXRcV82G',
    tags: ['Next.js', 'AI/ML', 'Tailwind CSS', 'Genkit'],
    liveUrl: 'https://ai-resume-ranker-builder.vercel.app/',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'resume analysis'
  },
];

export default function Projects() {
    return (
        <section id="projects" className="space-y-16">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-pulse">My Arsenal</h2>
                <p className="mt-4 text-lg text-muted-foreground">A selection of my proudest creations.</p>
            </div>

            <Tabs defaultValue="all" className="w-full text-center">
                <TabsList className="bg-card/50 border border-primary/20">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="AI">AI</TabsTrigger>
                    <TabsTrigger value="Web">Web</TabsTrigger>
                    <TabsTrigger value="Automation">Automation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                    <ProjectGrid projects={projects} />
                </TabsContent>
                <TabsContent value="AI">
                    <ProjectGrid projects={projects.filter(p => p.category === 'AI')} />
                </TabsContent>
                <TabsContent value="Web">
                    <ProjectGrid projects={projects.filter(p => p.category === 'Web')} />
                </TabsContent>
                <TabsContent value="Automation">
                    <ProjectGrid projects={projects.filter(p => p.category === 'Automation')} />
                </TabsContent>
            </Tabs>
        </section>
    );
}

const ProjectGrid = ({ projects }: { projects: typeof projects }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
        ))}
    </motion.div>
    )
}

const ProjectCard = ({ title, description, image, tags, liveUrl, githubUrl, aiHint }: (typeof projects)[0]) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', stiffness: 400, damping: 17 }
        },
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={cardVariants}
            className="group relative"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                style={{ rotateX, rotateY, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring' }}
                className="w-full h-full"
            >
                <Card className="w-full h-full bg-card/50 border-primary/10 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/20">
                    <div className="relative overflow-hidden">
                        <Image src={image} alt={title} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint={aiHint}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="overflow-hidden h-14">
                            <motion.h3 
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="font-headline text-xl text-accent mb-2"
                            >
                                {title}
                            </motion.h3>
                        </div>
                        <div className="overflow-hidden h-20">
                           <motion.p
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.05 }}
                                className="text-muted-foreground mb-4 text-sm flex-grow"
                            >
                                {description}
                            </motion.p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6 pt-2">
                            {tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">{tag}</span>)}
                        </div>
                        <div className="flex justify-start gap-4 mt-auto">
                            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground neon-glow">
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live</a>
                            </Button>
                            <Button asChild variant="ghost" className="text-foreground hover:text-primary">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Code</a>
                            </Button>
                        </div>
                    </div>
                </Card>
                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-lg transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-75"></div>
            </motion.div>
        </motion.div>
    );
};
