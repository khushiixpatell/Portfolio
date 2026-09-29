import { useEffect, useState } from "react";

import {
  deleteAdminExperience,
  getAdminExperiences,
  updateAdminExperience,
} from "../../services/api";

import ExperienceEditor from "./ExperienceEditor";

export default function ExperienceManager() {
  const [experiences, setExperiences] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingExperience, setEditingExperience] =
    useState(null);

  const [updatingId, setUpdatingId] =
    useState(null);

  async function loadExperiences() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminExperiences();

      setExperiences(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Unable to load experience."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function handleAdd() {
    setEditingExperience(null);
    setEditorOpen(true);
  }

  function handleEdit(experience) {
    setEditingExperience(experience);
    setEditorOpen(true);
  }

  function handleCancel() {
    setEditingExperience(null);
    setEditorOpen(false);
  }

  function handleSaved(savedExperience) {
    setExperiences((current) => {
      const exists = current.some(
        (experience) =>
          experience.id === savedExperience.id
      );

      if (exists) {
        return current.map((experience) =>
          experience.id === savedExperience.id
            ? savedExperience
            : experience
        );
      }

      return [
        ...current,
        savedExperience,
      ].sort(
        (a, b) =>
          a.displayOrder - b.displayOrder
      );
    });

    handleCancel();
  }

  async function handleToggle(experience) {
    try {
      setUpdatingId(experience.id);

      const updated =
        await updateAdminExperience(
          experience.id,
          {
            visible: !experience.visible,
          }
        );

      setExperiences((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(experience) {
    const confirmed = window.confirm(
      `Delete ${experience.role} at ${experience.company}?`
    );

    if (!confirmed) return;

    try {
      await deleteAdminExperience(
        experience.id
      );

      setExperiences((current) =>
        current.filter(
          (item) =>
            item.id !== experience.id
        )
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  if (editorOpen) {
    return (
      <ExperienceEditor
        experience={editingExperience}
        onSaved={handleSaved}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Experience
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Work experience
          </h2>

          <p className="mt-3 text-zinc-500">
            Manage the experience shown on your
            portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
        >
          + Add Experience
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {loading && (
        <p className="mt-8 text-sm text-zinc-500">
          Loading experience...
        </p>
      )}

      {!loading &&
        experiences.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <p className="text-zinc-400">
              No experience added yet.
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-4 text-sm text-sky-400 transition hover:text-sky-300"
            >
              Add your first experience →
            </button>
          </div>
        )}

      {!loading &&
        experiences.length > 0 && (
          <div className="mt-8 space-y-4">
            {experiences.map(
              (experience) => (
                <article
                  key={experience.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm text-sky-400">
                        {experience.startDate} —{" "}
                        {experience.endDate}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {experience.role}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {experience.company}

                        {experience.location &&
                          ` · ${experience.location}`}
                      </p>

                      <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-500">
                        {experience.description}
                      </p>

                      {experience.technologies
                        ?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.technologies.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400"
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={
                          updatingId ===
                          experience.id
                        }
                        onClick={() =>
                          handleToggle(
                            experience
                          )
                        }
                        className={
                          experience.visible
                            ? "rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400"
                            : "rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-500"
                        }
                      >
                        {experience.visible
                          ? "Visible"
                          : "Hidden"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            experience
                          )
                        }
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            experience
                          )
                        }
                        className="rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
    </section>
  );
}