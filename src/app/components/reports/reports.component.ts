import { RecordService } from './../../services/record/record.service';
import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { RecordType } from '../../enums/record_type';
import { ReportType } from '../../enums/report_type';
import { NgClass, NgFor, NgIf, UpperCasePipe, CurrencyPipe } from '@angular/common';
import { SelectItem } from '../../models/selectItem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Month } from '../../enums/month';
import { DepartmentService } from '../../services/department/department.service';
import { Department } from '../../models/department';
import { RecurrentType } from '../../enums/recurent_type';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  providers:[CurrencyPipe]
})
export class ReportsComponent implements OnInit{

  @Input() isManageble: boolean = false;

  loading:boolean = false;

  recordList: Record[] =[];
  departmentList: Department[] = [];
  reportTypeList: SelectItem[] = [];
  months: SelectItem[] = [];
  reportForm: FormGroup;
  totalIncome  = 0;
  totalExpense = 0;
  balance = 0;

  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){
    this.reportForm = this.startForm()
    this.months = Month.getAll()
  } 
  
  ngOnInit(): void {
    this.featchDepartments();
    this.reportTypeList = ReportType.getAll();

    
  }

  featchDepartments(){
    this.departmentService.getAllDepartments().then(
      response=>{
        this.departmentList = response;
      },
      error =>{
        console.log('Error featching Departments: ', error.message);
      }
    );
  }

  getRecordType(record: Record){
    if(record.recordType == RecordType.RECURRING.id){
      return RecurrentType.getById(record.recurringType)?.name;
    }

    return RecordType.getById(record.recordType)?.name;
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

  async invokeReport(){
    this.loading=true;
    console.log('Invoking Report: ', this.reportForm.get('reportType')?.value);
    let reportId = Number.parseInt(this.reportForm.get('reportType')?.value);
    switch(reportId){
      case ReportType.ANUAL.id:
        console.log('Not implemented');
        await this.getAnualReport();
        break;
      case ReportType.MONTHLY.id:
        console.log('Invoking Monthly report');
        await this.getMonthlyReport();
        break;
      case ReportType.CUSTOM.id:
        console.log('Invoking CUSTOM');        
        await this.getReportByRange();
        break;
    }
    
    this.loading=false;
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

  async getAnualReport(){
    await this.recordService.getAnualRecords(this.reportForm.get('yearSelected')?.value).then(
      (n) =>{
        console.log(n);
        this.recordList = n;
        this.calculateInOut();
      },
      e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    )
  }

  async getMonthlyReport(){
    let year = this.reportForm.get('yearSelected')?.value
    let month = this.reportForm.get('monthSelected')?.value
    await this.recordService.getMonthlyRecords(year, month).then(
      (n) =>{
        this.recordList = n;
        this.calculateInOut();
      },
      e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      })
  }

  async getReportByRange(){
    let dtInit: string = this.reportForm.get('dtInit')?.value
    let dtEnd: string = this.reportForm.get('dtEnd')?.value
    await this.recordService.getRecordsByRange(dtInit, dtEnd).then(
      (n) =>{
        console.log(n);
        this.recordList = n;
        this.calculateInOut();
      },
      (e) =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    )

  }

  //TODO: Create a component to export files
  async exportExcel(){
    this.loading=true;
    await this.recordService.exportAsXls(this.recordList).then((blob) =>{
      const url = window.URL.createObjectURL(blob);

      // Criando um link temporário
      const a = document.createElement('a');
      a.href = url;
      a.download = 'records.xls'; // Nome do arquivo
      document.body.appendChild(a);
      a.click();

      // Limpando o objeto temporário
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })  
    this.loading=false; 
  }

  getDepartmentNameByID(id: number){
    for (let dep of this.departmentList){
      if (dep.id == id)
        return dep.name;
    }
    return 
  }

  recordSelected?: Record;
  
  editRecord(record: Record){
    this.recordSelected = record;   
  }

  recordSeletectedToDelete?: Record;

  selectRecord(record: Record){
    this.recordSeletectedToDelete = record;
  }

  async deleteRecord(){
    this.loading=true;
    await this.recordService.deleteRecord(this.recordSeletectedToDelete!).then(
        (response) =>{
          this.invokeReport();
        },
        (e) =>{
          console.log("Delete request fail: ", e)
        })
    this.loading=false;
  }

  reloadPage(event?: boolean){
    if(event){
      this.invokeReport();
      this.recordSelected = undefined;
    }
  }

}
