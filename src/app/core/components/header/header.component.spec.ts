import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/core/services/auth.service';
import { DialogConfirmationComponent } from '@app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { of } from 'rxjs';
import { anything, instance, mock, reset, spy, verify, when } from 'ts-mockito';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useFactory: () => instance(mockAuthService)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockAuthService = mock();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout should call dialog em auth service', () => {
    let spyDialog = spy(DialogConfirmationComponent);
    when(spyDialog.open(anything())).thenCall(data => {
      expect(data).toEqual({ title: 'Deseja realmente sair?', message: '' });
      return { afterClosed: () => of(true) };
    });
    component.logout();
    verify(mockAuthService.logout()).once();
    reset(spyDialog);
  });
});
