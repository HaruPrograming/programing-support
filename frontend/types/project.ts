export type Project = {
  id: number;
  project_name: string;
  creation_level: number;
  status: number;
  used_technologies: string;
  created_at: Date;
  updated_at: Date;
};
export type CreateProject = {
  project_name: string;
  creation_level: number;
  status: number;
  used_technologies: string;
};
