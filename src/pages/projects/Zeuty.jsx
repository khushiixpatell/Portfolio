import { Link } from "react-router-dom";

const technologies = [
  "Frontend Development",
  "UI/UX",
  "Responsive Design",
  "Figma",
];

const principles = [
  {
    number: "01",
    title: "Clear Hierarchy",
    description:
      "Structured screens so users could quickly understand what was important and where to go next.",
  },
  {
    number: "02",
    title: "Consistent UI",
    description:
      "Used repeatable patterns across screens to keep interactions and visual language consistent.",
  },
  {
    number: "03",
    title: "Responsive Thinking",
    description:
      "Considered how layouts and interface elements should adapt across different screen sizes.",
  },
];

export default function Zeuty() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <Link
          to="/#work"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to work
        </Link>

        <div className="mt-14 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Frontend • Product Design
            </span>

            <span className="text-zinc-700">/</span>

            <span className="text-sm text-zinc-500">
              Internship Work
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Zeuty
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-400">
            Frontend and product interface work created for an early-stage
            startup, translating product ideas into clear and usable digital
            experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#work"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              View my work ↓
            </a>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-9 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Role
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Frontend Developer Intern
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Environment
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Early-Stage Startup
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Focus
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Interface • Product • UX
            </p>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Experience
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Designing while the product was still taking shape.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              Working with an early-stage startup meant designing around
              product ideas that were still evolving rather than working
              from a fully established design system or mature product.
            </p>

            <p>
              My work focused on translating those ideas into interface
              concepts and thinking through how users would actually
              experience the product.
            </p>

            <p>
              It gave me experience approaching frontend work from both
              sides: how an interface should look and how the structure of
              that interface communicates what the product is supposed to do.
            </p>
          </div>
        </div>
      </section>

      {/* LARGE FEATURED VISUAL */}
      <section
        id="work"
        className="border-y border-white/10 bg-white/[0.015]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Selected Work
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From product ideas to interface concepts.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Selected screens from the interface work I designed during the
              internship.
            </p>
          </div>

          {/* MAIN SCREENSHOT */}
          <div className="mt-14">
            <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-zinc-950">
              <div className="text-center">
                <p className="text-sm text-zinc-500">
                  Main Zeuty interface screenshot
                </p>
                <p className="mt-2 text-xs text-zinc-700">
                  Replace with your strongest design
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between">
              <p className="text-sm text-zinc-300">
                Product interface
              </p>

              <p className="text-xs text-zinc-600">
                Designed by Khushi Patel
              </p>
            </div>
          </div>

          {/* SECONDARY SCREENSHOTS */}
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div>
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-zinc-950">
                <p className="text-sm text-zinc-600">
                  Zeuty screen 02
                </p>
              </div>

              <p className="mt-4 text-sm text-zinc-400">
                Interface exploration
              </p>
            </div>

            <div>
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-zinc-950">
                <p className="text-sm text-zinc-600">
                  Zeuty screen 03
                </p>
              </div>

              <p className="mt-4 text-sm text-zinc-400">
                Product flow
              </p>
            </div>
          </div>

          {/* FULL WIDTH FOURTH */}
          <div className="mt-14">
            <div className="flex aspect-[16/8] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-zinc-950">
              <p className="text-sm text-zinc-600">
                Zeuty screen 04
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN THINKING */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Design Approach
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designing beyond aesthetics.
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            My goal was to make the interface visually clear while also
            thinking about how users would understand and move through the
            product.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="border-t border-white/10 py-8"
            >
              <p className="font-mono text-xs text-sky-400">
                {principle.number}
              </p>

              <h3 className="mt-7 text-xl font-semibold text-white">
                {principle.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DESIGN TO IMPLEMENTATION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                Frontend Perspective
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Design decisions affect implementation.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                Working on interface concepts reinforced that frontend
                development is not only about implementing a finished design.
                Decisions about layout, hierarchy, reusable elements, and
                responsive behavior all affect how easily a product can be
                translated into code.
              </p>

              <p>
                That experience influenced how I approach later projects:
                thinking about the product and the implementation together
                instead of treating design and development as completely
                separate stages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Takeaway
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Learning to think about the product before thinking about the
            code.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Zeuty gave me experience working with an evolving product and
            thinking through how ideas become interfaces. It strengthened the
            product and design side of my frontend work and changed how I
            think about building user-facing software.
          </p>

          <div className="mt-9">
            <Link
              to="/#work"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              View other projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}