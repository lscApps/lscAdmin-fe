import { Injectable } from '@angular/core';
import { SelectItem } from '../../models/selectItem';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  //TODO: invoke from API
  getDepartments(): SelectItem[]{
    return [
      {id:1, name: 'Admin'},
      {id:2, name: 'Kitchen'},
      {id:3, name: 'Kids'},
      {id:4, name: 'New Temple'},
    ]
  }
}
