import { type Project } from "../types/project";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("http://localhost:8000/api/projects");

  if (!res.ok) throw new Error("API error");

  return res.json();
}
