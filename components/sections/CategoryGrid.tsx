import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, homeCategorySlugs } from "@/data/categories";
import { getCategoryProductCount } from "@/lib/products";
import { pluralize } from "@/lib/utils";

export function CategoryGrid() {
  const homeCategories = homeCategorySlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Ассортимент"
          title="Каталог товаров"
          description="Всё необходимое для дома — в одном месте."
          action={{ label: "Весь каталог", href: "/catalog" }}
        />

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[11.5rem]">
          {homeCategories.map((category, index) => {
            const count = getCategoryProductCount(category.slug);
            const isLarge = index === 0;

            return (
              <Link
                key={category.slug}
                href={`/catalog/${category.slug}`}
                className={[
                  "group relative overflow-hidden rounded-2xl bg-sand transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:rounded-[1.25rem]",
                  isLarge
                    ? "col-span-2 aspect-[2/1.08] lg:row-span-2 lg:aspect-auto"
                    : "aspect-[4/3] lg:aspect-auto",
                ].join(" ")}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes={
                    isLarge
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/15 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0">
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {count} {pluralize(count, " товар", " товара", " товаров")}
                    </p>
                    <h3
                      className={[
                        "mt-1 font-semibold tracking-tight text-white",
                        isLarge ? "text-xl sm:text-2xl" : "text-sm sm:text-base",
                      ].join(" ")}
                    >
                      {category.name}
                    </h3>
                    {isLarge ? (
                      <p className="mt-1.5 hidden max-w-sm text-sm leading-relaxed text-white/65 sm:block">
                        {category.shortDescription}
                      </p>
                    ) : null}
                  </div>
                  <span
                    className={[
                      "flex shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-foreground",
                      isLarge ? "h-11 w-11" : "h-8 w-8",
                    ].join(" ")}
                    aria-hidden
                  >
                    <ArrowUpRight className={isLarge ? "h-5 w-5" : "h-4 w-4"} />
                  </span>
                </div>
              </Link>
            );
          })}

          <Link
            href="/catalog"
            className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-accent p-4 text-white transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-accent-hover hover:shadow-lift sm:rounded-[1.25rem] sm:p-5 lg:aspect-auto"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10"
            />
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/60">
              Полный ассортимент
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-tight">Все товары</span>
              <span className="mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white group-hover:text-accent">
                <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
