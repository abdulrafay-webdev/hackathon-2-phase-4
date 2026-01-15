import clsx from "clsx";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        "bg-glass-100 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
