import { Link } from "react-router-dom";

const technologies = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "REST APIs",
  "Edamam API",
];

const features = [
  {
    number: "01",
    title: "Dietary Profiles",
    description:
      "Allows users to account for dietary restrictions and preferences when searching for suitable food options.",
  },
  {
    number: "02",
    title: "Recipe Discovery",
    description:
      "Connects the application to external food data to surface recipes that match a user's dietary needs.",
  },
  {
    number: "03",
    title: "Application Integration",
    description:
      "Connects the user-facing application with backend services so data can move between the interface, server, and external APIs.",
  },
  {
    number: "04",
    title: "Persistent Data",
    description:
      "Uses database-backed application data to support a more complete experience than a static frontend.",
  },
];

export default function BiteWise() {
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
              Full-Stack • Frontend
            </span>

            <span className="text-zinc-700">/</span>

            <span className="text-sm text-zinc-500">
              5-Person Team Project
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            BiteWise
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-400">
            An inclusive food discovery application designed to help people
            with dietary restrictions find meals that better fit their
            individual needs.
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
              href="#case-study"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Explore case study ↓
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-9 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Team
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              5 developers
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              My Focus
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              Application Development • Backend Integration
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Type
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              Full-Stack Web Application
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
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
              Finding food gets harder when one filter isn&apos;t enough.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              Food discovery applications often work well for broad searches,
              but choosing meals becomes more difficult when a user has
              multiple dietary restrictions or preferences to consider at
              once.
            </p>

            <p>
              BiteWise was designed around making those constraints part of
              the discovery experience rather than forcing users to manually
              inspect every option themselves.
            </p>

            <p>
              Our team built the project as a full-stack application,
              combining a user-facing interface, backend services, persistent
              application data, and external recipe information.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Product
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Food discovery built around the user.
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              BiteWise brings dietary information and food discovery together
              in a single application, allowing the interface and backend to
              work together to surface more relevant options.
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
              Connecting the interface to the data behind it.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              The application combines a React frontend with backend services,
              database storage, and external recipe data.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            {/* USER */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                User
              </p>

              <p className="mt-2 font-medium text-zinc-200">
                Dietary Needs + Search
              </p>
            </div>

            <div className="py-4 text-center text-zinc-700">
              ↓
            </div>

            {/* FRONTEND */}
            <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] px-5 py-5 text-center">
              <p className="font-medium text-white">
                React Application
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                User Interface
              </p>
            </div>

            <div className="py-4 text-center text-zinc-700">
              ↓
            </div>

            {/* BACKEND */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
              <p className="font-medium text-zinc-200">
                Node.js + Express
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Application Logic + API Layer
              </p>
            </div>

            <div className="py-4 text-center text-zinc-700">
              ↓
            </div>

            {/* DATA */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
                <p className="font-medium text-zinc-200">
                  MongoDB
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Application Data
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center">
                <p className="font-medium text-zinc-200">
                  Edamam
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Recipe Data API
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY CONTRIBUTION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                My Contribution
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Making the application work with the backend.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                My primary responsibility was application development and
                connecting the user-facing experience to the backend built by
                the team.
              </p>

              <p>
                That meant working across the boundary between frontend and
                backend rather than treating the interface as an isolated
                design. The application needed to request data, work with the
                responses it received, and turn that information into a usable
                experience for the user.
              </p>

              <p>
                Working on that integration helped me better understand how
                different layers of a web application communicate and how
                frontend decisions are affected by the APIs and data available
                behind them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST FLOW */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Application Flow
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From user input to useful output.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {[
            {
              number: "01",
              title: "User Input",
              text: "The user provides dietary information or begins a food search.",
            },
            {
              number: "02",
              title: "Request",
              text: "The frontend sends the relevant request to the application backend.",
            },
            {
              number: "03",
              title: "Data",
              text: "Backend services work with application and external recipe data.",
            },
            {
              number: "04",
              title: "Display",
              text: "The frontend turns the response into information the user can explore.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6"
            >
              <p className="font-mono text-xs text-sky-400">
                {step.number}
              </p>

              <h3 className="mt-7 text-lg font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PRODUCT SCREENSHOTS */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Product
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The BiteWise experience.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              The original application combined dietary setup, discovery,
              and recipe information into one user experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-zinc-950">
              <p className="text-sm text-zinc-600">
                BiteWise screenshot
              </p>
            </div>

            <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-white/15 bg-zinc-950">
              <p className="text-sm text-zinc-600">
                Recipe discovery screenshot
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-5 text-zinc-600">
            The original hosted integration is no longer active because the
            external recipe API used by the project is no longer maintained
            under the team&apos;s subscription.
          </p>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Takeaway
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            My first real look at the seams between frontend and backend.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            BiteWise helped move my understanding of web development beyond
            building interfaces. Working with the backend forced me to think
            about requests, responses, data structures, external services,
            and how all of those pieces affect the experience presented to
            the user.
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