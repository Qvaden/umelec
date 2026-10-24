import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { buttonStyles } from "@/components/ui/Button";
import { getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { company } from "@/data/site";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

interface ProductPageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  const category = getCategoryBySlug(params.category);

  if (!product || !category || product.category !== category.slug) {
    return { title: "Товар не найден" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/catalog/${category.slug}/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${company.name}`,
      description: product.shortDescription,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

const serviceNotes = [
  {
    icon: Truck,
    title: "Доставка",
    text: "Привезём по согласованному адресу. Стоимость и подъём на этаж уточняет менеджер.",
    href: "/delivery",
    linkLabel: "Условия доставки",
  },
  {
    icon: Wrench,
    title: "Монтаж",
    text: "Установим изделие по технологии производителя и уберём упаковку после работ.",
    href: "/services",
    linkLabel: "Замер и монтаж",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия",
    text: "Гарантия на товар и монтажные работы при соблюдении правил эксплуатации.",
    href: "/warranty",
    linkLabel: "Гарантийные условия",
  },
];

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const category = getCategoryBySlug(params.category);

  if (!product || !category || product.category !== category.slug) notFound();

  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    category: category.name,
    ...(product.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url: `/catalog/${category.slug}/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-line/70 bg-surface">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: category.name, href: `/catalog/${category.slug}` },
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      <section className="py-8 sm:py-10 lg:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <ProductGallery
              images={product.images}
              name={product.name}
              isHit={product.isHit}
              isNew={product.isNew}
            />

            <div className="min-w-0">
              <Link
                href={`/catalog/${category.slug}`}
                className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-hover"
              >
                {category.name}
              </Link>
              <h1 className="mt-2 text-3xl font-semibold leading-[1.12] tracking-tightest sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <RatingStars value={product.rating} count={product.reviewCount} />
                <span className="text-xs text-muted">Артикул: {product.id.toUpperCase()}</span>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {product.shortDescription}
              </p>

              <ProductPurchase product={product} />
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {serviceNotes.map((note) => {
              const Icon = note.icon;
              return (
                <div
                  key={note.title}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <p className="mt-3 text-sm font-semibold">{note.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{note.text}</p>
                  <Link
                    href={note.href}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent"
                  >
                    {note.linkLabel}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-line/70 bg-surface py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Описание
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {product.description}
              </p>

              <h2 className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">
                Характеристики
              </h2>
              <dl className="mt-3 overflow-hidden rounded-2xl border border-line">
                {product.specs.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="flex items-baseline justify-between gap-6 border-b border-line/70 bg-background px-4 py-3 last:border-b-0 sm:px-5"
                  >
                    <dt className="text-sm text-muted">{spec.label}</dt>
                    <dd className="text-right text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-sand p-5 sm:p-6">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
                  Помощь с выбором
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  Нужна помощь с выбором?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Подскажем, какой вариант подойдёт под ваш проём, интерьер и бюджет.
                  Консультация ни к чему не обязывает.
                </p>
                <Link
                  href="/contacts"
                  className={buttonStyles({ size: "md", className: "mt-4 w-full" })}
                >
                  Получить консультацию
                </Link>
                <a
                  href={company.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
                >
                  <Phone aria-hidden className="h-4 w-4 text-accent" />
                  {company.phone}
                </a>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-5 text-xs leading-relaxed text-muted">
                Демонстрационные данные: цена, наличие и характеристики приведены для
                примера и не являются публичной офертой.
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Похожие товары
            </h2>
            <Link
              href={`/catalog/${category.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Вся категория
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={related} className="mt-6" />
        </Container>
      </section>
    </>
  );
}
