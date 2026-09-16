import { Link } from "react-router-dom";
import TechBadge from "./TechBadge";

export default function ProjectCard({ project, index }) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="
        group relative flex h-full flex-col
        rounded-3xl border border-white/10
        bg-white/[0.03] p-7
        transition duration-300
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.05]
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-6">
        <span className="font-mono text-xs text-zinc-600">
          {projectNumber}
        </span>

        <span className="text-right text-xs font-medium uppercase tracking-[0.16em] text-sky-400">
          {project.categoryLabel}
        </span>
      </div>

      {/* Main content */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-sky-300">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-zinc-400">
          {project.description}
        </p>
      </div>

      {/* Project context */}
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">
          {project.type}
        </p>

        {project.contribution && (
          <div className="mt-3">
            <p className="text-xs text-zinc-500">
              My focus
            </p>

            <p className="mt-1 text-sm text-zinc-300">
              {project.contribution}
            </p>
          </div>
        )}
      </div>

      {/* Technologies */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <TechBadge key={technology}>
            {technology}
          </TechBadge>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-xs text-zinc-500">
            {project.status}
          </span>

          <span className="text-sm text-zinc-300 transition group-hover:translate-x-1 group-hover:text-white">
            Explore project →
          </span>
        </div>
      </div>
    </Link>
  );
}