import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {BookOpenCheckIcon, GithubIcon, GlobeIcon, LinkedinIcon} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
