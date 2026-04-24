import { useCallback, useState } from "react";
import type { Course, CourseInput } from "../types";
import {
  addCourse as addCourseToStorage,
  deleteCourse as deleteCourseFromStorage,
  loadCourses,
  updateCourse as updateCourseInStorage,
} from "../storage";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(() => loadCourses());

  const add = useCallback((input: CourseInput) => {
    const created = addCourseToStorage(input);
    setCourses((prev) => [created, ...prev]);
    return created;
  }, []);

  const update = useCallback((id: string, input: CourseInput) => {
    const updated = updateCourseInStorage(id, input);
    if (updated) {
      setCourses((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, []);

  const remove = useCallback((id: string) => {
    deleteCourseFromStorage(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { courses, add, update, remove };
}
