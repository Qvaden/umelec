"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, ShoppingBag } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { useStore } from "@/components/providers/StoreProvider";
import { Button, buttonStyles } from "@/components/ui/Button";
import {
  cn,
  formatPhoneInput,
  formatPrice,
  getDemoOrderNumber,
  implementedDelay,
  isValidEmail,
  isValidPhone,
} from "@/lib/utils";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  needMeasurement: boolean;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  consent?: string;
}

interface SubmittedOrder {
  number: string;
  name: string;
  phone: string;
  needMeasurement: boolean;
  total: number;
  items: Array<{ name: string; quantity: number; variant?: string; total: number | null }>;
}

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comment: "",
  needMeasurement: false,
  consent: false,
};

export function CheckoutForm() {
  const uid = useId();
  const { cartEntries, cartSubtotal, clearCart, hydrated } = useStore();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [submitted, setSubmitted] = useState<SubmittedOrder | null>(null);

  const update = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (values.name.trim().length < 2) {
      next.name = "Укажите имя — минимум 2 символа";
    }
    if (!isValidPhone(values.phone)) {
      next.phone = "Укажите телефон в формате +7 (900) 000-00-00";
    }
    if (!isValidEmail(values.email.trim())) {
      next.email = "Укажите email — на него придёт подтверждение";
    }
    if (values.address.trim().length < 5) {
      next.address = "Укажите город, улицу и дом";
    }
    if (!values.consent) {
      next.consent = "Нужно согласие на обработку данных";
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const order: SubmittedOrder = {
      number: getDemoOrderNumber(),
      name: values.name.trim(),
      phone: values.phone,
      needMeasurement: values.needMeasurement,
      total: cartSubtotal,
      items: cartEntries.map(({ line, product }) => ({
        name: product.name,
        quantity: line.quantity,
        variant: line.variant,
        total: product.price === null ? null : product.price * line.quantity,
      })),
    };

    setStatus("loading");
    await implementedDelay(900);
    clearCart();
    setSubmitted(order);
    setStatus("idle");
  };

  if (submitted) {
    return (
      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-line bg-surface p-6 sm:p-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
            <CheckCircle2 aria-hidden className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Спасибо! Заявка отправлена
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            {submitted.name}, наш специалист свяжется с вами по номеру {submitted.phone} для
            уточнения деталей заказа.
          </p>

          <dl className="mt-6 grid gap-3 rounded-2xl bg-background p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">Номер заявки</dt>
              <dd className="mt-0.5 font-semibold">{submitted.number}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Сумма заказа</dt>
              <dd className="mt-0.5 font-semibold tabular-nums">
                {formatPrice(submitted.total)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted">Замер</dt>
              <dd className="mt-0.5 font-medium">
                {submitted.needMeasurement
                  ? "Запрошен — специалист согласует удобное время"
                  : "Не требуется"}
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Состав заказа
            </p>
            <ul className="mt-2 divide-y divide-line rounded-2xl border border-line">
              {submitted.items.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
                >
                  <span className="min-w-0">
                    {item.name}
                    <span className="ml-1 text-xs text-muted">× {item.quantity}</span>
                    {item.variant ? (
                      <span className="mt-0.5 block text-xs text-muted">{item.variant}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-medium tabular-nums">
                    {item.total === null ? "По запросу" : formatPrice(item.total)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted">
            Это демонстрационная заявка: данные не отправлялись и не сохранялись. В реальном
            магазине здесь была бы отправка в CRM и подтверждение на email.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/catalog" className={buttonStyles({ size: "md" })}>
              Вернуться в каталог
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/" className={buttonStyles({ variant: "outline", size: "md" })}>
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="container-page py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="h-[28rem] animate-pulse rounded-2xl bg-sand/60" />
          <div className="h-72 animate-pulse rounded-2xl bg-sand/60" />
        </div>
      </div>
    );
  }

  if (cartEntries.length === 0) {
    return (
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-[1.5rem] border border-dashed border-line bg-surface px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-foreground/50">
            <ShoppingBag aria-hidden className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            В корзине пока нет товаров
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Выберите товары в каталоге, чтобы перейти к оформлению заказа.
          </p>
          <Link href="/catalog" className={buttonStyles({ size: "lg", className: "mt-6" })}>
            Перейти в каталог
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (invalid?: string) =>
    cn("input-base", invalid && "border-red-500/60 focus:border-red-500");

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
        <form onSubmit={handleSubmit} noValidate className="min-w-0">
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-base font-semibold">Данные получателя</h2>
            <p className="mt-1 text-xs text-muted">
              Поля со звёздочкой обязательны. Данные демонстрационные и не отправляются.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="field-label">
                  Имя <span className="text-accent">*</span>
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Как к вам обращаться"
                  className={inputClass(errors.name)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                />
                {errors.name ? (
                  <p id={`${uid}-name-error`} className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${uid}-phone`} className="field-label">
                  Телефон <span className="text-accent">*</span>
                </label>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => update("phone", formatPhoneInput(event.target.value))}
                  placeholder="+7 (900) 000-00-00"
                  className={inputClass(errors.phone)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                />
                {errors.phone ? (
                  <p id={`${uid}-phone-error`} className="mt-1.5 text-xs text-red-600">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${uid}-email`} className="field-label">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@example.ru"
                  className={inputClass(errors.email)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                />
                {errors.email ? (
                  <p id={`${uid}-email-error`} className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${uid}-address`} className="field-label">
                  Адрес доставки <span className="text-accent">*</span>
                </label>
                <input
                  id={`${uid}-address`}
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  value={values.address}
                  onChange={(event) => update("address", event.target.value)}
                  placeholder="Город, улица, дом, квартира"
                  className={inputClass(errors.address)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? `${uid}-address-error` : undefined}
                />
                {errors.address ? (
                  <p id={`${uid}-address-error`} className="mt-1.5 text-xs text-red-600">
                    {errors.address}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-comment`} className="field-label">
                  Комментарий <span className="font-normal text-muted">— необязательно</span>
                </label>
                <textarea
                  id={`${uid}-comment`}
                  name="comment"
                  rows={3}
                  value={values.comment}
                  onChange={(event) => update("comment", event.target.value)}
                  placeholder="Например: удобно после 18:00, нужен подъём на этаж"
                  className="input-base resize-none"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl bg-background p-4">
              <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={values.needMeasurement}
                  onChange={(event) => update("needMeasurement", event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-accent"
                />
                <span>
                  <span className="font-medium">Нужен замер</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    Специалист приедет, проверит проёмы и уточнит размеры перед изготовлением.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-accent"
                  aria-invalid={Boolean(errors.consent)}
                />
                <span>
                  Согласен с{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-foreground underline decoration-line underline-offset-2 hover:decoration-foreground"
                  >
                    политикой конфиденциальности
                  </Link>{" "}
                  и обработкой персональных данных
                </span>
              </label>
              {errors.consent ? (
                <p className="text-xs text-red-600">{errors.consent}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="mt-5 w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                  Отправляем
                </>
              ) : (
                "Отправить заказ"
              )}
            </Button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-base font-semibold">Состав заказа</h2>

            <ul className="mt-4 space-y-3">
              {cartEntries.map(({ key, line, product }) => (
                <li key={key} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="block leading-snug">{product.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {line.quantity} шт.
                      {line.variant ? ` · ${line.variant}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium tabular-nums">
                    {product.price === null
                      ? "По запросу"
                      : formatPrice(product.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Доставка</dt>
                <dd className="text-xs text-muted">После подтверждения</dd>
              </div>
            </dl>

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold">Итого</span>
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted">
              Оплата в демонстрационной версии не проводится. После отправки заявки менеджер
              уточнит состав, доставку и монтаж.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
