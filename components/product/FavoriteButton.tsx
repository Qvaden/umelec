"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  productId,
  productName,
  className,
  withLabel = false,
}: {
  productId: string;
  productName: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { hydrated, isFavorite, toggleFavorite } = useStore();
  const active = hydrated && isFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId, productName)}
      aria-pressed={active}
      aria-label={active ? `Убрать «${productName}» из избранного` : `Добавить «${productName}» в избранное`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border transition-colors",
        withLabel
          ? "min-h-11 w-full border-line bg-surface px-5 text-sm font-semibold text-foreground hover:border-foreground/30"
          : "h-10 w-10 min-[480px]:h-9 min-[480px]:w-9 border-line/80 bg-surface/90 text-foreground/70 backdrop-blur hover:border-foreground/30 hover:text-foreground",
        active && "text-accent",
        className,
      )}
    >
      <Heart
        aria-hidden
        className={cn("h-4 w-4 transition-transform", active && "scale-110 fill-accent text-accent")}
      />
      {withLabel ? (active ? "В избранном" : "В избранное") : null}
    </button>
  );
}
