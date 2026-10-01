import { Link } from "react-router-dom";
import PageTitle from "../../components/layout/PageTitle";

const pipeline = [
  {
    number: "01",
    title: "Preprocess",
    detail: "Normalize, tokenize, build vocabulary, and prepare sequences.",
  },
  {
    number: "02",
    title: "Train",
    detail: "Train the Seq2Seq model on incorrect → corrected sentence pairs.",
  },
  {
    number: "03",
    title: "Compare",
    detail: "Evaluate attention, no-attention, and Gemini baselines.",
  },
  {
    number: "04",
    title: "Evaluate",
    detail: "Measure GLEU, exact match, runtime, and qualitative behavior.",
  },
];

const models = [
  {
    name: "LSTM + Attention",
    type: "Primary Model",
    description:
      "Bidirectional LSTM encoder, Bahdanau additive attention, and an LSTM decoder trained specifically for grammatical error correction.",
  },
  {
    name: "LSTM — No Attention",
    type: "Ablation",
    description:
      "A comparable Seq2Seq architecture without attention, used to investigate how attention changes model performance.",
  },
  {
    name: "Gemini Zero-Shot",
    type: "LLM Baseline",
    description:
      "Gemini receives the grammatical correction task and input sentence without example corrections.",
  },
  {
    name: "Gemini Few-Shot",
    type: "LLM Baseline",
    description:
      "Gemini receives the task along with example corrections before processing the test sentence.",
  },
];

const technologies = [
  "Python",
  "PyTorch",
  "BiLSTM",
  "Seq2Seq",
  "Bahdanau Attention",
  "Gemini",
];

