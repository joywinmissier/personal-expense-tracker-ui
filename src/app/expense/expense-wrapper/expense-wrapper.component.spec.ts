import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseWrapperComponent } from './expense-wrapper.component';

describe('ExpenseWrapperComponent', () => {
  let component: ExpenseWrapperComponent;
  let fixture: ComponentFixture<ExpenseWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
