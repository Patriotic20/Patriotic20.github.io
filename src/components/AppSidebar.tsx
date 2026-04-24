import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
  CloseIcon,
  GraduationCapIcon,
  HomeIcon,
  MenuIcon,
  MoonIcon,
  SparkleIcon,
  SunIcon,
} from "./icons";
import styles from "./AppSidebar.module.css";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  end?: boolean;
}

const NAV: NavItem[] = [
  { to: "/", label: "Bosh sahifa", icon: HomeIcon, end: true },
  { to: "/courses", label: "Kurslar", icon: GraduationCapIcon },
];

export function AppSidebar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isDark = theme === "dark";

  // Close the mobile drawer when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the drawer is open on mobile.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.menuToggle}
        onClick={() => setOpen(true)}
        aria-label="Menyuni ochish"
      >
        <MenuIcon width={20} height={20} />
      </button>

      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${open ? styles.open : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.top}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <SparkleIcon width={14} height={14} />
            </span>
            <span>Portfolio</span>
          </NavLink>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setOpen(false)}
            aria-label="Menyuni yopish"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                <Icon width={16} height={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.bottom}>
          <button
            type="button"
            className={styles.themeButton}
            onClick={toggle}
            aria-label={isDark ? "Kunduzgi rejim" : "Tungi rejim"}
          >
            {isDark ? (
              <SunIcon width={15} height={15} />
            ) : (
              <MoonIcon width={15} height={15} />
            )}
            <span>{isDark ? "Yorug'" : "Tungi"} rejim</span>
          </button>
        </div>
      </aside>
    </>
  );
}
