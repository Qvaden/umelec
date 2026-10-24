import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Ruler, ShieldCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "«Умелец» — окна, двери, балконы, напольные покрытия и товары для дома. Подбор, замер, доставка и монтаж от одной команды.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Ruler,
    title: "Сначала замер, потом решение",
    text: "Не продаём «на глаз»: сначала проверяем проём и условия, затем предлагаем варианты и считаем стоимость.",
  },
  {
    icon: Truck,
    title: "Один подрядчик на весь путь",
    text: "Подбор, доставка и монтаж согласованы между собой. Не нужно отдельно искать грузчиков и установщиков.",
  },
  {
    icon: ShieldCheck,
    title: "Понятные договорённости",
    text: "Фиксируем состав работ и сроки до начала монтажа. После установки вместе проверяем результат.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="О компании"
        title="Умелец — решения для дома"
        description="Окна, двери, балконы, напольные покрытия и другие товары для дома — с подбором, замером, доставкой и установкой."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "О компании" }]}
      />

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
                Наш подход
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Помогаем привести дом в порядок — без лишней суеты
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                <p>
                  «Умелец» занимается окнами, дверями, балконами и лоджиями, напольными
                  покрытиями и сопутствующими товарами. Мы работаем с квартирами, частными
                  домами и помещениями, где важны аккуратность и предсказуемый результат.
                </p>
                <p>
                  Можно прийти с готовой идеей или только с задачей — например, «холодно у
                  балконной двери». Специалист поможет разобраться, что действительно нужно
                  заменить, а на чём можно сэкономить.
                </p>
                <p>
                  Цены, контакты и описания на этом сайте демонстрационные: он показывает, как
                  может выглядеть и работать магазин «Умельца».
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Связаться
                </p>
                <a
                  href={company.phoneHref}
                  className="mt-1.5 block text-lg font-semibold tracking-tight transition-colors hover:text-accent"
                >
                  {company.phone}
                </a>
                <p className="mt-1 text-xs text-muted">
                  {company.hours} · контакты демонстрационные
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-sand">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src="/images/about-interior.jpg"
                  alt="Светлый интерьер с окном, дверью и деревянным полом"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line/70 bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-line bg-background p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <p className="mt-3 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-14">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Что можно заказать
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Ассортимент собран вокруг одной задачи — сделать дом удобнее и теплее.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/catalog/${category.slug}`}
                      className="inline-flex rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-sand p-5 sm:p-6">
              <p className="text-sm font-semibold">С чего начать</p>
              <ul className="mt-3 space-y-2.5 text-sm text-foreground/80">
                {[
                  "Посмотрите каталог и сохраните варианты",
                  "Оставьте заявку на бесплатный замер",
                  "Согласуйте решение, сроки и стоимость",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-accent">
                      <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services#request"
                className={buttonStyles({ size: "md", className: "mt-5 w-full" })}
              >
                Заказать замер
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
