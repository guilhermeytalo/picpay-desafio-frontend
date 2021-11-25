import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { spy, verify } from 'ts-mockito';
import { FilterPaymentComponent } from './filter-payment.component';

describe('FilterPaymentComponent', () => {
  let component: FilterPaymentComponent;
  let spyComponent: FilterPaymentComponent;
  let fixture: ComponentFixture<FilterPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterPaymentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyComponent = spy(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filterPayment should send filter value', () => {
    component.showFilter = true;
    spyOn(component.filterChange, 'emit').and.callFake(() => {});
    component.filterPayment();
    verify((spyComponent as any).formWithoutNull()).once();
    expect(component.showFilter).toBeFalse();
  });

  it('clearFilter should clear filter value', () => {
    component.showFilter = true;
    component.form.patchValue({
      name_like: 'value',
      username_like: 'value',
      title_like: 'value',
      value_gte: 'value',
      value_lte: 'value',
      date_gte: 'value',
      date_lte: 'value',
      isPayed: 'value'
    });
    spyOn(component.filterChange, 'emit').and.callFake(() => {});
    component.clearFilter();
    verify((spyComponent as any).formWithoutNull()).once();
    expect(component.showFilter).toBeFalse();
    console.log('component.form.value', component.form.value);
    expect(component.form.value).toEqual({});
  });

  it('closeFilter should keep same filter', () => {
    component.showFilter = true;
    component.filter = {
      name_like: 'value',
      username_like: 'value',
      title_like: 'value',
      value_gte: 123,
      value_lte: 123,
      date_gte: 'value',
      date_lte: 'value',
      isPayed: true
    };
    component.closeFilter();
    expect(component.showFilter).toBeFalse();
    expect(component.form.value).toEqual({
      name_like: 'value',
      username_like: 'value',
      title_like: 'value',
      value_gte: 123,
      value_lte: 123,
      date_gte: 'value',
      date_lte: 'value',
      isPayed: true
    });
  });

  it('castAny', () => {
    expect(component.castAny('value')).toEqual('value');
  });

  it('formWithoutNull shold return form data with only values', () => {
    component.form.patchValue({
      name_like: 'value',
      value_lte: 123,
      date_lte: moment('2010-01-01'),
      isPayed: true
    });
    expect((component as any).formWithoutNull()).toEqual({
      name_like: 'value',
      value_lte: 123,
      date_lte: moment('2010-01-01').toISOString(),
      isPayed: true
    });
  });
});
