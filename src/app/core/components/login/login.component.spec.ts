import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserAccount } from '@app/core/models/user-account.model';
import { AuthService } from '@app/core/services/auth.service';
import { of, throwError } from 'rxjs';
import { anything, capture, instance, mock, verify, when } from 'ts-mockito';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: AuthService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useFactory: () => instance(mockAuthService)
        },
        {
          provide: Router,
          useFactory: () => instance(mockRouter)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockAuthService = mock(AuthService);
    mockRouter = mock(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call login should call authenticate service with form valid ', () => {
    component.form.patchValue({ email: 'email@email.com', password: '123' });
    let userAccount: UserAccount = {
      id: 0,
      email: 'email@email.com',
      name: 'Teste',
      password: '123'
    };
    when(mockAuthService.authenticate(anything())).thenReturn(of(userAccount));
    component.login();
    verify(mockAuthService.authenticate(anything())).once();
    expect(capture(mockAuthService.authenticate).last()).toEqual([{ email: 'email@email.com', password: '123' }]);
    verify(mockRouter.navigate(anything())).once();
    expect(capture(mockRouter.navigate).last()).toEqual([['/payment']]);
  });

  it('call login should call authenticate service with form valid and return error ', () => {
    component.form.patchValue({ email: 'email@email.com', password: '123' });
    when(mockAuthService.authenticate(anything())).thenReturn(throwError({ status: 404, error: 'My Service Error' }));
    component.login();
    verify(mockAuthService.authenticate(anything())).once();
    expect(capture(mockAuthService.authenticate).last()).toEqual([{ email: 'email@email.com', password: '123' }]);
    verify(mockRouter.navigate(anything())).never();
    expect(component.loginError).toEqual('My Service Error');
  });

  it('call login should call authenticate service with form valid and return error with generic error ', () => {
    component.form.patchValue({ email: 'email@email.com', password: '123' });
    when(mockAuthService.authenticate(anything())).thenReturn(throwError('Unknown Error'));
    component.login();
    verify(mockAuthService.authenticate(anything())).once();
    expect(capture(mockAuthService.authenticate).last()).toEqual([{ email: 'email@email.com', password: '123' }]);
    verify(mockRouter.navigate(anything())).never();
    expect(component.loginError).toEqual('Ocorreu um erro ao realizar o login, tente novamente mais tarde.');
  });

  it('call login should not call login with invalid form ', () => {
    component.form.patchValue({ email: 'email', password: '' });
    component.login();
    verify(mockAuthService.authenticate(anything())).never();
    expect().nothing();
  });
});
