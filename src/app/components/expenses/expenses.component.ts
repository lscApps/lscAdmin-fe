import { Component, Input, OnInit } from '@angular/core';
import { RecordType } from '../../enums/record_type';
import { ActivatedRoute } from '@angular/router';
import { ExpenseType } from '../../enums/expense_type';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{


  recordType: number = RecordType.EXPENSE;
  expenseType: string = ExpenseType.UNDEFINED;
  title: string = "";

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.expenseType = String(this.route.snapshot.paramMap.get('type'));
    this.updateTitle();
  }

  ngDoCheck(){
    const currentExpenseType = String(this.route.snapshot.paramMap.get('type'));
    if (currentExpenseType !== this.expenseType){
      this.expenseType = currentExpenseType
      this.updateTitle()
    }
  }

  updateTitle(){
    this.title = `${this.expenseType} Expenses`;
  }

}
