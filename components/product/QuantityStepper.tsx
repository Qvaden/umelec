"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
  label = "Количество",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  label?: string;
}) {
  const buttonClass = cn(
    "flex items-center justify-center text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-35",
    size === "sm" ? "h-8 w-8" : "h-10 w-10",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(buttonClass, "rounded-l-full")}
        aria-label="Уменьшить количество"
      >
        <Minus aria-hidden className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          "min-w-8 text-center text-sm font-semibold tabular-nums",
          size === "sm" && "min-w-6 text-xs",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(buttonClass, "rounded-r-full")}
        aria-label="Увеличить количество"
      >
        <Plus aria-hidden className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
