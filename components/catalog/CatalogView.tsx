"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CatalogActiveChips, type ActiveChip } from "@/components/catalog/CatalogActiveChips";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { PAGE_SIZE, parsePrice, parseSort, readMulti } from "@/components/catalog/catalog-utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { getFilterGroupsForCategory } from "@/data/filters";
import { products } from "@/data/products";
import { filterProducts, getPriceBounds, getProductsByCategory } from "@/lib/products";
import { formatNumber, formatPrice, pluralize } from "@/lib/utils";

export function CatalogView({ categorySlug }: { categorySlug?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const groups = useMemo(
    () => (categorySlug ? getFilterGroupsForCategory(categorySlug) : []),
    [categorySlug],
  );

  const scopedProducts = useMemo(
    () => (categorySlug ? getProductsByCategory(categorySlug) : products),
    [categorySlug],
  );

  const q = searchParams.get("q") ?? "";
  const sort = parseSort(searchParams.get("sort"));
  const minPrice = parsePrice(searchParams.get("min"));
  const maxPrice = parsePrice(searchParams.get("max"));
  const categoryParam = searchParams.get("category") ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");

  const selectedCategories = useMemo(
    () => (categorySlug ? [] : categoryParam.split(",").filter(Boolean)),
    [categorySlug, categoryParam],
  );

  const selectedFilters = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const group of groups) {
      const values = readMulti(searchParams, group.id);
      if (values.length > 0) result[group.id] = values;
    }
    return result;
  }, [groups, searchParams]);

  const baseProducts = useMemo(() => {
    if (selectedCategories.length === 0) return scopedProducts;
    return scopedProducts.filter((product) => selectedCategories.includes(product.category));
  }, [scopedProducts, selectedCategories]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(baseProducts, {
        q,
        filters: selectedFilters,
        minPrice,
        maxPrice,
        sort,
      }),
    [baseProducts, q, selectedFilters, minPrice, maxPrice, sort],
  );

  const priceBounds = useMemo(() => getPriceBounds(scopedProducts), [scopedProducts]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number.isFinite(pageParam) ? Math.floor(pageParam) : 1),
    totalPages,
  );
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const [searchValue, setSearchValue] = useState(q);
  const [priceMin, setPriceMin] = useState(minPrice?.toString() ?? "");
  const [priceMax, setPriceMax] = useState(maxPrice?.toString() ?? "");

  useEffect(() => {
    setSearchValue(q);
  }, [q]);

  useEffect(() => {
    setPriceMin(minPrice?.toString() ?? "");
    setPriceMax(maxPrice?.toString() ?? "");
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const navigate = (params: URLSearchParams, scrollToResults = false) => {
    params.forEach((value, key) => {
      if (!value) params.delete(key);
    });
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });

    if (scrollToResults) {
      window.setTimeout(() => {
        document.getElementById("catalog-results")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    navigate(params);
  };

  const toggleMulti = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = readMulti(params, key);
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    if (next.length > 0) params.set(key, next.join(","));
    else params.delete(key);

    params.delete("page");
    navigate(params);
  };

  const applyPrice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let min = parsePrice(priceMin);
    let max = parsePrice(priceMax);

    if (min !== null && max !== null && min > max) {
      [min, max] = [max, min];
      setPriceMin(String(min));
      setPriceMax(String(max));
    }

    updateParams({
      min: min === null ? null : String(min),
      max: max === null ? null : String(max),
    });
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ q: searchValue.trim() || null });
  };

  const clearSearch = () => {
    setSearchValue("");
    updateParams({ q: null });
  };

  const resetAll = () => {
    setMobileOpen(false);
    navigate(new URLSearchParams());
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) params.delete("page");
    else params.set("page", String(page));
    navigate(params, true);
  };

  const groupLabel = (id: string) => groups.find((group) => group.id === id)?.label ?? id;

  const activeChips: ActiveChip[] = [];

  if (q) {
    activeChips.push({
      key: "q",
      label: `Поиск: «${q}»`,
      onRemove: () => updateParams({ q: null }),
    });
  }

  for (const slug of selectedCategories) {
    const category = categories.find((item) => item.slug === slug);
    activeChips.push({
      key: `category-${slug}`,
      label: category?.name ?? slug,
      onRemove: () => toggleMulti("category", slug),
    });
  }

  for (const [groupId, values] of Object.entries(selectedFilters)) {
    for (const value of values) {
      activeChips.push({
        key: `${groupId}-${value}`,
        label: `${groupLabel(groupId)}: ${value}`,
        onRemove: () => toggleMulti(groupId, value),
      });
    }
  }

  if (minPrice !== null || maxPrice !== null) {
    activeChips.push({
      key: "price",
      label:
        minPrice !== null && maxPrice !== null
          ? `Цена: ${formatPrice(minPrice)} — ${formatPrice(maxPrice)}`
          : minPrice !== null
            ? `Цена: от ${formatPrice(minPrice)}`
            : `Цена: до ${formatPrice(maxPrice as number)}`,
      onRemove: () => updateParams({ min: null, max: null }),
    });
  }

  const hasActiveFilters = activeChips.length > 0 || sort !== "popular";

  const categoryOptions = useMemo(() => {
    if (categorySlug) return [];
    return categories
      .map((category) => ({
        ...category,
        count: scopedProducts.filter((product) => product.category === category.slug).length,
      }))
      .filter((category) => category.count > 0);
  }, [categorySlug, scopedProducts]);

  const filterPanel = (
    <CatalogFilters
      groups={groups}
      productsForOptions={scopedProducts}
      selectedFilters={selectedFilters}
      onToggle={toggleMulti}
      categoryOptions={categoryOptions}
      selectedCategories={selectedCategories}
      onToggleCategory={(slug) => toggleMulti("category", slug)}
      priceMin={priceMin}
      priceMax={priceMax}
      onPriceMinChange={setPriceMin}
      onPriceMaxChange={setPriceMax}
      onApplyPrice={applyPrice}
      priceBounds={priceBounds}
      hasActiveFilters={hasActiveFilters}
      onReset={resetAll}
    />
  );

  return (
    <section className="py-8 sm:py-10">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">{filterPanel}</div>
          </aside>

          <div className="min-w-0">
            <CatalogToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onSearchSubmit={submitSearch}
              onClearSearch={clearSearch}
              sort={sort}
              onSortChange={(value) => updateParams({ sort: value })}
              count={filteredProducts.length}
              activeFilterCount={activeChips.length}
              onOpenFilters={() => setMobileOpen(true)}
            />

            <CatalogActiveChips chips={activeChips} onReset={resetAll} />

            <div id="catalog-results" className="mt-6 scroll-mt-28">
              {pageProducts.length > 0 ? (
                <ProductGrid products={pageProducts} />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-foreground/60">
                    <SearchX aria-hidden className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-base font-semibold">Товары не найдены</p>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">
                    {q
                      ? `По запросу «${q}» ничего не нашлось. Попробуйте изменить запрос или сбросить фильтры.`
                      : "Попробуйте изменить фильтры или посмотреть весь каталог."}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={resetAll}>
                      <RotateCcw aria-hidden className="h-3.5 w-3.5" />
                      Сбросить фильтры
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть фильтры"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Фильтры каталога"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-slide-in-right flex-col bg-surface shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-base font-semibold">Фильтры</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                aria-label="Закрыть фильтры"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{filterPanel}</div>
            <div className="border-t border-line bg-surface p-4">
              <Button type="button" onClick={() => setMobileOpen(false)} className="w-full">
                Показать {formatNumber(filteredProducts.length)}{" "}
                {pluralize(filteredProducts.length, "товар", "товара", "товаров")}
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
