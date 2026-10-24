import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { ProductPrice } from "@/components/product/ProductPrice";
import { QuickAddButton } from "@/components/product/QuickAddButton";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { getCategoryBySlug } from "@/data/categories";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const href = `/catalog/${product.category}/${product.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-soft">
      <div className="relative overflow-hidden bg-sand">
        <Link
          href={href}
          aria-label={`Открыть товар «${product.name}»`}
          className="relative block aspect-[4/3]"
        >
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isHit ? <Badge tone="dark">Хит</Badge> : null}
          {product.isNew ? <Badge tone="accent">Новинка</Badge> : null}
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-[1.125rem]">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
          {category?.name ?? "Каталог"}
        </p>
        <h3 className="mt-1.5 text-[0.9375rem] font-semibold leading-snug tracking-tight">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <div className="mt-2.5">
          <RatingStars value={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-auto pt-4">
          <ProductPrice product={product} />
          <div className="mt-3">
            {product.price === null ? (
              <Link
                href={href}
                className="inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-full border border-foreground/20 px-4 text-sm font-semibold transition-colors hover:border-foreground/45 hover:bg-foreground/[0.03]"
              >
                Уточнить стоимость
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            ) : (
              <QuickAddButton
                productId={product.id}
                productName={product.name}
                className="w-full border border-transparent"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
