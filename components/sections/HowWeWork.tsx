import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workSteps } from "@/data/process";

export function HowWeWork() {
  return (
    <section className="border-t border-line/70 bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Шесть шагов до готового результата"
          description="Понятный путь без сюрпризов: вы видите, что происходит на каждом этапе."
        />

        <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {workSteps.map((step, index) => (
            <li
              key={step.number}
              className="group animate-fade-up bg-surface p-5 transition-colors duration-300 hover:bg-background sm:p-6"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-2xl font-semibold tracking-tightest text-sand-deep transition-colors group-hover:text-accent">
                  {step.number}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon name={step.icon} className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold">{step.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs leading-relaxed text-muted">
            Сроки и стоимость фиксируем до начала работ — после замера и согласования состава
            заказа.
          </p>
          <Link
            href="/services#process"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
          >
            Подробнее о процессе
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
