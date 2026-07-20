export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl p-10">

      <div className="h-56 animate-pulse rounded-3xl bg-muted" />

      <div className="mt-8 h-12 w-72 animate-pulse rounded bg-muted" />

      <div className="mt-10 space-y-4">

        <div className="h-5 animate-pulse rounded bg-muted" />
        <div className="h-5 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

      </div>

    </div>
  );
}