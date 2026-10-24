import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex min-h-10 shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent sm:min-h-0"
        >
          {action.label}
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </div>
  );
}
