"use server";
import { createEventSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { db } from "@/src/db";
import { events, guests, InsertEvent } from "@/src/db/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  EventInvitationProps,
  ExtendedUser,
  showEventProps,
} from "@/lib/types";
import { and, eq, sql } from "drizzle-orm";
import { convertToISODate } from "@/lib/utils";

export async function createEvent(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      success: false,
      error: "You must be logged in to create an event",
    };
  }

  const rawData = {
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    startDate: formData.get("startDate") as string,
    startTime: formData.get("startTime") as string,
    endDate: formData.get("endDate") as string,
    endTime: formData.get("endTime") as string,
    rsvpDeadlineDate: formData.get("rsvpDeadlineDate") as string,
    rsvpDeadlineTime: formData.get("rsvpDeadlineTime") as string,
  };

  try {
    const validatedData = createEventSchema.parse(rawData);

    const startDateISO = convertToISODate(validatedData.startDate);
    const rsvpDateISO = convertToISODate(validatedData.rsvpDeadlineDate);
    const endDateISO = convertToISODate(validatedData.endDate);

    const eventStartDatetime = new Date(
      `${startDateISO}T${validatedData.startTime}`
    );
    const eventEndDatetime = new Date(`${endDateISO}T${validatedData.endTime}`);
    const rsvpDeadline = new Date(
      `${rsvpDateISO}T${validatedData.rsvpDeadlineTime}`
    );

    const eventData: InsertEvent = {
      userId: (session.user as ExtendedUser).id,
      title: validatedData.title,
      location: validatedData.location,
      eventStartDatetime,
      eventEndDatetime,
      rsvpDeadline,
      status: "draft" as const,
    };

    const newEvent = await db.insert(events).values(eventData).returning();
    // db.insert(tableName).values(formData) -> convention

    revalidatePath("/dashboard");

    return { success: true, eventId: newEvent[0].id };
  } catch (error) {
    // TODO: maybe all schema errors should be handled as such
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return { success: false, error: errorMessage };
    }

    console.error("Failed to create event:", error);
    return {
      success: false,
      error: "Failed to create event. Please try again.",
    };
  }
}

export async function getEventsByUserId(): Promise<{
  success: boolean;
  data?: EventInvitationProps[];
  error?: string;
}> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: "You must be logged in to view events" };
  }

  try {
    const eventsWithGuestCounts = await db
      .select({
        id: events.id,
        title: events.title,
        location: events.location,
        eventStartDatetime: events.eventStartDatetime,
        eventEndDatetime: events.eventEndDatetime,
        status: events.status,
        guestCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${guests} 
          WHERE ${guests.eventId} = ${events.id}
        )`.as("guestCount"),
      })
      .from(events)
      .where(eq(events.userId, (session.user as ExtendedUser).id));

    // Transform the data to match EventInvitationProps interface
    const formattedEvents: EventInvitationProps[] = eventsWithGuestCounts.map(
      (event) => ({
        id: event.id,
        title: event.title,
        location: event.location,
        startDateTime: event.eventStartDatetime.toISOString(),
        endDateTime: event.eventEndDatetime.toISOString(),
        guestNumber: event.guestCount,
        status: event.status,
      })
    );

    return { success: true, data: formattedEvents };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return {
      success: false,
      error: "Failed to fetch events. Please try again.",
    };
  }
}

export async function getEventById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: "You must be logged in to view an event" };
  }

  try {
    const event = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.id, id),
          eq(events.userId, (session.user as ExtendedUser).id)
        )
      )
      .limit(1);

    const formattedEvent: showEventProps = {
      id: event[0].id,
      title: event[0].title,
      location: event[0].location,
      startDateTime: event[0].eventStartDatetime.toISOString(),
      endDateTime: event[0].eventEndDatetime.toISOString(),
      status: event[0].status,
      rsvpDeadline: event[0].rsvpDeadline.toISOString(),
      userId: event[0].userId,
    };

    return { success: true, data: formattedEvent, unformattedData: event[0] };
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return {
      success: false,
      error: "Failed to fetch event. Please try again.",
    };
  }
}

export async function updateEvent(eventId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      success: false,
      error: "You must be logged in to update an event",
    };
  }

  const rawData = {
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    startDate: formData.get("startDate") as string,
    startTime: formData.get("startTime") as string,
    endDate: formData.get("endDate") as string,
    endTime: formData.get("endTime") as string,
    rsvpDeadlineDate: formData.get("rsvpDeadlineDate") as string,
    rsvpDeadlineTime: formData.get("rsvpDeadlineTime") as string,
  };

  try {
    const validatedData = createEventSchema.parse(rawData);

    const startDateISO = convertToISODate(validatedData.startDate);
    const rsvpDateISO = convertToISODate(validatedData.rsvpDeadlineDate);
    const endDateISO = convertToISODate(validatedData.endDate);

    const eventStartDatetime = new Date(
      `${startDateISO}T${validatedData.startTime}`
    );
    const eventEndDatetime = new Date(`${endDateISO}T${validatedData.endTime}`);
    const rsvpDeadline = new Date(
      `${rsvpDateISO}T${validatedData.rsvpDeadlineTime}`
    );

    const eventData: InsertEvent = {
      userId: (session.user as ExtendedUser).id,
      title: validatedData.title,
      location: validatedData.location,
      eventStartDatetime,
      eventEndDatetime,
      rsvpDeadline,
      status: "draft" as const,
    };

    const updatedEvent = await db
      .update(events)
      .set(eventData)
      .where(eq(events.id, eventId))
      .returning();

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/events/${eventId}`);

    return { success: true, event: updatedEvent[0] };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return { success: false, error: errorMessage };
    }

    console.error("Failed to create event:", error);
    return {
      success: false,
      error: "Failed to create event. Please try again.",
    };
  }
}
