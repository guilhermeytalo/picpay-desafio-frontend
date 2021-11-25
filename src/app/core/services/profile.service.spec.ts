import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { anything, capture, instance, mock, verify, when } from 'ts-mockito';
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

  it('change password should authenticate with old em new password', () => {
    let data = {
      id: 1,
      email: 'teste@teste',
      password: '123',
      name: 'aaa'
    };
    let newPassword;
    when(mockAuthService.getUserData()).thenReturn(of(data));
    when(mockAuthService.authenticate(anything())).thenReturn(of(data));
    when(mockApiService.patch(anything(), anything(), anything())).thenReturn(of(data));
    service.changeUserPassowrd(data.password, newPassword).subscribe(() => {});
    verify(mockAuthService.getUserData()).once();
    verify(mockAuthService.authenticate(anything())).twice();
    verify(mockApiService.patch(anything(), anything(), anything())).once();
    expect(capture(mockAuthService.authenticate).first()).toEqual([{ email: data.email, password: data.password }]);
    expect(capture(mockAuthService.authenticate).last()).toEqual([{ email: data.email, password: newPassword }]);
    expect(capture(mockApiService.patch).last()).toEqual([
      `${(service as any).apiUrl}/${data.id}`,
      { password: newPassword },
      { defaultErrorHandling: true, showLoading: true }
    ]);
  });

  it('change User info should update user info', () => {
    let data = {
      id: 1,
      email: 'teste@teste',
      password: '123',
      name: 'aaa'
    };
    when(mockApiService.patch(anything(), anything(), anything())).thenReturn(of(data));
    service.changeUserInfo(data).subscribe(() => {});
    verify(mockApiService.patch(anything(), anything(), anything())).once();
    expect(capture(mockApiService.patch).last()).toEqual([
      `${(service as any).apiUrl}/${data.id}`,
      data,
      { defaultErrorHandling: true, showLoading: true }
    ]);
    verify(mockAuthService.updateUserData(data)).once();
  });
});
