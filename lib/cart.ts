export function getCartKey(productId: string, variant?: string): string {
  return variant ? `${productId}::${variant}` : productId;
}

export function getVariantLabel(values: string[]): string {
  return values.filter(Boolean).join(" · ");
}
