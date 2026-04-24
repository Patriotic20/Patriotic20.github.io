import { Link } from "react-router-dom";
import { ProfileHero } from "../components/ProfileHero";
import { ProjectCard } from "../components/ProjectCard";
import { useProfile } from "../hooks/useProfile";
import { useProjects } from "../hooks/useProjects";
import { PencilIcon, PlusIcon } from "../components/icons";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { projects } = useProjects();
  const { profile } = useProfile();

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        {profile ? (
          <ProfileHero profile={profile} />
        ) : (
          <section className={styles.profilePrompt}>
            <div>
              <h2 className={styles.promptTitle}>Set up your profile</h2>
              <p className={styles.promptSubtitle}>
                Add your name, bio, skills, and links so visitors know who you
                are.
              </p>
            </div>
            <Link to="/profile/edit" className={styles.promptCta}>
              <PencilIcon width={14} height={14} />
              Set up
            </Link>
          </section>
        )}
      </aside>

      <section className={styles.content}>
        <header className={styles.projectsHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <p className={styles.sectionSubtitle}>
              {projects.length === 0
                ? "Nothing here yet."
                : `${projects.length} ${
                    projects.length === 1 ? "project" : "projects"
                  }`}
            </p>
          </div>
          <Link to="/add" className={styles.addButton}>
            <PlusIcon width={14} height={14} />
            Add project
          </Link>
        </header>

        {projects.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Add your first project to get started.
            </p>
            <Link to="/add" className={styles.emptyCta}>
              <PlusIcon width={14} height={14} />
              Add project
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
