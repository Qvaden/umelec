import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { colorHex } from "@/data/filters";
import { getFilterOptions } from "@/lib/products";
import type { FormEvent, ReactNode } from "react";
import type { FilterGroupConfig, Product } from "@/types";

export interface CatalogFiltersProps {
  groups: FilterGroupConfig[];
  productsForOptions: Product[];
  selectedFilters: Record<string, string[]>;
  onToggle: (key: string, value: string) => void;
  categoryOptions: Array<{ slug: string; name: string; count: number }>;
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  priceMin: string;
  priceMax: string;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onApplyPrice: (event: FormEvent<HTMLFormElement>) => void;
  priceBounds: { min: number; max: number };
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function CatalogFilters({
  groups,
  productsForOptions,
  selectedFilters,
  onToggle,
  categoryOptions,
  selectedCategories,
  onToggleCategory,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  onApplyPrice,
  priceBounds,
  hasActiveFilters,
  onReset,
}: CatalogFiltersProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Фильтры</p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <RotateCcw aria-hidden className="h-3 w-3" />
            Сбросить
          </button>
        ) : null}
      </div>

      <div className="mt-5 space-y-6">
        {categoryOptions.length > 0 ? (
          <FilterBlock title="Категория">
            <div className="space-y-0.5">
              {categoryOptions.map((category) => (
                <CheckRow
                  key={category.slug}
                  checked={selectedCategories.includes(category.slug)}
                  label={category.name}
                  count={category.count}
                  onChange={() => onToggleCategory(category.slug)}
                />
              ))}
            </div>
          </FilterBlock>
        ) : null}

        {groups.map((group) => {
          const options = getFilterOptions(productsForOptions, group);
          if (options.length === 0) return null;

          return (
            <FilterBlock key={group.id} title={group.label}>
              <div className="space-y-0.5">
                {options.map((option) => (
                  <CheckRow
                    key={option.value}
                    checked={(selectedFilters[group.id] ?? []).includes(option.value)}
                    label={option.value}
                    count={option.count}
                    onChange={() => onToggle(group.id, option.value)}
                    color={
                      group.showColors ? (colorHex[option.value] ?? "#d9d2c6") : undefined
                    }
                  />
                ))}
              </div>
            </FilterBlock>
          );
        })}

        <FilterBlock title="Цена">
          <form onSubmit={onApplyPrice} className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={priceMin}
                onChange={(event) => onPriceMinChange(event.target.value)}
                placeholder={`от ${priceBounds.min}`}
                aria-label="Цена от"
                className="h-10 w-full rounded-xl border border-line bg-surface px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={priceMax}
                onChange={(event) => onPriceMaxChange(event.target.value)}
                placeholder={`до ${priceBounds.max}`}
                aria-label="Цена до"
                className="h-10 w-full rounded-xl border border-line bg-surface px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
              />
            </div>
            <Button type="submit" variant="secondary" size="sm" className="w-full">
              <Check aria-hidden className="h-3.5 w-3.5" />
              Применить
            </Button>
          </form>
        </FilterBlock>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function CheckRow({
  checked,
  label,
  count,
  onChange,
  color,
}: {
  checked: boolean;
  label: string;
  count: number;
  onChange: () => void;
  color?: string;
}) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center justify-between gap-3 rounded-lg px-1 py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground">
      <span className="flex min-w-0 items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-accent"
        />
        {color ? (
          <span
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 rounded-full border border-foreground/10"
            style={{ backgroundColor: color }}
          />
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 text-xs tabular-nums text-muted">{count}</span>
    </label>
  );
}
