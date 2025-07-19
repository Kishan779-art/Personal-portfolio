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

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(500),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Message Sent! 🚀',
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <section id="contact" className="relative space-y-16 overflow-hidden py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Neural Link</h2>
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
            <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 animate-glow-pulse">
                {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
