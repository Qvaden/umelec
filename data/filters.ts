import type { FilterGroupConfig } from "@/types";

export const colorHex: Record<string, string> = {
  Белый: "#f1ede5",
  Молочный: "#e9e2d4",
  Бежевый: "#d8c6ab",
  Серый: "#969893",
  "Тёмно-серый": "#595b5d",
  Графит: "#3f4245",
  Чёрный: "#20201e",
  Дуб: "#a5794d",
  Орех: "#6a4830",
  Венге: "#48372e",
  Сосна: "#c9a16b",
  Стальной: "#7c858b",
  Латунь: "#b3924f",
  Хром: "#c4c9cc",
  Зелёный: "#4e6656",
  "На выбор": "#d9d2c6",
};

const color: FilterGroupConfig = { id: "color", label: "Цвет", showColors: true };
const material: FilterGroupConfig = { id: "material", label: "Материал" };
const coating: FilterGroupConfig = { id: "coating", label: "Покрытие" };
const style: FilterGroupConfig = { id: "style", label: "Стиль" };
const type: FilterGroupConfig = { id: "type", label: "Тип" };
const chambers: FilterGroupConfig = { id: "chambers", label: "Количество камер" };
const size: FilterGroupConfig = { id: "size", label: "Размер" };
const floorClass: FilterGroupConfig = { id: "class", label: "Класс износостойкости" };
const thickness: FilterGroupConfig = { id: "thickness", label: "Толщина" };
const width: FilterGroupConfig = { id: "width", label: "Ширина" };

export const filterGroupsByCategory: Record<string, FilterGroupConfig[]> = {
  "vhodnye-dveri": [color, material, coating, style],
  "mezhkomnatnye-dveri": [color, material, coating, style],
  "podezdnye-dveri": [color, material, coating, style],
  okna: [type, chambers, color, size],
  "balkony-i-lodzhii": [type, material, color, style],
  linoleum: [floorClass, thickness, width, style],
  arki: [material, style, color],
  furnitura: [type, material, color],
  "drugie-tovary": [type, material, color],
};

export const defaultFilterGroups: FilterGroupConfig[] = [color, material, style];

export function getFilterGroupsForCategory(slug?: string): FilterGroupConfig[] {
  if (!slug) return defaultFilterGroups;
  return filterGroupsByCategory[slug] ?? defaultFilterGroups;
}

export const sortOptions = [
  { value: "popular", label: "Популярные" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "new", label: "Новинки" },
  { value: "rating", label: "По рейтингу" },
] as const;
