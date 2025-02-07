import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }


  save(record:Record){
    if(record.id == undefined){
      record.id = Math.floor(Math.random() * 1)
    }

    console.log("Record: ", record)

    return {
      HttpStatusCode: HttpStatusCode.Ok,
      body: record
    }
  }
}

