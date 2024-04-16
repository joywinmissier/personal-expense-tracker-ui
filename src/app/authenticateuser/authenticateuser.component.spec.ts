import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateuserComponent } from './authenticateuser.component';

describe('AuthenticateuserComponent', () => {
  let component: AuthenticateuserComponent;
  let fixture: ComponentFixture<AuthenticateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticateuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
