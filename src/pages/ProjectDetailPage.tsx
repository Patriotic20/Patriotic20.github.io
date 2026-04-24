import { Link, useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useProjects } from "../hooks/useProjects";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  GithubIcon,
  PlayIcon,
  TrashIcon,
} from "../components/icons";
import styles from "./ProjectDetailPage.module.css";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, remove } = useProjects();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  useDocumentTitle(project?.name ?? "Loyiha");

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Project not found</h1>
        <p className={styles.notFoundText}>
          This project doesn&apos;t exist or has been deleted.
        </p>
        <Link to="/" className={styles.back}>
          <ArrowLeftIcon width={14} height={14} />
          Back to home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${project.name}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    remove(project.id);
    navigate("/");
  };

  const createdAt = new Date(project.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={styles.page}>
      <Link to="/" className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Back
      </Link>

      <header className={styles.heading}>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.date}>Added {createdAt}</p>
      </header>

      {(project.githubUrl || project.liveUrl) && (
        <div className={styles.links}>
          {project.githubUrl && (
            <a
              className={styles.linkButton}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={15} height={15} />
              <span>GitHub</span>
              <ExternalLinkIcon
                width={12}
                height={12}
                className={styles.linkIcon}
              />
            </a>
          )}
          {project.liveUrl && (
            <a
              className={`${styles.linkButton} ${styles.linkPrimary}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon width={13} height={13} />
              <span>Live demo</span>
              <ExternalLinkIcon
                width={12}
                height={12}
                className={styles.linkIcon}
              />
            </a>
          )}
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.body}>{project.description}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why I made it</h2>
        <p className={styles.body}>{project.reason}</p>
      </section>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          <TrashIcon width={13} height={13} />
          Delete
        </button>
      </div>
    </article>
  );
}
