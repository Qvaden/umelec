import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

const features = [
  "Замер и расчёт под ваш балкон",
  "Остекление и утепление",
  "Отделка и подготовка под свет",
  "Аккуратный монтаж и уборка",
];

export function BalconyPromo() {
  return (
    <section className="pb-10 sm:pb-20">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] bg-accent text-white">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative p-6 sm:p-10 lg:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full border border-white/10"
              />
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white/55">
                Балконы и лоджии
              </p>
              <h2 className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]">
                Соберём балкон под ключ — от замера до последней детали
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                Подберём остекление, утепление и отделку под ваш бюджет. Предложим
                решение, которое подходит именно вашей лоджии, а не наоборот.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check aria-hidden className="h-3 w-3 text-white" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/catalog/balkony-i-lodzhii/balkon-pod-klyuch"
                  className={buttonStyles({ variant: "inverse", size: "md" })}
                >
                  Балкон под ключ
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link
                  href="/catalog/balkony-i-lodzhii"
                  className={buttonStyles({
                    variant: "outline",
                    size: "md",
                    className: "border-white/25 text-white hover:border-white/60 hover:bg-white/10",
                  })}
                >
                  Все решения для балконов
                </Link>
              </div>
            </div>

            <div className="relative min-h-[220px] sm:min-h-[340px] lg:min-h-[480px]">
              <Image
                src="/images/balcony-3.jpg"
                alt="Тёплый балкон с панорамным остеклением и светлой отделкой"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-accent/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-accent/35 lg:via-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-foreground/45 px-4 py-3 backdrop-blur-md sm:left-auto sm:right-5 sm:w-[260px]">
                <div>
                  <p className="text-xs font-semibold">Индивидуальный проект</p>
                  <p className="mt-0.5 text-[0.6875rem] text-white/60">Стоимость после замера</p>
                </div>
                <Link
                  href="/services#request"
                  aria-label="Заказать замер балкона"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition-colors hover:bg-sand"
                >
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
