import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with password hidden', () => {
    expect(component.isPasswordVisible).toBeFalsy();
  });

  it('should change password visibility when click on icon', () => {
    component.isPasswordVisible = true;
    component.changePasswordVisibillity();
    expect(component.isPasswordVisible).toBeFalsy();
    component.changePasswordVisibillity();
    expect(component.isPasswordVisible).toBeTruthy();
  });

});
