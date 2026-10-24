"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { useStore } from "@/components/providers/StoreProvider";
import { buttonStyles } from "@/components/ui/Button";
import { getCategoryBySlug } from "@/data/categories";
import { formatPrice, pluralize } from "@/lib/utils";

export function CartView() {
  const { cartEntries, cartCount, cartSubtotal, hydrated, updateQuantity, removeFromCart, clearCart } =
    useStore();

  if (!hydrated) {
    return (
      <div className="container-page py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-2xl bg-sand/60" />
            ))}
          </div>
          <div className="h-56 animate-pulse rounded-2xl bg-sand/60" />
        </div>
      </div>
    );
  }

  if (cartEntries.length === 0) {
    return (
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-[1.5rem] border border-dashed border-line bg-surface px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-foreground/50">
            <ShoppingBag aria-hidden className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">Корзина пуста</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Добавьте товары из каталога — здесь появится состав заказа и итоговая сумма.
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
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted">
              {cartCount} {pluralize(cartCount, "товар", "товара", "товаров")} в корзине
            </p>
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              <Trash2 aria-hidden className="h-3.5 w-3.5" />
              Очистить корзину
            </button>
          </div>

          <ul className="mt-4 space-y-3">
            {cartEntries.map(({ key, line, product }) => {
              const category = getCategoryBySlug(product.category);
              const lineTotal = (product.price ?? 0) * line.quantity;
              const href = `/catalog/${product.category}/${product.slug}`;

              return (
                <li
                  key={key}
                  className="flex gap-4 rounded-2xl border border-line bg-surface p-3 sm:p-4"
                >
                  <Link
                    href={href}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-28 sm:w-28"
                  >
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                          {category?.name ?? "Каталог"}
                        </p>
                        <h2 className="mt-1 text-sm font-semibold leading-snug sm:text-[0.9375rem]">
                          <Link href={href} className="transition-colors hover:text-accent">
                            {product.name}
                          </Link>
                        </h2>
                        {line.variant ? (
                          <p className="mt-1 text-xs text-muted">{line.variant}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(key)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                        aria-label={`Удалить «${product.name}» из корзины`}
                      >
                        <Trash2 aria-hidden className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      <div className="flex items-center gap-3">
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(quantity) => updateQuantity(key, quantity)}
                          size="sm"
                          label={`Количество товара «${product.name}»`}
                        />
                        <span className="text-xs text-muted">
                          {product.price === null
                            ? "Цена по запросу"
                            : `${formatPrice(product.price)}${product.unit ? ` / ${product.unit}` : ""}`}
                        </span>
                      </div>
                      <p className="text-sm font-semibold tabular-nums">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/catalog"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            Продолжить покупки
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-base font-semibold">Ваш заказ</h2>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">
                  Товары ({cartCount})
                </dt>
                <dd className="font-medium tabular-nums">{formatPrice(cartSubtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Доставка</dt>
                <dd className="text-right text-xs text-muted">Рассчитаем при оформлении</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <span className="text-sm font-semibold">Итого</span>
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className={buttonStyles({ size: "lg", className: "mt-5 w-full" })}
            >
              Оформить заказ
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted">
              Демонстрационная корзина: заказ не отправляется, оплата не проводится.
            </p>
          </div>

          <div className="mt-3 rounded-2xl border border-line bg-sand/70 p-4 text-xs leading-relaxed text-muted">
            Нужен точный размер? Оставьте заявку на бесплатный замер — специалист проверит
            проём и поможет с комплектацией.
          </div>
        </aside>
      </div>
    </div>
  );
}
