import { Component } from '@angular/core';
import { ExpenseType } from './enums/expense_type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'L';
  recurrentType: String = ExpenseType.RECURRENT;
  detachedType: String = ExpenseType.DETACHED;
}
