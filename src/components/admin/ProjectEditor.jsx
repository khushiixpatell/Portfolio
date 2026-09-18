import { useEffect, useState } from "react";

import {
  createAdminProject,
  updateAdminProject,
} from "../../services/api";

const emptyProject = {
  title: "",
  shortTitle: "",
  slug: "",
  description: "",

  categories: [],
  categoryLabel: "",

  type: "",
  contribution: "",
  technologies: "",

  status: "Completed",

  githubUrl: "",
  liveUrl: "",
  imageUrl: "",

  visible: true,
  featured: false,
  displayOrder: 0,
};

const categoryOptions = [
  {
    id: "full-stack",
    label: "Full Stack",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "ai",
    label: "AI / ML",
  },
];

export default function ProjectEditor({
  project,
  onClose,
  onSaved,
}) {
  const isEditing = Boolean(project);

  const [formData, setFormData] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!project) {
      setFormData(emptyProject);
      return;
    }

    setFormData({
      title: project.title || "",
      shortTitle: project.shortTitle || "",
      slug: project.slug || "",
      description: project.description || "",

      categories: project.categories || [],
      categoryLabel: project.categoryLabel || "",

      type: project.type || "",
      contribution: project.contribution || "",

      technologies:
        project.technologies?.join(", ") || "",

      status: project.status || "Completed",

      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",

      visible: project.visible ?? true,
      featured: project.featured ?? false,
      displayOrder: project.displayOrder ?? 0,
    });
  }, [project]);

  function handleChange(event) {
    const { name, value, type, checked } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCategoryChange(categoryId) {
    setFormData((current) => {
      const exists =
        current.categories.includes(categoryId);

      return {
        ...current,
        categories: exists
          ? current.categories.filter(
              (category) => category !== categoryId
            )
          : [...current.categories, categoryId],
      };
    });
  }

  function generateSlug() {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((current) => ({
      ...current,
      slug,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,

        displayOrder:
          Number(formData.displayOrder) || 0,

        technologies: formData.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
      };

      let savedProject;

      if (isEditing) {
        savedProject = await updateAdminProject(
          project.id,
          payload
        );
      } else {
        savedProject =
          await createAdminProject(payload);
      }

      onSaved(savedProject);
    } catch (err) {
      console.error("Unable to save project:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-white/10 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
              Portfolio Admin
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {isEditing
                ? "Edit Project"
                : "Add Project"}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {isEditing
                ? "Update this project's portfolio information."
                : "Create a new project for your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-400 transition hover:text-white"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-6 sm:p-8"
        >
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          <FormSection title="Basic Information">
            <Field
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Field
              label="Short Title"
              name="shortTitle"
              value={formData.shortTitle}
              onChange={handleChange}
            />

            <div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Field
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="my-project"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={generateSlug}
                  className="mb-[1px] rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  Generate
                </button>
              </div>

              <p className="mt-2 text-xs text-zinc-600">
                Used in the project's URL.
              </p>
            </div>

            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormSection>

          <FormSection title="Classification">
            <div>
              <p className="text-sm text-zinc-300">
                Categories
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                {categoryOptions.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(
                        category.id
                      )}
                      onChange={() =>
                        handleCategoryChange(
                          category.id
                        )
                      }
                    />

                    {category.label}
                  </label>
                ))}
              </div>
            </div>

            <Field
              label="Category Label"
              name="categoryLabel"
              value={formData.categoryLabel}
              onChange={handleChange}
              placeholder="Full-Stack • AI"
              required
            />

            <Field
              label="Project Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Individual Project"
              required
            />

            <Field
              label="Contribution"
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
              placeholder="Designed and developed independently"
            />

            <Field
              label="Technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, PostgreSQL, Prisma"
            />

            <p className="-mt-4 text-xs text-zinc-600">
              Separate technologies with commas.
            </p>
          </FormSection>

          <FormSection title="Status & Display">
            <div>
              <label className="text-sm text-zinc-300">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-sky-400/50"
              >
                <option value="Completed">
                  Completed
                </option>

                <option value="In Development">
                  In Development
                </option>

                <option value="Ongoing">
                  Ongoing
                </option>
              </select>
            </div>

            <Field
              label="Display Order"
              name="displayOrder"
              type="number"
              value={formData.displayOrder}
              onChange={handleChange}
            />

            <div className="flex flex-wrap gap-5">
              <Checkbox
                label="Visible"
                name="visible"
                checked={formData.visible}
                onChange={handleChange}
              />

              <Checkbox
                label="Featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          <FormSection title="Links">
            <Field
              label="GitHub URL"
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />

            <Field
              label="Live Demo URL"
              name="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Field
              label="Image URL"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </FormSection>

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <section>
      <h3 className="mb-5 border-b border-white/10 pb-3 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">
        {title}
      </h3>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm text-zinc-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400/50"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm text-zinc-300"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-sky-400/50"
      />
    </div>
  );
}

function Checkbox({
  label,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      {label}
    </label>
  );
}