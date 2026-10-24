import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

const points = [
  "Подбор под ваш проём, интерьер и бюджет",
  "Замер, доставка и монтаж от одной команды",
  "Понятная смета и согласованные сроки",
];

export function AboutSection() {
  return (
    <section className="border-t border-line/70 bg-surface py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-sand">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/4.3]">
              <Image
                src="/images/about-interior.jpg"
                alt="Светлая комната с окном, дверью и деревянным полом"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-surface/95 p-4 shadow-soft backdrop-blur sm:right-auto sm:w-[17rem]">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-accent">
                О компании
              </p>
              <p className="mt-1 text-sm font-semibold">Решения для дома под одной крышей</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Окна, двери, балконы, напольные покрытия и детали.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
              Умелец
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2.15rem]">
              Умелец — решения для дома
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              <p>
                Мы занимаемся окнами, дверями, балконами и лоджиями, напольными покрытиями и
                товарами, которые делают результат завершённым. Помогаем выбрать, привозим и
                устанавливаем.
              </p>
              <p>
                Работаем спокойно и по делу: сначала разбираемся в задаче и снимаем размеры,
                затем предлагаем варианты и согласуем смету.
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Подробнее о компании
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-foreground/20 px-5 text-sm font-semibold transition-colors hover:border-foreground/50 hover:bg-foreground/[0.03]"
              >
                Связаться
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
