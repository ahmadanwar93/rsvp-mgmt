"use server";

import { guests } from "@/src/db/schema";
import { getGuestById } from "./guests";
import { db } from "@/src/db";
import { and, eq } from "drizzle-orm";
import { attendingGuest, DietaryRestriction, RespondStatus } from "@/lib/types";
import { editInviteSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function getInviteByGuestId({ guestId }: { guestId: string }) {
  const guest = await getGuestById(guestId);

  if (!guest.success) {
    return {
      success: false,
      error: "Guest not found",
    };
  }

  try {
    const inviteInfo = await db.query.guests.findFirst({
      where: eq(guests.id, guestId),
      with: {
        // do not need to check if guest.eventId equals events.id because guest is unique
        guestGroup: true,
        event: true,
      },
    });

    if (!inviteInfo) {
      return {
        success: false,
        error: "Failed to fetch invite info. Please try again.",
      };
    }

    let groupMembers: attendingGuest[] = [];

    if (!inviteInfo.guestGroup.isVisible) {
      groupMembers = await db.query.guests.findMany({
        where: and(
          eq(guests.groupId, inviteInfo.guestGroup.id),
          eq(guests.eventId, inviteInfo.event.id),
          eq(guests.respondStatus, "attending")
        ),
        columns: {
          name: true,
        },
      });
    }

    return {
      guest: {
        id: inviteInfo.id,
        name: inviteInfo.name,
        respondStatus: inviteInfo.respondStatus,
        dietaryRestrictions: inviteInfo.dietaryRestrictions,
        guestLimit: inviteInfo.guestLimit,
        attendingCount: inviteInfo.attendingCount,
      },
      group: {
        id: inviteInfo.guestGroup.id,
        name: inviteInfo.guestGroup.name,
        members: groupMembers,
      },
      event: {
        id: inviteInfo.event.id,
        title: inviteInfo.event.title,
        startDateTime: inviteInfo.event.eventStartDatetime,
        endDateTime: inviteInfo.event.eventEndDatetime,
        rsvpDeadline: inviteInfo.event.rsvpDeadline,
      },
    };
  } catch (error) {
    console.error("Failed to fetch invite info:", error);
    return {
      success: false,
      error: "Failed to fetch invite info. Please try again.",
    };
  }
}

export interface updateInviteProps {
  guestId: string;
  respondStatus: RespondStatus;
  dietaryRestrictions: DietaryRestriction;
  attendingCount: number;
  guestLimit: number;
}

export async function updateInviteByGuestId({
  guestId,
  respondStatus,
  dietaryRestrictions,
  attendingCount,
  guestLimit,
}: updateInviteProps) {
  const guest = await getGuestById(guestId);

  if (!guest.success) {
    return {
      success: false,
      error: "Guest not found",
    };
  }

  try {
    const validatedData = editInviteSchema(guestLimit).parse({
      respondStatus,
      dietaryRestrictions,
      attendingCount,
    });

    const updatetedInvite = await db
      .update(guests)
      .set({
        respondStatus: validatedData.respondStatus,
        dietaryRestrictions: validatedData.dietaryRestrictions,
        attendingCount: validatedData.attendingCount,
      })
      .where(eq(guests.id, guestId))
      .returning();

    revalidatePath(`/invite/${guestId}`);

    return { success: true, event: updatetedInvite[0] };
  } catch (error) {
    console.error("Failed to update invite info:", error);
    return {
      success: false,
      error: "Failed to update invite info. Please try again.",
    };
  }
}
