import { DepartmentService } from './../../../services/department/department.service';
import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../../models/record';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Department } from '../../../models/department';
import { RecordService } from '../../../services/record/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { parse, isValid } from 'date-fns';
import { delay, Observable, of } from 'rxjs';

@Component({
  selector: 'app-insertion-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, NgClass, UpperCasePipe, NgxMaskDirective],
  providers:[provideNgxMask()],
  templateUrl: './insertion-form.component.html',
  styleUrl: './insertion-form.component.css'
})
export class InsertionFormComponent implements OnInit{

  currentDate = new Date().toLocaleDateString('en-UK')
  alertSuccess = false;

  @Input() recordType!: number;
  @Input() expenseType!: string;
  
  departmentId: number = 1;
  departments: Department[] = []
  
  recordForm: FormGroup;
  

  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){ 
   this.recordForm = this.startForm()
  }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  save():void{
    if(this.recordForm.valid){
      let record: Record = new Record(
        this.recordForm.value.descricao,
        this.recordForm.value.amount,
        this.recordForm.value.date,
        this.recordForm.value.departmentId,
        this.recordType,
        this.expenseType
      )
      this.recordService.save(record)
      this.showAlert()
    }

  }
  
  showAlert(){
    this.alertSuccess = true
    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }


  dateFormatValidator(control: AbstractControl): Observable<ValidationErrors | null>{
    const date = parse(control.value, 'dd/MM/yyyy', new Date());

  return of(isValid(date) ? null : { invalidDate: true }).pipe(delay(500));
  }

  clean(){
    this.recordForm = this.startForm()
  }

  startForm(){
    return this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]], // Campo Descrição
      amount: ['', [Validators.required]], // Campo Amount
      date: ['', Validators.required, this.dateFormatValidator], // Campo Date
      departmentId: [1, [Validators.required, Validators.min(1)]], // Campo DepartmentId
    })
  }

}
