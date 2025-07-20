import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { showEventProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const parseFormData = (formData: showEventProps) => {
  const startDateTime = new Date(formData.startDateTime);
  const endDateTime = new Date(formData.endDateTime);
  const rsvpDeadline = new Date(formData.rsvpDeadline);

  return {
    title: formData.title,
    location: formData.location,
    startDate: startDateTime,
    startTime: startDateTime.toLocaleTimeString(),
    endDate: endDateTime,
    endTime: endDateTime.toLocaleTimeString(),
    rsvpDeadlineDate: rsvpDeadline,
    rsvpDeadlineTime: rsvpDeadline.toLocaleTimeString(),
  };
};

export const convertToISODate = (ddmmyyyy: string): string => {
  const [day, month, year] = ddmmyyyy.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
