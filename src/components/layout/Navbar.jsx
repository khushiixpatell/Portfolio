import { Link } from "react-router-dom";

const projects = [
  { name: "BiteWise", to: "/projects/bitewise" },
  { name: "Zeuty", to: "/projects/zeuty" },
  { name: "Untitled", to: "/projects/untitled" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-wide">
          Khushi Patel
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
          {/* Projects dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-white"
              aria-haspopup="true"
            >
              Projects <span className="text-zinc-500 group-hover:text-zinc-300">▾</span>
            </button>

            <div
              className="
                absolute left-0 top-full mt-3 w-56
                rounded-xl border border-white/10 bg-zinc-950
                shadow-lg shadow-black/40
                opacity-0 invisible translate-y-1
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0
                transition
              "
              role="menu"
            >
              <div className="p-2">
                {projects.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="block rounded-lg px-3 py-2 hover:bg-white/5 focus:bg-white/5 focus:outline-none text-zinc-200"
                    role="menuitem"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a href="/#skills" className="hover:text-white">Skills</a>
          <a href="/#contact" className="hover:text-white">Contact</a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 px-3 py-2 hover:border-white/30"
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
