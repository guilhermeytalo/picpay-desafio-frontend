import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '@/features/login/services/login.service';
import { RouterTestingModule } from "@angular/router/testing";

import { LoginComponent } from '../login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginService],
      imports: [RouterTestingModule.withRoutes([])]
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

});
