import { DepartmentService } from '../../services/department/department.service';
import { Component, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { AbstractControl, ReactiveFormsModule, FormControl, FormsModule, ValidationErrors, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { RecordService } from '../../services/record/record.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { parse, isValid } from 'date-fns';
import { delay, Observable, of } from 'rxjs';
import { RecordType } from '../../enums/record_type';
import { SelectItem } from '../../models/selectItem';
import { Month } from '../../enums/month';
import { RecurringType } from '../../enums/recurring_type';

@Component({
  selector: 'app-record-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, NgClass, UpperCasePipe, NgxMaskDirective],
  providers:[provideNgxMask()],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.css'
})
export class RercordFormComponent implements OnInit{

  currentDate = new Date().toLocaleDateString('en-UK')
  alertSuccess = false;
  checked = true;
  
  departmentId: number = 1;
  recordForm: FormGroup;

  recordTypeRecurring = RecordType.RECURRING.id

  departments: SelectItem[] = [];
  recordTypes: SelectItem[] = RecordType.getAll();
  recurringTypes: SelectItem[] = RecurringType.getAll();
  months: SelectItem[] = Month.getAll();


  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){ 
   this.recordForm = this.startForm()
  }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  save():void{
    if(this.recordForm.valid){
      let formValues = this.recordForm.value;
      let record: Record = new Record(
          formValues.descricao,
          formValues.amount,
          formValues.date,
          formValues.departmentId,
          formValues.recordType, 
          formValues.recurringType, 
          formValues.initialMonth, 
          formValues.replicaCount
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
      descricao: ['', [Validators.required, Validators.minLength(3)]], // Descrição
      amount: ['', [Validators.required]], // Amount
      date: ['', Validators.required, this.dateFormatValidator], // Date
      departmentId: [0, [Validators.required, Validators.min(1)]], // DepartmentId
      recordType: new FormControl(0, [Validators.required]), // RecordType
      recurringType: [-1, []],
      initialMonth:[new Date().getMonth(),[]],
      replicaCount: ["", []]

    })
  }
}