export default function GECAI() {
  return (
    <main>
      <PageTitle title="Grammatical Error Correction AI | Khushi Patel" />
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
              AI • Machine Learning • NLP
            </span>

            <span className="text-zinc-700">/</span>

            <span className="text-sm text-zinc-500">
              3-Person Team Project
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Grammatical Error Correction AI
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-9 text-zinc-400">
            An experimental comparison of a task-specific neural
            sequence-to-sequence model and modern large language models for
            automatically correcting grammatical errors.
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
              href="https://github.com/jessicamisek23-ctrl/CP468-Project"
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

      {/* CONTRIBUTION */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-9 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Team
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              3 developers
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              My Focus
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Preprocessing • Training • Evaluation
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

      {/* PROBLEM */}
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
              How does a model trained for one task compare with a
              general-purpose LLM?
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              We approached grammatical error correction as a
              sequence-to-sequence problem: given an incorrect English
              sentence, generate its corrected version.
            </p>

            <p>
              Rather than only building a model, the project was structured
              as a comparison between a classical neural architecture trained
              specifically for the task and Gemini as a modern pretrained LLM
              baseline.
            </p>

            <p>
              The goal was to examine not only output quality, but also the
              different training requirements, runtime characteristics,
              failure modes, and engineering trade-offs between the two
              approaches.
            </p>
          </div>
        </div>
      </section>

      {/* EXAMPLE */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            The Task
          </p>

          <div className="mt-10 grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                Input
              </p>

              <p className="mt-5 text-xl text-zinc-300">
                She don&apos;t like apples.
              </p>
            </div>

            <div className="hidden text-2xl text-zinc-700 lg:block">
              →
            </div>

            <div className="rounded-3xl border border-sky-400/20 bg-sky-400/[0.04] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-400">
                Target
              </p>

              <p className="mt-5 text-xl text-white">
                She doesn&apos;t like apples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Data
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              50,000 sentence pairs.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              We used a reproducibly sampled subset of the C4_200M Synthetic
              Grammatical Error Correction dataset containing paired
              incorrect and corrected English sentences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <p className="text-4xl font-semibold text-white">40K</p>
              <p className="mt-2 text-sm text-zinc-500">
                Training
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <p className="text-4xl font-semibold text-white">5K</p>
              <p className="mt-2 text-sm text-zinc-500">
                Validation
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <p className="text-4xl font-semibold text-white">5K</p>
              <p className="mt-2 text-sm text-zinc-500">
                Test
              </p>
            </div>
          </div>
        </div>

        {/* PREPROCESSING */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                My Contribution
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                Preparing the data for training.
              </h3>
            </div>

            <div>
              <p className="leading-7 text-zinc-400">
                My work included preprocessing the sentence pairs and
                preparing the data pipeline used during training and
                evaluation.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Normalization",
                  "Tokenization",
                  "Vocabulary",
                  "Special Tokens",
                  "Sequence Handling",
                  "Batch Preparation",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Model Architecture
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bidirectional LSTM + attention.
            </h2>
          </div>

          <div className="mt-14 rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-9">
            <div className="grid gap-3 text-center md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-medium text-zinc-200">
                  Token Embedding
                </p>
                <p className="mt-1 text-xs text-zinc-600">256 dimensions</p>
              </div>

              <span className="hidden text-zinc-700 md:block">→</span>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-medium text-zinc-200">
                  BiLSTM Encoder
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  2 layers • 512 hidden
                </p>
              </div>

              <span className="hidden text-zinc-700 md:block">→</span>

              <div className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] p-5">
                <p className="text-sm font-medium text-white">
                  Attention
                </p>
                <p className="mt-1 text-xs text-sky-400">
                  Bahdanau additive
                </p>
              </div>

              <span className="hidden text-zinc-700 md:block">→</span>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-medium text-zinc-200">
                  LSTM Decoder
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Autoregressive output
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Vocabulary", "30,000"],
              ["Batch Size", "32"],
              ["Epochs", "20"],
              ["Teacher Forcing", "0.5"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-t border-white/10 pt-5"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                  {label}
                </p>
                <p className="mt-2 text-lg text-zinc-300">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Experiment Pipeline
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From raw sentences to model comparison.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {pipeline.map((step) => (
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
                {step.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Experimental Design
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Four approaches. One held-out test set.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              Each approach was evaluated against the same grammatical error
              correction task to make the comparison as consistent as
              possible.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {models.map((model) => (
              <article
                key={model.name}
                className="rounded-3xl border border-white/10 bg-zinc-950/50 p-7"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-sky-400">
                  {model.type}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {model.name}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {model.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVALUATION */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Evaluation
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              More than one metric.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "GLEU",
                text: "Primary automatic metric for evaluating grammatical corrections.",
              },
              {
                title: "Exact Match",
                text: "Measures how often generated output exactly matches the reference correction.",
              },
              {
                title: "Runtime",
                text: "Compares the inference characteristics of the trained model and API-based LLM.",
              },
              {
                title: "Error Analysis",
                text: "Examines model outputs and failure modes beyond aggregate scores.",
              },
            ].map((metric) => (
              <div
                key={metric.title}
                className="rounded-2xl border border-white/10 p-6"
              >
                <h3 className="font-semibold text-zinc-200">
                  {metric.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {metric.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MY ROLE */}
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                My Contribution
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Preprocessing, training, and evaluation.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                My primary responsibility was taking the project through the
                experimental pipeline: preparing the data, running model
                training, and evaluating the resulting systems.
              </p>

              <p>
                This gave me hands-on experience with the parts of machine
                learning that happen around the architecture itself — data
                preparation, controlled experiments, model behavior, and
                interpreting whether the results actually support a
                conclusion.
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
      Comparing model behavior.
    </h2>

    <p className="mt-5 leading-7 text-zinc-400">
      The systems were evaluated on the same held-out test set using
      GLEU and exact-match accuracy, alongside runtime and qualitative
      inspection of model outputs.
    </p>
  </div>

  {/* QUANTITATIVE RESULTS */}
  <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
    <div className="grid grid-cols-[1.5fr_1fr_1fr_1.3fr] border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.14em] text-zinc-600">
      <span>Model</span>
      <span>GLEU</span>
      <span>Exact Match</span>
      <span>Notes</span>
    </div>

    {[
      [
        "LSTM + Attention",
        "0.4014",
        "0.20%",
        "243.42s CPU",
      ],
      [
        "LSTM — No Attention",
        "N/A",
        "N/A",
        "Ablation did not complete",
      ],
      [
        "Gemini Zero-Shot",
        "Pending",
        "Pending",
        "Temperature 0.0",
      ],
      [
        "Gemini Few-Shot",
        "Pending",
        "Pending",
        "Four-example prompt",
      ],
    ].map(([model, gleu, exactMatch, notes]) => (
      <div
        key={model}
        className="grid grid-cols-[1.5fr_1fr_1fr_1.3fr] border-b border-white/10 px-6 py-5 text-sm last:border-b-0"
      >
        <span className="text-zinc-300">{model}</span>
        <span className="text-zinc-300">{gleu}</span>
        <span className="text-zinc-300">{exactMatch}</span>
        <span className="text-zinc-500">{notes}</span>
      </div>
    ))}
  </div>

  <p className="mt-4 text-xs leading-5 text-zinc-600">
    Results reflect the completed evaluation reported in the project.
    Gemini evaluation values were still pending in the final report.
  </p>

      {/* QUALITATIVE RESULTS */}
      <div className="mt-20 border-t border-white/10 pt-14">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Qualitative Evaluation
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Looking beyond aggregate scores.
          </h3>

          <p className="mt-5 leading-7 text-zinc-400">
            Individual examples revealed differences that are not fully
            captured by automatic metrics. We inspected whether each system
            preserved the intended meaning while correcting grammatical
            errors.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
              Example 01
            </p>

            <p className="mt-5 text-sm text-zinc-500">
              Incorrect
            </p>

            <p className="mt-2 text-zinc-300">
              I have celebrated a birthday .... the big 21!
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-600">
                  LSTM
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  I have a a birthday birthday ....
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-sky-400">
                  Gemini
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Celebrating a birthday .... the big 21!
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
              Example 02
            </p>

            <p className="mt-5 text-sm text-zinc-500">
              Incorrect
            </p>

            <p className="mt-2 text-zinc-300">
              ...substance requirements for our Clients
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-600">
                  LSTM
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  ...appropriate guesses requirements for our..
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-sky-400">
                  Gemini
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  ...substance requirements for our Clients.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

      {/* TAKEAWAY */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Takeaway
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Building the model was only part of the problem.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              This project gave me experience working through a complete
              machine-learning experiment — from preparing data and training
              a model to comparing different approaches and evaluating their
              trade-offs rather than judging them from a few successful
              examples.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://github.com/jessicamisek23-ctrl/CP468-Project"
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