import { type Project, type CreateProject } from "../types/project";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");

  if (!res.ok) throw new Error("API error");

  return res.json();
}

export const createProject = async (data: CreateProject) => {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
