import type { Metadata } from "next";
import { FavoritesView } from "@/components/product/FavoritesView";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Сохранённые товары демонстрационного каталога.",
  robots: { index: false },
};

export default function FavoritesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Подборка"
        title="Избранное"
        description="Товары, которые вы сохранили. Список хранится локально в браузере."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Избранное" }]}
      />
      <FavoritesView />
    </>
  );
}
