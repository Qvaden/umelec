import { Clock, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { company } from "@/data/site";

export function LeadCta() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="relative flex flex-col justify-between gap-8 bg-sand p-6 sm:p-10 lg:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-foreground/10"
              />
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
                  Консультация
                </p>
                <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Нужен точный расчёт? Начнём с бесплатного замера
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  Оставьте имя и телефон. Специалист уточнит задачу, предложит варианты
                  и согласует удобное время выезда.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2.5 text-base font-semibold transition-colors hover:text-accent"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-accent">
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
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="mb-5 text-sm font-semibold">Оставить заявку на замер</p>
              <LeadForm compact buttonLabel="Записаться на замер" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
