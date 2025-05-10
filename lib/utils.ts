import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
}

export function isValidSlug(slug: string) {
  return slug !== "yvsb" && /^[a-zA-Z0-9_-]*$/.test(slug);
}

export function generateSlug(length: number = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
