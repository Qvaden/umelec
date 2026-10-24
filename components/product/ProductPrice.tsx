import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

export function ProductPrice({
  product,
  size = "md",
  className,
}: {
  product: Pick<Product, "price" | "oldPrice" | "unit">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (product.price === null) {
    return (
      <span
        className={cn(
          "font-semibold text-foreground",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-2xl sm:text-3xl",
          className,
        )}
      >
        Цена по запросу
      </span>
    );
  }

  return (
    <span className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-2xl sm:text-3xl",
        )}
      >
        {formatPrice(product.price)}
        {product.unit ? (
          <span
            className={cn(
              "ml-1 font-medium text-muted",
              size === "lg" ? "text-sm" : "text-xs",
            )}
          >
            / {product.unit}
          </span>
        ) : null}
      </span>
      {product.oldPrice ? (
        <span
          className={cn(
            "text-muted line-through decoration-muted/50",
            size === "lg" ? "text-base" : "text-xs",
          )}
        >
          {formatPrice(product.oldPrice)}
        </span>
      ) : null}
    </span>
  );
}
