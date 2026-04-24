import { Link } from "react-router-dom";
import type { Project } from "../types";
import { GithubIcon, PlayIcon } from "./icons";
import styles from "./ProjectCard.module.css";

interface Props {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={styles.card}
      style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
    >
      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.meta}>
        {project.githubUrl && (
          <span className={styles.tag}>
            <GithubIcon width={12} height={12} />
            GitHub
          </span>
        )}
        {project.liveUrl && (
          <span className={styles.tag}>
            <PlayIcon width={12} height={12} />
            Live demo
          </span>
        )}
      </div>
    </Link>
  );
}
