"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useStore } from "@/components/providers/StoreProvider";
import { buttonStyles } from "@/components/ui/Button";
import { products } from "@/data/products";

export function FavoritesView() {
  const { favorites, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="container-page py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-2xl bg-sand/60" />
          ))}
        </div>
      </div>
    );
  }

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-[1.5rem] border border-dashed border-line bg-surface px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-foreground/50">
            <Heart aria-hidden className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">В избранном пусто</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Нажмите на сердечко в карточке товара, чтобы сохранить его здесь и вернуться к
            выбору позже.
          </p>
          <Link href="/catalog" className={buttonStyles({ size: "lg", className: "mt-6" })}>
            Перейти в каталог
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <p className="mb-5 text-sm text-muted">
        Сохранено товаров: {favoriteProducts.length}. Избранное хранится в вашем браузере.
      </p>
      <ProductGrid products={favoriteProducts} />
    </div>
  );
}
