import { Injectable } from '@angular/core';
import { Department } from '../../models/department';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `${environment.apiUrl}/department`;
  private options;

  departmentList: Department[] = [];
  
  constructor(private http: HttpClient,  private authService: AuthService) {
    this.options = authService.getAuthorizationHeader();
  }  

  async getAllDepartments(){
    let url = `${this.apiUrl}/getAll`
    return await firstValueFrom(this.http.get<Array<Department>>(url, this.options));
  }
  
  async addDepartment(newDepartment: Department) {
    console.log(newDepartment)
    return await firstValueFrom(this.http.post<Department>(this.apiUrl, newDepartment, this.options));
  }

  async updatedDepartment(newDepData: Department){
    return await firstValueFrom(this.http.put(this.apiUrl, newDepData, this.options));
  }

  async deleteDepartment(id: number){
    let url = `${this.apiUrl}/${id}`;
    return await firstValueFrom(this.http.delete(url, this.options));
  }

}
