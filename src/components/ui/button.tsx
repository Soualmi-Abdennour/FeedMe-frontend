import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/shadcn.utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-neutral-0 text-btn-1 shadow-button hover:bg-primary-600  focus:bg-primary-600 focus:ring-2 focus:ring-primary-300 focus:outline-none  active:bg-primary-700  disabled:bg-primary-200 disabled:text-neutral-0 disabled:shadow-none",
        secondary:
          " border border-primary-500 bg-transparent text-primary-500 text-btn-1  hover:bg-primary-50 hover:border-primary-600  focus:ring-2 focus:ring-primary-300 focus:outline-none  active:bg-primary-100   disabled:border-primary-200 disabled:text-primary-200",
        tertiary:
          "bg-transparent text-primary-500 text-btn-1   hover:text-primary-600 hover:underline  focus:ring-2 focus:ring-primary-300 focus:outline-none  active:text-primary-700  disabled:text-primary-200 disabled:no-underline",
        success:
          "bg-success-500 text-neutral-0 text-btn-1  hover:bg-success-600 focus:ring-2 focus:ring-success-300 focus:outline-none active:bg-success-700  disabled:bg-success-200",
        fail:
          "bg-fail-500 text-neutral-0 text-btn-1  hover:bg-fail-600  focus:ring-2 focus:ring-fail-300 focus:outline-none  active:bg-fail-700  disabled:bg-fail-200",
        error:
          "bg-error-500 text-neutral-0 text-btn-1  hover:bg-error-600 focus:ring-2 focus:ring-error-300 focus:outline-none  active:bg-error-700 disabled:bg-error-200",
        ghost:""
      },

      size: {
        default: "px-6 py-3",
        sm:      "px-4 py-2",
        lg:      "px-8 py-4",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
