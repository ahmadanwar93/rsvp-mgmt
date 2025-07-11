import { DialogEvent } from "@/components/layout/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { example, statusVariant } from "@/lib/const";
import { formatDateTime } from "@/lib/utils";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: PageProps) {
  const { id } = await params;

  // replace this with server actions later
  const eventDetail = example.find((event) => event.id === id);
  if (!eventDetail) {
    return null;
  }

  const startDateTime = formatDateTime(eventDetail.startDateTime);
  const endDateTime = formatDateTime(eventDetail.endDateTime);

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
          <DialogEvent
            button={
              <Button
                className="rounded-full cursor-pointer"
                variant={"default"}
              >
                Edit invitation
              </Button>
            }
            title="Edit an existing event"
            description="Let us edit some basic information to get going!"
          />
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
      </div>
    </section>
  );
}

export default Page;
