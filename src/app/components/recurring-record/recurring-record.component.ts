import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { RecordService } from '../../services/record/record.service';
import { RecurrentType } from '../../enums/recurent_type';

@Component({
  selector: 'app-recurring-record',
  templateUrl: './recurring-record.component.html',
  styleUrl: './recurring-record.component.css'
})
export class RecurringRecordComponent implements OnInit{


  recordList: Record[] =[];
  @Input() recordSelected?: Record;
  editMode = false;

  constructor(private recordService: RecordService){}
  
  
  ngOnInit(): void {
    this.getRecurrentRecords();
  }

  getRecurrentRecords(){
    this.recordService.getRecurrentRecords().subscribe({
      next:(response) =>{
        this.recordList = response;
      },
      error: e =>{
        console.log("HTTP REQUEST FAIL: ", e)
      }
    })
  }

  getRecurrentType(recordTypedId: number){    
    return RecurrentType.getById(recordTypedId)?.name;

  }

  editRecord(record: Record){
    this.editMode = true;
    this.recordSelected = record;
    

  }

  deleteRecord(record: Record){
    console.log(record);
  }

  ngDoCheck(){

    if(this.recordSelected == undefined && this.editMode){
      this.getRecurrentRecords();
      this.editMode = false;
    }
  
  }

}
