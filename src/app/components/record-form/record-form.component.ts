import { HttpStatusCode } from '@angular/common/http';
import { DepartmentService } from '../../services/department/department.service';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Record } from '../../models/record';
import { AbstractControl, ReactiveFormsModule, FormControl, FormsModule, ValidationErrors, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { RecordService } from '../../services/record/record.service';
import { parse, isValid, format } from 'date-fns';
import { delay, Observable, of } from 'rxjs';
import { RecordType } from '../../enums/record_type';
import { SelectItem } from '../../models/selectItem';
import { Month } from '../../enums/month';
import { RecurrentType } from '../../enums/recurent_type';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.css'
})
export class RercordFormComponent implements OnInit{

  @Input() record?: Record;

  @Output() recordChange = new EventEmitter<string>();

  editMode = false;

  message: string = "";
  currentDate = new Date().toLocaleDateString('en-UK');
  showingAlert = false;
  alertSuccess = false;
  checked = true;


  departmentId: number = 1;
  recordForm: FormGroup;

  departments: SelectItem[] = [];
  recordTypes: SelectItem[] = RecordType.getAll();
  recurringTypes: SelectItem[] = RecurrentType.getAll();
  months: SelectItem[] = Month.getAll();

  editIndex: number = -1;
  recordsNotSaved: Array<Record> =[];

  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){
   this.recordForm = this.startForm()
  }

  ngOnInit(): void {
    //TODO: Need create a page to handle Departments
    this.departments = this.departmentService.getDepartments();
    if(this.record){
      this.setRecordForm(this.record);
      this.editMode = true;
    }
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
          formValues.recurringCount,
          Status.ACTIVE.id,
          format(new Date(), 'dd/MM/yyyy')
        )

      if(this.editIndex > -1){
        this.recordsNotSaved[this.editIndex] = record
        this.editIndex = -1
      }
      else{
        this.recordsNotSaved.push(record);
      }

      if(this.editMode){
        record.id = this.record!.id
        this.recordService.updateRecord(record).then(()=>{
          this.showAlert("Record updated", true);
          this.recordChange.emit(undefined);
        });
      }else{
        this.showAlert("Record read to submition", true);
      }
      this.recordForm.get('description')?.setValue("");

    }
  }

  //TODO: Need create a component for alerts
  showAlert(message: string, success: boolean){
    this.message = message;
    this.showingAlert = true;
    this.alertSuccess = success;
    setTimeout(() => {
      this.showingAlert = false;
    }, 3000);
  }

  //TODO: Need extract this to UTIL class // add bootstrap-datapicker
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
      recurringType: [{value:undefined, disabled: true}, []],
      recurringCount: [{value:undefined, disabled: true},[]]

    })
  }

  editRecordNotSaved(index: number, record: Record){
    this.editIndex = index;
    this.setRecordForm(record);
  }

  setRecordForm(record: Record){
    this.recordForm.get('description')?.setValue(record.description)
    this.recordForm.get('amount')?.setValue(record.amount)
    this.recordForm.get('date')?.setValue(record.date)
    this.recordForm.get('departmentId')?.setValue(record.departmentId)
    this.recordForm.get('recordType')?.setValue(record.recordType)
    this.recordForm.get('recurringType')?.setValue(record.recurringType)
    this.recordForm.get('recurringCount')?.setValue(record.recurringCount)
  }

  deleteRecordNotSaved(index: number){
    this.recordsNotSaved.splice(index,1);
  }

  //TODO extract it to class that will handle the departmens or to UTIL class
  getDepartmentNameById(id:number){
    for(let dep of this.departments){
      if (dep.id == id){
        return dep.name;
      }
    }
    return "Department not present";
  }


  saveRecords(){
    console.log(this.recordsNotSaved)
    this.recordService.addRecords(this.recordsNotSaved).subscribe({
      next:(n) => {
        this.recordsNotSaved = [];
        this.showAlert("All records saved!", true)
      },
      error: e =>{
        console.error("Failed: ", e)
        this.showAlert("FAIL - Submition to save records fail.", false)
      }

    });
  }

  cancel(){
    this.recordChange.emit('');
  }

  ngDoCheck(){
    //TODO investigate a way to handle it in the HTML
    if(this.recordForm.get('recordType')?.value == RecordType.RECURRING.id){
      this.recordForm.get('recurringType')?.enable()
    }else{
      this.recordForm.get('recurringType')?.disable()
      this.recordForm.get('recurringType')?.setValue(undefined)
    }

    if(this.recordForm.get('recurringType')?.value == RecurrentType.INSTALLMENT.id){
      this.recordForm.get('recurringCount')?.enable()
    }else{
      this.recordForm.get('recurringCount')?.setValue(undefined)
      this.recordForm.get('recurringCount')?.disable()
    }
  }

}
