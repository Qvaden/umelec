import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  count,
  className,
  label,
}: {
  value: number;
  count?: number;
  className?: string;
  label?: string;
}) {
  const rounded = Math.round(value);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-3.5 w-3.5",
              index < rounded ? "fill-accent text-accent" : "fill-transparent text-line",
            )}
            strokeWidth={1.6}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-muted">
        {value.toFixed(1)}
        {typeof count === "number" ? ` · ${count}` : ""}
      </span>
      <span className="sr-only">
        {label ?? `Рейтинг ${value.toFixed(1)} из 5`}
        {typeof count === "number" ? `, отзывов: ${count}` : ""}
      </span>
    </span>
  );
}
