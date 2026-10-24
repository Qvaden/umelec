import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getHitProducts } from "@/lib/products";

export function PopularProducts() {
  const products = getHitProducts(8);

  return (
    <section className="border-t border-line/70 bg-background py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Выбор покупателей"
          title="Популярные товары"
          description="Модели, которые чаще всего выбирают для квартир и домов. Цены в демонстрационном каталоге."
          action={{ label: "Смотреть весь каталог", href: "/catalog" }}
        />
        <ProductGrid products={products} className="mt-8" />

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-muted">
          {["Поможем с выбором", "Проверим размеры", "Рассчитаем доставку"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {item}
            </span>
          ))}
          <Link
            href="/services#request"
            className="ml-auto text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Задать вопрос специалисту
          </Link>
        </div>
      </Container>
    </section>
  );
}
