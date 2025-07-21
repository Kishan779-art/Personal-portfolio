
'use client'

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: 'AI Resume Ranker & Builder',
    category: 'AI',
    description: 'Optimize your resume for any job description with our AI-powered tool. Get insights, suggestions, and a professional resume to land your dream job.',
    longDescription: 'This AI-driven platform analyzes resumes against job descriptions to provide a compatibility score and detailed feedback. It leverages Genkit AI to suggest improvements, identify missing keywords, and rephrase sections to better align with what recruiters are looking for. The builder feature then helps users construct an optimized resume from scratch, ensuring a higher chance of passing through automated screening systems.',
    image: 'https://drive.google.com/uc?export=view&id=1o-n5yXXopi-_TS5axF25WoRPvXRcV82G',
    tags: ['Next.js', 'AI/ML', 'Tailwind CSS', 'Genkit'],
    liveUrl: 'https://ai-resume-ranker-builder.vercel.app/',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'resume analysis'
  },
  {
    title: 'Bolt-Ledger',
    category: 'Web',
    description: 'An advanced expense tracking application to manage your finances with real-time updates and detailed data visualizations.',
    longDescription: 'An advanced expense tracking application designed to provide a seamless and intuitive experience for managing your finances. With real-time updates, secure authentication, and detailed data visualizations, Bolt-Ledger helps you stay on top of your spending effortlessly.',
    image: '/bolt-ledger.png',
    tags: ['Next.js', 'Firebase', 'Data Visualization', 'Web'],
    liveUrl: 'https://bolt-ledger.vercel.app/',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'finance dashboard'
  },
  {
    title: 'QR Code Generator',
    category: 'Web',
    description: 'A simple and easy-to-use QR code generator. Instantly create QR codes for URLs, text, and more. Customize and download your QR codes effortlessly.',
    longDescription: 'This web application provides a fast and intuitive way to generate custom QR codes. Built with a focus on a clean user interface and immediate feedback, users can input various data types like URLs or plain text and see the QR code generated in real-time. The tool is built with modern web technologies for a responsive and seamless experience across all devices.',
    image: '/qr-project.png',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://kishanqrproject.vercel.app/',
    githubUrl: 'https://github.com/Kishan779-art',
    aiHint: 'QR code'
  },
  {
    title: 'Typing-Bolt',
    category: 'Automation',
    description: 'A smart auto-typing web tool that mimics human-like typing, built using Python, Selenium, and OCR to achieve over 100 WPM with high precision.',
    longDescription: 'A smart auto-typing web tool that mimics human-like typing on TypingBolt.com. Built using Python, Selenium, and OCR, it reads the target text and types it automatically — achieving 100+ WPM with precision. Great for exploring browser automation, UI interaction, and AI-in-action. Fully powered by BOLT UNIVERSE.',
    image: '/typing-bolt.png',
    tags: ['Python', 'Selenium', 'Automation', 'OCR'],
    liveUrl: 'https://bolt-typing.vercel.app/',
    githubUrl: 'https://github.com/Kishan779-art/Typing-Bolt',
    aiHint: 'typing automation'
  }
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
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        style={{ perspective: '1200px' }}
    >
        {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
        ))}
    </motion.div>
    )
}

const ProjectCard = ({ title, description, longDescription, image, tags, liveUrl, githubUrl, aiHint }: (typeof projects)[0]) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', stiffness: 400, damping: 17 }
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative h-[450px]"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <AnimatePresence>
            {!isFlipped ? (
                <motion.div
                    key="front"
                    className="absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="w-full h-full bg-card/50 border-primary/10 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/20">
                        <div className="relative overflow-hidden">
                            <Image src={image} alt={title} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint={aiHint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-2 right-2 bg-background/50 p-1 rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                <RefreshCw className="w-4 h-4" />
                            </div>
                        </div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                            <h3 className="font-headline text-xl text-accent mb-2">{title}</h3>
                            <p className="text-muted-foreground mb-4 text-sm flex-grow">{description}</p>
                            <div className="flex flex-wrap gap-2 mb-6 pt-2">
                                {tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">{tag}</span>)}
                            </div>
                            <div className="flex justify-start gap-4 mt-auto">
                                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground neon-glow" onClick={(e) => e.stopPropagation()}>
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live</a>
                                </Button>
                                <Button asChild variant="ghost" className="text-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Code</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <motion.div
                    key="back"
                    className="absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="w-full h-full bg-card/80 border-accent/30 backdrop-blur-lg overflow-hidden flex flex-col transition-all duration-300">
                         <CardContent className="p-6 flex flex-col flex-grow text-left">
                            <h3 className="font-headline text-xl text-accent mb-2">{title} - More Info</h3>
                            <p className="text-muted-foreground text-sm flex-grow overflow-y-auto">{longDescription}</p>
                             <div className="flex justify-start gap-4 mt-auto pt-4">
                                <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground neon-glow" onClick={(e) => e.stopPropagation()}>
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live</a>
                                </Button>
                                <Button asChild variant="ghost" className="text-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Code</a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};
