export interface Booking{
    Id:any;
    MID: string;
    organisationUsername: string;
    date: string;
    status: BookingStatus;
    from: string;
    to: string;
}
export enum BookingStatus {

    PENDING='PENDING',
    ASSIGNED='ASSIGNED',
    COMPLETED='COMPLETED',
    STARTED='STARTED',
    REJECTED='REJECTED'
}