import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-sm font-semibold tracking-wide text-white"
          >
            Khushi Patel
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 text-sm text-zinc-400 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            aria-expanded={menuOpen}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition hover:border-white/20 hover:text-white sm:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-white/10 pb-5 pt-4 sm:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-3 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
              >
                View resume ↗
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}