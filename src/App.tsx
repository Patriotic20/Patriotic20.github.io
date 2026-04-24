import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeToggle } from "./components/ThemeToggle";
import { AddCoursePage } from "./pages/AddCoursePage";
import { AddProjectPage } from "./pages/AddProjectPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { CoursesListPage } from "./pages/CoursesListPage";
import { EditCoursePage } from "./pages/EditCoursePage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <ThemeToggle />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />

          <Route path="/courses" element={<CoursesListPage />} />
          <Route path="/courses/new" element={<AddCoursePage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/courses/:id/edit" element={<EditCoursePage />} />

          <Route path="/course" element={<Navigate to="/courses" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
