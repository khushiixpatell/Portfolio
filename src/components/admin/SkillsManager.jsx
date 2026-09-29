import { useEffect, useState } from "react";

import {
  getAdminSkills,
  createAdminSkillGroup,
  updateAdminSkillGroup,
  deleteAdminSkillGroup,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
} from "../../services/api";

export default function SkillsManager() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newGroupTitle, setNewGroupTitle] =
    useState("");

  const [addingGroup, setAddingGroup] =
    useState(false);

  const [newSkills, setNewSkills] =
    useState({});

  const [editingGroupId, setEditingGroupId] =
    useState(null);

  const [editingGroupTitle, setEditingGroupTitle] =
    useState("");

  const [editingSkillId, setEditingSkillId] =
    useState(null);

  const [editingSkillName, setEditingSkillName] =
    useState("");

  async function loadSkills() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminSkills();

      setGroups(data);
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Unable to load skills."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  async function handleCreateGroup(event) {
    event.preventDefault();

    const title = newGroupTitle.trim();

    if (!title) return;

    try {
      setError("");

      const group =
        await createAdminSkillGroup(title);

      setGroups((current) => [
        ...current,
        group,
      ]);

      setNewGroupTitle("");
      setAddingGroup(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  function startEditingGroup(group) {
    setEditingGroupId(group.id);
    setEditingGroupTitle(group.title);
  }

  async function saveGroup(groupId) {
    const title = editingGroupTitle.trim();

    if (!title) return;

    try {
      setError("");

      const updated =
        await updateAdminSkillGroup(
          groupId,
          title
        );

      setGroups((current) =>
        current.map((group) =>
          group.id === groupId
            ? updated
            : group
        )
      );

      setEditingGroupId(null);
      setEditingGroupTitle("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  async function handleDeleteGroup(group) {
    const confirmed = window.confirm(
      `Delete "${group.title}" and all of its skills?`
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteAdminSkillGroup(group.id);

      setGroups((current) =>
        current.filter(
          (item) => item.id !== group.id
        )
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  async function handleCreateSkill(
    event,
    groupId
  ) {
    event.preventDefault();

    const name =
      newSkills[groupId]?.trim();

    if (!name) return;

    try {
      setError("");

      const skill = await createAdminSkill(
        name,
        groupId
      );

      setGroups((current) =>
        current.map((group) =>
          group.id === groupId
            ? {
                ...group,
                skills: [
                  ...(group.skills || []),
                  skill,
                ],
              }
            : group
        )
      );

      setNewSkills((current) => ({
        ...current,
        [groupId]: "",
      }));
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  function startEditingSkill(skill) {
    setEditingSkillId(skill.id);
    setEditingSkillName(skill.name);
  }

  async function saveSkill(skill) {
    const name = editingSkillName.trim();

    if (!name) return;

    try {
      setError("");

      const updated =
        await updateAdminSkill(
          skill.id,
          name
        );

      setGroups((current) =>
        current.map((group) => ({
          ...group,

          skills: group.skills.map((item) =>
            item.id === updated.id
              ? updated
              : item
          ),
        }))
      );

      setEditingSkillId(null);
      setEditingSkillName("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  async function handleDeleteSkill(skill) {
    const confirmed = window.confirm(
      `Delete "${skill.name}"?`
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteAdminSkill(skill.id);

      setGroups((current) =>
        current.map((group) => ({
          ...group,

          skills: group.skills.filter(
            (item) =>
              item.id !== skill.id
          ),
        }))
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <section className="py-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Skills
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Technical skills
          </h2>

          <p className="mt-3 text-zinc-500">
            Manage the technologies and tools
            shown on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setAddingGroup(true)
          }
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
        >
          + Add Group
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {addingGroup && (
        <form
          onSubmit={handleCreateGroup}
          className="mt-8 flex max-w-xl gap-3"
        >
          <input
            value={newGroupTitle}
            onChange={(event) =>
              setNewGroupTitle(
                event.target.value
              )
            }
            autoFocus
            placeholder="Frontend, Backend, AI / ML..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-sky-400/50"
          />

          <button
            type="submit"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => {
              setAddingGroup(false);
              setNewGroupTitle("");
            }}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400"
          >
            Cancel
          </button>
        </form>
      )}

      {loading && (
        <p className="mt-8 text-sm text-zinc-500">
          Loading skills...
        </p>
      )}

      {!loading && groups.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <p className="text-zinc-400">
            No skill groups yet.
          </p>
        </div>
      )}

      {!loading && groups.length > 0 && (
        <div className="mt-8 space-y-5">
          {groups.map((group) => (
            <article
              key={group.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {editingGroupId ===
                group.id ? (
                  <div className="flex flex-1 gap-2">
                    <input
                      value={
                        editingGroupTitle
                      }
                      onChange={(event) =>
                        setEditingGroupTitle(
                          event.target.value
                        )
                      }
                      className="max-w-sm flex-1 rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        saveGroup(group.id)
                      }
                      className="text-sm text-sky-400"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingGroupId(null)
                      }
                      className="text-sm text-zinc-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white">
                      {group.title}
                    </h3>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          startEditingGroup(
                            group
                          )
                        }
                        className="text-sm text-zinc-400 transition hover:text-white"
                      >
                        Edit group
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteGroup(
                            group
                          )
                        }
                        className="text-sm text-red-400"
                      >
                        Delete group
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills?.map(
                  (skill) =>
                    editingSkillId ===
                    skill.id ? (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 rounded-xl border border-sky-400/30 bg-white/[0.03] px-3 py-2"
                      >
                        <input
                          value={
                            editingSkillName
                          }
                          onChange={(event) =>
                            setEditingSkillName(
                              event.target.value
                            )
                          }
                          className="w-32 bg-transparent text-sm text-white outline-none"
                          autoFocus
                        />

                        <button
                          type="button"
                          onClick={() =>
                            saveSkill(skill)
                          }
                          className="text-xs text-sky-400"
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setEditingSkillId(
                              null
                            )
                          }
                          className="text-xs text-zinc-500"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div
                        key={skill.id}
                        className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            startEditingSkill(
                              skill
                            )
                          }
                          className="text-sm text-zinc-300"
                        >
                          {skill.name}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteSkill(
                              skill
                            )
                          }
                          className="text-zinc-600 transition hover:text-red-400"
                          aria-label={`Delete ${skill.name}`}
                        >
                          ×
                        </button>
                      </div>
                    )
                )}
              </div>

              <form
                onSubmit={(event) =>
                  handleCreateSkill(
                    event,
                    group.id
                  )
                }
                className="mt-5 flex max-w-md gap-2"
              >
                <input
                  value={
                    newSkills[group.id] || ""
                  }
                  onChange={(event) =>
                    setNewSkills(
                      (current) => ({
                        ...current,
                        [group.id]:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Add a skill..."
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-sky-400/50"
                />

                <button
                  type="submit"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  + Add
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}