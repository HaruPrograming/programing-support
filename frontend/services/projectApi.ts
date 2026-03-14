import { type Project, type CreateProject } from "../types/project";

const API_URL = "/api/projects";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("API error");

  return res.json();
}

export const createProject = async (data: CreateProject) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateProject = async (id: number, data: Partial<Project>) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
