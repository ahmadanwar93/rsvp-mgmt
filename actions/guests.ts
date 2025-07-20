"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getEventById } from "./events";
import { ExtendedUser, showEventProps } from "@/lib/types";
import { db } from "@/src/db";
import { guests, guestGroups } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getGuestsByEventId(eventId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      success: false,
      error: "You must be logged in to create a guest group",
    };
  }

  const event = await getEventById(eventId);

  if (!event.success) {
    return { success: false, error: "Event not found" };
  }

  if (
    (event.data as showEventProps).userId !== (session.user as ExtendedUser).id
  ) {
    return {
      success: false,
      error: "You are not authorized to view guests for this event",
    };
  }

  try {
    const guestsList = await db
      .select({
        id: guests.id,
        eventId: guests.eventId,
        name: guests.name,
        respondStatus: guests.respondStatus,
        dietaryRestrictions: guests.dietaryRestrictions,
        group: {
          id: guestGroups.id,
          name: guestGroups.name,
        },
      })
      .from(guests)
      .innerJoin(guestGroups, eq(guests.groupId, guestGroups.id))
      .where(eq(guests.eventId, eventId));

    return { success: true, guests: guestsList };
  } catch (error) {
    console.error("Failed to fetch guest groups:", error);
    return {
      success: false,
      error: "Failed to fetch guest groups. Please try again.",
    };
  }
}

export async function getGuestById(guestId: string) {
  // This is an unprotected route. Will be used in the invitation page to check if a guest id exists
  try {
    const guest = await db.query.guests.findFirst({
      where: eq(guests.id, guestId),
    });

    return guest
      ? { success: true, guest }
      : { success: false, error: "Guest not found" };
  } catch (error) {
    // Still need to do try catch block in case of other errors like db connection issues
    console.error("Failed to fetch guest:", error);
    return {
      success: false,
      error: "Failed to fetch guest. Please try again.",
    };
  }
}
