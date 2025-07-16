import { getEventById } from "@/actions/events";
import { EditEventDialog } from "@/components/layout/editEventDialog";
import { InvitationTabs } from "@/components/layout/invitationTabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusVariant } from "@/lib/const";
import { PageProps } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import React from "react";

async function Page({ params }: PageProps) {
  const { id } = await params;

  const { data, error } = await getEventById(id);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  const eventDetail = data;

  const startDateTime = formatDateTime(eventDetail.startDateTime);
  const endDateTime = formatDateTime(eventDetail.endDateTime);
  const rsvpDeadline = formatDateTime(eventDetail.rsvpDeadline);

  return (
    <section className="container-custom">
      <div className="flex flex-col gap-2 py-4 border-b-1 border-gray-200 mb-4">
        <h1 className="text-3xl font-bold">Wedding celebration details</h1>
        <p className="text-text-grey">
          Manage all the details for your special day.
        </p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
            <p className="font-bold text-xl">Event information</p>
            <Badge
              variant={statusVariant[eventDetail.status]}
              className="rounded-full"
            >
              {eventDetail.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <EditEventDialog
              button={
                <Button
                  className="rounded-full cursor-pointer"
                  variant={"default"}
                >
                  Edit details
                </Button>
              }
              title="Edit an existing event"
              description="Let us edit some basic information."
              data={data}
            />
            {/* <DialogEvent
              button={
                <Button
                  className="rounded-full cursor-pointer"
                  variant={"outline"}
                >
                  Add attendee
                </Button>
              }
              title="Edit an existing event"
              description="Let us edit some basic information."
            /> */}
          </div>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-semibold">Event title</p>
          <p>{eventDetail.title}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-semibold">Event venue</p>
          <p>{eventDetail.location}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-semibold">Start datetime</p>
          <p>{startDateTime}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-semibold">End datetime</p>
          <p>{endDateTime}</p>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-semibold">RSVP deadline</p>
          <p>{rsvpDeadline}</p>
        </div>
      </div>
      <div className="pt-8">
        <InvitationTabs />
      </div>
    </section>
  );
}

export default Page;
