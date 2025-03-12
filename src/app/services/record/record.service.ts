import { Month } from './../../enums/month';
import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportRequest } from '../../models/report-request';
import { Constants } from '../../constants';

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

  async getRecordsByRange(dtInit: string, dtEnd: string): Promise<ReportRequest>{
    const params = new HttpParams()
      .set('dtInit', dtInit)
      .set('dtEnd', dtEnd)

    return await firstValueFrom(this.http.get<ReportRequest>(this.apiUrl, {params}));
  }

  async getMonthlyRecords(year: string, month: string): Promise<ReportRequest>{
    let url = `${this.apiUrl}/${year}/${month}`
    return await firstValueFrom(this.http.get<ReportRequest>(url));
  }

  async getAnualRecords(year: string):Promise<ReportRequest>{
    let url = `${this.apiUrl}/${year}`
    return await firstValueFrom(this.http.get<ReportRequest>(url));
  }

  async getRecurrentRecords():Promise<Array<Record>>{
    let url = `${this.apiUrl}/recurrents`;
    return await firstValueFrom(this.http.get<Array<Record>>(url));
  }

  //Types = 'pdf' or 'excel'
  async exportReport(reportRequest: ReportRequest):Promise<Blob>{
    let url = `${this.apiUrl}/${reportRequest.type}`;

    let pdfRequestBody = {
      records : reportRequest.records,
      dtInit: reportRequest.dtInit,
      dtEnd: reportRequest.dtEnd
    };

    let requestBody =  reportRequest.type == Constants.PDF ? pdfRequestBody : reportRequest.records;
    

    return await firstValueFrom(this.http.post(url, requestBody, {responseType: 'blob'}));
  }

  async deleteRecord(record: Record){
    let url = `${this.apiUrl}/${record.id}`
    return await firstValueFrom(this.http.delete(url));
  }

}

