import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line/70 bg-surface">
      <Container className="py-7 sm:py-9">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tightest sm:text-4xl lg:text-[2.65rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {description}
              </p>
            ) : null}
          </div>
          {children ? <div className="shrink-0">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
