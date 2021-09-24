import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }


  getAllWorkers(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.baseUrl}`);
  }

  getAllFlightByWorkerId(workerId: number): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.baseUrl}${workerId}`);
  }

}
