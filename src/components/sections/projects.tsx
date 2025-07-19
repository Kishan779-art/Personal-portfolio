'use client'

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AI-Powered Chatbot',
    category: 'AI',
    description: 'A conversational AI with natural language understanding for customer support.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'TensorFlow', 'NLP'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'chatbot interface'
  },
  {
    title: 'Futuristic Portfolio',
    category: 'Web',
    description: 'This very website, built with Next.js, Tailwind CSS and a touch of neon.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'portfolio website'
  },
  {
    title: 'CI/CD Pipeline Automation',
    category: 'Automation',
    description: 'Automated build, test, and deployment pipelines for a large-scale application.',
    image: 'https://placehold.co/600x400.png',
    tags: ['GitHub Actions', 'Docker', 'GCP'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'code pipeline'
  },
    {
    title: 'Image Recognition API',
    category: 'AI',
    description: 'A deep learning model that identifies objects in images with high accuracy.',
    image: 'https://placehold.co/600x400.png',
    tags: ['PyTorch', 'REST API', 'Computer Vision'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'image recognition'
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
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 17
            }
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group"
            style={{ perspective: '1000px' }}
        >
            <Card className="w-full h-full bg-card/50 border-primary/10 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/20">
                <div className="relative overflow-hidden">
                  <Image src={image} alt={title} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={aiHint}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <h3 className="font-headline text-xl text-accent mb-2">{title}</h3>
                   <p className="text-muted-foreground mb-4 text-sm flex-grow">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
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
        </motion.div>
    );
};
