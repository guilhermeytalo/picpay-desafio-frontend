import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from '../form.component';
import { FormModule } from '../form.module';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
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

  it('should emit a event when login function is called', () => {
    spyOn(component.authEvent, 'emit');
    component.login();
    expect(component.authEvent.emit).toHaveBeenCalled();
  });
});
