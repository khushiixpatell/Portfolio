import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await loginAdmin(email, password);

      sessionStorage.setItem(
        "portfolio_admin_token",
        result.token
      );

      navigate("/khushi-admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
          Portfolio Admin
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Welcome back.
        </h1>

        <p className="mt-3 text-zinc-400">
          Sign in to manage your portfolio.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="text-sm text-zinc-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="
                mt-2 w-full rounded-xl border border-white/10
                bg-white/[0.03] px-4 py-3 text-white
                outline-none transition
                placeholder:text-zinc-600
                focus:border-sky-400/50
              "
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm text-zinc-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="
                mt-2 w-full rounded-xl border border-white/10
                bg-white/[0.03] px-4 py-3 text-white
                outline-none transition
                placeholder:text-zinc-600
                focus:border-sky-400/50
              "
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-xl bg-white px-4 py-3
              font-medium text-zinc-950 transition
              hover:bg-zinc-200
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}