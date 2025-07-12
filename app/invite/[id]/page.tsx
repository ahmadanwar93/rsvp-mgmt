import InvitationForm from "@/components/layout/invitationForm";
import { mockIndividualGuest } from "@/lib/const";
// import { PageProps } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import React from "react";

async function Page() {
  // put params back into function later
  // { params }: PageProps
  //   const { id } = await params;
  //   replce this with server actions
  const guest = mockIndividualGuest;
  const startDateTime = formatDateTime(guest.event.startDateTime);
  const endDateTime = formatDateTime(guest.event.endDateTime);
  return (
    <section className="container-custom text-center">
      <div className="pb-8 border-b-1 border-gray-100">
        <p className="font-bold text-4xl pb-4">Hi,{guest.name} </p>
        <p className="font-semibold text-xl">You`&apos;`re invited</p>
        <p className="font-light pb-5">Join us for the wedding of</p>
        <p className="font-bold text-2xl pb-5">{guest.event.title}</p>
        <p className="font-thin">
          <span className="font-normal">From: </span>
          {startDateTime}
        </p>
        <p className="font-thin">
          <span className="font-normal">To: </span> {endDateTime}
        </p>
        <p className="font-thin">
          <span className="font-normal">Venue: </span> {guest.event.location}
        </p>
      </div>
      <InvitationForm guest={guest} />
    </section>
  );
}

export default Page;
