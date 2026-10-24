import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { measurementSteps } from "@/data/process";

export function ServicesPreview() {
  return (
    <section className="border-y border-line/70 bg-surface py-10 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-sand sm:aspect-[4/3] lg:aspect-[4/4.4]">
              <Image
                src="/images/service-installation.jpg"
                alt="Мастер устанавливает окно в светлой комнате"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-surface/95 p-4 shadow-soft backdrop-blur sm:left-5 sm:right-auto sm:w-[17rem]">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-accent">
                Сначала — замер
              </p>
              <p className="mt-1 text-sm font-semibold">Бесплатный выезд специалиста</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Проверим проём, основание и условия монтажа.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Услуги"
              title="От заявки до установки — без лишних забот"
              description="Берём на себя замер, расчёт материалов, доставку и монтаж. Вы согласуете решение и сроки — остальное мы организуем."
            />

            <ol className="mt-7 space-y-4">
              {measurementSteps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-background text-[0.6875rem] font-bold text-accent">
                    {step.number}
                  </span>
                  <div className="min-w-0 border-b border-line/70 pb-4">
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted sm:text-[0.8125rem]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/services" className={buttonStyles({ size: "md" })}>
                Подробнее об услугах
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                <Check aria-hidden className="h-4 w-4 text-accent" />
                Замер бесплатно
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
