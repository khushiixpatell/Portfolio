import { useEffect, useState } from "react";

import {
  createAdminProject,
  updateAdminProject,
  uploadProjectImage,
  deleteProjectImage,
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

  overview: "",
  problem: "",
  solution: "",
  challenges: "",
  results: "",

  responsibilities: "",
  highlights: "",
  learnings: "",
  screenshots: "",

  imagePublicId: "",
  screenshotPublicIds: "",
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploadingScreenshots, setUploadingScreenshots] = useState(false);
  const [screenshotUploadError, setScreenshotUploadError] = useState("");
  const [pendingDeletions, setPendingDeletions] = useState([]);

  useEffect(() => {
    setPendingDeletions([]);

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

      overview: project.overview || "",
      problem: project.problem || "",
      solution: project.solution || "",
      challenges: project.challenges || "",
      results: project.results || "",

      responsibilities:
        project.responsibilities?.join("\n") || "",

      highlights:
        project.highlights?.join("\n") || "",

      learnings:
        project.learnings?.join("\n") || "",

      screenshots:
        project.screenshots?.join("\n") || "",

      imagePublicId: project.imagePublicId || "",

      screenshotPublicIds: project.screenshotPublicIds?.join("\n") || "",
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

        responsibilities: formData.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        highlights: formData.highlights
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        learnings: formData.learnings
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        screenshots: formData.screenshots
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        screenshotPublicIds: formData.screenshotPublicIds
          .split("\n")
          .map((id) => id.trim())
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

      if (pendingDeletions.length > 0) {
  const uniqueDeletions = [
    ...new Set(pendingDeletions),
  ];

  const deletionResults =
    await Promise.allSettled(
      uniqueDeletions.map((publicId) =>
        deleteProjectImage(publicId)
      )
    );

  const failedDeletions =
    deletionResults.filter(
      (result) =>
        result.status === "rejected"
    );

  if (failedDeletions.length > 0) {
    console.warn(
      `${failedDeletions.length} Cloudinary image(s) could not be deleted.`
    );
  }
}

setPendingDeletions([]);

      onSaved(savedProject);
    } catch (err) {
      console.error("Unable to save project:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleMainImageUpload(event) {
  const file = event.target.files?.[0];

  if (!file) return;

  const previousPublicId = formData.imagePublicId;

  try {
    setUploadingImage(true);
    setImageUploadError("");

    const uploadedImage =
      await uploadProjectImage(file);

    if (
      previousPublicId &&
      previousPublicId !== uploadedImage.publicId
    ) {
      setPendingDeletions((current) => [
        ...current,
        previousPublicId,
      ]);
    }

    setFormData((current) => ({
      ...current,
      imageUrl: uploadedImage.url,
      imagePublicId: uploadedImage.publicId,
    }));
  } catch (error) {
    console.error(error);

    setImageUploadError(
      error.message || "Unable to upload image."
    );
  } finally {
    setUploadingImage(false);

    event.target.value = "";
  }
}

  async function handleScreenshotUpload(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) return;

  try {
    setUploadingScreenshots(true);
    setScreenshotUploadError("");

    const uploadedImages = await Promise.all(
      files.map((file) => uploadProjectImage(file))
    );

    const newUrls = uploadedImages.map(
      (image) => image.url
    );

    const newPublicIds = uploadedImages.map(
      (image) => image.publicId
    );

    setFormData((current) => {
  const existingScreenshots = current.screenshots
    ? current.screenshots
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean)
    : [];

  const existingPublicIds =
    current.screenshotPublicIds
      ? current.screenshotPublicIds
          .split("\n")
          .map((id) => id.trim())
          .filter(Boolean)
      : [];

  return {
    ...current,

    screenshots: [
      ...existingScreenshots,
      ...newUrls,
    ].join("\n"),

    screenshotPublicIds: [
      ...existingPublicIds,
      ...newPublicIds,
    ].join("\n"),
  };
});
  } catch (error) {
    console.error(error);

    setScreenshotUploadError(
      error.message ||
        "Unable to upload screenshots."
    );
  } finally {
    setUploadingScreenshots(false);
    event.target.value = "";
  }
}

function handleRemoveMainImage() {
  if (formData.imagePublicId) {
    setPendingDeletions((current) => [
      ...current,
      formData.imagePublicId,
    ]);
  }

  setFormData((current) => ({
    ...current,
    imageUrl: "",
    imagePublicId: "",
  }));

  setImageUploadError("");
}

