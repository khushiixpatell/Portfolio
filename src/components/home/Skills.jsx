import { skillGroups } from "../../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-white/10 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I work with.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
            My experience spans application development, backend systems,
            and artificial intelligence.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-5 py-7 md:grid-cols-[220px_1fr]"
            >
              <h3 className="text-sm font-medium text-zinc-300">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-zinc-500 transition hover:text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}