import { useCallback, useState } from "react";
import type { Project, ProjectInput } from "../types";
import {
  addProject as addProjectToStorage,
  deleteProject as deleteProjectFromStorage,
  loadProjects,
} from "../storage";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());

  const add = useCallback((input: ProjectInput) => {
    const created = addProjectToStorage(input);
    setProjects((prev) => [created, ...prev]);
    return created;
  }, []);

  const remove = useCallback((id: string) => {
    deleteProjectFromStorage(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, add, remove };
}
