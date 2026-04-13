import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink outline-none ring-0 placeholder:text-ink/45 focus:border-moss/40",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
