"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { implementedDelay, cn, formatPhoneInput, isValidPhone } from "@/lib/utils";

interface LeadFormProps {
  compact?: boolean;
  buttonLabel?: string;
  className?: string;
  formId?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  consent?: string;
}

export function LeadForm({
  compact = false,
  buttonLabel = "Отправить заявку",
  className,
  formId,
}: LeadFormProps) {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (name.trim().length < 2) {
      next.name = "Укажите имя — минимум 2 символа";
    }

    if (!isValidPhone(phone)) {
      next.phone = "Укажите телефон в формате +7 (900) 000-00-00";
    }

    if (!consent) {
      next.consent = "Нужно согласие на обработку данных";
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    await implementedDelay(800);
    setStatus("success");
  };

  const reset = () => {
    setName("");
    setPhone("");
    setComment("");
    setConsent(false);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex h-full flex-col items-start justify-center rounded-2xl border border-accent/20 bg-accent-soft/60 p-6 sm:p-8",
          className,
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
          <CheckCircle2 aria-hidden className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Заявка отправлена</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Спасибо, {name.trim()}. В реальном проекте менеджер связался бы с вами по номеру{" "}
          {phone}. Эта форма демонстрационная — данные никуда не отправляются.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      <div>
        <label htmlFor={`${uid}-name`} className="field-label">
          Имя
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Как к вам обращаться"
          className={cn("input-base", errors.name && "border-red-500/60 focus:border-red-500")}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="mt-1.5 text-xs text-red-600">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className="field-label">
          Телефон
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
          placeholder="+7 (900) 000-00-00"
          className={cn("input-base", errors.phone && "border-red-500/60 focus:border-red-500")}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p> : null}
      </div>

      {compact ? null : (
        <div>
          <label htmlFor={`${uid}-comment`} className="field-label">
            Комментарий <span className="font-normal text-muted">— необязательно</span>
          </label>
          <textarea
            id={`${uid}-comment`}
            name="comment"
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Например: нужны два окна в спальне и балконный блок"
            className="input-base resize-none"
          />
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
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
      {errors.consent ? <p className="text-xs text-red-600">{errors.consent}</p> : null}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            Отправляем
          </>
        ) : (
          buttonLabel
        )}
      </Button>

      <p className="text-center text-[0.6875rem] leading-relaxed text-muted/80">
        Демонстрационная форма: данные не отправляются и не сохраняются.
      </p>
    </form>
  );
}
