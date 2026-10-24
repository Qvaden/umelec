import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Телефон, email, адрес и часы работы «Умельца». Форма обратной связи и заявка на замер.",
  alternates: { canonical: "/contacts" },
};

const contactCards = [
  {
    icon: Phone,
    label: "Телефон",
    value: company.phone,
    href: company.phoneHref,
    note: "Звонок или сообщение — как удобнее",
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: company.emailHref,
    note: "Для вопросов по заказу и документам",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: company.address,
    note: company.addressNote,
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: company.hours,
    note: company.hoursNote,
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description="Ответим на вопросы по товарам, замеру и монтажу. Все контакты на этой странице демонстрационные."
        breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
      />

      <section className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="flex flex-col rounded-2xl border border-line bg-surface p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-1 break-words text-sm font-semibold transition-colors hover:text-accent"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold">{card.value}</p>
                  )}
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{card.note}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div>
              <div
                role="img"
                aria-label="Демонстрационное место под карту проезда"
                className="relative flex min-h-[18rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface p-6 text-center surface-grid sm:min-h-[24rem]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-soft">
                  <MapPin aria-hidden className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm font-semibold">Место под карту</p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
                  В реальном проекте здесь будет интерактивная карта с адресом офиса и схемой
                  проезда.
                </p>
                <p className="mt-4 rounded-full border border-line bg-background px-3 py-1.5 text-xs text-muted">
                  {company.address} · {company.addressNote.toLowerCase()}
                </p>
              </div>

              <div className="mt-3 rounded-2xl border border-line bg-sand/60 p-4 text-xs leading-relaxed text-muted">
                Адрес, телефон, email и график указаны для примера. Демонстрационный сайт не
                принимает реальные заявки.
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h2 className="text-lg font-semibold tracking-tight">Написать нам</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Оставьте имя и телефон — специалист свяжется, ответит на вопросы и при
                необходимости согласует замер.
              </p>
              <div className="mt-5">
                <LeadForm buttonLabel="Отправить сообщение" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
