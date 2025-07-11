import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',    
    month: 'short',      
    day: 'numeric',      
    year: 'numeric',     
    hour: 'numeric',     
    minute: '2-digit',   
    hour12: true         
  });
};
