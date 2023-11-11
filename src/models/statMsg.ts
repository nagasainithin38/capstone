export interface StatMsg{
    status:ReqStatus;
    message:string
}

export enum ReqStatus { 
    CREATED = 'CREATED', 
    DELETED = 'DELETED', 
    UPDATED = 'UPDATED', 
    ERROR = 'ERROR', 
    FAILED = 'FAILED', 
    SUCCESS = 'SUCCESS'
 }

enum RideStatus { 
ASSIGNED = 'ASSIGNED', 
STARTED = 'STARTED', 
ENDED = 'ENDED'
 }