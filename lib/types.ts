import { DIETARY_RESTRICTIONS, RESPOND_STATUSES } from "./const";

export interface InvitationEventProps {
  id: string;
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
}

export interface EventInvitationProps extends InvitationEventProps {
  guestNumber: number;
  status: "draft" | "active" | "elapsed";
}

export interface DateTimePickerProps {
  dateLabel?: string;
  timeLabel?: string;
  dateName: string;
  timeName: string;
  defaultDate?: Date;
  defaultTime?: string;
}
export interface DialogEventProps {
  button: React.ReactNode;
  title: string;
  description: string;
  data?: showEventProps;
}
export interface EditEventDialogProps {
  button: React.ReactNode;
  title: string;
  description: string;
  data: showEventProps;
}

export type RespondStatus =
  (typeof RESPOND_STATUSES)[keyof typeof RESPOND_STATUSES];
export type DietaryRestriction =
  (typeof DIETARY_RESTRICTIONS)[keyof typeof DIETARY_RESTRICTIONS];

export interface InvitationGuestProps {
  id: string;
  name: string;
  respond_status: RespondStatus;
  attendees_count: number;
  dietary_restrictions: DietaryRestriction;
  responded_at: string;
  created_at: string;
}

export interface InvitationGuestListProps extends InvitationGuestProps {
  guestGroup: string;
}

export interface InvitedToolTipProps {
  invited_at: string;
}
export interface NavbarProps {
  isAuth?: boolean;
}
export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface DetailedInvitationEventProps extends InvitationEventProps {
  guestNumber: number;
}
export interface BaseIndividualGuestProps extends InvitationGuestProps {
  event: DetailedInvitationEventProps;
}

// if the guest_group has can_see_others equals false, the attendee list will be empty and guestGroup equals null because I am not exposing the guestGroup name
export type IndividualGuestProps =
  | (BaseIndividualGuestProps & {
      guestGroup: string;
      attendees: string[];
    })
  | (BaseIndividualGuestProps & {
      guestGroup: null;
      attendees: null;
    });

// TODO: redo the types of the event, use less inheritance
export interface showEventProps {
  id: string;
  userId: string;
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  status: "draft" | "active" | "elapsed";
  rsvpDeadline: string;
}

// TODO: not sure if this is the best way to do this
export interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface attendingGuest {
  name: string;
}

export interface getEventSummaryProps {
  eventId: string;
}

export interface DeleteGuestByIdProps {
  guestId: string;
}
export interface GetGuestByIdProps {
  guestId: string;
}
export interface GetGuestsByEventIdProps {
  eventId: string;
}
