import { type Project } from "../types/project";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:8000/api/projects");

  if (!res.ok) throw new Error("API error");

  return res.json();
}

export const createProject = async (data: Project) => {
  const res = await fetch("http://localhost:8000/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
