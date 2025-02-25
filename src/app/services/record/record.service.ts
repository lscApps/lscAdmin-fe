import { Month } from './../../enums/month';
import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = `${environment.apiUrl}/record`;

  constructor(
    private http: HttpClient,
  ) {}


  async updateRecord(record: Record){
    return await firstValueFrom(this.http.put(this.apiUrl, record));
  }

  addRecords(records: Array<Record>): Observable<any> {
    return this.http.post<Array<Record>>(this.apiUrl, records);
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

  getAnualRecords(year: string):Observable<any>{
    let url = `${this.apiUrl}/${year}`
    return this.http.get<Array<Record>>(url)
  }

  getRecurrentRecords():Observable<any>{
    let url = `${this.apiUrl}/recurrents`;
    return this.http.get<Array<Record>>(url);
  }

  exportAsXls(records: Array<Record>): Observable<any>{
    let url = `${this.apiUrl}/excel`

    return this.http.post(url, records, {responseType: 'blob'})
  }

  async deleteRecord(record: Record): Promise<Observable<any>>{
    let url = `${this.apiUrl}/${record.id}`
    return await this.http.delete(url);
  }

}

