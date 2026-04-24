import { FormEvent, useState } from "react";
import type { ProjectInput } from "../types";
import styles from "./ProjectForm.module.css";

interface Props {
  onSubmit: (input: ProjectInput) => void;
  onCancel?: () => void;
}

interface Errors {
  githubUrl?: string;
  liveUrl?: string;
}

function validateUrl(value: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "Must start with http:// or https://";
    }
    return undefined;
  } catch {
    return "Not a valid URL";
  }
}

export function ProjectForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: Errors = {
      githubUrl: validateUrl(githubUrl.trim()),
      liveUrl: validateUrl(liveUrl.trim()),
    };
    setErrors(nextErrors);
    if (nextErrors.githubUrl || nextErrors.liveUrl) return;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedReason = reason.trim();
    if (!trimmedName || !trimmedDescription || !trimmedReason) return;

    onSubmit({
      name: trimmedName,
      description: trimmedDescription,
      reason: trimmedReason,
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
    });
  };

  const isSubmittable =
    name.trim() !== "" && description.trim() !== "" && reason.trim() !== "";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>
          Project name <span className={styles.required}>*</span>
        </span>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My cool project"
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>
          Description <span className={styles.required}>*</span>
        </span>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this project?"
          rows={3}
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>
          Why did you make it? <span className={styles.required}>*</span>
        </span>
        <textarea
          className={styles.textarea}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="The problem it solves or why you built it"
          rows={3}
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>GitHub URL</span>
        <input
          className={styles.input}
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/you/repo"
        />
        {errors.githubUrl && (
          <span className={styles.error}>{errors.githubUrl}</span>
        )}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Live demo URL</span>
        <input
          className={styles.input}
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />
        {errors.liveUrl && (
          <span className={styles.error}>{errors.liveUrl}</span>
        )}
      </label>

      <div className={styles.actions}>
        {onCancel && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={!isSubmittable}
        >
          Save project
        </button>
      </div>
    </form>
  );
}
