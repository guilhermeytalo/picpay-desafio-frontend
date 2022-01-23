import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IAuthentication } from '@app/domain/usecases/authentication';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { LoginComponent } from './login.component';
import faker from 'faker';
import { AccountModel } from '@app/domain/models/account.model';
import { of } from 'rxjs';
import { ISnackBar } from '@app/shared/class/isnackbar';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

let iauthentication: jasmine.SpyObj<IAuthentication>;
let snackBar: jasmine.SpyObj<ISnackBar>;

describe('LoginComponent', () => {
  iauthentication = jasmine.createSpyObj('IAuthentication', ['auth']);
  snackBar = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: IAuthentication, useValue: iauthentication },
        { provide: ISnackBar, useValue: snackBar }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    iauthentication = TestBed.inject(
      IAuthentication
    ) as jasmine.SpyObj<IAuthentication>;
    snackBar = TestBed.inject(ISnackBar) as jasmine.SpyObj<ISnackBar>;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should init component with button disabled', () => {
    fixture.detectChanges();

    const submitEl = fixture.debugElement;
    expect(
      submitEl.nativeElement.querySelector('button').disabled
    ).toBeTruthy();
  });

  it('should hidden spinner when init component', () => {
    const spinner = fixture.debugElement.query(By.css('mat-icon'));
    expect(spinner).toBeNull();
  });

  it('should hability button when populate inputs form requireds', () => {
    const submitEl = fixture.debugElement;
    component.form.controls.email.setValue(faker.internet.email());
    component.form.controls.password.setValue(faker.internet.password());
    fixture.detectChanges();
    expect(submitEl.nativeElement.querySelector('button').disabled).toBeFalsy();
  });

  it('should continue disabled button if populate email', () => {
    const submitEl = fixture.debugElement;
    component.form.controls.email.setValue(faker.internet.email());
    fixture.detectChanges();
    expect(
      submitEl.nativeElement.querySelector('button').disabled
    ).toBeTruthy();
  });

  it('should continue disabled button if populate password', () => {
    const submitEl = fixture.debugElement;
    component.form.controls.password.setValue(faker.internet.password());
    fixture.detectChanges();
    expect(
      submitEl.nativeElement.querySelector('button').disabled
    ).toBeTruthy();
  });

  it('should request auth with success', fakeAsync(() => {
    const accountModel: AccountModel = {
      id: faker.datatype.number(10),
      email: faker.internet.email(),
      name: faker.internet.userName()
    };
    iauthentication.auth.and.returnValue(of(accountModel));

    component.auth();
    tick();
    expect(iauthentication.auth).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  }));

  it('should request auth with error', fakeAsync(() => {
    iauthentication.auth.and.returnValue(of(undefined));
    snackBar.openSnackBar.and.returnValue();

    component.auth();
    tick();
    expect(snackBar.openSnackBar).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  }));
});
