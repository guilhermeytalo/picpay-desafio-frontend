import { AuthModule } from '@/features/auth/auth.module';
import { AuthService } from '@/features/auth/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [HeaderComponent],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    spyOn(service, 'logout').and.callFake(() => true);

    component.logout();

    expect(service.logout).toHaveBeenCalled();
  });
});
