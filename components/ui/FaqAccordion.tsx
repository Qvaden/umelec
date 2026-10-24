"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

export function FaqAccordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div
      className={cn(
        "divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold leading-snug transition-colors hover:text-accent sm:px-6 sm:py-5 sm:text-[0.9375rem]"
              >
                {item.question}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all",
                    isOpen && "rotate-45 border-accent bg-accent text-white",
                  )}
                >
                  <Plus aria-hidden className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${index}`}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pr-16">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
