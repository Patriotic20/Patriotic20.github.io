import { Link } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../components/icons";
import { useCourses } from "../hooks/useCourses";
import type { Course } from "../types";
import styles from "./CoursesListPage.module.css";

export function CoursesListPage() {
  const { courses } = useCourses();

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Bosh sahifa
      </Link>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Kurslar</h1>
          <p className={styles.subtitle}>
            {courses.length === 0
              ? "Hali kurslar yo'q."
              : `${courses.length} ta kurs`}
          </p>
        </div>
        <Link to="/courses/new" className={styles.addButton}>
          <PlusIcon width={14} height={14} />
          Kurs qo'shish
        </Link>
      </header>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Birinchi kursni qo'shing — barcha ma'lumotlarni bitta sahifada
            ko'rsatasiz.
          </p>
          <Link to="/courses/new" className={styles.emptyCta}>
            <PlusIcon width={14} height={14} />
            Kurs qo'shish
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const moduleCount = course.parts.reduce(
    (sum, part) => sum + part.modules.length,
    0,
  );
  const duration = course.stats[0]?.value;

  return (
    <Link
      to={`/courses/${course.id}`}
      className={styles.card}
      style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
    >
      <div className={styles.cardTop}>
        {course.eyebrow && (
          <span className={styles.cardEyebrow}>{course.eyebrow}</span>
        )}
        <h3 className={styles.cardTitle}>{course.name}</h3>
        {course.tagline && (
          <p className={styles.cardTagline}>{course.tagline}</p>
        )}
      </div>

      <div className={styles.cardMeta}>
        {duration && <span className={styles.metaItem}>{duration}</span>}
        {moduleCount > 0 && (
          <span className={styles.metaItem}>{moduleCount} modul</span>
        )}
        {course.tools.length > 0 && (
          <span className={styles.metaItem}>{course.tools.length}+ vosita</span>
        )}
      </div>

      {course.audience.length > 0 && (
        <div className={styles.cardTags}>
          {course.audience.slice(0, 4).map((item) => (
            <span key={item} className={styles.cardTag}>
              {item}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
