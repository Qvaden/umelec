import { X } from "lucide-react";

export interface ActiveChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export function CatalogActiveChips({
  chips,
  onReset,
}: {
  chips: ActiveChip[];
  onReset: () => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          {chip.label}
          <X aria-hidden className="h-3.5 w-3.5 text-muted" />
          <span className="sr-only">Удалить фильтр</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="ml-1 text-xs font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        Сбросить всё
      </button>
    </div>
  );
}
