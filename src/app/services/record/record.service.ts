import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }


  save(records: Array<Record>){
    console.log("Records: ", records)
    for(let r of records){
      console.log("Record: ", r)
    }
  }
}

