import { Link, useNavigate } from "react-router-dom";
import { ProfileForm } from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";
import { ArrowLeftIcon } from "../components/icons";
import type { Profile } from "../types";
import styles from "./EditProfilePage.module.css";

export function EditProfilePage() {
  const { profile, save } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = (next: Profile) => {
    save(next);
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Back
      </Link>
      <div className={styles.heading}>
        <h1 className={styles.title}>
          {profile ? "Edit profile" : "Set up your profile"}
        </h1>
        <p className={styles.subtitle}>
          This info is shown at the top of your home page.
        </p>
      </div>
      <ProfileForm
        initial={profile}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
