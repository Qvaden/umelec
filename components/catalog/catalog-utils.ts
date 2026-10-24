import type { SortValue } from "@/types";

export const PAGE_SIZE = 12;

const SORT_VALUES: SortValue[] = ["popular", "price-asc", "price-desc", "new", "rating"];

export function parseSort(value: string | null): SortValue {
  return value && SORT_VALUES.includes(value as SortValue) ? (value as SortValue) : "popular";
}

export function parsePrice(value: string | null): number | null {
  if (value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function readMulti(params: URLSearchParams, key: string): string[] {
  return (params.get(key) ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function getPageItems(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}
