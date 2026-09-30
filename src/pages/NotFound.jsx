import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center px-6 py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-sky-400">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found.
        </h1>

        <p className="mt-5 max-w-lg leading-7 text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist
          or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Back home
          </Link>

          <Link
            to="/#work"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
          >
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}