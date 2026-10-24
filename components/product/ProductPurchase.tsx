"use client";

import Link from "next/link";
import { Ruler, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { ProductPrice } from "@/components/product/ProductPrice";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { useStore } from "@/components/providers/StoreProvider";
import { Button, buttonStyles } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((option) => [option.id, option.values[0]])),
  );
  const [quantity, setQuantity] = useState(1);

  const variant = product.options.length
    ? product.options
        .map((option) => selection[option.id])
        .filter(Boolean)
        .join(" · ")
    : undefined;

  const total = product.price === null ? null : product.price * quantity;

  const handleAdd = () => {
    if (product.price === null) return;
    addToCart({ productId: product.id, quantity, variant }, product.name);
  };

  return (
    <div className="mt-6">
      <ProductPrice product={product} size="lg" />

      {product.options.length > 0 ? (
        <div className="mt-6 space-y-5">
          {product.options.map((option) => (
            <fieldset key={option.id}>
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {option.label}
              </legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isActive = selection[option.id] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setSelection((current) => ({ ...current, [option.id]: value }))
                      }
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? "min-h-10 rounded-full border border-accent bg-accent px-4 text-sm font-medium text-white"
                          : "min-h-10 rounded-full border border-line bg-surface px-4 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                      }
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Количество
          </p>
          <div className="mt-2.5">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              size="md"
              label={`Количество товара «${product.name}»`}
            />
          </div>
        </div>
        {total !== null && quantity > 1 ? (
          <div className="text-right">
            <p className="text-xs text-muted">Итого за {quantity} шт.</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">{formatPrice(total)}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {product.price === null ? (
          <>
            <Link
              href="/services#request"
              className={buttonStyles({ size: "lg", className: "w-full" })}
            >
              <Ruler aria-hidden className="h-4 w-4" />
              Заказать замер
            </Link>
            <Link
              href="/contacts"
              className={buttonStyles({ variant: "outline", size: "lg", className: "w-full" })}
            >
              Уточнить стоимость
            </Link>
          </>
        ) : (
          <>
            <Button type="button" size="lg" onClick={handleAdd} className="w-full">
              <ShoppingBag aria-hidden className="h-4 w-4" />
              В корзину
            </Button>
            <Link
              href="/services#request"
              className={buttonStyles({ variant: "outline", size: "lg", className: "w-full" })}
            >
              <Ruler aria-hidden className="h-4 w-4" />
              Заказать замер
            </Link>
          </>
        )}
      </div>

      <div className="mt-3">
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          withLabel
          className="min-h-11"
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Цена и характеристики приведены для демонстрации. Точную стоимость специалист
        подтвердит после замера.
      </p>
    </div>
  );
}
