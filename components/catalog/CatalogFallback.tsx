export function CatalogFallback() {
  return (
    <div className="container-page py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-2xl bg-sand/60" />
          ))}
        </div>
        <div>
          <div className="h-11 w-full animate-pulse rounded-full bg-sand/60 sm:max-w-xs" />
          <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="aspect-[4/3] animate-pulse bg-sand/60" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-sand/60" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-sand/60" />
                  <div className="h-3 w-full animate-pulse rounded bg-sand/60" />
                  <div className="h-9 w-full animate-pulse rounded-full bg-sand/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
