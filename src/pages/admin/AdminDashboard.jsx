import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProjectDialog from "../../components/admin/DeleteProjectDialog";


import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  deleteAdminProject,
  getAdminProjects,
  updateAdminProject,
  reorderAdminProjects,
} from "../../services/api";

import ProjectEditor from "../../components/admin/ProjectEditor";
import SortableProject from "../../components/admin/SortableProject";
import ExperienceManager from "../../components/admin/ExperienceManager";
import SkillsManager from "../../components/admin/SkillsManager";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [activeSection, setActiveSection] = useState("projects");

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 6,
    },
  }),

  useSensor(KeyboardSensor, {
    coordinateGetter:
      sortableKeyboardCoordinates,
  })
);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load admin projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(project, field) {
    try {
      setUpdatingId(project.id);
      setError("");

      const updatedProject = await updateAdminProject(
        project.id,
        {
          [field]: !project[field],
        }
      );

      setProjects((currentProjects) =>
        currentProjects.map((item) =>
          item.id === updatedProject.id
            ? updatedProject
            : item
        )
      );
    } catch (err) {
      console.error("Failed to update project:", err);
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  function handleAddProject() {
  setEditingProject(null);
  setEditorOpen(true);
}

function handleEditProject(project) {
  setEditingProject(project);
  setEditorOpen(true);
}

function handleCloseEditor() {
  setEditorOpen(false);
  setEditingProject(null);
}

function handleProjectSaved(savedProject) {
  setProjects((currentProjects) => {
    const exists = currentProjects.some(
      (project) => project.id === savedProject.id
    );

    const updatedProjects = exists
      ? currentProjects.map((project) =>
          project.id === savedProject.id
            ? savedProject
            : project
        )
      : [...currentProjects, savedProject];

    return updatedProjects.sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  });

  handleCloseEditor();
}

  function handleDeleteClick(project) {
  setDeleteTarget(project);
  setDeleteError("");
}

function handleCancelDelete() {
  if (deleting) {
    return;
  }

  setDeleteTarget(null);
  setDeleteError("");
}

async function handleDragEnd(event) {
  const { active, over } = event;

  if (!over || active.id === over.id) {
    return;
  }

  const oldIndex = projects.findIndex(
    (project) => project.id === active.id
  );

  const newIndex = projects.findIndex(
    (project) => project.id === over.id
  );

  if (oldIndex === -1 || newIndex === -1) {
    return;
  }

  const previousProjects = projects;

  const reorderedProjects = arrayMove(
    projects,
    oldIndex,
    newIndex
  ).map((project, index) => ({
    ...project,
    displayOrder: index + 1,
  }));

  // Update the interface immediately.
  setProjects(reorderedProjects);

  try {
    const savedProjects =
      await reorderAdminProjects(
        reorderedProjects.map((project) => ({
          id: project.id,
          displayOrder:
            project.displayOrder,
        }))
      );

    setProjects(savedProjects);
  } catch (error) {
    console.error(
      "Unable to reorder projects:",
      error
    );

    // Restore old order if database update fails.
    setProjects(previousProjects);

    setError(
      "Unable to save the new project order."
    );
  }
}

async function handleConfirmDelete() {
  if (!deleteTarget) {
    return;
  }

  try {
    setDeleting(true);
    setDeleteError("");

    await deleteAdminProject(deleteTarget.id);

    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);
  } catch (err) {
    console.error("Failed to delete project:", err);
    setDeleteError(err.message);
  } finally {
    setDeleting(false);
  }
}

  function handleLogout() {
    sessionStorage.removeItem("portfolio_admin_token");
    navigate("/khushi-admin/login");
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Portfolio Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-3 text-zinc-400">
            Manage the content displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          Sign out
        </button>
      </div>

      <div className="mb-10 flex gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => {
            handleCloseEditor();
            setActiveSection("projects")
          }}
          className={
            activeSection === "projects"
              ? "rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950"
              : "rounded-xl px-4 py-2 text-sm text-zinc-500 transition hover:text-white"
          }
        >
          Projects
        </button>

        <button
          type="button"
          onClick={() => {
            handleCloseEditor();
            setActiveSection("experience");
          }}
          className={
            activeSection === "experience"
              ? "rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950"
              : "rounded-xl px-4 py-2 text-sm text-zinc-500 transition hover:text-white"
          }
        >
          Experience
        </button>

        <button
          type="button"
          onClick={() => {
            handleCloseEditor();
            setActiveSection("skills");
          }}
          className={
            activeSection === "skills"
              ? "rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950"
              : "rounded-xl px-4 py-2 text-sm text-zinc-500 transition hover:text-white"
          }
        >
          Skills
        </button>
      </div>

      {activeSection === "projects" && (
        <section className="py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Projects
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Manage the projects shown on your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            + Add Project
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <p className="text-sm text-zinc-500">
              Loading projects...
            </p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <p className="text-sm text-zinc-500">
              No projects found.
            </p>
          </div>
        )}

        {!loading && projects.length > 0 && (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext
      items={projects.map((project) => project.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="mt-8 space-y-4">
        {projects.map((project) => {
          const isUpdating =
            updatingId === project.id;

          return (
            <SortableProject
              key={project.id}
              project={project}
            >
              <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {project.title}
                      </h3>

                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-sky-400">
                      {project.categoryLabel}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map(
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
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleToggle(
                          project,
                          "visible"
                        )
                      }
                      className={`
                        min-w-32 rounded-xl border px-4 py-2
                        text-sm transition
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          project.visible
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-white/10 bg-white/[0.03] text-zinc-500"
                        }
                      `}
                    >
                      {project.visible
                        ? "Visible"
                        : "Hidden"}
                    </button>

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleToggle(
                          project,
                          "featured"
                        )
                      }
                      className={`
                        min-w-32 rounded-xl border px-4 py-2
                        text-sm transition
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          project.featured
                            ? "border-sky-500/20 bg-sky-500/10 text-sky-400"
                            : "border-white/10 bg-white/[0.03] text-zinc-500"
                        }
                      `}
                    >
                      {project.featured
                        ? "Featured"
                        : "Not Featured"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEditProject(project)
                      }
                      className="min-w-32 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(project)
                      }
                      className="min-w-32 rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            </SortableProject>
          );
        })}
      </div>
    </SortableContext>
  </DndContext>
)}
      </section>
      )}
      {activeSection === "experience" && (
        <ExperienceManager />
      )}

      {activeSection === "skills" && (
        <SkillsManager />
      )}


      {editorOpen && (
  <ProjectEditor
    project={editingProject}
    onClose={handleCloseEditor}
    onSaved={handleProjectSaved}
  />
)}

  <DeleteProjectDialog
  project={deleteTarget}
  deleting={deleting}
  error={deleteError}
  onCancel={handleCancelDelete}
  onConfirm={handleConfirmDelete}
  />
    </main>
  );
}