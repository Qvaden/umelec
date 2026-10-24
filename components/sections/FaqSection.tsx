import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faq } from "@/data/faq";
import { company } from "@/data/site";

export function FaqSection() {
  return (
    <section className="border-t border-line/70 bg-background py-10 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
              Вопросы и ответы
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Отвечаем на частые вопросы
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              Не нашли ответ? Позвоните или оставьте заявку — подскажем по вашему
              случаю.
            </p>

            <div className="mt-6 hidden rounded-2xl border border-line bg-surface p-5 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Связаться с нами
              </p>
              <a
                href={company.phoneHref}
                className="mt-2 flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-accent"
              >
                <Phone aria-hidden className="h-4 w-4 text-accent" />
                {company.phone}
              </a>
              <p className="mt-1 text-xs text-muted">{company.hours}</p>
              <Link
                href="/contacts"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Все контакты
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <FaqAccordion items={faq.slice(0, 6)} defaultOpen={0} />
        </div>
      </Container>
    </section>
  );
}
