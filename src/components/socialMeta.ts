import type { ComponentType, SVGProps } from "react";
import type { SocialKind } from "../types";
import {
  GithubIcon,
  GlobeIcon,
  LinkIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
} from "./icons";

export const SOCIAL_KINDS: { value: SocialKind; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "email", label: "Email" },
  { value: "telegram", label: "Telegram" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];

export function getSocialIcon(
  kind: SocialKind,
): ComponentType<SVGProps<SVGSVGElement>> {
  switch (kind) {
    case "github":
      return GithubIcon;
    case "linkedin":
      return LinkedinIcon;
    case "twitter":
      return TwitterIcon;
    case "email":
      return MailIcon;
    case "telegram":
      return TelegramIcon;
    case "website":
      return GlobeIcon;
    default:
      return LinkIcon;
  }
}

export function normalizeSocialHref(kind: SocialKind, url: string): string {
  const trimmed = url.trim();
  if (kind === "email") {
    return trimmed.startsWith("mailto:") ? trimmed : `mailto:${trimmed}`;
  }
  return trimmed;
}
