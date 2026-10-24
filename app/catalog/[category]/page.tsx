import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CatalogFallback } from "@/components/catalog/CatalogFallback";
import { PageHeader } from "@/components/layout/PageHeader";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getCategoryProductCount } from "@/lib/products";
import { pluralize } from "@/lib/utils";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return { title: "Категория не найдена" };
  }

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/catalog/${category.slug}` },
    openGraph: {
      title: `${category.name} — Умелец`,
      description: category.description,
      images: [{ url: category.image, alt: category.imageAlt }],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);

  if (!category) notFound();

  const count = getCategoryProductCount(category.slug);

  return (
    <>
      <PageHeader
        eyebrow="Категория каталога"
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog" },
          { label: category.name },
        ]}
      >
        <div className="rounded-2xl border border-line bg-background px-4 py-3 text-sm">
          <span className="font-semibold">{count}</span>{" "}
          <span className="text-muted">
            {pluralize(count, "товар", "товара", "товаров")} в категории
          </span>
        </div>
      </PageHeader>

      <Suspense fallback={<CatalogFallback />}>
        <CatalogView categorySlug={category.slug} />
      </Suspense>
    </>
  );
}
