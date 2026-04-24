import { Link, useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/ProjectForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useProjects } from "../hooks/useProjects";
import { ArrowLeftIcon } from "../components/icons";
import type { ProjectInput } from "../types";
import styles from "./AddProjectPage.module.css";

export function AddProjectPage() {
  useDocumentTitle("Yangi loyiha");
  const { add } = useProjects();
  const navigate = useNavigate();

  const handleSubmit = (input: ProjectInput) => {
    add(input);
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Back
      </Link>
      <div className={styles.heading}>
        <h1 className={styles.title}>Add a project</h1>
        <p className={styles.subtitle}>
          Tell the story — what it is, why you built it, and where to see it.
        </p>
      </div>
      <ProjectForm onSubmit={handleSubmit} onCancel={() => navigate("/")} />
    </div>
  );
}
