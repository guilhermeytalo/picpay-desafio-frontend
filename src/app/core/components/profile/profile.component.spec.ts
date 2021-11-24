import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core/services/api.service';
import { AuthService } from '@app/core/services/auth.service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { instance, mock } from 'ts-mockito';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockApiService: ApiService;
  let mockAuthService: AuthService;
  let mockSnackbarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        {
          provide: ApiService,
          useFactory: () => instance(mockApiService)
        },
        {
          provide: AuthService,
          useFactory: () => instance(mockAuthService)
        },
        {
          provide: SnackbarService,
          useFactory: () => instance(mockSnackbarService)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockApiService = mock(ApiService);
    mockAuthService = mock(AuthService);
    mockSnackbarService = mock(SnackbarService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
