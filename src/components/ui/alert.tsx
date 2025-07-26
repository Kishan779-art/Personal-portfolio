import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // Glassmorphism, neon border, shadow, icon layout
  "relative w-full rounded-xl border p-5 pr-8 bg-card/80 backdrop-blur-lg shadow-xl transition-all duration-300 overflow-hidden neon-glow",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 text-foreground [&>svg]:text-primary",
        destructive:
          "border-destructive/60 text-destructive bg-destructive/10 dark:border-destructive/80 [&>svg]:text-destructive",
        success:
          "border-green-500/60 text-green-700 bg-green-100/60 dark:border-green-400/80 [&>svg]:text-green-500",
        info:
          "border-accent/60 text-accent bg-accent/10 dark:border-accent/80 [&>svg]:text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      alertVariants({ variant }),
      "[&>svg~*]:pl-10 [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5 [&>svg]:text-2xl",
      "hover:shadow-primary/30 group transition-shadow duration-300",
      className
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-headline text-lg font-bold leading-none tracking-tight text-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-base text-muted-foreground mt-1 animate-fade-in",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
