import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ILocalStorage } from '@app/infra/cache/interfaces/ilocalstorage';
import AngularMaterialModule from '@app/presentation/components/angular-material/angular-material.module';
import { TablePaymentsComponent } from '@app/presentation/components/table-payments/table-payments.component';
import { PaymentsComponent } from './payments.component';

let fixture: ComponentFixture<PaymentsComponent>;
let component: PaymentsComponent;

let router: jasmine.SpyObj<Router>;
let storage: jasmine.SpyObj<ILocalStorage>;
describe('PaymentsComponent', () => {
  router = jasmine.createSpyObj('Router', ['navigate']);
  storage = jasmine.createSpyObj('ILocalStorage', ['deleteToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [PaymentsComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ILocalStorage, useValue: storage }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
