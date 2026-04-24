export interface Project {
  id: string;
  name: string;
  description: string;
  reason: string;
  githubUrl?: string;
  liveUrl?: string;
  createdAt: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt">;

export type SocialKind =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "website"
  | "telegram"
  | "other";

export interface SocialLink {
  id: string;
  kind: SocialKind;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  location?: string;
  skills: string[];
  socials: SocialLink[];
}

export interface CourseStat {
  id: string;
  label: string;
  value: string;
}

export interface CourseOutcome {
  id: string;
  title: string;
  description: string;
}

export interface CourseModule {
  id: string;
  number: string;
  duration: string;
  title: string;
  description: string;
  tags: string[];
  final?: boolean;
}

export interface CoursePart {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  modules: CourseModule[];
}

export interface CourseFormatPoint {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CourseCallout {
  title: string;
  body: string;
}

export interface Course {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  stats: CourseStat[];
  audience: string[];
  outcomes: CourseOutcome[];
  forYouIf: CourseCallout & { items: string[] };
  tools: string[];
  parts: CoursePart[];
  format: CourseFormatPoint[];
  aiHelper?: CourseCallout;
  certificate?: CourseCallout;
  finalOutcomes: string[];
  createdAt: string;
}

export type CourseInput = Omit<Course, "id" | "createdAt">;
