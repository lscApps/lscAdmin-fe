import { DepartmentService } from './../../../services/department/department.service';
import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../../models/record';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Department } from '../../../models/department';
import { RecordService } from '../../../services/record/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-insertion-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, UpperCasePipe, NgxMaskDirective],
  providers:[provideNgxMask()],
  templateUrl: './insertion-form.component.html',
  styleUrl: './insertion-form.component.css'
})
export class InsertionFormComponent implements OnInit{

  @Input() recordType!: number;
  @Input() expenseType!: string;
  
  departmentId: number = 1;
  departments: Department[] = []
  
  recordForm: FormGroup;
  
  constructor(private recordService: RecordService, private departmentService: DepartmentService, private fb: FormBuilder){ 
    this.recordForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]], // Campo Descrição
      amount: ['', [Validators.required]], // Campo Amount
      date: ['', Validators.required], // Campo Date
      departmentId: [1, [Validators.required, Validators.min(1)]], // Campo DepartmentId
    })
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
      console.log(record)
    }

  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9,.]/g, ''); // Substitui qualquer coisa que não seja número
  }

}
