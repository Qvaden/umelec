import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { benefits } from "@/data/site";

export function BenefitsStrip() {
  return (
    <section className="border-b border-line bg-surface">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-line/70 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={[
                "flex items-start gap-3 px-3 py-4 sm:px-5 sm:py-5 lg:py-6",
                index === 0 ? "pl-0" : "",
                index === benefits.length - 1 ? "pr-0" : "",
                index === 0 ? "col-span-2 sm:col-span-1" : "",
              ].join(" ")}
            >
              <span className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent min-[480px]:flex">
                <Icon name={benefit.icon} className="h-[1.1rem] w-[1.1rem]" />
              </span>
              <div className="min-w-0">
                <p className="break-words text-[0.8125rem] font-semibold leading-snug">{benefit.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
