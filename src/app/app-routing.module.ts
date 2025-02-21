import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { RercordFormComponent } from './components/record-form/record-form.component';
import { RecurringRecordComponent } from './components/recurring-record/recurring-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/records', pathMatch: 'full' },
  { path: 'records', component: RercordFormComponent },
  { path: 'recurring', component: RecurringRecordComponent },
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
