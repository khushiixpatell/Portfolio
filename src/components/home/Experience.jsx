import { Link } from "react-router-dom";
import { experiences } from "../../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Beyond the classroom.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            Experience building products, leading technical communities,
            and turning ideas into working software.
          </p>
        </div>

        <div className="mt-14">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[180px_1fr]"
            >
              {/* Date */}
              <div>
                <p className="font-mono text-xs text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                  {experience.date}
                </p>
              </div>

              {/* Experience */}
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-white">
                  {experience.role}
                </h3>

                <p className="mt-1 text-sm text-sky-400">
                  {experience.organization}
                </p>

                <p className="mt-5 leading-7 text-zinc-400">
                  {experience.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {experience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-zinc-400"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-600" />

                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {experience.project && (
                  <Link
                    to={experience.project.route}
                    className="mt-7 inline-block text-sm text-zinc-300 transition hover:text-white"
                  >
                    {experience.project.label} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}