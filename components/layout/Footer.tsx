import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { company, footerNav } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-surface">
      <div className="container-page py-8 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-surface/60 sm:mt-5">
              Подбираем окна, двери, балконы и товары для дома. Помогаем с замером,
              доставкой и установкой.
            </p>

            <div className="mt-5 space-y-2.5 text-sm sm:mt-6 sm:space-y-3">
              <a
                href={company.phoneHref}
                className="flex items-center gap-2.5 text-surface/80 transition-colors hover:text-white"
              >
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-surface/40" />
                {company.phone}
              </a>
              <a
                href={company.emailHref}
                className="flex items-center gap-2.5 text-surface/80 transition-colors hover:text-white"
              >
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-surface/40" />
                {company.email}
              </a>
              <p className="hidden items-start gap-2.5 text-surface/60 sm:flex">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-surface/40" />
                <span>
                  {company.address}
                  <span className="mt-0.5 block text-xs text-surface/40">
                    {company.addressNote}
                  </span>
                </span>
              </p>
              <p className="hidden items-start gap-2.5 text-surface/60 sm:flex">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-surface/40" />
                <span>
                  {company.hours}
                  <span className="mt-0.5 block text-xs text-surface/40">
                    {company.hoursNote}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:contents">
            <FooterColumn title="Каталог" links={footerNav.catalog} />
            <FooterColumn title="Компания" links={footerNav.company} />
            <FooterColumn title="Помощь" links={footerNav.help} />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-xs leading-relaxed text-surface/50 sm:mt-12 sm:px-5">
          {company.demoNotice}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-surface/40 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>© Умелец. Демонстрационный проект. Все изображения — иллюстрации.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-surface">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="transition-colors hover:text-surface">
              Пользовательское соглашение
            </Link>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>Сайт-демо · не публичная оферта</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-surface/40 sm:text-[0.6875rem]">
        {title}
      </p>
      <ul className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="block py-0.5 text-[0.8125rem] text-surface/70 transition-colors hover:text-white sm:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
