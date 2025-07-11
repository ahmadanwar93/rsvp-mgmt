import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { example } from "@/lib/const";
import { formatDateTime } from "@/lib/utils";
import React from "react";

// example data
// TODO: replace with server action later
const exampleData = example;

const statusVariant = {
  draft: "outline-draft",
  active: "outline-active",
  elapsed: "outline-elapsed",
} as const;

function Page() {
  return (
    <main className="container-custom">
      <section>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-4xl font-bold">Invitations</h1>
          <Button className="rounded-full" variant={"default"}>
            New invitation
          </Button>
        </div>
        <div className="flex flex-col">
          {exampleData.map((event) => {
            const startDateTime = formatDateTime(event.startDateTime);
            const endDateTime = formatDateTime(event.endDateTime);
            return (
              <div key={event.id} className="py-8 border-b-1 border-gray-200">
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
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Page;
