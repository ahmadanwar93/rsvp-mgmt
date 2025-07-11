export interface Invitation {
    id: string,
    title: string,
    location: string,
    startDateTime: string,
    endDateTime: string,
}

export interface InvitationList extends Invitation{
    guestNumber: number,
    status: 'draft' | 'active' | 'elapsed'
}