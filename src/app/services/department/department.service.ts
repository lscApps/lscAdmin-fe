import { Injectable } from '@angular/core';
import { SelectItem } from '../../models/selectItem';
import { Department } from '../../models/department';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `${environment.apiUrl}/department`;

  departmentList: Department[] = [];
  
  constructor(private http: HttpClient) {

  }
  

  async getAllDepartments(){
    let url = `${this.apiUrl}/getAll`
    return await firstValueFrom(this.http.get<Array<Department>>(url));
  }
  
  async addDepartment(newDepartment: Department) {
    console.log(newDepartment)
    return await firstValueFrom(this.http.post<Department>(this.apiUrl, newDepartment));
  }

  async updatedDepartment(newDepData: Department){
    return await firstValueFrom(this.http.put(this.apiUrl, newDepData));
  }

  async deleteDepartment(id: number){
    let url = `${this.apiUrl}/${id}`;
    return await firstValueFrom(this.http.delete(url));
  }

}
