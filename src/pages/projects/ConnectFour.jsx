import { Link } from "react-router-dom";
import { useState } from "react";
import PageTitle from "../../components/layout/PageTitle";

import {
  createBoard,
  applyMove,
  isTerminal,
  winner,
  getAgentMove,
  PLAYER1,
  PLAYER2,
} from "../../utils/connectFourAI";

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
  const [agentA, setAgentA] = useState("Random");
  const [agentB, setAgentB] = useState("Minimax");

  const [games, setGames] = useState(30);
  const [depth, setDepth] = useState(4);

  const [running, setRunning] = useState(false);
  const [currentGame, setCurrentGame] = useState(0);
  const [board, setBoard] = useState(createBoard());

  const [results, setResults] = useState(null);

  async function runExperiment() {
    if (running) return;

    setRunning(true);
    setResults(null);
    setCurrentGame(0);
    setBoard(createBoard());

    let winsA = 0;
    let winsB = 0;
    let draws = 0;

    let totalTimeA = 0;
    let totalTimeB = 0;

    const totalGames = Math.max(
      1,
      Math.min(Number(games), 100)
    );

    const minimaxDepth = Math.max(
      1,
      Math.min(Number(depth), 6)
    );

    for (let gameIndex = 0; gameIndex < totalGames; gameIndex++) {
      let gameBoard = createBoard();

      // Match the original experiment:
      // alternate which agent moves first.
      const aFirst = gameIndex % 2 === 0;

      const player1Agent = aFirst ? agentA : agentB;
      const player2Agent = aFirst ? agentB : agentA;

      let currentPlayer = PLAYER1;

      let timeA = 0;
      let timeB = 0;

      while (!isTerminal(gameBoard)) {
        const currentAgent =
          currentPlayer === PLAYER1
            ? player1Agent
            : player2Agent;

        const start = performance.now();

        const move = getAgentMove(
          currentAgent,
          gameBoard,
          currentPlayer,
          minimaxDepth
        );

        const elapsed =
          performance.now() - start;

        if (currentAgent === agentA) {
          timeA += elapsed;
        } else {
          timeB += elapsed;
        }

        if (move === null || move === undefined) {
          break;
        }

        gameBoard = applyMove(
          gameBoard,
          move,
          currentPlayer
        );

        currentPlayer =
          currentPlayer === PLAYER1
            ? PLAYER2
            : PLAYER1;

        setBoard(gameBoard);

        // Give the browser a chance to paint
        // the board between moves.
        await new Promise((resolve) =>
          setTimeout(resolve, 45)
        );
      }

      const gameWinner = winner(gameBoard);

      if (gameWinner === null) {
        draws++;
      } else {
        const winnerWasA =
          (gameWinner === PLAYER1 && aFirst) ||
          (gameWinner === PLAYER2 && !aFirst);

        if (winnerWasA) {
          winsA++;
        } else {
          winsB++;
        }
      }

      totalTimeA += timeA;
      totalTimeB += timeB;

      setCurrentGame(gameIndex + 1);

      await new Promise((resolve) =>
        setTimeout(resolve, 120)
      );
    }

    setResults({
      winsA,
      winsB,
      draws,
      winRateA: ((winsA / totalGames) * 100).toFixed(1),
      winRateB: ((winsB / totalGames) * 100).toFixed(1),
      avgTimeA: (totalTimeA / totalGames).toFixed(2),
      avgTimeB: (totalTimeB / totalGames).toFixed(2),
      totalGames,
    });

    setRunning(false);
  }

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

      {/* INTERACTIVE EXPERIMENT */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Interactive AI Experiment
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Re-run the experiment yourself.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Choose two agents and watch them compete across repeated
              Connect Four games. The experiment alternates which agent
              moves first, just like the original evaluation.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="mt-12 grid gap-5 rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                Agent A
              </span>

              <select
                value={agentA}
                onChange={(event) => setAgentA(event.target.value)}
                disabled={running}
                className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-sky-400/40 disabled:opacity-50"
              >
                <option>Random</option>
                <option>Rule-Based</option>
                <option>Minimax</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                Agent B
              </span>

              <select
                value={agentB}
                onChange={(event) => setAgentB(event.target.value)}
                disabled={running}
                className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-sky-400/40 disabled:opacity-50"
              >
                <option>Random</option>
                <option>Rule-Based</option>
                <option>Minimax</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                Games
              </span>

              <input
                type="number"
                min="1"
                max="100"
                value={games}
                onChange={(event) => setGames(event.target.value)}
                disabled={running}
                className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-sky-400/40 disabled:opacity-50"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                Minimax Depth
              </span>

              <select
                value={depth}
                onChange={(event) => setDepth(Number(event.target.value))}
                disabled={running}
                className="mt-3 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-sky-400/40 disabled:opacity-50"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={runExperiment}
              disabled={running}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {running ? "Running experiment..." : "Run experiment"}
            </button>

            {running && (
              <p className="text-sm text-zinc-500">
                Game {currentGame} / {games}
              </p>
            )}
          </div>

          {/* LIVE BOARD */}
          {(running || results) && (
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="rounded-3xl border border-white/10 bg-zinc-950 p-5 sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                      Live Match
                    </p>

                    <p className="text-xs text-zinc-600">
                      {currentGame} / {games}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 rounded-2xl bg-zinc-900 p-2 sm:gap-2 sm:p-3">
                    {board.flatMap((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="flex aspect-square items-center justify-center rounded-full bg-zinc-800"
                        >
                          <div
                            className={`h-[72%] w-[72%] rounded-full transition ${
                              cell === PLAYER1
                                ? "bg-sky-400"
                                : cell === PLAYER2
                                  ? "bg-zinc-300"
                                  : "bg-zinc-950"
                            }`}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* RESULTS */}
              <div>
                {results ? (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9">
                    <p className="text-xs uppercase tracking-[0.16em] text-sky-400">
                      Experiment Complete
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {agentA} vs {agentB}
                    </h3>

                    <div className="mt-8 grid gap-5 sm:grid-cols-3">
                      <div>
                        <p className="text-3xl font-semibold text-white">
                          {results.winsA}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-600">
                          {agentA} wins
                        </p>
                      </div>

                      <div>
                        <p className="text-3xl font-semibold text-white">
                          {results.winsB}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-600">
                          {agentB} wins
                        </p>
                      </div>

                      <div>
                        <p className="text-3xl font-semibold text-white">
                          {results.draws}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-600">
                          Draws
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 space-y-5">
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">
                            {agentA} win rate
                          </span>

                          <span className="text-zinc-300">
                            {results.winRateA}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-sky-400"
                            style={{
                              width: `${results.winRateA}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">
                            {agentB} win rate
                          </span>

                          <span className="text-zinc-300">
                            {results.winRateB}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-zinc-400"
                            style={{
                              width: `${results.winRateB}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-zinc-600">
                          Avg decision time
                        </p>

                        <p className="mt-2 text-sm text-zinc-300">
                          {agentA}: {results.avgTimeA} ms/game
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {agentB}: {results.avgTimeB} ms/game
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-zinc-600">
                          Experiment
                        </p>

                        <p className="mt-2 text-sm text-zinc-300">
                          {results.totalGames} games
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          First player alternated
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
                        Waiting
                      </p>

                      <p className="mt-3 text-lg text-zinc-400">
                        Run the experiment to see the agents compete.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <p className="mt-6 max-w-3xl text-xs leading-5 text-zinc-600">
            This interactive reproduction runs the same three agent strategies
            described in the original project. Its results are newly generated
            in the browser and are separate from the original 30-game results
            shown above.
          </p>
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
