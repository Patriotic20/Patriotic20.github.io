import { useCallback, useState } from "react";
import type { Profile } from "../types";
import {
  clearProfile as clearProfileFromStorage,
  loadProfile,
  saveProfile as saveProfileToStorage,
} from "../storage";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile());

  const save = useCallback((next: Profile) => {
    saveProfileToStorage(next);
    setProfile(next);
  }, []);

  const clear = useCallback(() => {
    clearProfileFromStorage();
    setProfile(null);
  }, []);

  return { profile, save, clear };
}
