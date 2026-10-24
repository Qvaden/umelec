"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export function ProductGallery({
  images,
  name,
  isHit,
  isNew,
}: {
  images: ImageAsset[];
  name: string;
  isHit?: boolean;
  isNew?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-sand">
        <div className="relative aspect-[4/3] sm:aspect-[5/4]">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="animate-fade-in object-cover"
          />
        </div>
        {isHit || isNew ? (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {isHit ? <Badge tone="dark">Хит</Badge> : null}
            {isNew ? <Badge tone="accent">Новинка</Badge> : null}
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          role="group"
          aria-label={`Фотографии товара «${name}»`}
          className="mt-3 flex gap-2.5 overflow-x-auto pb-1 no-scrollbar"
        >
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать фото ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={cn(
                "relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border bg-sand transition-colors",
                index === activeIndex
                  ? "border-accent ring-2 ring-accent/15"
                  : "border-line hover:border-foreground/30",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