function removeScreenshot(indexToRemove) {
  const screenshots = formData.screenshots
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  const publicIds = formData.screenshotPublicIds
    .split("\n")
    .map((id) => id.trim())
    .filter(Boolean);

  const publicId = publicIds[indexToRemove];

  if (publicId) {
    setPendingDeletions((current) => [
      ...current,
      publicId,
    ]);
  }

  const updatedScreenshots =
    screenshots.filter(
      (_, index) => index !== indexToRemove
    );

  const updatedPublicIds =
    publicIds.filter(
      (_, index) => index !== indexToRemove
    );

  setFormData((current) => ({
    ...current,

    screenshots:
      updatedScreenshots.join("\n"),

    screenshotPublicIds:
      updatedPublicIds.join("\n"),
  }));

  setScreenshotUploadError("");
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
                    disabled={isEditing}
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

          <FormSection title="Case Study">
            <TextArea
              label="Overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
            />

            <TextArea
              label="Problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
            />

            <TextArea
              label="Solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
            />

            <TextArea
              label="Challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
            />

            <TextArea
              label="Results"
              name="results"
              value={formData.results}
              onChange={handleChange}
            />

            <ListField
              label="Responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder={`Built the frontend application\nIntegrated REST APIs\nImplemented responsive layouts`}
            />

            <ListField
              label="Key Highlights"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder={`Responsive across devices\nSecure authentication\nDatabase-driven project management`}
            />

            <ListField
              label="What I Learned"
              name="learnings"
              value={formData.learnings}
              onChange={handleChange}
              placeholder={`Designing REST APIs\nWorking with PostgreSQL\nStructuring full-stack applications`}
            />
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

            <div>
  <label className="text-sm text-zinc-300">
    Main Project Image
  </label>

  <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5">
    {formData.imageUrl ? (
      <div>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <img
            src={formData.imageUrl}
            alt="Project preview"
            className="max-h-72 w-full object-cover"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white">
            {uploadingImage
              ? "Uploading..."
              : "Replace Image"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleMainImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleRemoveMainImage}
            disabled={uploadingImage}
            className="rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:border-red-400/40"
          >
            Remove
          </button>
        </div>
      </div>
    ) : (
      <label className="flex cursor-pointer flex-col items-center justify-center py-8 text-center">
        <span className="text-sm font-medium text-zinc-300">
          {uploadingImage
            ? "Uploading image..."
            : "Choose project image"}
        </span>

        <span className="mt-2 text-xs text-zinc-600">
          JPG, PNG, WebP or GIF — max 10 MB
        </span>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleMainImageUpload}
          disabled={uploadingImage}
          className="hidden"
        />
      </label>
    )}
  </div>

  {imageUploadError && (
    <p className="mt-2 text-sm text-red-400">
      {imageUploadError}
    </p>
  )}
</div>

            <div>
  <label className="text-sm text-zinc-300">
    Project Screenshots
  </label>

  <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5">
    {formData.screenshots && (
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {formData.screenshots
          .split("\n")
          .map((url) => url.trim())
          .filter(Boolean)
          .map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative overflow-hidden rounded-xl border border-white/10"
            >
              <img
                src={url}
                alt={`Project screenshot ${index + 1}`}
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeScreenshot(index)
                }
                className="absolute right-2 top-2 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>

              <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-zinc-300">
                {index + 1}
              </div>
            </div>
          ))}
      </div>
    )}

    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-white/10 py-7 text-center transition hover:border-white/20">
      <span className="text-sm font-medium text-zinc-300">
        {uploadingScreenshots
          ? "Uploading screenshots..."
          : "Add screenshots"}
      </span>

      <span className="mt-2 text-xs text-zinc-600">
        Select multiple images if needed
      </span>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleScreenshotUpload}
        disabled={uploadingScreenshots}
        className="hidden"
      />
    </label>
  </div>

  {screenshotUploadError && (
    <p className="mt-2 text-sm text-red-400">
      {screenshotUploadError}
    </p>
  )}
</div>
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
  disabled = false,
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
        disabled={disabled}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400/50 disabled:cursor-not-allowed disabled:opacity-50"      />
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

function ListField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
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
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400/50"
      />

      <p className="mt-2 text-xs text-zinc-600">
        Enter one item per line.
      </p>
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