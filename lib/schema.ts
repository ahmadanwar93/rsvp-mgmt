import { z } from "zod";


// TODO: Future timezone support
// For now, i cannot verify against date now because of time zone difference (possibly) in server and client

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  location: z.string().min(1, "Location is required").max(200, "Location must be less than 200 characters"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  rsvpDeadline: z.string().min(1, "RSVP date is required")
}).refine((data) => {
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
    return endDateTime >= startDateTime;
  }, {
    message: "End date must be after start date",
    path: ["endDate"],
  }).refine((data) => {
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const rsvpDeadline = new Date(data.rsvpDeadline);
    return rsvpDeadline <= startDateTime;
  }, {
    message: "RSVP deadline must be before the event starts",
    path: ["rsvpDeadline"],
  });

export type CreateEventInput = z.infer<typeof createEventSchema>;