import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-sm font-semibold tracking-wide text-white"
        >
          Khushi Patel
        </Link>

        <div className="hidden items-center gap-7 text-sm text-zinc-400 sm:flex">
          <a href="/#work" className="transition hover:text-white">
            Work
          </a>

          <a href="/#experience" className="transition hover:text-white">
            Experience
          </a>

          <a href="/#about" className="transition hover:text-white">
            About
          </a>

          <a href="/#skills" className="transition hover:text-white">
            Skills
          </a>

          <a href="/#contact" className="transition hover:text-white">
            Contact
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </header>
  );
}