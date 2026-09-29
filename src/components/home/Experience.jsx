import { useEffect, useState } from "react";
import { getExperiences } from "../../services/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExperiences() {
      try {
        setLoading(true);
        setError("");

        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error(
          "Unable to load experience:",
          error
        );

        setError("Unable to load experience.");
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

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

        {loading && (
          <p className="mt-14 text-sm text-zinc-500">
            Loading experience...
          </p>
        )}

        {error && (
          <p className="mt-14 text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && experiences.length > 0 && (
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
                    {experience.startDate} —{" "}
                    {experience.endDate}
                  </p>

                  {experience.location && (
                    <p className="mt-2 text-xs text-zinc-600">
                      {experience.location}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-semibold text-white">
                    {experience.role}
                  </h3>

                  {experience.companyUrl ? (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm text-sky-400 transition hover:text-sky-300"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-sky-400">
                      {experience.company}
                    </p>
                  )}

                  <p className="mt-5 leading-7 text-zinc-400">
                    {experience.description}
                  </p>

                  {experience.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {experience.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          experiences.length === 0 && (
            <p className="mt-14 text-sm text-zinc-500">
              Experience coming soon.
            </p>
          )}
      </div>
    </section>
  );
}