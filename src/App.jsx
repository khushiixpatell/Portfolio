import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import ProjectPage from "./pages/projects/ProjectPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Route>
        
        <Route
          path="/khushi-admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/khushi-admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}