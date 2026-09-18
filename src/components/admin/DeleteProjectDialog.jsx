export default function DeleteProjectDialog({
  project,
  deleting,
  error,
  onCancel,
  onConfirm,
}) {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          !
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          Delete project?
        </h2>

        <p className="mt-3 leading-6 text-zinc-400">
          You are about to permanently delete{" "}
          <span className="font-medium text-white">
            {project.title}
          </span>{" "}
          from your portfolio database.
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          This action cannot be undone.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={deleting}
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting
              ? "Deleting..."
              : "Delete Project"}
          </button>
        </div>
      </div>
    </div>
  );
}