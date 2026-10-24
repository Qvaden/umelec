import Link from "next/link";
import { ArrowRight, Phone, Ruler, Search, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { buttonStyles } from "@/components/ui/Button";
import { catalogNav, company, mainNav } from "@/data/site";

export function MobileMenu({
  onClose,
  onSearch,
  cartCount,
  favoritesCount,
}: {
  onClose: () => void;
  onSearch: () => void;
  cartCount: number;
  favoritesCount: number;
}) {
  return (
    <div className="fixed inset-0 z-[85] xl:hidden">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Меню сайта"
        className="absolute inset-y-0 left-0 flex w-[88%] max-w-[380px] animate-slide-in-left flex-col bg-surface shadow-lift"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <Logo className="min-h-11" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Закрыть меню"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <button
            type="button"
            onClick={onSearch}
            className="flex min-h-11 w-full items-center gap-2.5 rounded-xl border border-line bg-background px-4 py-3 text-sm text-muted transition-colors hover:border-foreground/25"
          >
            <Search aria-hidden className="h-4 w-4" />
            Поиск по каталогу
          </button>

          <nav aria-label="Мобильная навигация" className="mt-5">
            <ul className="space-y-0.5">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-11 items-center justify-between rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium transition-colors hover:bg-background"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="h-4 w-4 text-muted/60" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 border-t border-line pt-5">
            <p className="px-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-muted">
              Разделы каталога
            </p>
            <ul className="mt-2 space-y-0.5">
              {catalogNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-foreground/75 transition-colors hover:bg-background hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <Link
              href="/favorites"
              onClick={onClose}
              className="flex min-h-11 items-center justify-between rounded-xl border border-line bg-background px-3.5 py-3 text-sm font-medium"
            >
              Избранное
              <span className="text-xs text-muted">{favoritesCount}</span>
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex min-h-11 items-center justify-between rounded-xl border border-line bg-background px-3.5 py-3 text-sm font-medium"
            >
              Корзина
              <span className="text-xs text-muted">{cartCount}</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-line px-5 py-4">
          <a
            href={company.phoneHref}
            className="flex min-h-11 items-center gap-2 text-base font-semibold transition-colors hover:text-accent"
          >
            <Phone aria-hidden className="h-4 w-4 text-accent" />
            {company.phone}
          </a>
          <p className="mt-1 text-xs text-muted">{company.hours}</p>
          <Link
            href="/services#request"
            onClick={onClose}
            className={buttonStyles({ size: "md", className: "mt-4 w-full" })}
          >
            <Ruler aria-hidden className="h-4 w-4" />
            Заказать замер
          </Link>
        </div>
      </aside>
    </div>
  );
}
