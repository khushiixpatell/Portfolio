import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Khushi Patel
        </p>

        <Link
          to="/"
          className="transition hover:text-zinc-300"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}