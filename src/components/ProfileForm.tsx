import { FormEvent, KeyboardEvent, useState } from "react";
import type { Profile, SocialKind, SocialLink } from "../types";
import { CloseIcon, PlusIcon } from "./icons";
import { PhotoInput } from "./PhotoInput";
import { SOCIAL_KINDS, getSocialIcon } from "./socialMeta";
import styles from "./ProfileForm.module.css";

interface Props {
  initial?: Profile | null;
  onSubmit: (profile: Profile) => void;
  onCancel?: () => void;
}

const EMPTY_SOCIAL_INPUT: { kind: SocialKind; label: string; url: string } = {
  kind: "github",
  label: "GitHub",
  url: "",
};

function validateUrl(value: string, kind: SocialKind): string | undefined {
  if (!value) return "URL is required";
  if (kind === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? undefined
      : "Not a valid email";
  }
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

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function ProfileForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [skills, setSkills] = useState<string[]>(initial?.skills ?? []);
  const [skillDraft, setSkillDraft] = useState("");
  const [socials, setSocials] = useState<SocialLink[]>(initial?.socials ?? []);
  const [socialDraft, setSocialDraft] = useState(EMPTY_SOCIAL_INPUT);
  const [socialDraftError, setSocialDraftError] = useState<string | undefined>();

  const addSkillFromDraft = () => {
    const value = skillDraft.trim();
    if (!value) return;
    if (!skills.includes(value)) setSkills((prev) => [...prev, value]);
    setSkillDraft("");
  };

  const handleSkillKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkillFromDraft();
    } else if (e.key === "Backspace" && !skillDraft && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const removeSkill = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const addSocial = () => {
    const trimmedUrl = socialDraft.url.trim();
    const err = validateUrl(trimmedUrl, socialDraft.kind);
    if (err) {
      setSocialDraftError(err);
      return;
    }
    const label =
      socialDraft.label.trim() ||
      SOCIAL_KINDS.find((k) => k.value === socialDraft.kind)?.label ||
      "Link";
    setSocials((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: socialDraft.kind,
        label,
        url: trimmedUrl,
      },
    ]);
    setSocialDraft(EMPTY_SOCIAL_INPUT);
    setSocialDraftError(undefined);
  };

  const removeSocial = (id: string) =>
    setSocials((prev) => prev.filter((s) => s.id !== id));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const leftoverSkill = skillDraft.trim();
    const finalSkills = leftoverSkill && !skills.includes(leftoverSkill)
      ? [...skills, leftoverSkill]
      : skills;

    onSubmit({
      name: trimmedName,
      role: role.trim(),
      bio: bio.trim(),
      photoUrl: photoUrl.trim() || undefined,
      location: location.trim() || undefined,
      skills: finalSkills,
      socials,
    });
  };

  const canSubmit = name.trim() !== "";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Basics</h3>

        <label className={styles.field}>
          <span className={styles.label}>
            Name <span className={styles.required}>*</span>
          </span>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Role / headline</span>
          <input
            className={styles.input}
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Frontend developer · Student · Designer"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Short bio</span>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="One to three sentences about yourself"
            rows={3}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Location</span>
          <input
            className={styles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Tashkent, Uzbekistan"
          />
        </label>

        <div className={styles.field}>
          <span className={styles.label}>Profile photo</span>
          <PhotoInput
            value={photoUrl}
            onChange={setPhotoUrl}
            fallbackInitials={initialsFor(name)}
          />
        </div>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Skills</h3>
        <div className={styles.skillsWrap}>
          {skills.map((skill) => (
            <span key={skill} className={styles.skillChip}>
              {skill}
              <button
                type="button"
                className={styles.chipRemove}
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
              >
                <CloseIcon width={12} height={12} />
              </button>
            </span>
          ))}
          <input
            className={styles.chipInput}
            type="text"
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
            onKeyDown={handleSkillKey}
            onBlur={addSkillFromDraft}
            placeholder={
              skills.length === 0
                ? "Type a skill and press Enter"
                : "Add another…"
            }
          />
        </div>
        <p className={styles.hint}>
          Press Enter or comma to add. Backspace on empty input to remove the
          last.
        </p>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Social links</h3>

        {socials.length > 0 && (
          <ul className={styles.socialList}>
            {socials.map((social) => {
              const Icon = getSocialIcon(social.kind);
              return (
                <li key={social.id} className={styles.socialRow}>
                  <span className={styles.socialIcon} aria-hidden="true">
                    <Icon width={14} height={14} />
                  </span>
                  <div className={styles.socialInfo}>
                    <span className={styles.socialLabel}>{social.label}</span>
                    <span className={styles.socialUrl}>{social.url}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.rowRemove}
                    onClick={() => removeSocial(social.id)}
                    aria-label={`Remove ${social.label}`}
                  >
                    <CloseIcon width={14} height={14} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.addSocial}>
          <select
            className={styles.select}
            value={socialDraft.kind}
            onChange={(e) => {
              const kind = e.target.value as SocialKind;
              const label =
                SOCIAL_KINDS.find((k) => k.value === kind)?.label ?? "";
              setSocialDraft((prev) => ({
                ...prev,
                kind,
                label: prev.label && prev.label !== label ? prev.label : label,
              }));
            }}
          >
            {SOCIAL_KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            type="text"
            value={socialDraft.label}
            onChange={(e) =>
              setSocialDraft((prev) => ({ ...prev, label: e.target.value }))
            }
            placeholder="Label"
          />
          <input
            className={styles.input}
            type={socialDraft.kind === "email" ? "email" : "url"}
            value={socialDraft.url}
            onChange={(e) =>
              setSocialDraft((prev) => ({ ...prev, url: e.target.value }))
            }
            placeholder={
              socialDraft.kind === "email"
                ? "you@example.com"
                : "https://…"
            }
          />
          <button
            type="button"
            className={styles.addSocialButton}
            onClick={addSocial}
            disabled={!socialDraft.url.trim()}
          >
            <PlusIcon width={14} height={14} />
            Add
          </button>
        </div>
        {socialDraftError && (
          <span className={styles.error}>{socialDraftError}</span>
        )}
      </div>

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
          disabled={!canSubmit}
        >
          Save profile
        </button>
      </div>
    </form>
  );
}
