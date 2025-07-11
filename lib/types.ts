export interface InvitationProps {
    id: string,
    title: string,
    location: string,
    startDateTime: string,
    endDateTime: string,
}

export interface InvitationListProps extends InvitationProps{
    guestNumber: number,
    status: 'draft' | 'active' | 'elapsed'
}

export interface dateTimePickerProps {
  dateLabel?: string;
  timeLabel?: string;
}
export interface DialogEventProps {
    button: React.ReactNode;
    title: string;
    description: string;
  }