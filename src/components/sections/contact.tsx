'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import RocketAnimation from '@/components/rocket-animation';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(500),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.75 13.96c.25.13.42.2.55.33.13.13.2.28.25.45.05.18.03.35.0.56-.03.22-.13.43-.3.63-.18.2-.4.38-.68.5-.28.14-.6.2-1 .18-.4-.03-.78-.1-1.15-.24-.4-.13-.78-.3-1.14-.52-.35-.22-.7-.5-1.04-.83-.34-.3-.66-.64-.95-.97-.3-.33-.56-.67-.78-1-.22-.33-.4-.68-.52-1.04-.13-.36-.2-.7-.22-1s.03-.6.1-.88c.08-.28.2-.53.38-.73s.4-.35.68-.45c.28-.1.58-.13.88-.1.3 0 .58.05.82.13.24.08.45.2.6.4.15.2.23.4.28.6.03.2.03.4.0.58-.03.18-.1.35-.2.5-.1.15-.22.3-.38.42-.15.13-.3.2-.48.22-.18.03-.35.02-.5 0-.15-.02-.3-.08-.4-.18-.1-.1-.18-.2-.25-.3-.08-.1-.13-.2-.15-.28-.02-.08-.03-.17-.03-.25 0-.1.02-.18.05-.25s.1-.15.18-.2.18-.1.3-.13c.1-.03.22-.05.35-.05.13 0 .25.02.38.05.12.03.25.1.35.18.1.08.2.18.25.3.05.12.08.25.08.4zM12 2C6.477 2 2 6.477 2 12c0 1.74.44 3.38 1.25 4.84L2 22l5.34-1.42c1.4.75 2.97 1.17 4.66 1.17h.02c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.02h-.02c-1.5 0-2.94-.4-4.2-1.1L4.4 20l1.04-3.25c-.8-1.3-1.23-2.8-1.23-4.35C4.2 7.58 7.78 4 12 4s7.8 3.58 7.8 8.02-3.58 8-7.8 8z"/>
  </svg>
);

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRocketAnimation, setShowRocketAnimation] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowRocketAnimation(true);

    setTimeout(() => {
      setShowRocketAnimation(false);
      toast({
        title: 'Message Sent! 🚀',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    }, 2500);
  }

  return (
    <>
      <AnimatePresence>
        {showRocketAnimation && <RocketAnimation />}
      </AnimatePresence>
      <motion.section
        id="contact"
        className="relative space-y-16 overflow-hidden py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative blurred background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.10)_0%,_transparent_60%)] -z-10"></div>
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary animate-pulse">Neural Link</h2>
          <p className="mt-4 text-lg text-muted-foreground">Send a signal into the universe. I'll be listening.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="bg-background/50 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} className="bg-background/50 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message..." {...field} className="bg-background/50 focus:border-accent focus:ring-accent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 neon-glow shadow-lg transition-all duration-200">
                  {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </Button>
                <Button asChild className="w-full bg-green-500 text-white hover:bg-green-600 animate-glow-pulse shadow-lg transition-all duration-200">
                  <Link href="https://wa.me/918200945102" target="_blank">
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Contact on WhatsApp
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </motion.section>
    </>
  );
}