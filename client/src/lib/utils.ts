import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOwnerAndRepo(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    const owner = match[1];
    const repo = match[2];
    return { owner, repo };
  }
  return null;
}

export function getDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${monthShort} ${year}`;
}
