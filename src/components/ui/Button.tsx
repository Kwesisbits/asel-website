import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-asel-yellow text-asel-navy hover:bg-asel-yellow-light shadow-solar",
    secondary: "bg-white text-asel-navy hover:bg-asel-off-white border border-asel-yellow/40",
    ghost: "bg-transparent text-current hover:bg-white/10",
    dark: "bg-asel-navy text-white hover:bg-[#10223b]",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-asel-yellow focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
