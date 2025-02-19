import { Month } from './../../enums/month';
import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = `${environment.apiUrl}/record`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
  ) {}


  addRecords(records: Array<Record>): Observable<any> {
    return this.http.post<Array<Record>>(this.apiUrl, records, this.httpOptions);
  }

  getRecordsByRange(dtInit: string, dtEnd: string): Observable<any>{
    const params = new HttpParams()
      .set('dtInit', dtInit)
      .set('dtEnd', dtEnd)

    return this.http.get<Array<Record>>(this.apiUrl, {params})
  }

  getMonthlyRecords(year: string, month: string){
    let url = `${this.apiUrl}/${year}/${month}`
    return this.http.get<Array<Record>>(url)
  }

  getAnualRecords(year: string){
    let url = `${this.apiUrl}/${year}`
    return this.http.get<Array<Record>>(url)
  }


}

