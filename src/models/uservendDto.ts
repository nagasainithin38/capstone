import { Employee } from "./employee";
import { Organisation } from "./organisation";
import { Userr } from "./userr";
import { Vehicle } from "./vehicle";
import { vendor } from "./vendor";

export interface UserVendorDto{
    userr?:Userr;

    vendor?:vendor;

    organisation?:Organisation;

    vehicle?:Vehicle;

    employee?:Employee;

    token?:string;
}