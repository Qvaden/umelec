import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const trustPoints = [
  { icon: "ruler", label: "Бесплатный замер" },
  { icon: "wrench", label: "Профессиональный монтаж" },
  { icon: "shield", label: "Гарантия на работы" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,253,248,0.9),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(225,215,197,0.45),transparent_50%)]"
      />
      <Container className="relative grid gap-8 py-8 sm:gap-10 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-foreground/65 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Окна · двери · балконы · линолеум
          </p>

          <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.05] tracking-tightest text-foreground sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem]">
            Окна, двери и решения{" "}
            <span className="text-accent">для вашего дома</span>
          </h1>

          <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            Подберём, изготовим, доставим и установим. Заказать можно прямо из дома.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalog" className={buttonStyles({ size: "lg" })}>
              Перейти в каталог
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/services#request"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Заказать замер
            </Link>
          </div>

          <dl className="mt-8 hidden gap-3 border-t border-line pt-6 min-[480px]:grid min-[480px]:grid-cols-3 lg:max-w-xl">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon name={point.icon} className="h-4 w-4" />
                </span>
                <dt className="text-xs font-medium leading-snug text-foreground/75">
                  {point.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sand shadow-lift sm:aspect-[5/4] lg:aspect-[6/7]">
            <Image
              src="/images/hero-interior.jpg"
              alt="Светлая гостиная с большим окном и деревянным полом"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent"
            />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-[0.6875rem] font-semibold text-foreground/75 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Подбор под ваш интерьер
            </div>

            <div className="absolute inset-x-4 bottom-4 hidden rounded-2xl border border-white/40 bg-surface/95 p-4 shadow-soft backdrop-blur min-[480px]:block sm:inset-x-auto sm:left-5 sm:w-[19rem]">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                  <Ruler aria-hidden className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Бесплатный замер</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    Точные размеры и расчёт стоимости на месте
                  </p>
                </div>
              </div>
              <Link
                href="/services#request"
                className="mt-3 flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-sand"
              >
                Записаться на замер
                <ArrowUpRight aria-hidden className="h-4 w-4 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
