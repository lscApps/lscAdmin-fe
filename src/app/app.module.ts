import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UpperCasePipe } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { RercordFormComponent } from './components/record-form/record-form.component';
import { HttpClientModule} from '@angular/common/http';
import { RecurringRecordComponent } from './components/recurring-record/recurring-record.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    RercordFormComponent, RecurringRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TitlePageComponent,
    UpperCasePipe,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
