"use server";

import { getEventSummaryProps } from "@/lib/types";
import { getEventById } from "./events";
import { db } from "@/src/db";
import { guests } from "@/src/db/schema";
import { and, count, eq, sum } from "drizzle-orm";

// TODO: modify the UI such that the first row is the combined
// Total invitation sent
// Total invitation accepted, total attending guests
// Total invitation declined, total not attending guests
// Total invitation pending, total potential guests

// Dietary requiremetns for attending guests
// Maybe put a note that this is not inclusive of pending/ declined guests

export async function getEventSummary({ eventId }: getEventSummaryProps) {
  // auth check is done in getEventById, so I dont have to do it here

  //   TODO: is this the best way to handle error? I mean I am returning the same error message
  const event = await getEventById(eventId);
  if (!event.success) {
    return {
      success: false,
      error: "Failed to fetch event. Please try again.",
    };
  }

  try {
    const responseStats = db
      .select({
        respondStatus: guests.respondStatus,
        invitationSent: count(guests.id),
        totalGuests: sum(guests.attendingCount),
        // for attending, use totalGuests, for pending use potentialGuests
        potentialGuests: sum(guests.guestLimit),
      })
      .from(guests)
      .where(eq(guests.eventId, eventId))
      .groupBy(guests.respondStatus);

    const dietaryRestrictions = db
      .select({
        dietaryRestrictions: guests.dietaryRestrictions,
        count: count(guests.id),
      })
      .from(guests)
      .where(
        and(eq(guests.eventId, eventId), eq(guests.respondStatus, "attending"))
      )
      .groupBy(guests.dietaryRestrictions);

    return { success: true, responseStats, dietaryRestrictions };
  } catch (error) {
    console.error("Failed to fetch event summary:", error);
    return {
      success: false,
      error: "Failed to fetch event summary. Please try again.",
    };
  }
}
