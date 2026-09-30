export default function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Khushi Patel
          </p>

          <p className="mt-1 text-xs text-zinc-700">
            Built with React, Node.js, and PostgreSQL.
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="w-fit text-sm text-zinc-500 transition hover:text-white"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}