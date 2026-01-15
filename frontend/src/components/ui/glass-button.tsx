import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  ...props
}: GlassButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-md active:scale-95";
  
  const variants = {
    primary: "bg-blue-600/80 hover:bg-blue-500/90 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    danger: "bg-red-500/80 hover:bg-red-400/90 text-white",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
