import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function pluralize(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(count) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}

export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  const withSeven = normalized.startsWith("7") ? normalized : `7${normalized}`;
  const parts = [
    "+7",
    withSeven.slice(1, 4),
    withSeven.slice(4, 7),
    withSeven.slice(7, 9),
    withSeven.slice(9, 11),
  ].filter(Boolean);

  if (parts.length === 1) return parts[0];
  let result = `${parts[0]} (${parts[1]}`;
  if (parts[1].length === 3) result += ")";
  if (parts[2]) result += ` ${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;
  if (parts[4]) result += `-${parts[4]}`;
  return result;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function implementedDelay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getDemoOrderNumber(): string {
  return `UM-${Math.floor(100000 + Math.random() * 899999)}`;
}
