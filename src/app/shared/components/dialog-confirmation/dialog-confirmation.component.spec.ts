import { Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedInjectorInstance } from '@app/shared/shared-injector-instance';
import { anything, instance, mock, notNull, reset, spy, verify, when } from 'ts-mockito';
import { DialogConfirmationComponent, DialogData } from './dialog-confirmation.component';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let spyComponent: DialogConfirmationComponent;

  let fixture: ComponentFixture<DialogConfirmationComponent>;

  let injectorSpyObj: Injector;
  let mockDialogRef: MatDialogRef<DialogConfirmationComponent>;
  let mockMatDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DialogConfirmationComponent],
      providers: [
        {
          provide: MatDialogRef,
          useFactory: () => instance(mockDialogRef)
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockDialogRef = mock(MatDialogRef) as any;
    mockMatDialog = mock(MatDialog);
    injectorSpyObj = jasmine.createSpyObj('Injector', { get: instance(mockMatDialog) });

    fixture = TestBed.createComponent(DialogConfirmationComponent);

    component = fixture.componentInstance;
    spyComponent = spy(component);
    fixture.detectChanges();
    reset(spyComponent);
    spyComponent = spy(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open should call injector and open dialog', (done: Function) => {
    const mockMatDialog: MatDialog = mock(MatDialog);
    const injectorSpyObj: Injector = jasmine.createSpyObj('Injector', { get: instance(mockMatDialog) });

    spyOn(SharedInjectorInstance, 'getInjector').and.returnValue(injectorSpyObj);

    const data: DialogData = { message: 'test', yesCallback: () => true, noCallback: () => true };

    when(mockMatDialog.open(DialogConfirmationComponent, notNull())).thenCall((argComponent, config: MatDialogConfig) => {
      expect(config.data).toBe(data);
      done();
    });

    DialogConfirmationComponent.open(data);
    expect(injectorSpyObj.get).toHaveBeenCalled();
    verify(mockMatDialog.open(DialogConfirmationComponent, notNull())).called();
  });

  it('yesClick should call MatDialogRef close when yesCallback is undefined', () => {
    component.data = { message: 'test' };
    component.yesClick();
    verify(mockDialogRef.close(true)).called();
    expect().nothing();
  });

  it('yesClick should call MatDialogRef close when yesCallback is defined and it returns true', () => {
    component.data = { message: 'test', yesCallback: () => true };
    component.yesClick();
    verify(mockDialogRef.close(true)).called();
    expect().nothing();
  });

  it('yesClick should not call MatDialogRef close when yesCallback is defined and it returns false', () => {
    component.data = { message: 'test', yesCallback: () => false };
    component.yesClick();
    verify(mockDialogRef.close(anything())).never();
    expect().nothing();
  });

  it('noClick should call MatDialogRef close when noCallback is undefined', () => {
    component.data = { message: 'test' };
    component.noClick();
    verify(mockDialogRef.close(false)).called();
    expect().nothing();
  });

  it('noClick should call MatDialogRef close when noCallback is defined and it returns true', () => {
    component.data = { message: 'test', noCallback: () => true };
    component.noClick();
    verify(mockDialogRef.close(false)).called();
    expect().nothing();
  });

  it('noClick should not call MatDialogRef close when noCallback is defined and it returns false', () => {
    component.data = { message: 'test', noCallback: () => false };
    component.noClick();
    verify(mockDialogRef.close(anything())).never();
    expect().nothing();
  });
});
