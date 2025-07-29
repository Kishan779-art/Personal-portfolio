"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Product Manager",
    quote:
      "Kishan's work on our AI project was outstanding. His expertise and dedication made a huge difference.",
  },
  {
    name: "John Smith",
    role: "CTO",
    quote:
      "A talented developer with a keen eye for detail. Kishan consistently delivers high-quality solutions.",
  },
  {
    name: "Emily Johnson",
    role: "UX Designer",
    quote:
      "Working with Kishan was a pleasure. His ability to integrate design and functionality is impressive.",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2
          id="testimonials-title"
          className="font-headline text-4xl md:text-5xl font-bold text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-lg"
        >
          Testimonials
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          What people say about me
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-card/60 border-primary/20 backdrop-blur-md shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-accent font-headline text-xl">{testimonial.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </CardHeader>
              <CardContent className="text-muted-foreground text-base">{testimonial.quote}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
