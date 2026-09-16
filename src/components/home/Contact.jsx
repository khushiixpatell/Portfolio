export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-6 py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Contact
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Interested in working together?
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            I&apos;m always interested in opportunities to build, learn,
            and work on meaningful technical problems.
          </p>

          <a
            href="mailto:khushiixpatell@gmail.com"
            className="mt-9 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Send me an email →
          </a>
        </div>

        <div className="lg:text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Find me online
          </p>

          <div className="mt-5 flex gap-5 lg:justify-end">
            <a
              href="https://github.com/khushiixpatell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/Khushi-x-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              LinkedIn ↗
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}