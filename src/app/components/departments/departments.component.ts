import { Department } from './../../models/department';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {

  departmentForm: FormGroup;
  departmentList: Array<Department> = [];
  departmentSelected?: Department;
  loading:boolean = false;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService){
    this.departmentForm = this.startForm()
  }

  ngOnInit(){
    this.featchDepartments();
  }
  
  
  startForm(): FormGroup<any> {
    let name = this.departmentSelected? this.departmentSelected.name : "";
    let manager = this.departmentSelected? this.departmentSelected.manager : "";
    return this.fb.group({            
      name: [name, [Validators.required, Validators.min(1), Validators.max(20)]],
      manager: [manager, [Validators.required]]
    })
  }

  clean(){
    this.departmentSelected = undefined;
    this.departmentForm = this.startForm();
  }

  async featchDepartments(){
    await this.departmentService.getAllDepartments().then(
      response=>{
        console.log(response);
        this.departmentList = response;
      },
      error =>{
        console.log('Error featching Departments: ', error.message);
      }
    );
  }

  async saveDepartament(){ 
    this.loading = true;
    let newDepartment: Department = new Department(
      this.departmentForm.get('name')?.value,
      this.departmentForm.get('manager')?.value
    )
    
    let promisse: Promise<Object>;

    if(this.departmentSelected?.id){ 
      console.log("Editing")
      newDepartment.setId(this.departmentSelected.id!);
      promisse = this.departmentService.updatedDepartment(newDepartment);

    }else{
      console.log("Adding")
      promisse = this.departmentService.addDepartment(newDepartment);
    }
    
    await promisse!.then(
        ()=>{
          this.featchDepartments();
          this.clean();
        },
        error => {
          console.error(error.message)
        }
      )
    
    this.loading = false;

  }


  async deleteDepartment(){
    this.loading = true;
    await this.departmentService.deleteDepartment(this.departmentSelected?.id!).then(
      ()=>{
        this.featchDepartments();
        this.clean();
      },
      error => {
        console.error(error.message)
      }
    )
    this.loading = false;
  }


  selectDepartmentToEdit(department: Department){
    this.setSelectedDepartment(department);
    this.departmentForm =this.startForm();
  }

  setSelectedDepartment(department: Department){
    this.departmentSelected = department;
  }

  

}
