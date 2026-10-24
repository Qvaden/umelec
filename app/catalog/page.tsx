import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { CatalogFallback } from "@/components/catalog/CatalogFallback";
import { PageHeader } from "@/components/layout/PageHeader";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { pluralize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Каталог товаров",
  description:
    "Каталог окон, дверей, балконов, линолеума, арок и фурнитуры. Фильтры по цвету, материалу, цене и другим параметрам.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ассортимент"
        title="Каталог товаров"
        description="Окна, двери, балконы, напольные покрытия и детали для завершённого результата. Используйте фильтры, чтобы подобрать подходящий вариант."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-background px-4 py-3 text-sm">
          <span className="font-semibold">{products.length}</span>
          <span className="text-muted">
            {pluralize(products.length, "товар", "товара", "товаров")} · {categories.length}{" "}
            {pluralize(categories.length, "категория", "категории", "категорий")}
          </span>
        </div>
      </PageHeader>

      <Suspense fallback={<CatalogFallback />}>
        <CatalogView />
      </Suspense>
    </>
  );
}
