import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { catalogNav } from "@/data/site";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[3.5rem] font-semibold leading-none tracking-tightest text-sand-deep sm:text-[4.5rem]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Страница не найдена
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную или выберите
            раздел каталога.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <Link href="/" className={buttonStyles({ size: "md" })}>
              <Home aria-hidden className="h-4 w-4" />
              На главную
            </Link>
            <Link href="/catalog" className={buttonStyles({ variant: "outline", size: "md" })}>
              В каталог
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-muted">
              Популярные разделы
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {catalogNav.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
