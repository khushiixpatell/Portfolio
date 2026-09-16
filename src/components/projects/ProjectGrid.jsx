import { useEffect, useMemo, useState } from "react";

import { getProjects } from "../../services/api";
import ProjectCard from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        const data = await getProjects();

        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const sortedProjects = [...projects].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );

    if (activeCategory === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((project) =>
      project.categories.includes(activeCategory)
    );
  }, [projects, activeCategory]);

  return (
    <section
      id="work"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      {/* Section heading */}
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
          Selected Work
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Projects across the stack.
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Explore my work across full-stack development,
          frontend engineering, and artificial intelligence.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <ProjectFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-8 text-sm text-zinc-500">
          Loading projects...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="mt-8 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Projects */}
      {!loading && !error && (
        <>
          {/* Project count */}
          <p className="mt-8 text-sm text-zinc-500">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? "project"
              : "projects"}
          </p>

          {/* Cards */}
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}