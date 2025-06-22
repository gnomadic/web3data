import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const bigIntReplacer = (key: any, value: any) =>
	typeof value === 'bigint' ? value.toString() : value
