import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { sortOptions } from "@/data/filters";
import { formatNumber, pluralize } from "@/lib/utils";
import type { FormEvent } from "react";
import type { SortValue } from "@/types";

export function CatalogToolbar({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  sort,
  onSortChange,
  count,
  activeFilterCount,
  onOpenFilters,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClearSearch: () => void;
  sort: SortValue;
  onSortChange: (value: string) => void;
  count: number;
  activeFilterCount: number;
  onOpenFilters: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={onSearchSubmit} className="relative w-full sm:max-w-[20rem]">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск в каталоге"
          aria-label="Поиск в каталоге"
          className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-10 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
        />
        {searchValue ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Очистить поиск"
          >
            <X aria-hidden className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </form>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-xs text-muted sm:hidden">
          {formatNumber(count)} {pluralize(count, "товар", "товара", "товаров")}
        </p>

        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-foreground/30 lg:hidden"
        >
          <SlidersHorizontal aria-hidden className="h-4 w-4" />
          Фильтры
          {activeFilterCount > 0 ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.625rem] font-bold text-white">
              {activeFilterCount}
            </span>
          ) : null}
        </button>

        <p className="hidden text-xs text-muted sm:block">
          {formatNumber(count)} {pluralize(count, "товар", "товара", "товаров")}
        </p>

        <div className="relative">
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Сортировка товаров"
            className="h-11 appearance-none rounded-full border border-line bg-surface pl-4 pr-10 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
        </div>
      </div>
    </div>
  );
}
