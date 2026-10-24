import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ratingSummary, reviews } from "@/data/reviews";
import { getInitials, pluralize } from "@/lib/utils";

export function ReviewsSection() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Отзывы"
            title="Что говорят покупатели"
            description="Собрали несколько впечатлений о выборе, доставке и монтаже."
          />
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3">
            <span className="text-3xl font-semibold tracking-tight">
              {ratingSummary.average.toFixed(1)}
            </span>
            <div>
              <RatingStars value={ratingSummary.average} />
              <p className="mt-1 text-[0.6875rem] text-muted">
                {ratingSummary.count}{" "}
                {pluralize(ratingSummary.count, "демонстрационный отзыв", "демонстрационных отзыва", "демонстрационных отзывов")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <figure
              key={review.id}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              <RatingStars value={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                «{review.text}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line/70 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand text-xs font-bold text-foreground/70">
                  {getInitials(review.author)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{review.author}</span>
                  <span className="mt-0.5 block text-xs text-muted">{review.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-muted/80">
          Отзывы демонстрационные и не являются отзывами реальных клиентов.
        </p>
      </Container>
    </section>
  );
}
