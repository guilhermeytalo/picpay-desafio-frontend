import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let mockApiService: ApiService;
  let mockAuthService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useFactory: () => instance(mockApiService)
        },
        {
          provide: AuthService,
          useFactory: () => instance(mockAuthService)
        }
      ]
    });
  });

  beforeEach(() => {
    mockApiService = mock(ApiService);
    mockAuthService = mock(AuthService);
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
