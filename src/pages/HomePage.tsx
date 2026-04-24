import { Link } from "react-router-dom";
import { ProfileHero } from "../components/ProfileHero";
import { ProjectCard } from "../components/ProjectCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useProfile } from "../hooks/useProfile";
import { useProjects } from "../hooks/useProjects";
import { PencilIcon, PlusIcon } from "../components/icons";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { projects } = useProjects();
  const { profile } = useProfile();
  useDocumentTitle(profile?.name);

  return (
    <div className={styles.page}>
      {profile ? (
        <ProfileHero profile={profile} />
      ) : (
        <section className={styles.profilePrompt}>
          <div>
            <h2 className={styles.promptTitle}>Profilingizni sozlang</h2>
            <p className={styles.promptSubtitle}>
              Ism, bio, ko'nikmalar va havolalarni qo'shing — tashrif
              buyuruvchilar kim ekaningizni bilsin.
            </p>
          </div>
          <Link to="/profile/edit" className={styles.promptCta}>
            <PencilIcon width={14} height={14} />
            Sozlash
          </Link>
        </section>
      )}

      <section className={styles.projects}>
        <header className={styles.projectsHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Loyihalar</h2>
            <p className={styles.sectionSubtitle}>
              {projects.length === 0
                ? "Hali loyiha qo'shilmagan."
                : `${projects.length} ta loyiha`}
            </p>
          </div>
          <Link to="/add" className={styles.addButton}>
            <PlusIcon width={14} height={14} />
            Loyiha qo'shish
          </Link>
        </header>

        {projects.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Birinchi loyihani qo'shib, portfoliongizni boshlang.
            </p>
            <Link to="/add" className={styles.emptyCta}>
              <PlusIcon width={14} height={14} />
              Loyiha qo'shish
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
