import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionFormComponent } from './insertion-form.component';

describe('InsertionFormComponent', () => {
  let component: InsertionFormComponent;
  let fixture: ComponentFixture<InsertionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
