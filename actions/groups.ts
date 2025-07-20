"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createGuestGroupSchema } from "@/lib/schema";
import { ExtendedUser, showEventProps } from "@/lib/types";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { getEventById } from "./events";
import { db } from "@/src/db";
import { guestGroups } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export interface createGuestGroupProps {
  eventId: string;
  name: string;
  isVisible: boolean;
}

export async function createGuestGroup({
  eventId,
  name,
  isVisible,
}: createGuestGroupProps) {
  // for this function, we are receiving one props, and destructuring is being done straight away
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

  // TODO: maybe if got time, do a logic similar to Laravel gate
  if (
    (event.data as showEventProps).userId !== (session.user as ExtendedUser).id
  ) {
    return {
      success: false,
      error: "You are not authorized to create a guest group for this event",
    };
  }

  try {
    const validatedData = createGuestGroupSchema.parse({
      name,
      isVisible,
    });

    const newGroup = await db
      .insert(guestGroups)
      .values({
        eventId: eventId,
        name: validatedData.name,
        isVisible: validatedData.isVisible,
      })
      .returning();

    revalidatePath(`/dashboard/events/${eventId}`);

    // TODO: double check if returning() is required

    return { success: true, group: newGroup[0] };
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

export async function getGuestGroupsByEventId(eventId: string) {
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

  // TODO: maybe if got time, do a logic similar to Laravel gate
  if (
    (event.data as showEventProps).userId !== (session.user as ExtendedUser).id
  ) {
    return {
      success: false,
      error: "You are not authorized to view guest groups for this event",
    };
  }

  try {
    const groups = await db
      .select()
      .from(guestGroups)
      .where(eq(guestGroups.eventId, eventId))
      .limit(1);

    return { success: true, groups: groups[0] };
  } catch (error) {
    console.error("Failed to fetch guest groups:", error);
    return {
      success: false,
      error: "Failed to fetch guest groups. Please try again.",
    };
  }
}

export async function updateGuestGroup({
  eventId,
  name,
  isVisible,
}: createGuestGroupProps) {
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
      error: "You are not authorized to create a guest group for this event",
    };
  }

  try {
    const validatedData = createGuestGroupSchema.parse({
      name,
      isVisible,
    });

    const updatedGroup = await db
      .update(guestGroups)
      .set({
        name: validatedData.name,
        isVisible: validatedData.isVisible,
      })
      .where(eq(guestGroups.eventId, eventId))
      .returning();

    //   TODO: double check if revalidatePath is required
    revalidatePath(`/dashboard/events/${eventId}`);

    return { success: true, group: updatedGroup[0] };
  } catch (error) {
    console.error("Failed to update guest groups:", error);
    return {
      success: false,
      error: "Failed to update guest groups. Please try again.",
    };
  }
}
