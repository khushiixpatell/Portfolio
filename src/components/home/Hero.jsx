export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-6 pt-20 pb-14">
      <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
        Hi, I’m <span className="text-sky-400">Khushi Patel</span>.
      </h1>

      <p className="mt-6 max-w-2xl text-zinc-400 text-lg">
        Computer Science student with a passion for frontend development and UI design, 
        actively expanding into full-stack development.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-white text-black px-5 py-3 font-medium hover:opacity-90"
        >
          Recent Projects
        </a>

        <a
          href="#contact"
          className="rounded-lg border border-white/15 px-5 py-3 hover:border-white/30"
        >
          Contact
        </a>
      </div>
    </section>
  );
}
