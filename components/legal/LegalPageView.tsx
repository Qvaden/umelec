import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { legalPages } from "@/data/legal";
import type { LegalPageData } from "@/types";

export function LegalPageView({ page }: { page: LegalPageData }) {
  return (
    <>
      <PageHeader
        eyebrow="Информация"
        title={page.title}
        description={page.description}
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: page.title }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          <article className="min-w-0">
            <div className="space-y-8">
              {page.sections.map((section, index) => (
                <section key={`${section.title}-${index}`}>
                  <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-sand/60 p-5 text-sm leading-relaxed text-muted">
              Информация демонстрационная и не является публичной офертой. Актуальные условия
              компания подтверждает при оформлении заказа.
            </div>

            <Link
              href="/contacts"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Остались вопросы? Напишите нам
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <FileText aria-hidden className="h-4 w-4 text-accent" />
                Разделы информации
              </p>
              <nav aria-label="Информационные разделы" className="mt-3">
                <ul className="space-y-0.5">
                  {legalPages.map((item) => {
                    const isActive = item.slug === page.slug;
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/${item.slug}`}
                          aria-current={isActive ? "page" : undefined}
                          className={
                            isActive
                              ? "block rounded-lg bg-background px-3 py-2 text-sm font-semibold text-foreground"
                              : "block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
                          }
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="mt-3 rounded-2xl border border-line bg-surface p-5 text-xs leading-relaxed text-muted">
              Нужна помощь с заказом? Позвоните нам или оставьте заявку на замер — специалист
              ответит на вопросы.
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
