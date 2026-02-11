export type Project = {
  id: Key | null | undefined;
  updated_at(updated_at: any): import("react").ReactNode;
  created_at(created_at: any): import("react").ReactNode;
  project_name: string;
  creation_level: number;
  status: number;
  used_technologies: string;
};
