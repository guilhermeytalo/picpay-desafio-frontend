import { LoginService } from './login.service';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});

    await TestBed.configureTestingModule({
      providers: [MatSnackBarModule, CookieService],
      imports: [AppRoutingModule, RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule],
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when credentials are incorrects', async () => {
    const incorrectUser = { email: 'foo', password: 'bar' };
    spyOn<any>(service, 'loginErrorHandler').and.callThrough();

    const loginSuccess = await service['login'](incorrectUser);
    expect(loginSuccess).toBeFalsy();
    expect(service['loginErrorHandler']).toHaveBeenCalled();
  });
});
