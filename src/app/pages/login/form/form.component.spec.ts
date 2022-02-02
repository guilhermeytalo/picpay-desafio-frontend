import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockProvider} from 'ng-mocks';

import {FormComponent} from './form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../../api/account.service';
import {Router} from '@angular/router';
import {RouterFakeMock} from '../mocks/routerFake.mock';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [FormComponent],
            providers: [
                MockProvider(AccountService),
                {provide: Router, useClass: RouterFakeMock}
            ],
        }).compileComponents();


    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        router = TestBed.inject(Router);

        component = fixture.componentInstance;

        spyOn<any>(component, 'getErrorMessage').and.stub();
        spyOn<any>(component, 'onSubmit').and.stub();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('email amd password field validity', () => {
        const email = component.loginForm.controls.email;
        const password = component.loginForm.controls.password;
        expect(email.valid).toBeFalsy();
        expect(password.valid).toBeFalsy();
    });

    describe(('getErrorMessage'), () => {
        it(`Testing getErrorMessage with valid field`, () => {
            const getErrorMessage = 'getErrorMessage';
            component[getErrorMessage]('email');
        });
    });

    fdescribe(('onSubmit'), () => {
        it('Testing form group element count', () => {
            const formElement = fixture.debugElement.nativeElement
                .querySelector('#loginForm');
            const inputElements = formElement.querySelectorAll('input');
            expect(inputElements.length).toEqual(2);
        });

        it('Testing initial form valuer from form group', () => {
            const loginFormGroup = component.loginForm;
            const loginFormValues = {
                email: '',
                password: ''
            };
            expect(loginFormGroup.value).toEqual(loginFormValues);
        });

        it('Testing email value and validation', () => {
            const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
                .querySelector('#loginForm').querySelectorAll('input')[0];
            const userNameValueFromGroup = component.loginForm.get('email');
            expect(loginFormUserElement.value).toEqual(userNameValueFromGroup.value);
            expect(userNameValueFromGroup.errors).not.toBeNull();
            expect(userNameValueFromGroup.errors.required).toBeTruthy();
        });

        it('check username value after validation', () => {
            const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
                .querySelector('#loginForm').querySelectorAll('input')[0];
            const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement
                .querySelector('#loginForm').querySelectorAll('input')[1];
            loginFormUserElement.value = 'usuario@gmail.com';
            loginFormPasswordElement.value = 'usuario';
            loginFormUserElement.dispatchEvent(new Event('input'));
            loginFormPasswordElement.dispatchEvent(new Event('input'));
            const isLoginFormValid = component.loginForm.valid;
            fixture.whenStable().then(() => {
                expect(isLoginFormValid).toBeTruthy();
            });
        });
    });
});
