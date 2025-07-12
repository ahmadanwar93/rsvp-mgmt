import { DIETARY_RESTRICTIONS, RESPOND_STATUSES } from "./const";

export interface InvitationEventProps {
    id: string,
    title: string,
    location: string,
    startDateTime: string,
    endDateTime: string,
}

export interface EventInvitationProps extends InvitationEventProps{
    guestNumber: number,
    status: 'draft' | 'active' | 'elapsed'
}

export interface DateTimePickerProps {
  dateLabel?: string;
  timeLabel?: string;
}
export interface DialogEventProps {
    button: React.ReactNode;
    title: string;
    description: string;
  }

export type RespondStatus = typeof RESPOND_STATUSES[keyof typeof RESPOND_STATUSES];
export type DietaryRestriction = typeof DIETARY_RESTRICTIONS[keyof typeof DIETARY_RESTRICTIONS];

export interface InvitationGuestProps {
  id: string
  name: string
  respond_status: RespondStatus
  attendees_count: number
  dietary_restrictions: DietaryRestriction
  guest_group: string
  responded_at: string
  created_at: string
}

export interface InvitedToolTipProps {
  invited_at: string
}