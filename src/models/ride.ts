export interface Ride {
    Id: any;
    rideStatus: RideStatus;
    from: string; 
    to: string; 
    start: string; 
    end: string; 
    date: string; 
    passengerList: string[]; 
}

enum RideStatus { PENDING = 'PENDING', CONFIRMED = 'CONFIRMED', CANCELLED = 'CANCELLED', }