import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem(
    "portfolio_admin_token"
  );

  if (!token) {
    return (
      <Navigate
        to="/khushi-admin/login"
        replace
      />
    );
  }

  return children;
}