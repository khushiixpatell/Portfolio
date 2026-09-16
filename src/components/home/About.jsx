export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            About
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            I like figuring out how things work — then building them.
          </h2>
        </div>

        {/* Copy */}
        <div className="max-w-2xl space-y-6 text-lg leading-8 text-zinc-400">
          <p>
            I&apos;m a Computer Science student at Wilfrid Laurier University
            interested in software engineering across full-stack development
            and artificial intelligence.
          </p>

          <p>
            A lot of my experience starts with a problem or an idea and
            figuring out what I need to learn to turn it into something
            useful. That has taken me from building web applications and
            experimenting with AI models to designing tools around problems
            I&apos;ve encountered while leading a technical community.
          </p>

          <p>
            I enjoy working across different parts of a system and
            understanding how the pieces connect — from the experience a user
            sees to the logic and data behind it.
          </p>
        </div>
      </div>
    </section>
  );
}