import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
  ) {}


  addRecords(records: Array<Record>): Observable<any> {
    const url = `${this.apiUrl}/record`;
    return this.http.post<Array<Record>>(url, records, this.httpOptions);
  }

}

