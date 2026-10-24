import Link from "next/link";
import { ArrowRight, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export function ChoiceCta() {
  return (
    <section className="pb-10 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-foreground px-6 py-10 text-surface sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-surface/50">
                Поможем определиться
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2.15rem]">
                Не знаете, что выбрать?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-surface/70 sm:text-[0.9375rem]">
                Поможем подобрать подходящий вариант под ваш дом, бюджет и задачи.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/contacts"
                className={buttonStyles({ variant: "inverse", size: "lg", className: "whitespace-nowrap" })}
              >
                Получить консультацию
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href="/services#request"
                className={buttonStyles({
                  variant: "outline",
                  size: "lg",
                  className:
                    "whitespace-nowrap border-white/30 text-surface hover:border-white/70 hover:bg-white/10",
                })}
              >
                <Ruler aria-hidden className="h-4 w-4" />
                Заказать замер
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
