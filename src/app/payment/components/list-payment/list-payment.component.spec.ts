import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetPaymentTask } from '@app/payment/models/get-payment-task.model';
import { PaymentTaskService } from '@app/payment/services/payment-task.service';
import { of, Subject } from 'rxjs';
import { anything, instance, mock, reset, spy, verify, when } from 'ts-mockito';
import { DialogAddPaymentComponent } from '../dialog-add-payment/dialog-add-payment.component';
import { ListPaymentComponent } from './list-payment.component';

describe('ListPaymentComponent', () => {
  let component: ListPaymentComponent;
  let spyComponent: ListPaymentComponent;
  let fixture: ComponentFixture<ListPaymentComponent>;
  let mockPaymentTaskService: PaymentTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListPaymentComponent],
      providers: [
        {
          provide: PaymentTaskService,
          useFactory: () => instance(mockPaymentTaskService)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockPaymentTaskService = mock(PaymentTaskService);
    fixture = TestBed.createComponent(ListPaymentComponent);
    component = fixture.componentInstance;
    spyComponent = spy(component);
    when(spyComponent.subscribeToUpdateList()).thenCall(() => {});
    when(spyComponent.updateList()).thenCall(() => {});
    when(spyComponent.subscribeTextSearch()).thenCall(() => {});
    when(spyComponent.ngOnInit()).thenCall(() => {});
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

  it('sort is sorting list with matsort', () => {
    when(spyComponent.updateList()).thenCall(() => {});
    const sortOption = new MatSort();
    sortOption.active = 'status';
    sortOption.direction = 'asc';
    component.sort(sortOption);
    expect(component.listParams._sort).toEqual([sortOption.active]);
    expect(component.listParams._order).toEqual(sortOption.direction);
    verify(spyComponent.updateList()).times(1);
  });

  it('page is paging list with pageevent', () => {
    when(spyComponent.updateList()).thenCall(() => {});
    const pageOption = new PageEvent();
    pageOption.pageSize = 10;
    pageOption.pageIndex = 5;
    component.page(pageOption);
    expect(component.listParams._limit).toEqual(pageOption.pageSize);
    expect(component.listParams._page).toEqual(pageOption.pageIndex + 1);
    verify(spyComponent.updateList()).times(1);
  });

  it('page should not call updateList with same page size and index', () => {
    when(spyComponent.updateList()).thenCall(() => {});
    const pageOption = new PageEvent();
    pageOption.pageSize = 10;
    pageOption.pageIndex = 0;
    component.page(pageOption);
    expect(component.listParams._limit).toEqual(pageOption.pageSize);
    expect(component.listParams._page).toEqual(pageOption.pageIndex + 1);
    verify(spyComponent.updateList()).never();
  });

  it('subscribe to update list', fakeAsync(() => {
    when(spyComponent.getList()).thenCall(() => {});
    component.subscribeToUpdateList();
    component.updateListSubject.next();
    verify(spyComponent.getList()).never();
    tick(100);
    verify(spyComponent.getList()).once();
    expect().nothing();
  }));

  it('updatelist should update list ', () => {
    component.updateListSubject = new Subject();
    spyOn(component.updateListSubject, 'next');
    component.updateList();
    expect(component.updateListSubject.next).toHaveBeenCalled();
  });

  it('subscribetextsearch shoud search', fakeAsync(() => {
    const text = 'test';
    when(spyComponent.updateList()).thenCall(() => {});
    component.subscribeTextSearch();
    component.textSearchControl.setValue(text);
    expect(component.listParams.q).toBeFalsy();
    tick(300);
    expect(component.textSearchControl.value).toBe(text);
    expect(component.listParams.q).toEqual(text);
    verify(spyComponent.updateList()).once();
    component.textSearchControl.setValue('');
    expect(component.listParams.q).toEqual('');
    verify(spyComponent.updateList()).times(2);
  }));

  it('getList should call service to get list and call first page when move to first page', fakeAsync(() => {
    let list: GetPaymentTask = {
      list: [],
      total: 0
    };
    when(mockPaymentTaskService.getPaymentTaskList(anything())).thenReturn(of(list));
    component.getList();
    expect(component.list).toEqual(list.list);
    expect(component.listTotal).toEqual(list.total);
    component.paginator = {
      firstPage: () => {},
      page: {
        next: data =>
          expect(data).toEqual({
            pageSize: component.listParams._limit,
            pageIndex: component.listParams._page - 1,
            length: component.listTotal
          })
      } as any
    } as any;
    spyOn(component.paginator, 'firstPage');
    spyOn(component.paginator.page, 'next').and.callThrough();
    tick();
    expect(component.paginator.firstPage).toHaveBeenCalledTimes(1);
    expect(component.paginator.page.next).toHaveBeenCalledTimes(1);
  }));

  it('getList should call service to get list and dont call first page with paginator not instantiate', fakeAsync(() => {
    let list: GetPaymentTask = {
      list: [],
      total: 0
    };
    when(mockPaymentTaskService.getPaymentTaskList(anything())).thenReturn(of(list));
    component.getList();
    expect(component.list).toEqual(list.list);
    expect(component.listTotal).toEqual(list.total);
    component.paginator = null;
    tick();
  }));

  it('getList should call service to get list and dont call first page if not in first page', fakeAsync(() => {
    let list: GetPaymentTask = {
      list: [],
      total: 0
    };
    component.listParams._page = 5;
    when(mockPaymentTaskService.getPaymentTaskList(anything())).thenReturn(of(list));
    component.getList();
    expect(component.list).toEqual(list.list);
    expect(component.listTotal).toEqual(list.total);
    component.paginator = {
      firstPage: () => {},
      page: {
        next: data =>
          expect(data).toEqual({
            pageSize: component.listParams._limit,
            pageIndex: component.listParams._page - 1,
            length: component.listTotal
          })
      } as any
    } as any;
    spyOn(component.paginator, 'firstPage');
    spyOn(component.paginator.page, 'next').and.callThrough();
    tick();
    expect(component.paginator.firstPage).toHaveBeenCalledTimes(0);
    expect(component.paginator.page.next).toHaveBeenCalledTimes(0);
  }));

  it('showDialogAddPaymentTask should display add payment dialog and update list after closed', () => {
    const spyDialog = spy(DialogAddPaymentComponent);
    when(spyDialog.open()).thenReturn({ afterClosed: () => of(true) } as any);
    component.showDialogAddPaymentTask();
    verify(spyComponent.updateList()).once();
    expect().nothing();
    reset(spyDialog);
  });
});
