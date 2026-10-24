import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Умелец — на главную"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors",
          tone === "dark"
            ? "bg-accent text-white group-hover:bg-accent-hover"
            : "bg-surface text-accent group-hover:bg-sand",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
          <rect
            x="3.75"
            y="3.75"
            width="16.5"
            height="16.5"
            rx="1.75"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 3.75v16.5M3.75 12h16.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 12h8.25v8.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "text-[1.35rem] font-bold leading-none tracking-tightest",
            tone === "dark" ? "text-foreground" : "text-surface",
          )}
        >
          Умелец
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-muted" : "text-surface/55",
          )}
        >
          Дом · окна · двери
        </span>
      </span>
    </Link>
  );
}
