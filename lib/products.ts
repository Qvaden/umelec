import { getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import type {
  CatalogQuery,
  FilterGroupConfig,
  FilterOption,
  Product,
  SortValue,
} from "@/types";

const collator = new Intl.Collator("ru-RU", { sensitivity: "base" });

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}

export function getHitProducts(limit = 4): Product[] {
  return [...products]
    .filter((product) => product.isHit)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getNewProducts(limit = 4): Product[] {
  return [...products]
    .filter((product) => product.isNew)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );

  return [...sameCategory, ...others]
    .sort((a, b) => {
      const aSame = a.category === product.category ? 1 : 0;
      const bSame = b.category === product.category ? 1 : 0;
      if (aSame !== bSame) return bSame - aSame;
      return b.popularity - a.popularity;
    })
    .slice(0, limit);
}

export function getPriceBounds(items: Product[]): { min: number; max: number } {
  const prices = items
    .map((product) => product.price)
    .filter((price): price is number => price !== null);

  if (prices.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getFilterOptions(
  items: Product[],
  group: FilterGroupConfig,
): FilterOption[] {
  const counts = new Map<string, number>();

  for (const product of items) {
    const value = product.filters[group.id];
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => collator.compare(a.value, b.value));
}

function matchesSearch(product: Product, query: string): boolean {
  const category = getCategoryBySlug(product.category);
  const haystack = [
    product.name,
    product.shortDescription,
    product.description,
    category?.name ?? "",
    ...Object.values(product.filters),
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function sortProducts(items: Product[], sort: SortValue = "popular"): Product[] {
  const sorted = [...items];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
    case "price-desc":
      return sorted.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      });
    case "new":
      return sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "popular":
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

export function filterProducts(items: Product[], query: CatalogQuery): Product[] {
  const normalizedQuery = query.q?.trim();
  const filterEntries = Object.entries(query.filters ?? {}).filter(
    ([, values]) => values.length > 0,
  );

  const filtered = items.filter((product) => {
    if (normalizedQuery && !matchesSearch(product, normalizedQuery)) return false;

    for (const [groupId, values] of filterEntries) {
      if (!values.includes(product.filters[groupId])) return false;
    }

    if (query.minPrice != null && (product.price === null || product.price < query.minPrice)) {
      return false;
    }

    if (query.maxPrice != null && (product.price === null || product.price > query.maxPrice)) {
      return false;
    }

    return true;
  });

  return sortProducts(filtered, query.sort);
}

export function searchProducts(query: string, limit = 8): Product[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return filterProducts(products, { q: trimmed }).slice(0, limit);
}

export function getCategoryProductCount(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getMinPriceForCategory(categorySlug: string): number | null {
  const prices = getProductsByCategory(categorySlug)
    .map((product) => product.price)
    .filter((price): price is number => price !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}
