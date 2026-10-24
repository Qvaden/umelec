import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Выбранные товары, количество и итоговая сумма демонстрационного заказа.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Заказ"
        title="Корзина"
        description="Проверьте состав заказа и количество. Оформление демонстрационное — оплата не проводится."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Корзина" }]}
      />
      <CartView />
    </>
  );
}
