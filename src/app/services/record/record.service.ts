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

  async addRecords(records: Array<Record>): Promise<Array<Record>> {
    return await firstValueFrom(this.http.post<Array<Record>>(this.apiUrl, records));
  }

  async getRecordsByRange(dtInit: string, dtEnd: string): Promise<Array<Record>>{
    const params = new HttpParams()
      .set('dtInit', dtInit)
      .set('dtEnd', dtEnd)

    return await firstValueFrom(this.http.get<Array<Record>>(this.apiUrl, {params}));
  }

  async getMonthlyRecords(year: string, month: string): Promise<Array<Record>>{
    let url = `${this.apiUrl}/${year}/${month}`
    return await firstValueFrom(this.http.get<Array<Record>>(url));
  }

  async getAnualRecords(year: string):Promise<Array<Record>>{
    let url = `${this.apiUrl}/${year}`
    return await firstValueFrom(this.http.get<Array<Record>>(url));
  }

  async getRecurrentRecords():Promise<Array<Record>>{
    let url = `${this.apiUrl}/recurrents`;
    return await firstValueFrom(this.http.get<Array<Record>>(url));
  }

  async exportAsXls(records: Array<Record>):Promise<Blob>{
    let url = `${this.apiUrl}/excel`

    return await firstValueFrom(this.http.post(url, records, {responseType: 'blob'}));
  }

  async deleteRecord(record: Record){
    let url = `${this.apiUrl}/${record.id}`
    return await firstValueFrom(this.http.delete(url));
  }

}

