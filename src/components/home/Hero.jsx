export default function Hero() {
  return (
    <section
      id="home"
      className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-36"
    >
      <div className="max-w-4xl">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-sky-400">
          Software Engineer
        </p>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Hi, I&apos;m Khushi.
          <span className="mt-2 block text-zinc-500">
            I build software across
            <span className="text-zinc-200"> full-stack</span>,
            <span className="text-zinc-200"> AI</span>, and
            <span className="text-zinc-200"> frontend</span>.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Computer Science student at Wilfrid Laurier University building
          full-stack applications, intelligent systems with a focus on practical,
          real-world solutions. 
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Explore my work
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
          >
            View resume ↗
          </a>

          <a
            href="#contact"
            className="px-3 py-3 text-sm text-zinc-400 transition hover:text-white"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div className="mt-20 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Focus
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Full-Stack + AI
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Currently
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Computer Science @ Laurier
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Leadership
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            President, GDG Laurier
          </p>
        </div>
      </div>
    </section>
  );
}