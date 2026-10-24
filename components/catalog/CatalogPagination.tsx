import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageItems } from "@/components/catalog/catalog-utils";
import { cn } from "@/lib/utils";

export function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Постраничная навигация" className="mt-8 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        aria-label="Предыдущая страница"
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </button>

      {getPageItems(currentPage, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-11 w-8 items-center justify-center text-sm text-muted"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors",
              item === currentPage
                ? "bg-accent text-white"
                : "border border-line bg-surface text-foreground/70 hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        aria-label="Следующая страница"
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </button>
    </nav>
  );
}
