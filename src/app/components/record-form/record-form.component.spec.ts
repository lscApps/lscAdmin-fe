import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RercordFormComponent } from './record-form.component';

describe('InsertionFormComponent', () => {
  let component: RercordFormComponent;
  let fixture: ComponentFixture<RercordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RercordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RercordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
