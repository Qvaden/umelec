"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { getCategoryBySlug } from "@/data/categories";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim() ? searchProducts(query, 5) : []), [query]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/catalog?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Закрыть поиск"
      />
      <div className="relative animate-fade-in border-b border-line bg-surface shadow-lift">
        <div className="container-page py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold">Поиск по каталогу</p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
              aria-label="Закрыть поиск"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={submit} className="relative mt-4">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например, входная дверь или линолеум"
              aria-label="Поисковый запрос"
              className="h-14 w-full rounded-2xl border border-line bg-background pl-12 pr-32 text-base text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
            />
            <button
              type="submit"
              className={buttonStyles({
                size: "sm",
                className: "absolute right-2 top-1/2 -translate-y-1/2",
              })}
            >
              Найти
            </button>
          </form>

          <div className="mt-5 max-h-[60vh] overflow-y-auto pb-1">
            {query.trim() ? (
              results.length > 0 ? (
                <>
                  <ul className="grid gap-1">
                    {results.map((product) => {
                      const category = getCategoryBySlug(product.category);
                      return (
                        <li key={product.id}>
                          <Link
                            href={`/catalog/${product.category}/${product.slug}`}
                            onClick={onClose}
                            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-background"
                          >
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                              <Image
                                src={product.images[0].src}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">
                                {product.name}
                              </span>
                              <span className="mt-0.5 block text-xs text-muted">
                                {category?.name}
                              </span>
                            </span>
                            <span className="shrink-0 text-sm font-semibold">
                              {product.price === null
                                ? "По запросу"
                                : formatPrice(product.price)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 border-t border-line pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(`/catalog?q=${encodeURIComponent(query.trim())}`);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                    >
                      Показать все результаты
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-background p-6 text-center">
                  <p className="text-sm font-semibold">Ничего не найдено</p>
                  <p className="mt-1 text-sm text-muted">
                    Попробуйте другой запрос или посмотрите весь каталог.
                  </p>
                  <Link
                    href="/catalog"
                    onClick={onClose}
                    className={buttonStyles({ variant: "outline", size: "sm", className: "mt-4" })}
                  >
                    Перейти в каталог
                  </Link>
                </div>
              )
            ) : (
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-muted">
                  Популярные разделы
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "Входные двери", href: "/catalog/vhodnye-dveri" },
                    { label: "Межкомнатные двери", href: "/catalog/mezhkomnatnye-dveri" },
                    { label: "Окна", href: "/catalog/okna" },
                    { label: "Балконы", href: "/catalog/balkony-i-lodzhii" },
                    { label: "Линолеум", href: "/catalog/linoleum" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="rounded-full border border-line bg-background px-3.5 py-2 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
