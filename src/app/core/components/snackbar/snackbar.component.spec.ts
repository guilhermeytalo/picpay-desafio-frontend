import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { instance, mock, verify } from 'ts-mockito';
import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let mockSnackBarRef: MatSnackBarRef<SnackbarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SnackbarComponent],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { html: '', action: 'success' }
        },
        {
          provide: MatSnackBarRef,
          useFactory: () => instance(mockSnackBarRef)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockSnackBarRef = mock(MatSnackBarRef) as MatSnackBarRef<SnackbarComponent>;
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dismiss should call snackbar ref dismiss', () => {
    component.dismiss();
    verify(mockSnackBarRef.dismiss()).once();
    expect().nothing();
  });
});
