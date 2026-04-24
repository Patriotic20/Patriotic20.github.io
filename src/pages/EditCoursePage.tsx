import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseForm } from "../components/CourseForm";
import { ArrowLeftIcon } from "../components/icons";
import { useCourses } from "../hooks/useCourses";
import type { CourseInput } from "../types";
import styles from "./CourseFormPage.module.css";

export function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const { courses, update } = useCourses();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className={styles.page}>
        <Link to="/courses" className={styles.back}>
          <ArrowLeftIcon width={14} height={14} />
          Kurslar
        </Link>
        <div className={styles.heading}>
          <h1 className={styles.title}>Kurs topilmadi</h1>
          <p className={styles.subtitle}>
            Tahrirlanadigan kurs mavjud emas yoki o'chirilgan.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (input: CourseInput) => {
    update(course.id, input);
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className={styles.page}>
      <Link to={`/courses/${course.id}`} className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Kurs sahifasi
      </Link>
      <div className={styles.heading}>
        <h1 className={styles.title}>Kursni tahrirlash</h1>
        <p className={styles.subtitle}>O'zgarishlar darhol saqlanadi.</p>
      </div>
      <CourseForm
        initial={course}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/courses/${course.id}`)}
        submitLabel="O'zgarishlarni saqlash"
      />
    </div>
  );
}
