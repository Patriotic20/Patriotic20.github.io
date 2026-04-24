import { useEffect } from "react";

const SITE_NAME = "Portfolio";

export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    const next = title && title.trim() ? `${title} · ${SITE_NAME}` : SITE_NAME;
    document.title = next;
  }, [title]);
}
