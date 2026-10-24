import {
  BadgeCheck,
  CircleHelp,
  ClipboardList,
  Clock3,
  Monitor,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ruler: Ruler,
  wrench: Wrench,
  truck: Truck,
  shield: ShieldCheck,
  monitor: Monitor,
  phone: Phone,
  clipboard: ClipboardList,
  clock: Clock3,
  sparkles: Sparkles,
  "badge-check": BadgeCheck,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = iconMap[name] ?? CircleHelp;
  return <Component aria-hidden className={className} strokeWidth={1.7} />;
}
