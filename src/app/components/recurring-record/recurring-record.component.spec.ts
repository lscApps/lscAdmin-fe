import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringRecordComponent } from './recurring-record.component';

describe('RecurringRecordComponent', () => {
  let component: RecurringRecordComponent;
  let fixture: ComponentFixture<RecurringRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecurringRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecurringRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
