import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './components/reports/reports.component';
import { RercordFormComponent } from './components/record-form/record-form.component';
import { RecordManagerComponent } from './components/record-manager/record-manager.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'records', component: RercordFormComponent},
  { path: 'manager', component: RecordManagerComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'departments', component: DepartmentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
