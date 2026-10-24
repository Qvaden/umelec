import { company } from "@/data/site";

export function DemoBar() {
  return (
    <div className="bg-foreground text-surface">
      <div className="container-page flex min-h-9 items-center justify-between gap-4 py-1.5 text-[0.6875rem] sm:text-xs">
        <p className="min-w-0 leading-snug">
          <span className="mr-1.5 inline-flex items-center rounded-full bg-accent px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.1em] text-white">
            Демо
          </span>
          <span className="text-surface/70">
            Демонстрационный сайт: контакты и цены приведены для примера
          </span>
        </p>
        <div className="hidden shrink-0 items-center gap-5 text-surface/70 sm:flex">
          <span>{company.hours}</span>
          <a
            href={company.phoneHref}
            className="font-semibold text-surface transition-colors hover:text-sand"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
