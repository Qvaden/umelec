import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Демонстрационная форма оформления заказа с доставкой и замером.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Заказ"
        title="Оформление заказа"
        description="Заполните контактные данные и адрес. Отправка заявки демонстрационная — оплата не проводится."
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Корзина", href: "/cart" },
          { label: "Оформление" },
        ]}
      />
      <CheckoutForm />
    </>
  );
}
