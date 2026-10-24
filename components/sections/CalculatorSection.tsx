"use client";

import Link from "next/link";
import { ArrowRight, Calculator as CalculatorIcon, Info, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, formatPrice } from "@/lib/utils";

type Kind = "window" | "door" | "balcony";

const kinds: Array<{
  value: Kind;
  label: string;
  note: string;
  base: number;
  ratePerSquareMeter: number;
}> = [
  { value: "window", label: "Окно", note: "ПВХ или алюминий", base: 9000, ratePerSquareMeter: 14000 },
  { value: "door", label: "Дверь", note: "входная или межкомнатная", base: 15000, ratePerSquareMeter: 12000 },
  { value: "balcony", label: "Балкон", note: "остекление и отделка", base: 12000, ratePerSquareMeter: 16000 },
];

const extras = [
  { id: "install", label: "Монтаж", type: "percent", value: 0.12 },
  { id: "dismantle", label: "Демонтаж старой конструкции", type: "fixed", value: 3500 },
  { id: "finish", label: "Откосы и подоконник", type: "fixed", value: 2500 },
] as const;

type ExtraId = (typeof extras)[number]["id"];

function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

export function CalculatorSection() {
  const uid = useId();
  const [kind, setKind] = useState<Kind>("window");
  const [width, setWidth] = useState(130);
  const [height, setHeight] = useState(140);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ExtraId[]>(["install"]);

  const activeKind = kinds.find((item) => item.value === kind) ?? kinds[0];
  const isValid = width >= 40 && height >= 40 && quantity >= 1;
  const area = (width / 100) * (height / 100);
  const base = activeKind.base + area * activeKind.ratePerSquareMeter;

  let total = isValid ? base * quantity : 0;
  for (const extra of extras) {
    if (!selectedExtras.includes(extra.id)) continue;
    total +=
      extra.type === "percent" ? base * quantity * extra.value : extra.value * quantity;
  }
  const estimate = isValid ? roundToHundred(total) : null;

  const toggleExtra = (id: ExtraId) => {
    setSelectedExtras((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Калькулятор"
          title="Рассчитать стоимость"
          description="Ориентировочный расчёт по размерам. Он поможет понять порядок цен до выезда специалиста."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
          <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-7">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Что нужно?
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {kinds.map((item) => {
                  const isActive = kind === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setKind(item.value)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left transition-colors",
                        isActive
                          ? "border-accent bg-accent-soft/70"
                          : "border-line bg-background hover:border-foreground/25",
                      )}
                    >
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted">
                        {item.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-width`} className="field-label">
                  Ширина, см
                </label>
                <input
                  id={`${uid}-width`}
                  type="number"
                  inputMode="numeric"
                  min={40}
                  max={400}
                  step={5}
                  value={width}
                  onChange={(event) => setWidth(Number(event.target.value))}
                  className="input-base"
                />
                <p className="mt-1 text-[0.6875rem] text-muted">От 40 до 400 см</p>
              </div>

              <div>
                <label htmlFor={`${uid}-height`} className="field-label">
                  Высота, см
                </label>
                <input
                  id={`${uid}-height`}
                  type="number"
                  inputMode="numeric"
                  min={40}
                  max={300}
                  step={5}
                  value={height}
                  onChange={(event) => setHeight(Number(event.target.value))}
                  className="input-base"
                />
                <p className="mt-1 text-[0.6875rem] text-muted">От 40 до 300 см</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="field-label">Количество</p>
                <div
                  className="inline-flex items-center rounded-full border border-line bg-background"
                  role="group"
                  aria-label="Количество конструкций"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-l-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Уменьшить количество"
                  >
                    <Minus aria-hidden className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                    disabled={quantity >= 10}
                    className="flex h-10 w-10 items-center justify-center rounded-r-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Увеличить количество"
                  >
                    <Plus aria-hidden className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted">
                Площадь: {isValid ? `${area.toFixed(2)} м²` : "—"}
              </p>
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Дополнительно
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {extras.map((extra) => {
                  const checked = selectedExtras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-colors",
                        checked
                          ? "border-accent/40 bg-accent-soft/50"
                          : "border-line bg-background hover:border-foreground/25",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleExtra(extra.id)}
                        className="h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-accent"
                      />
                      {extra.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col rounded-[1.5rem] bg-accent p-5 text-white sm:p-7">
            <div className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white/60">
              <CalculatorIcon aria-hidden className="h-4 w-4" />
              Предварительный расчёт
            </div>

            <p className="mt-5 text-xs text-white/65">Ориентировочная стоимость</p>
            <p
              className="mt-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
              aria-live="polite"
            >
              {estimate === null ? "—" : formatPrice(estimate)}
            </p>
            <p className="mt-1 text-xs text-white/60">
              {isValid
                ? `${activeKind.label.toLowerCase()} · ${quantity} шт. · ${area.toFixed(2)} м²`
                : "Укажите размеры, чтобы увидеть расчёт"}
            </p>

            <ul className="mt-5 space-y-1.5 border-t border-white/15 pt-4 text-xs text-white/70">
              <li>Базовая стоимость: {formatPrice(Math.round(base * quantity))}</li>
              <li>
                Дополнительно:{" "}
                {selectedExtras.length > 0
                  ? selectedExtras
                      .map((id) => extras.find((item) => item.id === id)?.label)
                      .filter(Boolean)
                      .join(", ")
                  : "не выбрано"}
              </li>
            </ul>

            <div className="mt-auto pt-6">
              <p className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-[0.6875rem] leading-relaxed text-white/70">
                <Info aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Расчёт предварительный. Точную стоимость сообщит специалист после замера.
              </p>

              <div className="mt-3 grid gap-2">
                <Link
                  href="/services#request"
                  className={buttonStyles({ variant: "inverse", size: "md", className: "w-full" })}
                >
                  Заказать замер
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link
                  href="/contacts"
                  className={buttonStyles({
                    variant: "outline",
                    size: "md",
                    className:
                      "w-full border-white/25 text-white hover:border-white/60 hover:bg-white/10",
                  })}
                >
                  Получить консультацию
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
