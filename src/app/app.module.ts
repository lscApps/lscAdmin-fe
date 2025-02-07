import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntriesComponent } from './components/entries/entries.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { InsertionFormComponent } from './components/standalones/insertion-form/insertion-form.component';
import { UpperCasePipe } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TitlePageComponent } from './components/standalones/title-page/title-page.component';


@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InsertionFormComponent,
    TitlePageComponent,
    UpperCasePipe,
    NgxMaskDirective, 
    NgxMaskPipe, 
  ],
  providers: [
    provideClientHydration(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
