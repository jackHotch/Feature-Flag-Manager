import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transformObject = (obj: Record<string, any>) => {
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value: String(value), // Convert values to strings if needed
  }))
}
