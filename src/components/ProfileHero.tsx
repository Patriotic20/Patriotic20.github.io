import { useState } from "react";
import { Link } from "react-router-dom";
import type { Profile } from "../types";
import { MapPinIcon, PencilIcon } from "./icons";
import { getSocialIcon, normalizeSocialHref } from "./socialMeta";
import styles from "./ProfileHero.module.css";

interface Props {
  profile: Profile;
}

const BIO_CLAMP_THRESHOLD = 280;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function ProfileHero({ profile }: Props) {
  const [bioExpanded, setBioExpanded] = useState(false);
  const canClampBio = profile.bio.length > BIO_CLAMP_THRESHOLD;

  return (
    <section className={styles.hero}>
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

      <div className={styles.body}>
        <div className={styles.top}>
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
          <Link to="/profile/edit" className={styles.editButton} title="Tahrirlash">
            <PencilIcon width={14} height={14} />
            <span>Tahrirlash</span>
          </Link>
        </div>

        {profile.bio && (
          <div className={styles.bioWrap}>
            <p
              className={`${styles.bio} ${
                canClampBio && !bioExpanded ? styles.bioClamped : ""
              }`}
            >
              {profile.bio}
            </p>
            {canClampBio && (
              <button
                type="button"
                className={styles.bioToggle}
                onClick={() => setBioExpanded((v) => !v)}
              >
                {bioExpanded ? "Kamroq" : "Ko'proq ko'rsatish"}
              </button>
            )}
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
      </div>
    </section>
  );
}
