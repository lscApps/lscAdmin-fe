import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom} from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReportRequest } from '../../models/report-request';
import { Constants } from '../../constants';
import { RecordType } from '../../enums/record_type';
import { RecurrentType } from '../../enums/recurent_type';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = `${environment.apiUrl}/record`;
  private options;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.options = authService.getAuthorizationHeader();
  }


  async updateRecord(record: Record){
    return await firstValueFrom(this.http.put(this.apiUrl, record, this.options));
  }

  async addRecords(records: Array<Record>): Promise<Array<Record>> {
    return await firstValueFrom(this.http.post<Array<Record>>(this.apiUrl, records, this.options));
  }

  async getRecordsByRange(dtInit: string, dtEnd: string): Promise<ReportRequest>{
    let params= new HttpParams()
    .set('dtInit', dtInit)
    .set('dtEnd', dtEnd)

    const options = {
      ...this.options,
      params
    }

    return await firstValueFrom(this.http.get<ReportRequest>(this.apiUrl, options));
  }

  async getMonthlyRecords(year: string, month: string): Promise<ReportRequest>{
    let url = `${this.apiUrl}/${year}/${month}`;
    return await firstValueFrom(this.http.get<ReportRequest>(url, this.options));
  }

  async getAnualRecords(year: string): Promise<ReportRequest>{
    let url = `${this.apiUrl}/${year}`;
    return await firstValueFrom(this.http.get<ReportRequest>(url, this.options));
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
    
    const responseType: 'json' | 'text' | 'blob' = 'blob';
    const options = {
      ...this.options,
      responseType: responseType
    }

    return await firstValueFrom(this.http.post(url, requestBody, options));
  }

  async deleteRecord(record: Record){
    let url = `${this.apiUrl}/${record.id}`
    return await firstValueFrom(this.http.delete(url, this.options));
  }

  getRecordType(record: Record){
    if(record.recordType == RecordType.RECURRING.id){
      return RecurrentType.getById(record.recurringType)?.name;
    }

    return RecordType.getById(record.recordType)?.name;
  }

}

