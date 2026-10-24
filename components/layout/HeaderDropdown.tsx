import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { catalogNav, company, doorNav } from "@/data/site";
import { getCategoryBySlug } from "@/data/categories";

export type MenuId = "catalog" | "doors";

export function HeaderDropdown({
  openMenu,
  onClose,
}: {
  openMenu: MenuId;
  onClose: () => void;
}) {
  return (
    <div
      id="header-dropdown"
      className="absolute inset-x-0 top-full hidden border-b border-line bg-surface shadow-lift xl:block"
    >
      <div className="container-page grid grid-cols-[1fr_280px] gap-10 py-7">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
            {openMenu === "catalog" ? "Каталог" : "Двери"}
          </p>
          {openMenu === "catalog" ? (
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              {catalogNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-background"
                >
                  {item.label}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
              <Link
                href="/catalog"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-accent"
              >
                Все товары
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {doorNav.map((item) => {
                const category = getCategoryBySlug(item.href.split("/").pop() ?? "");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-background"
                  >
                    {category ? (
                      <Image
                        src={category.image}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : null}
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted">
                        {category?.shortDescription}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-sand p-5">
          <p className="text-sm font-semibold text-foreground">
            {openMenu === "catalog" ? "Не знаете, что выбрать?" : "Поможем подобрать дверь"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Специалист приедет на объект, снимет размеры и предложит подходящие варианты.
          </p>
          <Link
            href="/services#request"
            onClick={onClose}
            className={buttonStyles({ size: "sm", className: "mt-4" })}
          >
            Бесплатный замер
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <a
            href={company.phoneHref}
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:text-foreground"
          >
            <Phone aria-hidden className="h-3.5 w-3.5" />
            {company.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
