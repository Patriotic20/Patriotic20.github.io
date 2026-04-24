import { Link } from "react-router-dom";
import type { Profile } from "../types";
import { GraduationCapIcon, MapPinIcon, PencilIcon } from "./icons";
import { getSocialIcon, normalizeSocialHref } from "./socialMeta";
import styles from "./ProfileHero.module.css";

interface Props {
  profile: Profile;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function ProfileHero({ profile }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.photoWrap}>
          {profile.photoUrl ? (
            <img
              className={styles.photo}
              src={profile.photoUrl}
              alt={profile.name}
            />
          ) : (
            <div className={styles.photoFallback} aria-hidden="true">
              {initials(profile.name)}
            </div>
          )}
        </div>
        <div className={styles.topActions}>
          <Link to="/courses" className={styles.courseLink} title="Kurslar">
            <GraduationCapIcon width={14} height={14} />
            <span>Kurslar</span>
          </Link>
          <Link to="/profile/edit" className={styles.editButton} title="Edit profile">
            <PencilIcon width={14} height={14} />
            <span>Edit</span>
          </Link>
        </div>
      </div>

      <div className={styles.identity}>
        <h1 className={styles.name}>{profile.name}</h1>
        {profile.role && <p className={styles.role}>{profile.role}</p>}
        {profile.location && (
          <p className={styles.location}>
            <MapPinIcon width={13} height={13} />
            {profile.location}
          </p>
        )}
      </div>

      {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

      {profile.socials.length > 0 && (
        <div className={styles.socials}>
          {profile.socials.map((social) => {
            const Icon = getSocialIcon(social.kind);
            const href = normalizeSocialHref(social.kind, social.url);
            const isEmail = social.kind === "email";
            return (
              <a
                key={social.id}
                href={href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={styles.social}
                title={social.label}
              >
                <Icon width={15} height={15} />
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      )}

      {profile.skills.length > 0 && (
        <div className={styles.skills}>
          {profile.skills.map((skill) => (
            <span key={skill} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
