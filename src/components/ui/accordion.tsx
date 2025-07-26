"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-primary/20 bg-card/60 rounded-xl mb-4 shadow-md transition-shadow hover:shadow-primary/20",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 px-6 font-semibold text-lg text-primary transition-all duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-xl group bg-transparent",
        "shadow-none group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-primary/10 group-data-[state=open]:to-accent/10",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      <span className="transition-colors duration-300 group-data-[state=open]:text-accent">
        {children}
      </span>
      <ChevronDown className="h-5 w-5 shrink-0 ml-2 transition-transform duration-300 group-data-[state=open]:text-accent" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-base transition-all duration-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down bg-background/80 rounded-b-xl",
      className
    )}
    {...props}
  >
    <div className={cn("pb-6 pt-2 px-6 text-muted-foreground", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
