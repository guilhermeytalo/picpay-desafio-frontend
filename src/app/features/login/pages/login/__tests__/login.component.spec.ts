import { AuthModule } from '@/features/auth/auth.module';
import { UserAuthRequest } from '@/features/auth/models/user-auth.model';
import { AuthService } from '@/features/auth/services/auth.service';
import { FormModule } from '@/features/login/components/form/form.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from '../login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        AuthModule,
        FormModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error mensagem on login', () => {
    component.loginMessage = '';
    component.handleAuthError();
    expect(component.loginMessage).toEqual('Erro ao realizar login. Revise suas credenciais');
  });

  it('should got to dashboard on login success', () => {
    spyOn(router, 'navigate');
    component.handleAuthSuccess();
    expect(router.navigate).toHaveBeenCalledWith(['/payments']);
  });

  it('should create payment', waitForAsync(() => {
    spyOn(service, 'auth').and.returnValue(of(true));
    spyOn(component, 'handleAuthSuccess');

    component.auth({} as UserAuthRequest);

    expect(component.handleAuthSuccess).toHaveBeenCalled();
    expect(service.auth).toHaveBeenCalled();

  }));

});
