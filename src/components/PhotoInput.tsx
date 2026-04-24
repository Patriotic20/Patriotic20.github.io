import {
  ChangeEvent,
  DragEvent,
  useId,
  useRef,
  useState,
} from "react";
import { resizeImageToDataUrl } from "../lib/image";
import { CloseIcon, LinkIcon, PencilIcon, PlusIcon } from "./icons";
import styles from "./PhotoInput.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  fallbackInitials: string;
}

function isValidHttpUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function PhotoInput({ value, onChange, fallbackInitials }: Props) {
  const inputId = useId();
  const urlInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlDraft, setUrlDraft] = useState(
    value && !value.startsWith("data:") ? value : "",
  );

  const hasPhoto = Boolean(value);

  const openPicker = () => fileRef.current?.click();

  const handleFile = async (file: File) => {
    setError(undefined);
    setLoading(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      onChange(dataUrl);
      setUrlDraft("");
      setShowUrl(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = "";
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragActive) setDragActive(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  const handleRemove = () => {
    onChange("");
    setUrlDraft("");
    setError(undefined);
  };

  const applyUrl = () => {
    const trimmed = urlDraft.trim();
    if (!trimmed) {
      onChange("");
      return;
    }
    if (!isValidHttpUrl(trimmed)) {
      setError("Must be a valid http:// or https:// URL");
      return;
    }
    setError(undefined);
    onChange(trimmed);
  };

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.dropzone} ${
          dragActive ? styles.dropzoneActive : ""
        } ${hasPhoto ? styles.dropzoneFilled : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={styles.preview}>
          {hasPhoto ? (
            <img
              src={value}
              alt="Profile preview"
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.previewFallback} aria-hidden="true">
              {fallbackInitials || "?"}
            </div>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.heading}>
            <p className={styles.title}>
              {hasPhoto ? "Profile photo" : "Add a profile photo"}
            </p>
            <p className={styles.subtitle}>
              {hasPhoto
                ? "Drop a new image to replace, or use the buttons below."
                : "Drop an image here, click to browse, or paste a URL."}
            </p>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={openPicker}
              disabled={loading}
            >
              {hasPhoto ? (
                <PencilIcon width={14} height={14} />
              ) : (
                <PlusIcon width={14} height={14} />
              )}
              {loading
                ? "Processing…"
                : hasPhoto
                  ? "Replace"
                  : "Upload photo"}
            </button>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setShowUrl((s) => !s)}
              aria-expanded={showUrl}
            >
              <LinkIcon width={14} height={14} />
              URL
            </button>

            {hasPhoto && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemove}
                aria-label="Remove photo"
              >
                <CloseIcon width={14} height={14} />
              </button>
            )}
          </div>
        </div>

        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={onFileChange}
        />

        {dragActive && (
          <div className={styles.dropOverlay} aria-hidden="true">
            Drop image to upload
          </div>
        )}
      </div>

      {showUrl && (
        <div className={styles.urlRow}>
          <label className={styles.urlLabel} htmlFor={urlInputId}>
            Or paste an image URL
          </label>
          <div className={styles.urlField}>
            <input
              id={urlInputId}
              type="url"
              className={styles.urlInput}
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onBlur={applyUrl}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyUrl();
                }
              }}
              placeholder="https://.../avatar.jpg"
            />
            <button
              type="button"
              className={styles.urlApply}
              onClick={applyUrl}
            >
              Use URL
            </button>
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
