import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, Phone, Ruler } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceGuarantees, serviceSteps } from "@/data/process";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Замер и монтаж",
  description:
    "Бесплатный замер, изготовление, доставка и профессиональный монтаж окон, дверей и балконов. Как проходит работа — по шагам.",
  alternates: { canonical: "/services" },
};

const measurementIncludes = [
  "Проверка проёма и основания",
  "Точные размеры под изготовление",
  "Подбор комплектации и фурнитуры",
  "Смета без скрытых доплат",
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Услуги"
        title="Замер и монтаж"
        description="Берём на себя весь путь: от первого звонка и замера до доставки и установки. Вы согласуете решение и сроки — остальное организуем мы."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-sand">
              <div className="relative aspect-[5/4] sm:aspect-[4/3]">
                <Image
                  src="/images/services-hero.jpg"
                  alt="Мастер проводит замер окна в светлой комнате"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/30 bg-surface/95 p-3.5 shadow-soft backdrop-blur sm:right-auto sm:w-[17rem]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Ruler aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Замер бесплатно</p>
                  <p className="mt-0.5 text-xs text-muted">В пределах зоны обслуживания</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
                Спокойный процесс
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Аккуратный монтаж начинается с точного замера
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                Ошибка в размерах — самая дорогая. Поэтому сначала специалист приезжает на
                объект, проверяет проём и условия установки, а уже потом мы готовим расчёт и
                согласуем заказ.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {measurementIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Link href="#request" className={buttonStyles({ size: "md" })}>
                  Записаться на замер
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <a
                  href={company.phoneHref}
                  className={buttonStyles({ variant: "outline", size: "md" })}
                >
                  <Phone aria-hidden className="h-4 w-4" />
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="process" className="scroll-mt-24 border-y border-line/70 bg-surface py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Как проходит работа"
            title="Семь шагов — от заявки до установки"
            description="Вы всегда знаете, на каком этапе находится заказ и что будет дальше."
          />

          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {serviceSteps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col rounded-2xl border border-line bg-background p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-[0.08em] text-accent">
                    {step.number}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon name={step.icon} className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-xs leading-relaxed text-muted">
            Срок изготовления зависит от модели и комплектации. Точную дату специалист
            подтвердит после замера.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Гарантии"
            title="Что вы получаете вместе с монтажом"
            description="Не только установленное изделие, но и понятные договорённости на каждом этапе."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGuarantees.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-surface p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="request" className="scroll-mt-24 border-t border-line/70 bg-surface py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
                Заявка
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Оставьте заявку на бесплатный замер
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                Укажите имя и телефон — специалист уточнит задачу, предложит удобное время и
                ответит на вопросы. Заявка ни к чему не обязывает, оплачивать визит не нужно.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2.5 text-base font-semibold transition-colors hover:text-accent"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-accent">
                    <Phone aria-hidden className="h-4 w-4" />
                  </span>
                  {company.phone}
                </a>
                <p className="flex items-center gap-2.5 text-xs text-muted">
                  <Clock aria-hidden className="h-4 w-4 text-foreground/40" />
                  {company.hours}
                </p>
                <p className="text-[0.6875rem] text-muted/80">
                  Контакты и график приведены для демонстрации.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-background p-4 text-xs leading-relaxed text-muted">
                Форма демонстрационная: данные не отправляются и не сохраняются.
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-background p-5 sm:p-6">
              <p className="mb-4 text-sm font-semibold">Заявка на замер</p>
              <LeadForm buttonLabel="Отправить заявку" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
