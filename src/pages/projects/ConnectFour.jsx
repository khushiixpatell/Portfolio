import { Link } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";

const agents = [
  {
    number: "01",
    name: "Random Agent",
    label: "Baseline",
    description:
      "Selects randomly from the available legal moves, providing a simple baseline for comparing more intelligent strategies.",
  },
  {
    number: "02",
    name: "Rule-Based Agent",
    label: "Tactical",
    description:
      "Uses predefined tactical rules to identify immediate wins, block threats, and make stronger decisions than the random baseline.",
  },
  {
    number: "03",
    name: "Minimax Agent",
    label: "Search",
    description:
      "Uses depth-limited game-tree search and heuristic evaluation to reason about future board states before selecting a move.",
  },
];

const matchups = [
  {
    title: "Minimax vs Random",
    wins: 30,
    losses: 0,
    draws: 0,
    rate: "100%",
  },
  {
    title: "Rule-Based vs Random",
    wins: 29,
    losses: 1,
    draws: 0,
    rate: "96.7%",
  },
  {
    title: "Minimax vs Rule-Based",
    wins: 22,
    losses: 7,
    draws: 1,
    rate: "73.3%",
  },
];

const technologies = [
  "Python",
  "Minimax",
  "Game Trees",
  "Heuristic Evaluation",
  "Experimentation",
];

export default function ConnectFour() {
  return (
    <main>
      <PageTitle title="Connect Four AI | Khushi Patel" />
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
              AI • Algorithms • Game Search
            </span>

            <span className="text-zinc-700">/</span>

            <span className="text-sm text-zinc-500">
              Team Project
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Connect Four AI
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-400">
            An experimental game environment comparing random,
            rule-based, and Minimax agents through controlled
            AI-vs-AI competition.
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
              href="https://github.com/vanessapopa/CP468-Connect-Four-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              View GitHub ↗
            </a>

            <a
              href="#experiment"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              Explore experiment ↓
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-9 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              My Focus
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Testing • Evaluation • Analysis
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Experiment
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              30 games per matchup
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Course
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              CP468 — Artificial Intelligence
            </p>
          </div>
        </div>
      </section>

      {/* QUESTION */}
      <section
        id="experiment"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Question
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How much does strategy change performance?
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              Connect Four provides a controlled environment for comparing
              different approaches to decision-making. Each agent receives
              the same board and legal moves, but chooses its next action
              using a fundamentally different strategy.
            </p>

            <p>
              We compared a random baseline, a tactical rule-based agent,
              and a depth-limited Minimax agent to examine how increasingly
              sophisticated decision-making affected game performance.
            </p>

            <p>
              Rather than judging the agents from individual games, we ran
              repeated matchups and measured their performance across a
              reproducible experiment.
            </p>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              The Agents
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Three levels of decision-making.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {agents.map((agent) => (
              <article
                key={agent.number}
                className="rounded-3xl border border-white/10 bg-zinc-950/50 p-7"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-zinc-600">
                    {agent.number}
                  </p>

                  <p className="text-xs uppercase tracking-[0.16em] text-sky-400">
                    {agent.label}
                  </p>
                </div>

                <h3 className="mt-10 text-2xl font-semibold text-white">
                  {agent.name}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {agent.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MINIMAX */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Minimax
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Looking ahead before making a move.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Instead of reacting only to the current board, Minimax
              explores possible future moves and evaluates the resulting
              positions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9">
            <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] p-5 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-sky-400">
                Current State
              </p>
              <p className="mt-2 font-medium text-white">
                AI&apos;s Turn
              </p>
            </div>

            <div className="py-5 text-center text-zinc-700">
              ↓ Explore legal moves
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Move A", "-12"],
                ["Move B", "+31"],
                ["Move C", "+8"],
              ].map(([move, score]) => (
                <div
                  key={move}
                  className="rounded-xl border border-white/10 bg-zinc-950 p-5 text-center"
                >
                  <p className="text-sm text-zinc-400">{move}</p>
                  <p className="mt-2 font-mono text-lg text-zinc-200">
                    {score}
                  </p>
                </div>
              ))}
            </div>

            <div className="py-5 text-center text-zinc-700">
              ↓ Maximize score
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-950 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                Selected
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                Move B
              </p>
            </div>

            <p className="mt-5 text-center text-xs text-zinc-600">
              Simplified illustration of the search process
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIMENT */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Experiment Design
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Repeated games instead of anecdotes.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Each agent pairing played 30 games, with the starting player
              alternating to reduce first-move bias. A fixed random seed
              made the experiment reproducible.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-7">
              <p className="text-4xl font-semibold text-white">30</p>
              <p className="mt-2 text-sm text-zinc-500">
                Games per pairing
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-7">
              <p className="text-4xl font-semibold text-white">468</p>
              <p className="mt-2 text-sm text-zinc-500">
                Fixed random seed
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-7">
              <p className="text-4xl font-semibold text-white">4</p>
              <p className="mt-2 text-sm text-zinc-500">
                Default Minimax depth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Results
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Smarter agents won more consistently.
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            The controlled matchups produced a clear separation between the
            three strategies.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {matchups.map((matchup) => (
            <article
              key={matchup.title}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {matchup.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    30-game matchup
                  </p>
                </div>

                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {matchup.wins}
                    </p>
                    <p className="text-xs text-zinc-600">Wins</p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-zinc-400">
                      {matchup.losses}
                    </p>
                    <p className="text-xs text-zinc-600">Losses</p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold text-zinc-400">
                      {matchup.draws}
                    </p>
                    <p className="text-xs text-zinc-600">Draws</p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-zinc-600">Win rate</span>
                  <span className="text-zinc-400">{matchup.rate}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-sky-400"
                    style={{ width: matchup.rate }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-zinc-600">
          Results shown from the project&apos;s 30-game experimental
          matchups.
        </p>
      </section>

      {/* INTERPRETATION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                What We Learned
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Strategy mattered — but evaluation mattered too.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                The random agent provided an intentionally weak baseline,
                while tactical rules produced a major improvement by
                recognizing immediate opportunities and threats.
              </p>

              <p>
                Minimax performed strongest overall because it could reason
                beyond the immediate move and evaluate possible future game
                states.
              </p>

              <p>
                Running repeated experiments also showed why evaluating an
                AI system across many trials is more useful than judging its
                intelligence from a handful of individual examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MY CONTRIBUTION */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              My Contribution
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Testing, evaluation, and analysis.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              My primary contribution to the original team project was
              testing the system, evaluating agent performance, and working
              on the analysis and final report.
            </p>

            <p>
              I also contributed to portions of the implementation, but I
              keep the portfolio focused on the areas I can clearly
              attribute to my own work.
            </p>
          </div>
        </div>
      </section>

      {/* FUTURE INTERACTIVE EXTENSION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-3xl border border-sky-400/20 bg-sky-400/[0.035] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Individual Extension
            </p>

            <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Next: make the experiment playable.
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                  I&apos;m extending the original project into an
                  interactive portfolio experience where visitors can play
                  against the agents, adjust Minimax search depth, and
                  inspect how the AI evaluates possible moves.
                </p>
              </div>

              <div className="lg:text-right">
                <span className="inline-flex rounded-full border border-sky-400/20 px-4 py-2 text-sm text-sky-300">
                  Interactive version planned
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* END */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Takeaway
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              A simple game became a controlled environment for studying AI
              decision-making.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              The project gave me experience thinking about AI not only as
              an algorithm, but as a system that needs baselines,
              reproducible testing, quantitative evaluation, and careful
              interpretation of results.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://github.com/vanessapopa/CP468-Connect-Four-AI"
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