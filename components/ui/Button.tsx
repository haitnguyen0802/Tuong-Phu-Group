import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-moss-700 text-cream-50 hover:bg-moss-800 hover:-translate-y-[1px]",
        secondary:
          "bg-cream-100 text-ink-900 hover:bg-cream-200 hover:-translate-y-[1px]",
        outline:
          "border border-moss-700/30 text-moss-700 hover:border-moss-700 hover:bg-moss-700 hover:text-cream-50",
        ghost: "text-ink-900 hover:bg-cream-100",
        accent:
          "bg-clay-500 text-cream-50 hover:bg-clay-600 hover:-translate-y-[1px]",
        link: "text-moss-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm tracking-wide",
        lg: "h-13 px-8 text-base tracking-wide",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, shape, ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, shape }), className)}
        {...rest}
      />
    );
  },
);

export { buttonStyles };
