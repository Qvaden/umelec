import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/site";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: MapPin,
    label: "Адрес",
    value: company.address,
  },
  {
    icon: Phone,
    label: "Телефон",
    value: company.phone,
    href: company.phoneHref,
  },
  {
    icon: Clock,
    label: "График работы",
    value: company.hours,
    lines: company.hours.split(", "),
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: company.emailHref,
  },
];

export function ContactsStrip() {
  return (
    <section aria-labelledby="home-contacts" className="border-b border-line bg-surface">
      <Container>
        <h2 id="home-contacts" className="sr-only">
          Контакты
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 py-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-center lg:gap-x-0 lg:gap-y-0 lg:py-6 lg:divide-x lg:divide-line">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={cn(
                  "min-w-0",
                  index > 0 && "lg:pl-6",
                  item.label === "Email" && "max-[359px]:col-span-2",
                )}
              >
                <p className="flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-muted">
                  <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.9} />
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "mt-1 block break-words font-semibold leading-snug transition-colors hover:text-accent",
                      item.label === "Email"
                        ? "text-xs min-[360px]:text-[0.8125rem]"
                        : "text-[0.8125rem]",
                    )}
                  >
                    {item.value}
                  </a>
                ) : item.lines ? (
                  <p className="mt-1 text-[0.8125rem] font-semibold leading-snug">
                    {item.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="mt-1 text-[0.8125rem] font-semibold leading-snug">
                    {item.value}
                  </p>
                )}
              </div>
            );
          })}

          <Link
            href="/contacts"
            className="col-span-2 inline-flex min-h-11 items-center justify-end gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent-hover lg:col-span-1 lg:ml-6 lg:self-center"
          >
            Все контакты
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
