import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "outline-active":
          "bg-green-50 text-green-700 border-green-200 [a&]:hover:bg-green-100",
        "outline-draft":
          "bg-gray-50 text-gray-700 border-gray-200 [a&]:hover:bg-gray-100",
        "outline-elapsed":
          "bg-red-50 text-red-700 border-red-200 [a&]:hover:bg-red-100",
        "dietary-none":
          "bg-gray-50 text-gray-600 border-gray-200 [a&]:hover:bg-gray-100",
        "dietary-vegetarian":
          "bg-green-50 text-green-700 border-green-200 [a&]:hover:bg-green-100",
        "dietary-vegan":
          " text-emerald-700 border-emerald-400 [a&]:hover:bg-emerald-100",
        "dietary-gluten-free":
          "bg-blue-50 text-blue-700 border-blue-200 [a&]:hover:bg-blue-100",
        "dietary-halal":
          "bg-purple-50 text-purple-700 border-purple-200 [a&]:hover:bg-purple-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
