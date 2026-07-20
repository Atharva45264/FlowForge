import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold">

          404

        </h1>

        <p className="mt-3 text-muted-foreground">

          This page doesn't exist or is no longer shared.

        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg border px-4 py-2"
        >
          Back Home
        </Link>

      </div>

    </main>
  );
}