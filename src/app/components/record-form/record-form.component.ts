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

  message: string = ""
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

  editIndex: number = -1;
  recordsNotSaved: Array<Record> =[];

  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){ 
   this.recordForm = this.startForm()
  }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  addToNotSavedList():void{
    if(this.recordForm.valid){
      let formValues = this.recordForm.value;
      let record: Record = new Record(
          formValues.description,
          formValues.amount,
          formValues.date,
          formValues.departmentId,
          formValues.recordType, 
          formValues.recurringType, 
          formValues.initialMonth, 
          formValues.replicaCount
        )
            
      if(this.editIndex > -1){
        this.recordsNotSaved[this.editIndex] = record
        this.editIndex = -1
      }
      else{
        this.recordsNotSaved.push(record);    
      } 
      this.showAlert("Record add successful!")    
      this.recordForm.get('description')?.setValue("")
      this.recordForm.get('description')?.setErrors(null)
    }
  }
  
  showAlert(message: string){
    this.message = message
    this.alertSuccess = true
    setTimeout(() => {
      this.alertSuccess = false;
    }, 3000);
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
      description: ['', [Validators.required, Validators.minLength(3)]], // Descrição
      amount: ['', [Validators.required]], // Amount
      date: ['', Validators.required, this.dateFormatValidator], // Date
      departmentId: [0, [Validators.required, Validators.min(1)]], // DepartmentId
      recordType: new FormControl(0, [Validators.required]), // RecordType
      recurringType: [-1, []],
      initialMonth:[new Date().getMonth(),[]],
      replicaCount: ["", []]

    })
  }

  editRecordNotSaved(index: number, record: Record){
    this.editIndex = index;
    this.recordForm.get('description')?.setValue(record.description)
    this.recordForm.get('amount')?.setValue(record.amount)
    this.recordForm.get('date')?.setValue(record.date)
    this.recordForm.get('departmentId')?.setValue(record.departmentId)
    this.recordForm.get('recordType')?.setValue(record.recordType)
    this.recordForm.get('recurringType')?.setValue(record.recurringType)
    this.recordForm.get('initialMonth')?.setValue(record.initialMonth)
    this.recordForm.get('replicaCount')?.setValue(record.replicaCount)


  }

  deleteRecordNotSaved(index: number){
    this.recordsNotSaved.splice(index,1);
  }

  getDepartmentNameById(id:number){
    for(let dep of this.departments){
      if (dep.id == id){
        return dep.name;
      }
    }
    return "Department not present";
  }

  saveRecords(){
    this.recordService.save(this.recordsNotSaved)
    this.recordsNotSaved = []
    this.showAlert("All records saved!")  
  }
}
