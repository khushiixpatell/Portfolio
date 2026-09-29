import { Link } from "react-router-dom";

export default function GenericProjectPage({ project }) {
  const hasProblemSolution =
    project.problem || project.solution;

  const hasResponsibilities =
    project.responsibilities?.length > 0;

  const hasHighlights =
    project.highlights?.length > 0;

  const hasLearnings =
    project.learnings?.length > 0;

  const hasScreenshots =
    project.screenshots?.length > 0;

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
        <div className="max-w-4xl">
          <Link
            to="/#work"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to projects
          </Link>

          <p className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            {project.categoryLabel}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <ExternalLink href={project.githubUrl}>
                View GitHub
              </ExternalLink>
            )}

            {project.liveUrl && (
              <ExternalLink
                href={project.liveUrl}
                secondary
              >
                Live Demo
              </ExternalLink>
            )}
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <InfoBlock
            label="Project Type"
            value={project.type}
          />

          <InfoBlock
            label="Status"
            value={project.status}
          />

          <InfoBlock
            label="Contribution"
            value={project.contribution || "—"}
          />

          <InfoBlock
            label="Category"
            value={project.categoryLabel}
          />
        </div>
      </section>

      {/* OVERVIEW */}
      {project.overview && (
        <CaseStudySection
          eyebrow="Overview"
          title="About the project"
        >
          <LargeText>
            {project.overview}
          </LargeText>
        </CaseStudySection>
      )}

      {/* PROBLEM + SOLUTION */}
      {hasProblemSolution && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Approach"
            title="From problem to solution."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {project.problem && (
              <ContentCard
                number="01"
                title="The Problem"
              >
                {project.problem}
              </ContentCard>
            )}

            {project.solution && (
              <ContentCard
                number="02"
                title="The Solution"
              >
                {project.solution}
              </ContentCard>
            )}
          </div>
        </section>
      )}

      {/* MAIN IMAGE */}
      {project.imageUrl && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <ProjectImage
            src={project.imageUrl}
            alt={`${project.title} interface`}
          />
        </section>
      )}

      {/* RESPONSIBILITIES */}
      {hasResponsibilities && (
        <CaseStudySection
          eyebrow="My Role"
          title="What I worked on."
        >
          <NumberedList
            items={project.responsibilities}
          />
        </CaseStudySection>
      )}

      {/* CHALLENGES */}
      {project.challenges && (
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                Challenges
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Problems worth solving.
              </h2>
            </div>

            <LargeText>
              {project.challenges}
            </LargeText>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {hasHighlights && (
        <CaseStudySection
          eyebrow="Highlights"
          title="Key project highlights."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {project.highlights.map(
              (highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <span className="text-xs font-medium text-sky-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 leading-7 text-zinc-300">
                    {highlight}
                  </p>
                </div>
              )
            )}
          </div>
        </CaseStudySection>
      )}

      {/* SCREENSHOTS */}
      {hasScreenshots && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Interface"
            title="A closer look."
          />

          <div className="mt-10 grid gap-6">
            {project.screenshots.map(
              (screenshot, index) => (
                <ProjectImage
                  key={`${screenshot}-${index}`}
                  src={screenshot}
                  alt={`${project.title} screenshot ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* RESULTS */}
      {project.results && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-sky-400/20 bg-sky-400/[0.04] p-8 sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Results
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              The outcome.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              {project.results}
            </p>
          </div>
        </section>
      )}

      {/* LEARNINGS */}
      {hasLearnings && (
        <CaseStudySection
          eyebrow="Reflection"
          title="What I learned."
        >
          <NumberedList items={project.learnings} />
        </CaseStudySection>
      )}

      {/* TECH STACK */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="border-t border-white/10 pt-16">
          <SectionHeading
            eyebrow="Technology"
            title="Built with."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {project.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-sm text-sky-400">
              Explore more
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              See my other projects.
            </h2>
          </div>

          <Link
            to="/#work"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            View all projects
          </Link>
        </div>
      </section>
    </main>
  );
}

function CaseStudySection({
  eyebrow,
  title,
  children,
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
        />

        <div>{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

function LargeText({ children }) {
  return (
    <p className="text-lg leading-8 text-zinc-400">
      {children}
    </p>
  );
}

function ContentCard({
  number,
  title,
  children,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
      <span className="text-xs font-medium text-sky-400">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-400">
        {children}
      </p>
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5"
        >
          <span className="shrink-0 text-xs font-medium text-sky-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <p className="leading-6 text-zinc-300">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectImage({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {value}
      </p>
    </div>
  );
}

function ExternalLink({
  href,
  children,
  secondary = false,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        secondary
          ? "rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:text-white"
          : "rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
      }
    >
      {children}
    </a>
  );
}