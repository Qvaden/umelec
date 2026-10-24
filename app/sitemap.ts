import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { legalPages } from "@/data/legal";
import { products } from "@/data/products";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/catalog", "/services", "/about", "/contacts"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${SITE_URL}/catalog/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/catalog/${product.category}/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const infoPages = legalPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...infoPages];
}
