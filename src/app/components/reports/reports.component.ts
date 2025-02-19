import { RecordService } from './../../services/record/record.service';
import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { RecordType } from '../../enums/record_type';
import { ReportType } from '../../enums/report_type';
import { NgClass, NgFor, NgIf, UpperCasePipe, CurrencyPipe } from '@angular/common';
import { SelectItem } from '../../models/selectItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Month } from '../../enums/month';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  providers:[CurrencyPipe]
})
export class ReportsComponent implements OnInit{

  recordList: Record[] =[];
  reportTypeList: SelectItem[] = []
  months: SelectItem[] = [];
  reportForm: FormGroup;
  totalIncome  = 0;
  totalExpense = 0;
  balance = 0;

  constructor(private recordService: RecordService, private fb: FormBuilder){
    this.reportForm = this.startForm()
    this.months = Month.getAll()
  }
  
  
  ngOnInit(): void {
    this.reportTypeList = ReportType.getAll();
    
  }

  getRecordType(recordTypedId: number){
    return RecordType.getById(recordTypedId)?.name;
  }

  startForm(){
      return this.fb.group({
        reportType: [0, [Validators.required, Validators.min(1)]],
        yearSelected: [new Date().getFullYear(), []],
        monthSelected: [-1, []],
        dtInit: ["",[]],
        dtEnd: ["",[]]  
      })
    }

  invokeReport(){
    console.log('Invoking Report: ', this.reportForm.get('reportType')?.value);
    let reportId = Number.parseInt(this.reportForm.get('reportType')?.value);
    switch(reportId){
      case ReportType.ANUAL.id:
        console.log('Not implemented');
        this.getAnualReport();
        break;
      case ReportType.MONTHLY.id:
        console.log('Invoking Monthly report');
        this.getMonthlyReport();
        break;
      case ReportType.CUSTOM.id:
        console.log('Invoking CUSTOM');        
        this.getReportByRange();
        break;
    }


    if(this.reportForm.get('reportType')?.value == ReportType.CUSTOM.id){

    }
  }


  calculateInOut(){
    this.totalIncome = 0;
    this.totalExpense = 0;
    for(let r of this.recordList){
      if (r.recordType == RecordType.INCOME.id)
        this.totalIncome += r.amount;
      else
        this.totalExpense += r.amount; 
    }

    this.balance = this.totalIncome - this.totalExpense;
  }

  getAnualReport(){
    this.recordService.getAnualRecords(this.reportForm.get('yearSelected')?.value).subscribe({
      next:(n) =>{
        console.log(n);
        this.recordList = n;
        this.calculateInOut();
      },
      error: e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    })
  }

  getMonthlyReport(){
    let year = this.reportForm.get('yearSelected')?.value
    let month = this.reportForm.get('monthSelected')?.value
    this.recordService.getMonthlyRecords(year, month).subscribe({
      next:(n) =>{
        console.log(n);
        this.recordList = n;
        this.calculateInOut();
      },
      error: e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    })
  }

  getReportByRange(){
    let dtInit: string = this.reportForm.get('dtInit')?.value
    let dtEnd: string = this.reportForm.get('dtEnd')?.value
    this.recordService.getRecordsByRange(dtInit, dtEnd).subscribe({
      next:(n) =>{
        console.log(n);
        this.recordList = n;
        this.calculateInOut();
      },
      error: e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    })

  }

}
