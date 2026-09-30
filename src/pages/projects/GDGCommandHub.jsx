import { Link } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";

const features = [
  {
    number: "01",
    title: "Event Management",
    description:
      "Centralizes event information and planning so upcoming initiatives, details, and chapter activity can be managed from one shared workspace.",
  },
  {
    number: "02",
    title: "Team Coordination",
    description:
      "Designed as a shared workspace for the GDG executive team, giving members access to the information and workflows they need to coordinate chapter operations.",
  },
  {
    number: "03",
    title: "AI-Assisted Workflows",
    description:
      "Integrates Gemini into recurring chapter workflows to help generate proposals, communications, sponsorship material, updates, and other administrative content.",
  },
  {
    number: "04",
    title: "Centralized Data",
    description:
      "Brings organizational information into one system so chapter data can be created, accessed, and managed without relying on scattered tools and documents.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Firebase",
  "Gemini API",
];

export default function GDGCommandHub() {
  return (
    <main>
      <PageTitle title="GDG Command Hub | Khushi Patel" />
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <Link
          to="/#work"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to work
        </Link>

        <div className="mt-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Full-Stack • AI
            </span>

            <span className="text-zinc-700">/</span>

            <span className="text-sm text-zinc-500">
              Individual Project
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            GDG Command Hub
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-400">
            An internal operations platform built to centralize event
            planning, team coordination, and AI-assisted workflows for
            Google Developer Groups on Campus Laurier.
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

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://github.com/khushiixpatell/GDG-command-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              View GitHub ↗
            </a>

            <a
              href="#case-study"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              Explore case study ↓
            </a>
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Role
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Designer & Developer
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Built For
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              GDG on Campus Laurier
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Focus
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Operations • Automation • AI
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section
        id="case-study"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Problem
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Running a developer community creates a lot of work outside
              the events themselves.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              As President of GDG on Campus Laurier, I work with a
              six-person executive team to organize technical workshops,
              events, hackathons, collaborations, and other chapter
              initiatives.
            </p>

            <p>
              Behind those events are repetitive operational tasks:
              preparing proposals, drafting communications, coordinating
              information, working on sponsorship outreach, and keeping
              the team updated.
            </p>

            <p>
              I started Command Hub to bring those workflows together in
              one place and reduce the amount of repetitive administrative
              work required to run the chapter.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Solution
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One workspace for chapter operations.
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Command Hub combines operational tools with AI-assisted
              workflows to create a central workspace for managing the
              recurring work behind GDG Laurier.
            </p>
          </div>

          <div className="mt-16 grid gap-x-10 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="border-t border-white/10 py-9"
              >
                <p className="font-mono text-xs text-zinc-600">
                  {feature.number}
                </p>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 max-w-xl leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Architecture
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built across the stack.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              The application separates the user experience, application
              logic, persistent organizational data, and generative AI
              functionality while keeping them connected through a single
              product experience.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                Users
              </p>

              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-300">
                GDG Executive Team
              </div>
            </div>

            <div className="py-4 text-center text-zinc-700">↓</div>

            <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] px-5 py-5 text-center">
              <p className="font-medium text-white">
                Command Hub
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                React + TypeScript
              </p>
            </div>

            <div className="py-4 text-center text-zinc-700">↓</div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
                <p className="font-medium text-zinc-200">
                  Application Layer
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Node.js + Express
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
                <p className="font-medium text-zinc-200">
                  AI Workflows
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Gemini API
                </p>
              </div>
            </div>

            <div className="py-4 text-center text-zinc-700">↓</div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
              <p className="font-medium text-zinc-200">
                Persistent Data
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Firebase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                AI Integration
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                AI where it removes repetitive work.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                Rather than making AI the product itself, I integrated
                Gemini into workflows where generative assistance can save
                time during chapter operations.
              </p>

              <p>
                The platform supports tasks such as drafting event
                proposals, communications, sponsorship outreach, updates,
                and other recurring written material while keeping the
                executive team in control of the final output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS PLACEHOLDER */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Product
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Inside Command Hub.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            A centralized interface designed around the workflows involved
            in managing GDG Laurier.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
            <p className="text-sm text-zinc-600">
              Dashboard screenshot
            </p>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
            <p className="text-sm text-zinc-600">
              Event management screenshot
            </p>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
            <p className="text-sm text-zinc-600">
              AI workflow screenshot
            </p>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
            <p className="text-sm text-zinc-600">
              Team workspace screenshot
            </p>
          </div>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Why this project matters to me
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              I wasn&apos;t looking for a portfolio project. I was trying
              to solve a problem I was experiencing.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Command Hub gave me the opportunity to take a problem from my
              own experience, design a product around it, and work across
              the frontend, backend, data, and AI layers needed to turn the
              idea into a usable system.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://github.com/khushiixpatell/GDG-command-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                View source code ↗
              </a>

              <Link
                to="/#work"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                View other projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}