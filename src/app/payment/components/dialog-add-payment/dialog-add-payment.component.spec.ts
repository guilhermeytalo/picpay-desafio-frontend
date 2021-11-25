import { Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { PaymentInjectorInstance } from '@app/payment/payment-injector-instance';
import { PaymentTaskService } from '@app/payment/services/payment-task.service';
import { of } from 'rxjs';
import { anything, capture, instance, mock, notNull, reset, spy, verify, when } from 'ts-mockito';
import { DialogAddPaymentComponent } from './dialog-add-payment.component';

describe('DialogAddPaymentComponent', () => {
  let component: DialogAddPaymentComponent;
  let spyComponent: DialogAddPaymentComponent;

  let fixture: ComponentFixture<DialogAddPaymentComponent>;

  let injectorSpyObj: Injector;
  let mockDialogRef: MatDialogRef<DialogAddPaymentComponent>;
  let mockMatDialog: MatDialog;
  let mockPaymentTaskService: PaymentTaskService;
  let mockSnackbarService: SnackbarService;
  let dialogData = {
    paymentTask: {
      id: 1,
      name: 'Teste',
      username: 'tteste',
      value: 123.04,
      date: '2017/01/01',
      title: 'Titulo',
      image: 'image',
      isPayed: true
    }
  };

  describe('Test Editing a Payment Task', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [DialogAddPaymentComponent],
        providers: [
          {
            provide: MatDialogRef,
            useFactory: () => instance(mockDialogRef)
          },
          {
            provide: MAT_DIALOG_DATA,
            useFactory: () => dialogData
          },
          {
            provide: PaymentTaskService,
            useFactory: () => instance(mockPaymentTaskService)
          },
          {
            provide: SnackbarService,
            useFactory: () => instance(mockSnackbarService)
          }
        ]
      }).compileComponents();
    });

    beforeEach(async () => {
      mockDialogRef = mock(MatDialogRef) as any;
      mockMatDialog = mock(MatDialog);
      mockPaymentTaskService = mock(PaymentTaskService);
      mockSnackbarService = mock(SnackbarService);
      injectorSpyObj = jasmine.createSpyObj('Injector', { get: instance(mockMatDialog) });
      dialogData = {
        paymentTask: {
          id: 1,
          name: 'Teste',
          username: 'tteste',
          value: 123.04,
          date: '2017/01/01',
          title: 'Titulo',
          image: 'image',
          isPayed: true
        }
      };
      fixture = TestBed.createComponent(DialogAddPaymentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        name: 'Teste',
        username: 'tteste',
        value: 123.04,
        date: '2017/01/01',
        title: 'Titulo'
      });

      spyComponent = spy(component);
      reset(spyComponent);
      spyComponent = spy(component);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('open should call injector and open dialog', (done: Function) => {
      const mockMatDialog: MatDialog = mock(MatDialog);
      const injectorSpyObj: Injector = jasmine.createSpyObj('Injector', { get: instance(mockMatDialog) });

      spyOn(PaymentInjectorInstance, 'getInjector').and.returnValue(injectorSpyObj);

      const data = null;

      when(mockMatDialog.open(DialogAddPaymentComponent, notNull())).thenCall((argComponent, config: MatDialogConfig) => {
        expect(config.data).toBe(data);
        done();
      });

      DialogAddPaymentComponent.open(data);
      expect(injectorSpyObj.get).toHaveBeenCalled();
      verify(mockMatDialog.open(DialogAddPaymentComponent, notNull())).called();
    });

    it('cancel should close dialog with false return', () => {
      component.cancel();
      verify(mockDialogRef.close(false)).once();
    });

    it('save updating a payment task should call updatePaymentTask', () => {
      let formPaymentTask = {
        name: 'Teste Edited',
        username: 'tteste Edited',
        value: 123.04,
        date: '2017/01/01',
        title: 'Titulo',
        image: 'image'
      };
      component.form.patchValue(formPaymentTask);
      when(mockPaymentTaskService.updatePaymentTask(anything())).thenReturn(of(true as any));
      component.save();
      verify(mockPaymentTaskService.updatePaymentTask(anything())).once();
      expect(capture(mockPaymentTaskService.updatePaymentTask).last()).toEqual([
        {
          id: 1,
          name: 'Teste Edited',
          username: 'tteste Edited',
          value: 123.04,
          date: '2017/01/01',
          title: 'Titulo',
          image: 'image',
          isPayed: true
        }
      ]);
      verify(mockSnackbarService.showSuccess('Registro atualizado com sucesso!')).once();
      verify(mockDialogRef.close(true)).once();
    });

    it('invalid form should not save', () => {
      let formPaymentTask = {
        name: null,
        username: null,
        value: null,
        date: null,
        title: null,
        image: null
      };
      component.form.patchValue(formPaymentTask);
      component.save();
      verify(mockPaymentTaskService.updatePaymentTask(anything())).never();
      verify(mockPaymentTaskService.savePaymentTask(anything())).never();
    });
  });

  describe('Test Creating a Payment Task', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [DialogAddPaymentComponent],
        providers: [
          {
            provide: MatDialogRef,
            useFactory: () => instance(mockDialogRef)
          },
          {
            provide: MAT_DIALOG_DATA,
            useFactory: () => null
          },
          {
            provide: PaymentTaskService,
            useFactory: () => instance(mockPaymentTaskService)
          },
          {
            provide: SnackbarService,
            useFactory: () => instance(mockSnackbarService)
          }
        ]
      }).compileComponents();
    });

    beforeEach(async () => {
      mockDialogRef = mock(MatDialogRef) as any;
      mockMatDialog = mock(MatDialog);
      mockPaymentTaskService = mock(PaymentTaskService);
      mockSnackbarService = mock(SnackbarService);
      injectorSpyObj = jasmine.createSpyObj('Injector', { get: instance(mockMatDialog) });

      fixture = TestBed.createComponent(DialogAddPaymentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.form.value).toEqual({
        name: null,
        username: null,
        value: null,
        date: null,
        title: null
      });

      spyComponent = spy(component);
      reset(spyComponent);
      spyComponent = spy(component);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('save creating a payment task should call savePaymentTask', () => {
      let formPaymentTask = { name: 'Teste', username: 'tteste', value: 123.04, date: '2017/01/01', title: 'Titulo', image: 'image' };
      component.form.patchValue(formPaymentTask);
      when(mockPaymentTaskService.savePaymentTask(anything())).thenReturn(of(true as any));
      component.save();
      verify(mockPaymentTaskService.savePaymentTask(component.form.value)).once();
      verify(mockSnackbarService.showSuccess('Registro salvo com sucesso!')).once();
      verify(mockDialogRef.close(true)).once();
    });
  });
});
