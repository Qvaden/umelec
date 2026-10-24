"use client";

import { ShoppingBag } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/Button";

export function QuickAddButton({
  productId,
  productName,
  className,
}: {
  productId: string;
  productName: string;
  className?: string;
}) {
  const { addToCart } = useStore();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => addToCart({ productId, quantity: 1 }, productName)}
      className={className}
    >
      <ShoppingBag aria-hidden className="h-4 w-4" />
      В корзину
    </Button>
  );
}
