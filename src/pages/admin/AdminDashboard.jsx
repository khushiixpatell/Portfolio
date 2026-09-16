import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

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

      <section className="py-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Projects
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Add, edit, reorder, feature, or hide projects.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            + Add Project
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <p className="text-sm text-zinc-500">
            Project management is coming next.
          </p>
        </div>
      </section>
    </main>
  );
}