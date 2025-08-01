import { z } from "zod";
import { convertToISODate } from "./utils";
import { DIETARY_RESTRICTIONS, RESPOND_STATUSES } from "./const";

// TODO: Future timezone support
// For now, i cannot verify against date now because of time zone difference (possibly) in server and client

export const createEventSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    location: z
      .string()
      .min(1, "Location is required")
      .max(200, "Location must be less than 200 characters"),
    startDate: z.string().min(1, "Start date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.string().min(1, "End date is required"),
    endTime: z.string().min(1, "End time is required"),
    rsvpDeadlineDate: z.string().min(1, "RSVP date is required"),
    rsvpDeadlineTime: z.string().min(1, "RSVP time is required"),
  })
  .refine(
    (data) => {
      const startDateISO = convertToISODate(data.startDate);
      const endDateISO = convertToISODate(data.endDate);

      const startDateTime = new Date(`${startDateISO}T${data.startTime}`);
      const endDateTime = new Date(`${endDateISO}T${data.endTime}`);

      return endDateTime >= startDateTime;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      const startDateISO = convertToISODate(data.startDate);
      const rsvpDateISO = convertToISODate(data.rsvpDeadlineDate);

      const startDateTime = new Date(`${startDateISO}T${data.startTime}`);
      const rsvpDeadline = new Date(`${rsvpDateISO}T${data.rsvpDeadlineTime}`);

      return rsvpDeadline <= startDateTime;
    },
    {
      message: "RSVP deadline must be before the event starts",
      path: ["rsvpDeadlineDate"],
    }
  );

export type CreateEventInput = z.infer<typeof createEventSchema>;

// TODO: edit event schema? id should exist in the database

export const createGuestGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isVisible: z.boolean().default(true),
});

export type CreateGuestGroupInput = z.infer<typeof createGuestGroupSchema>;

export const editInviteSchema = (guestLimit: number) =>
  z
    .object({
      respondStatus: z.nativeEnum(RESPOND_STATUSES),
      dietaryRestrictions: z.nativeEnum(DIETARY_RESTRICTIONS),
      attendingCount: z
        .number()
        .min(0, "Attending count must be greater than 0"),
    })
    .refine(
      (data) => {
        return data.attendingCount <= guestLimit;
      },
      {
        message: "Attending count must be less than or equal to guest limit",
        path: ["attendingCount"],
      }
    );

export type EditInviteInput = z.infer<ReturnType<typeof editInviteSchema>>;
