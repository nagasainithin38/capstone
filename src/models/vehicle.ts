export interface Vehicle { 
    id: any; 
    number_plate: string; 
    username: string; 
    vendor_username: string; 
    images: string[]; 
    completedRides: any[]; 
    upcomingRide: any[]; 
    latitude: number; 
    longitde: number;
    currRide?:string|null|undefined;  
    MID: any; 
}