import { getEventsByUserId } from "@/actions/events";
import { DialogEvent } from "@/components/layout/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusVariant } from "@/lib/const";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";

async function Page() {
  const { data, error } = await getEventsByUserId();
  // TODO: think of a better way to handle errors and no data
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <main className="container-custom">
      <section>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-4xl font-bold">Invitations</h1>
          <DialogEvent
            button={
              <Button
                className="rounded-full cursor-pointer"
                variant={"default"}
              >
                New invitation
              </Button>
            }
            title="Create a new event"
            description="Let us get some basic information to get going!"
          />
        </div>
        <div className="flex flex-col">
          {data.map((event) => {
            const startDateTime = formatDateTime(event.startDateTime);
            const endDateTime = formatDateTime(event.endDateTime);
            return (
              <Link key={event.id} href={`dashboard/events/${event.id}`}>
                <div className="py-8 border-b-1 border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{event.title}</p>
                    <div className="flex gap-3">
                      <Badge
                        variant={statusVariant[event.status]}
                        className="rounded-full"
                      >
                        {event.status}
                      </Badge>
                      <p>{event.guestNumber} guests</p>
                    </div>
                  </div>
                  <p className="text-text-grey">
                    <span>Location: </span>
                    {event.location}
                  </p>
                  <p className="text-text-grey">
                    <span>Start time: </span>
                    {startDateTime}
                  </p>
                  <p className="text-text-grey">
                    <span>End time: </span>
                    {endDateTime}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Page;
