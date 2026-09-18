const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
}

export async function getProjectBySlug(slug) {
  const response = await fetch(`${API_URL}/projects/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const result = await response.json();

  return result.data;
}
export async function loginAdmin(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to log in");
  }

  return result;
}

function getAdminToken() {
  return sessionStorage.getItem(
    "portfolio_admin_token"
  );
}

export async function getCurrentAdmin() {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No admin session.");
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to verify admin."
    );
  }

  return result.admin;
}

export async function getAdminProjects() {
  const token = getAdminToken();

  const response = await fetch(`${API_URL}/admin/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to load admin projects."
    );
  }

  return result.data;
}

export async function updateAdminProject(id, updates) {
  const token = getAdminToken();

  const response = await fetch(
    `${API_URL}/admin/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to update project."
    );
  }

  return result.data;
}

export async function createAdminProject(projectData) {
  const token = getAdminToken();

  const response = await fetch(`${API_URL}/admin/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to create project."
    );
  }

  return result.data;
}

export async function deleteAdminProject(id) {
  const token = getAdminToken();

  const response = await fetch(
    `${API_URL}/admin/projects/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to delete project."
    );
  }

  return result;
}