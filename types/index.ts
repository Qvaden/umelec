export interface ImageAsset {
  src: string;
  alt: string;
}

export type CategoryGroup = "doors" | "windows" | "balconies" | "flooring" | "interior";

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  group: CategoryGroup;
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  order: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductOption {
  id: string;
  label: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | null;
  oldPrice?: number;
  unit?: string;
  shortDescription: string;
  description: string;
  images: ImageAsset[];
  specs: ProductSpec[];
  options: ProductOption[];
  filters: Record<string, string>;
  isHit?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  popularity: number;
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
  variant?: string;
}

export interface CartEntry {
  key: string;
  line: CartLine;
  product: Product;
}

export interface FilterGroupConfig {
  id: string;
  label: string;
  showColors?: boolean;
}

export interface FilterOption {
  value: string;
  count: number;
}

export interface Review {
  id: string;
  author: string;
  context: string;
  text: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageData {
  slug: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

export type SortValue = "popular" | "price-asc" | "price-desc" | "new" | "rating";

export interface CatalogQuery {
  q?: string;
  filters?: Record<string, string[]>;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: SortValue;
}
