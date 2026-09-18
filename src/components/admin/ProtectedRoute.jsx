import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentAdmin } from "../../services/api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function verifySession() {
      const token = sessionStorage.getItem(
        "portfolio_admin_token"
      );

      if (!token) {
        setStatus("unauthorized");
        return;
      }

      try {
        await getCurrentAdmin();
        setStatus("authorized");
      } catch (error) {
        console.error(
          "Admin session verification failed:",
          error
        );

        sessionStorage.removeItem(
          "portfolio_admin_token"
        );

        setStatus("unauthorized");
      }
    }

    verifySession();
  }, []);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">
          Verifying session...
        </p>
      </main>
    );
  }

  if (status === "unauthorized") {
    return (
      <Navigate
        to="/khushi-admin/login"
        replace
      />
    );
  }

  return children;
}