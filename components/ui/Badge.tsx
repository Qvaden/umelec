import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent" | "sand" | "dark" | "outline";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-foreground/[0.06] text-foreground",
  accent: "bg-accent-soft text-accent",
  sand: "bg-sand text-foreground",
  dark: "bg-foreground text-surface",
  outline: "border border-line bg-surface/80 text-foreground backdrop-blur",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
