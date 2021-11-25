import { CurrencyPipe, DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { PaymentTaskService } from '@app/payment/services/payment-task.service';
import { DialogConfirmationComponent } from '@app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { of, Subject } from 'rxjs';
import { anything, capture, instance, mock, reset, spy, verify, when } from 'ts-mockito';
import { DialogAddPaymentComponent } from '../../dialog-add-payment/dialog-add-payment.component';
import { TablePaymentComponent } from './table-payment.component';

describe('TablePaymentComponent', () => {
  let component: TablePaymentComponent;
  let spyComponent: TablePaymentComponent;
  let fixture: ComponentFixture<TablePaymentComponent>;
  let mockCurrencyPipe: CurrencyPipe;
  let mockDatePipe: DatePipe;
  let mockPaymentTaskService: PaymentTaskService;
  let mockSnackbarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TablePaymentComponent],
      providers: [
        {
          provide: CurrencyPipe,
          useFactory: () => instance(mockCurrencyPipe)
        },
        {
          provide: DatePipe,
          useFactory: () => instance(mockDatePipe)
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

  beforeEach(() => {
    mockCurrencyPipe = mock(CurrencyPipe);
    mockDatePipe = mock(DatePipe);
    mockPaymentTaskService = mock(PaymentTaskService);
    mockSnackbarService = mock(SnackbarService);
    fixture = TestBed.createComponent(TablePaymentComponent);
    component = fixture.componentInstance;
    spyComponent = spy(component);
    when(spyComponent.ngOnDestroy()).thenCall(() => {});
    fixture.detectChanges();
    reset(spyComponent);
    spyComponent = spy(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy should call destroy subscriber', () => {
    spyOn(component.destroySubscriber, 'next');
    spyOn(component.destroySubscriber, 'complete');
    component.ngOnDestroy();
    expect(component.destroySubscriber.next).toHaveBeenCalledTimes(1);
    expect(component.destroySubscriber.complete).toHaveBeenCalledTimes(1);
  });

  it('sort should emit tsort event', () => {
    const changeSubject = new Subject();
    spyOn(component.tsort, 'emit');
    component.sort = { sortChange: changeSubject } as any;
    component.ngOnInit();
    changeSubject.next();
    expect(component.tsort.emit).toHaveBeenCalledWith(component.sort);
  });

  it('ngOnChanges should update list', () => {
    let myCurrentList = ['myCurrentList'];
    const changes = {
      list: {
        currentValue: myCurrentList
      }
    };
    component.ngOnChanges(changes as any);
    expect(component.dataSource.data).toEqual(myCurrentList as any);
  });

  it('ngOnChanges should not  update list', () => {
    let myCurrentList = ['myCurrentList'];
    const changes = {
      other: {
        currentValue: myCurrentList
      }
    };
    component.ngOnChanges(changes as any);
    expect(component.dataSource.data).toEqual([]);
  });

  it('editPaymentTask should display add payment dialog and update list after closed', () => {
    let myPaymentTask = {};
    const spyDialog = spy(DialogAddPaymentComponent);
    spyOn(component.updateList, 'emit');
    when(spyDialog.open(anything())).thenReturn({ afterClosed: () => of(true) } as any);
    component.editPaymentTask(myPaymentTask as any);
    expect(component.updateList.emit).toHaveBeenCalledWith(true);
    expect(capture(spyDialog.open).last()).toEqual([{ paymentTask: myPaymentTask }]);
    reset(spyDialog);
  });

  it('deletePaymentTask should show dialog and call delete', () => {
    const myPaymentTask = { id: 10, name: 'MyName', date: '2017-01-01', value: 201.02 };
    const spyDialog = spy(DialogConfirmationComponent);
    spyOn(component.updateList, 'emit');

    when(mockDatePipe.transform(anything(), anything())).thenReturn('DateFormated');
    when(mockCurrencyPipe.transform(anything())).thenReturn('CurrencyFormatted');
    when(mockPaymentTaskService.deletePaymentTask(anything())).thenReturn(of(true) as any);

    when(spyDialog.open(anything())).thenCall(data => {
      expect(data.title).toEqual('Excluir pagamento');
      expect(data.message).toEqual(`
        <p>Usuário: MyName </p>
        <p>Data: DateFormated </p>
        <p>Valor: R$ CurrencyFormatted </p>
      `);
      const dialogMock = { close: data => {} };
      spyOn(dialogMock, 'close');
      data.yesCallback(dialogMock);
      expect(dialogMock.close).toHaveBeenCalledOnceWith(true);
      expect(component.updateList.emit).toHaveBeenCalledWith(true);
      verify(mockDatePipe.transform(myPaymentTask.date, 'short')).once();
      verify(mockCurrencyPipe.transform(myPaymentTask.value)).once();
      verify(mockPaymentTaskService.deletePaymentTask(myPaymentTask.id)).once();
      verify(mockSnackbarService.showSuccess('Registro excluído com sucesso!')).once();
      reset(spyDialog);
    });

    component.deletePaymentTask(myPaymentTask as any);
  });
});
