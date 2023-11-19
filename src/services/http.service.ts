import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqStatus, StatMsg } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { LoginService } from './login.service';
import { Vehicle } from 'src/models/vehicle';
import { Booking } from 'src/models/booking';
import { Ride } from 'src/models/ride';
import { LatLon } from 'src/models/Latlon';
import { vendor } from 'src/models/vendor';
import { Organisation } from 'src/models/organisation';
import { Userr } from 'src/models/userr';
import { Employee } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  backendUrl: string = "http://localhost:8080/"

  getDetailsBytoken(token: string): Observable<any> {
    // console.warn("http://localhost:8080/"+`user/isLogin?token=${token}`)
    return this.http.get(this.backendUrl + `user/isLogin?token=${token}`)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.backendUrl + "user/login", { username, password })
  }

  logout(username: string): Observable<StatMsg> {
    return this.http.get<StatMsg>(this.backendUrl + `user/logout?username=${username}`)
  }

  signin(body: UserVendorDto): Observable<StatMsg> {
    return this.http.post<StatMsg>(this.backendUrl + "user/add", body)
  }
  addVehicleOrEmployee(body: UserVendorDto, code: string): Observable<StatMsg> {
    return this.http.post<StatMsg>(this.backendUrl + "user/add?code=" + code, body)
  }


  getAllVehicles(username: string): Observable<Array<Vehicle>> {

    return this.http.get<Array<Vehicle>>(this.backendUrl + "vehicle/getall?username=" + username)
  }

  bookCab(body: Booking, username: string): Observable<StatMsg> {

    return this.http.post<StatMsg>(this.backendUrl + "ride/toHome?username=" + username, body)
  }


  getOrganisationList(username: string): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backendUrl + "ride/getOrganisations?username=" + username);
  }


  getPendingBookings(username: string): Observable<Array<Booking>> {
    return this.http.get<Array<Booking>>(this.backendUrl + "ride/pendingBookings?organisationUsername=" + username);
  }

  createRide(body: any, username: string): Observable<StatMsg> {
    return this.http.post<StatMsg>(this.backendUrl + "ride/createRide?username=" + username, body);
  }

  getRideDetails(rideId: string): Observable<Booking> {
    return this.http.get<Booking>(this.backendUrl + "ride/getRideDetails?mid=" + rideId)
  }


  getVehicleAllRideDetails(rideIds: Array<string>): Observable<Array<Ride>> {
    return this.http.post<Array<Ride>>(this.backendUrl + "ride/getAllVehicleRideDetails", { rideIds });
  }

  startRide(username: string, rideId: string): Observable<StatMsg> {
    return this.http.get<StatMsg>(this.backendUrl + `ride/startRide?username=${username}&rideId=${rideId}`);
  }

  getRideEmpDetails(rideId: string): Observable<Array<Booking>> {

    return this.http.get<Array<Booking>>(this.backendUrl + "ride/getRideEmpDetails?rideId=" + rideId);
  }

  updateLoc(username: string, lat: number, lon: number): Observable<ReqStatus> {
    return this.http.put<ReqStatus>(this.backendUrl + `ride/updateLoc?username=${username}&latitude=${lat}&longitude=${lon}`, {})
  }


  getLatLon(username: string): Observable<LatLon> {
    return this.http.get<LatLon>(this.backendUrl + "ride/getLatLon?username=" + username);
  }

  endRide(username: string): Observable<StatMsg> {
    return this.http.get<StatMsg>(this.backendUrl + "ride/endRide?username=" + username);
  }

  getPending(type: string, status: string): Observable<Array<UserVendorDto>> {
    return this.http.get<Array<UserVendorDto>>(this.backendUrl + `admin/${status}?type=${type}`)
  }

  approve(username: string): Observable<StatMsg> {
    return this.http.get<StatMsg>(this.backendUrl + "admin/verify?username=" + username)
  }

  getVendorList(): Observable<Array<vendor>> {
    return this.http.get<Array<vendor>>(this.backendUrl + "admin/getVendorList")
  }

  getUnassignedOrgs(): Observable<Array<Organisation>> {
    return this.http.get<Array<Organisation>>(this.backendUrl + "admin/getUnOrganisationList")
  }
  map(vun: string, oun: string): Observable<StatMsg> {
    return this.http.get<StatMsg>(this.backendUrl + `admin/map?vun=${vun}&oun=${oun}`)
  }

  getCompletedRides(username: string): Observable<Array<Booking>> {

    return this.http.get<Array<Booking>>(this.backendUrl + "user/getCompletedRides?username=" + username);
  }

  sos(username: string, name: string, number: string, org_username: string, url: string): Observable<StatMsg> {
    return this.http.post<StatMsg>(this.backendUrl + "user/sos", {
      username,
      name, number,
      org_username,
      url
    })
  }

  getMappedDetails(username: string): Observable<Array<UserVendorDto>> {
    return this.http.get<Array<UserVendorDto>>(this.backendUrl + "user/getEmpList?username=" + username)
  }


  updateOrg(body:UserVendorDto):Observable<StatMsg>{
    return this.http.put<StatMsg>(this.backendUrl+"user/updateDetails",body)
  }


  getAssignedList():Observable<Array<Organisation>>{
    return this.http.get<Array<Organisation>>(this.backendUrl+"admin/getassignedList")
  }

  unassign(username:string):Observable<StatMsg>{
    return this.http.get<StatMsg>(this.backendUrl+"user/unassign?username="+username);
  }

  deleteEmp(username:string):Observable<StatMsg>{
    return this.http.delete<StatMsg>(this.backendUrl+"user/user?username="+username)
  }

}
