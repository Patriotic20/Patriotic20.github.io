import { AI_COURSE_SEED } from "./data/course";
import type {
  Course,
  CourseInput,
  Profile,
  Project,
  ProjectInput,
} from "./types";

const PROJECTS_KEY = "portfolio.projects.v1";
const PROFILE_KEY = "portfolio.profile.v1";
const COURSES_KEY = "portfolio.courses.v1";
const COURSES_SEEDED_KEY = "portfolio.courses.seeded.v1";

/* Projects ---------------------------------------------------------------- */

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isProject);
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function addProject(input: ProjectInput): Project {
  const project: Project = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = loadProjects();
  all.unshift(project);
  saveProjects(all);
  return project;
}

export function deleteProject(id: string): void {
  const all = loadProjects();
  saveProjects(all.filter((p) => p.id !== id));
}

export function getProject(id: string): Project | undefined {
  return loadProjects().find((p) => p.id === id);
}

function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.description === "string" &&
    typeof v.reason === "string" &&
    typeof v.createdAt === "string"
  );
}

/* Profile ----------------------------------------------------------------- */

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isProfile(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.removeItem(PROFILE_KEY);
}

function isProfile(value: unknown): value is Profile {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.role === "string" &&
    typeof v.bio === "string" &&
    Array.isArray(v.skills) &&
    Array.isArray(v.socials)
  );
}

/* Courses ----------------------------------------------------------------- */

export function loadCourses(): Course[] {
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter(isCourse);
      return [];
    }

    // First-ever load: seed once, then remember we seeded so an empty list stays empty later.
    const alreadySeeded = localStorage.getItem(COURSES_SEEDED_KEY);
    if (!alreadySeeded) {
      localStorage.setItem(COURSES_SEEDED_KEY, "true");
      const seed = [AI_COURSE_SEED];
      localStorage.setItem(COURSES_KEY, JSON.stringify(seed));
      return seed;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveCourses(courses: Course[]): void {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  localStorage.setItem(COURSES_SEEDED_KEY, "true");
}

export function addCourse(input: CourseInput): Course {
  const course: Course = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = loadCourses();
  all.unshift(course);
  saveCourses(all);
  return course;
}

export function updateCourse(id: string, input: CourseInput): Course | undefined {
  const all = loadCourses();
  const index = all.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  const updated: Course = { ...all[index], ...input, id, createdAt: all[index].createdAt };
  all[index] = updated;
  saveCourses(all);
  return updated;
}

export function deleteCourse(id: string): void {
  const all = loadCourses();
  saveCourses(all.filter((c) => c.id !== id));
}

export function getCourse(id: string): Course | undefined {
  return loadCourses().find((c) => c.id === id);
}

function isCourse(value: unknown): value is Course {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.tagline === "string" &&
    Array.isArray(v.stats) &&
    Array.isArray(v.audience) &&
    Array.isArray(v.outcomes) &&
    Array.isArray(v.tools) &&
    Array.isArray(v.parts) &&
    Array.isArray(v.format) &&
    Array.isArray(v.finalOutcomes) &&
    typeof v.createdAt === "string"
  );
}
