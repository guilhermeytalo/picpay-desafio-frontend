import { TestBed } from '@angular/core/testing';
import { AuthService } from '@/features/auth/services/auth.service';

import { AuthGuard } from '../auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should can load', () => {
    spyOn(service, 'hasToken').and.returnValue(true);

    expect(guard.canLoad(null, null)).toBeTruthy();
  });

  it('should cant load', () => {
    spyOn(router, 'navigate');
    spyOn(service, 'hasToken').and.returnValue(false);

    expect(guard.canLoad(null, null)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
