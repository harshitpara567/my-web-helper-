export default function Loading() {
  return (
    <div className="shell py-20 lg:py-28" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>

      <div className="animate-pulse">
        <div className="h-4 w-28 rounded-full bg-ink/10" />
        <div className="mt-6 h-12 w-3/4 max-w-3xl rounded-2xl bg-ink/10" />
        <div className="mt-4 h-12 w-1/2 max-w-xl rounded-2xl bg-ink/10" />
        <div className="mt-6 h-5 w-full max-w-2xl rounded-full bg-ink/5" />
        <div className="mt-3 h-5 w-5/6 max-w-xl rounded-full bg-ink/5" />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="aspect-[16/10] rounded-3xl bg-ink/10" />
          <div className="flex flex-col justify-center gap-5 rounded-3xl border border-ink/10 p-8 lg:p-12">
            <div className="h-6 w-24 rounded-full bg-ink/10" />
            <div className="h-8 w-full rounded-2xl bg-ink/10" />
            <div className="h-8 w-4/5 rounded-2xl bg-ink/10" />
            <div className="h-5 w-full rounded-full bg-ink/5" />
            <div className="h-5 w-2/3 rounded-full bg-ink/5" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-ink/10"
            >
              <div className="aspect-[16/10] bg-ink/10" />
              <div className="flex flex-col gap-4 p-6">
                <div className="h-5 w-20 rounded-full bg-ink/10" />
                <div className="h-6 w-full rounded-xl bg-ink/10" />
                <div className="h-4 w-3/4 rounded-full bg-ink/5" />
                <div className="h-4 w-1/2 rounded-full bg-ink/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
