import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [MatSnackBarModule, AppRoutingModule, BrowserAnimationsModule],
      providers: [CookieService],
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

  it('should return false when credentials are incorrects', async () => {
    component.password= 'foo';
    component.email = 'bar';
    spyOn<any>(component, 'loginErrorHandler').and.callThrough();

    const loginSuccess = await component.loginHandler();
    expect(loginSuccess).toBeFalsy();
    expect(component['loginErrorHandler']).toHaveBeenCalled();
  });
});
