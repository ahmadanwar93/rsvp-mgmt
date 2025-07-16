"use server";
import { createEventSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { db } from "@/src/db";
import { events, guests, InsertEvent } from "@/src/db/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { EventInvitationProps } from "@/lib/types";
import { eq, sql } from "drizzle-orm";

// TODO: not sure if this is the best way to do this
interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

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
    rsvpDeadline: formData.get("rsvpDeadline") as string,
  };

  try {
    const validatedData = createEventSchema.parse(rawData);
    const eventStartDatetime = new Date(
      `${validatedData.startDate}T${validatedData.startTime}`
    );
    const eventEndDatetime = new Date(
      `${validatedData.endDate}T${validatedData.endTime}`
    );
    // For now, I put it at the start of the day
    const rsvpDeadline = new Date(`${validatedData.rsvpDeadline}T00:00:00`);

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

export async function indexEvent(): Promise<{
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
