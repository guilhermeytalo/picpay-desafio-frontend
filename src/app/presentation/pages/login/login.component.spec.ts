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
import { of, throwError } from 'rxjs';
import { ISnackBar } from '@app/shared/interfaces/isnackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorEnum } from '@app/shared/helpers/errors-key.enum';
import ErrorResponseHelper from '@app/shared/helpers/error-response.helper';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

let iauthentication: jasmine.SpyObj<IAuthentication>;
let snackBar: jasmine.SpyObj<ISnackBar>;

const checkButtonIfEnabled = () => {
  const submitEl = fixture.debugElement;
  expect(submitEl.nativeElement.querySelector('button').disabled).toBeFalsy();
};
const checkButtonIfDisabled = () => {
  const submitEl = fixture.debugElement;
  expect(submitEl.nativeElement.querySelector('button').disabled).toBeTruthy();
};

const populateInputEmail = () => {
  component.form.controls.email.setValue(faker.internet.email());
};
const populateInputPassword = () => {
  component.form.controls.password.setValue(faker.internet.password());
};
const populateInputsEmailAndPassword = () => {
  populateInputEmail();
  populateInputPassword();
};

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
    checkButtonIfDisabled();
  });

  it('should hidden spinner when init component', () => {
    const spinner = fixture.debugElement.query(By.css('mat-icon'));
    expect(spinner).toBeNull();
  });

  it('should hability button when populate inputs form requireds', () => {
    populateInputsEmailAndPassword();
    fixture.detectChanges();
    checkButtonIfEnabled();
  });

  it('should continue disabled button if populate email', () => {
    populateInputEmail();
    fixture.detectChanges();
    checkButtonIfDisabled();
  });

  it('should continue disabled button if populate password', () => {
    populateInputPassword();
    fixture.detectChanges();
    checkButtonIfDisabled();
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
    const errorResponse = new ErrorResponseHelper(ErrorEnum.userNotFound, 404);
    iauthentication.auth.and.returnValue(throwError(errorResponse));
    snackBar.openSnackBar.and.callThrough();

    component.auth();
    tick();
    expect(snackBar.openSnackBar).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
  }));
});
