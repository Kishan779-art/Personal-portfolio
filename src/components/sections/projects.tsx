'use client'

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const projects = [
  {
    title: 'AI-Powered Chatbot',
    category: 'AI',
    description: 'A conversational AI with natural language understanding for customer support.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'TensorFlow', 'NLP'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'chatbot interface'
  },
  {
    title: 'Futuristic Portfolio',
    category: 'Web',
    description: 'This very website, built with Next.js, Tailwind CSS and a touch of neon.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'portfolio website'
  },
  {
    title: 'CI/CD Pipeline Automation',
    category: 'Automation',
    description: 'Automated build, test, and deployment pipelines for a large-scale application.',
    image: 'https://placehold.co/600x400.png',
    tags: ['GitHub Actions', 'Docker', 'GCP'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'code pipeline'
  },
    {
    title: 'Image Recognition API',
    category: 'AI',
    description: 'A deep learning model that identifies objects in images with high accuracy.',
    image: 'https://placehold.co/600x400.png',
    tags: ['PyTorch', 'REST API', 'Computer Vision'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'image recognition'
  },
];

export default function Projects() {
    return (
        <section id="projects" className="space-y-16">
            <div className="text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Explore My Arsenal</h2>
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

const ProjectGrid = ({ projects }: { projects: typeof projects }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
        ))}
    </div>
)

const ProjectCard = ({ title, description, image, tags, liveUrl, githubUrl, aiHint }: (typeof projects)[0]) => {
    return (
        <div className="group" style={{ perspective: '1000px' }}>
            <div className="relative w-full h-96 text-left transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute w-full h-full [backface-visibility:hidden]">
                    <Card className="w-full h-full bg-card/50 border-primary/20 overflow-hidden flex flex-col">
                        <Image src={image} alt={title} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={aiHint}/>
                        <div className="p-6 flex flex-col flex-grow">
                           <h3 className="font-headline text-xl text-accent mb-2">{title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">{tag}</span>)}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Card className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 flex flex-col justify-center p-6">
                        <h3 className="font-headline text-2xl text-accent mb-4">{title}</h3>
                        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
                        <div className="flex justify-center gap-4">
                            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live</a>
                            </Button>
                             <Button asChild variant="ghost" className="text-foreground hover:text-primary">
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Code</a>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
