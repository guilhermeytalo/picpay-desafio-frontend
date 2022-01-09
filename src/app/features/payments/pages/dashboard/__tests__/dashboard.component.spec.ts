import { Payment, PaymentsDetails } from '@/features/payments/models/payments.model';
import { PaymentsModule } from '@/features/payments/payments.module';
import { PaymentsService } from '@/features/payments/services/payments.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { paymentsDetailsMock } from 'src/_mock/payments-details.mock';
import { paymentMock, paymentsMock } from 'src/_mock/payments.mock';

import { DashboardComponent } from '../dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: PaymentsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        PaymentsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PaymentsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();

    spyOn(service, 'get').and.returnValue(of(paymentsMock));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get payments', () => {
    spyOn(component, 'unsubscribePaymentsSubscritions');
    spyOn(component, 'getPaymentsObservable').and.returnValue(of(paymentsMock));

    component.searchPaymentsByNameValue = '';

    component.getPayments(1, 1);

    expect(component.unsubscribePaymentsSubscritions).toHaveBeenCalled();
    expect(component.getPaymentsObservable).toHaveBeenCalledWith(1, 1);
    expect(component.paymentsSubscriptions.length).toBeGreaterThan(0);
  });

  it('should get payments by name', () => {
    spyOn(service, 'getAll').and.returnValue(of(paymentsMock));
    spyOn(component, 'getPaymentsByName');

    component.searchPaymentsByNameValue = 'Jonh';
    component.getPayments(1, 1);

    expect(component.getPaymentsByName).toHaveBeenCalled();
  });

  it('should handle get payments details success', () => {
    component.paymentsDetails = {} as PaymentsDetails;
    component.handleGetPaymentsDetailsSuccess(paymentsDetailsMock);

    expect(component.paymentsDetails).toEqual(paymentsDetailsMock);
  });

  it('should get payments observable', () => {
    expect(component.getPaymentsObservable(10, 10)).toBeTruthy();
    expect(service.get).toHaveBeenCalledWith(10, 10);
  });

  it('should get payments observable from payments details', () => {
    spyOn(component, 'getPaymentsObservable').and.returnValue(of(paymentsMock));

    expect(component.getPaymentsObservableFromPaymentsDetails(paymentsDetailsMock)).toBeInstanceOf(Observable);
    expect(component.getPaymentsObservable).toHaveBeenCalledWith(1, 5);
  });

  it('should handle get payments success', () => {
    component.payments = [];
    component.handleGetPaymentsSuccess(paymentsMock);

    expect(component.payments).toEqual(paymentsMock);
  });

  it('should sort payments', () => {
    component.payments = paymentsMock;

    expect(component.payments[0].isPayed).toBeTruthy();

    component.sortBy({ title: 'Page', value: 'isPayed', sort: 'asc' });

    expect(component.payments[0].isPayed).toBeFalsy();

    component.sortBy({ title: 'Page', value: 'isPayed', sort: 'desc' });

    expect(component.payments[0].isPayed).toBeTruthy();
  });

  it('should update page size', () => {
    spyOn(component, 'updatePageNumber');
    spyOn(service, 'getPaymentsPageCount').and.returnValue(of(10));

    component.currentPageSize = 1;
    component.paymentsCount$ = null;

    component.updatePageSize(2);

    expect(component.currentPageSize).toEqual(2);
    expect(component.updatePageNumber).toHaveBeenCalledWith(1);
    expect(component.paymentsCount$).toBeInstanceOf(Observable);
  });

  it('should update page number', () => {
    spyOn(component, 'getPayments').and.callFake(() => null);

    component.currentPageNumber = 1;
    component.currentPageSize = 5;

    component.updatePageNumber(2);

    expect(component.currentPageNumber).toEqual(2);
    expect(component.getPayments).toHaveBeenCalledWith(2, 5);
  });

  it('should dont search payments', () => {
    spyOn(component, 'updatePageNumber');

    component.searchPaymentsByNameValue = 'Jonh';
    component.searchedPaymentsByNameValue = 'Jonh';

    component.search();

    expect(component.updatePageNumber).not.toHaveBeenCalled();
  });

  it('should dont search payments', () => {
    spyOn(component, 'updatePageNumber').and.callFake(() => null);

    component.searchPaymentsByNameValue = 'Jonh';
    component.searchedPaymentsByNameValue = 'Marie';

    component.search();

    expect(component.updatePageNumber).toHaveBeenCalledWith(1);
  });

  it('should get payments by name', () => {
    spyOn(service, 'getAll').and.returnValue(of(paymentsMock));

    component.getPaymentsByName();

    expect(service.getAll).toHaveBeenCalled();
  });

  it('should validate payment contains searched value', () => {
    component.searchPaymentsByNameValue = 'teste';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeTruthy();

    component.searchPaymentsByNameValue = 'Test';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeTruthy();

    component.searchPaymentsByNameValue = 'TeS';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeTruthy();

    component.searchPaymentsByNameValue = 'tE';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeTruthy();

    component.searchPaymentsByNameValue = 'eS';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeTruthy();

    component.searchPaymentsByNameValue = 'John';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeFalsy();

    component.searchPaymentsByNameValue = '123';
    expect(component.paymentContainsSearchedValue(paymentMock)).toBeFalsy();
  });

  it('should filter payments by name', () => {
    component.searchPaymentsByNameValue = '123';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(0);

    component.searchPaymentsByNameValue = 'Tes';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(2);

    component.searchPaymentsByNameValue = 'Joh';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(2);

    component.searchPaymentsByNameValue = 'ie';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(3);

    component.searchPaymentsByNameValue = 'marie';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(2);

    component.searchPaymentsByNameValue = 'JOHN';
    expect(component.filterPaymentsBySearchedName(paymentsMock).length).toEqual(2);
  });

  it('should handle get payments filtered by name', () => {
    spyOn(service, 'getPaymentsPageCount').and.returnValue(of(10));

    component.paymentsCount$ = null;
    component.searchPaymentsByNameValue = 'John';
    component.searchedPaymentsByNameValue = 'Marie';

    component.handleGetPaymentsFilteredByName(paymentsMock);

    expect(component.paymentsCount$).toBeInstanceOf(Observable);
    expect(component.searchedPaymentsByNameValue).toEqual('John');
  });

  it('should paginate payments filtered by name', () => {
    const paymentsMockSortById = paymentsMock.sort((a, b) => a.id > b.id ? 1 : -1);
    component.currentPageSize = 2;

    component.currentPageNumber = 1;
    const firstPage = component.paginatePaymentsFilteredByName(paymentsMockSortById);

    component.currentPageNumber = 2;
    const secondPage = component.paginatePaymentsFilteredByName(paymentsMockSortById);

    expect(firstPage.length).toEqual(component.currentPageSize);
    expect(secondPage.length).toEqual(component.currentPageSize);

    expect(firstPage[0].id).toEqual(1);
    expect(firstPage[1].id).toEqual(2);
    expect(secondPage[0].id).toEqual(3);
    expect(secondPage[1].id).toEqual(4);
  });

  it('should update page number when seached name changes', () => {
    spyOn(component, 'updatePageNumber').and.callFake(() => null);

    component.searchedPaymentsByNameValue = 'Jonh';
    component.searchPaymentsByNameValue = 'Marie';

    component.changeSearchValue();

    expect(component.updatePageNumber).not.toHaveBeenCalled();

    component.searchPaymentsByNameValue = '';

    component.changeSearchValue();

    expect(component.updatePageNumber).toHaveBeenCalledWith(1);

  });

  it('should handle delete payment success', () => {
    component.payments = [...paymentsMock];

    expect(component.payments.length).toEqual(6);

    component.handleDeletePaymentSuccess(paymentsMock[0]);

    expect(component.payments.length).toEqual(5);
  });

  it('should handle update payment success', () => {
    component.payments = [...paymentsMock];

    expect(component.payments.length).toEqual(6);

    component.handleUpdatePaymentSuccess({ id: 3, name: 'Edited Payment', value: 10, title: 'Some title' } as Payment);

    expect(component.payments.length).toEqual(6);
    expect(component.payments.map(_ => _.id)).toContain(3);
    expect(component.payments.find(_ => _.id === 3).name).toEqual('Edited Payment');
  });

  it('should handle create payment success', () => {
    component.payments = [...paymentsMock];

    expect(component.payments.length).toEqual(6);

    component.handleCreatePaymentSuccess({ id: 10, name: 'Created Payment', value: 10, title: 'Some title' } as Payment);

    expect(component.payments.length).toEqual(7);
    expect(component.payments.map(_ => _.id)).toContain(10);
    expect(component.payments.find(_ => _.id === 10).name).toEqual('Created Payment');
  });

  it('should create payment', () => {
    spyOn(service, 'create').and.returnValue(of(paymentMock));

    component.payments = [];

    component.createPayment(paymentMock);

    expect(service.create).toHaveBeenCalledWith(paymentMock);
    expect(component.payments.length).toEqual(1);
  });

  it('should edit payment', () => {
    const editedPayment = { id: 6, name: 'Edited Payment', isPayed: true } as Payment;
    spyOn(service, 'update').and.returnValue(of(editedPayment));

    component.payments = [...paymentsMock];

    expect(component.payments.length).toEqual(6);

    component.updatePayment(editedPayment);

    expect(service.update).toHaveBeenCalledWith(editedPayment);
    expect(component.payments.length).toEqual(6);
    expect(component.payments.find(_ => _.id === 6).name).toEqual('Edited Payment');

  });

  it('should delete payment', () => {
    spyOn(service, 'delete').and.returnValue(of(paymentMock));

    component.payments = [...paymentsMock];

    expect(component.payments.length).toEqual(6);

    component.deletePayment(paymentMock);

    expect(service.delete).toHaveBeenCalledWith(paymentMock.id);
    expect(component.payments.length).toEqual(5);
  });

  it('should navigate to login', () => {
    spyOn(router, 'navigate').and.callFake(() => null);

    component.navigateToLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});
