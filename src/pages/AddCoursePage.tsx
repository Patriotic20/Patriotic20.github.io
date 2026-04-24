import { Link, useNavigate } from "react-router-dom";
import { CourseForm } from "../components/CourseForm";
import { ArrowLeftIcon } from "../components/icons";
import { useCourses } from "../hooks/useCourses";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { CourseInput } from "../types";
import styles from "./CourseFormPage.module.css";

export function AddCoursePage() {
  useDocumentTitle("Yangi kurs");
  const { add } = useCourses();
  const navigate = useNavigate();

  const handleSubmit = (input: CourseInput) => {
    const created = add(input);
    navigate(`/courses/${created.id}`);
  };

  return (
    <div className={styles.page}>
      <Link to="/courses" className={styles.back}>
        <ArrowLeftIcon width={14} height={14} />
        Kurslar
      </Link>
      <div className={styles.heading}>
        <h1 className={styles.title}>Yangi kurs</h1>
        <p className={styles.subtitle}>
          Kurs haqida ma'lumotni bosqichma-bosqich to'ldiring. Ixtiyoriy maydonlar
          bo'sh qoldirilsa, kurs sahifasida o'sha bo'limlar ko'rinmaydi.
        </p>
      </div>
      <CourseForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/courses")}
        submitLabel="Kursni saqlash"
      />
    </div>
  );
}
