import { useEffect, useState } from "react";

import {
  createAdminExperience,
  updateAdminExperience,
} from "../../services/api";

const emptyExperience = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: "",
  companyUrl: "",
  visible: true,
};

export default function ExperienceEditor({
  experience,
  onSaved,
  onCancel,
}) {
  const [formData, setFormData] =
    useState(emptyExperience);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(experience?.id);

  useEffect(() => {
    if (!experience) {
      setFormData(emptyExperience);
      return;
    }

    setFormData({
      company: experience.company || "",
      role: experience.role || "",
      location: experience.location || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description || "",

      technologies:
        experience.technologies?.join(", ") || "",

      companyUrl: experience.companyUrl || "",

      visible:
        experience.visible ?? true,
    });
  }, [experience]);

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,

        technologies: formData.technologies
          .split(",")
          .map((technology) =>
            technology.trim()
          )
          .filter(Boolean),
      };

      let savedExperience;

      if (isEditing) {
        savedExperience =
          await updateAdminExperience(
            experience.id,
            payload
          );
      } else {
        savedExperience =
          await createAdminExperience(payload);
      }

      onSaved(savedExperience);
    } catch (error) {
      console.error(
        "Unable to save experience:",
        error
      );

      setError(
        error.message ||
          "Unable to save experience."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Experience
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isEditing
              ? "Edit experience"
              : "Add experience"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <Field
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <Field
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Madison, WI"
          />

          <Field
            label="Company Website"
            name="companyUrl"
            type="url"
            value={formData.companyUrl}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Field
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="May 2026"
            required
          />

          <Field
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="August 2026 or Present"
            required
          />
        </div>

        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your work, responsibilities, and impact."
          required
        />

        <Field
          label="Technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, JavaScript, Node.js"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="visible"
            checked={formData.visible}
            onChange={handleChange}
            className="h-4 w-4"
          />

          <span className="text-sm text-zinc-300">
            Show this experience publicly
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Add Experience"}
          </button>
        </div>
      </form>
    </div>
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-sky-400/50"
      />
    </div>
  );
}