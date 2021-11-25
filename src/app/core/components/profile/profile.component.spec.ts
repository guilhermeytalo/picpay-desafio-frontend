import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from '@app/core/services/auth.service';
import { ProfileService } from '@app/core/services/profile.service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { DialogConfirmationComponent } from '@app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { of, Subject, throwError } from 'rxjs';
import { anything, capture, instance, mock, reset, spy, verify, when } from 'ts-mockito';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let spyComponent: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockProfileService: ProfileService;
  let mockAuthService: AuthService;
  let mockSnackbarService: SnackbarService;
  let userDataSubject = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProfileComponent],
      providers: [
        {
          provide: ProfileService,
          useFactory: () => instance(mockProfileService)
        },
        {
          provide: AuthService,
          useFactory: () => instance(mockAuthService)
        },
        {
          provide: SnackbarService,
          useFactory: () => instance(mockSnackbarService)
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockProfileService = mock(ProfileService);
    mockAuthService = mock(AuthService);
    mockSnackbarService = mock(SnackbarService);
    when(mockAuthService.getUserData()).thenReturn(userDataSubject.asObservable() as any);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyComponent = spy(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user data should update form', () => {
    let data = {
      id: 1,
      email: 'teste@teste',
      password: '123',
      name: 'aaa'
    };
    userDataSubject.next(data);
    expect(component.formInfo.value).toEqual({ email: data.email, name: data.name, photo: null });
  });

  it('change password with valid form should update password', () => {
    let formData = { old: 'oldPass', new: 'newPass', confirm: 'newPass' };
    component.formPassword.patchValue(formData);
    let spyDialog = spy(DialogConfirmationComponent);

    when(spyDialog.open(anything())).thenCall(data => {
      expect(data).toEqual({ title: 'Confirma a alteração da senha?', message: '' });
      return { afterClosed: () => of(true) };
    });
    when(mockProfileService.changeUserPassowrd(anything(), anything())).thenReturn(of(true) as any);

    component.changePassword();

    verify(mockProfileService.changeUserPassowrd(formData.old, formData.new)).once();
    verify(mockSnackbarService.showSuccess('Senha alterada com sucesso!')).once();
    expect(component.formPassword.value).toEqual({ old: null, new: null, confirm: null });
    reset(spyDialog);
  });
  it('change password with valid form and wrong password should show a message', () => {
    let formData = { old: 'oldPass', new: 'newPass', confirm: 'newPass' };
    component.formPassword.patchValue(formData);
    let spyDialog = spy(DialogConfirmationComponent);

    when(spyDialog.open(anything())).thenCall(data => {
      expect(data).toEqual({ title: 'Confirma a alteração da senha?', message: '' });
      return { afterClosed: () => of(true) };
    });
    when(mockProfileService.changeUserPassowrd(anything(), anything())).thenReturn(throwError({ status: 404 }) as any);

    component.changePassword();

    verify(mockProfileService.changeUserPassowrd(formData.old, formData.new)).once();
    verify(mockSnackbarService.showError('Senha anterior não é valida.')).once();

    when(mockProfileService.changeUserPassowrd(anything(), anything())).thenReturn(throwError(true) as any);
    component.changePassword();

    verify(mockProfileService.changeUserPassowrd(formData.old, formData.new)).twice();
    verify(mockSnackbarService.showError('Ocorreu um erro ao alterar a senha.')).once();
    reset(spyDialog);
  });

  it('change password without form valid should show message', () => {
    let formData = { old: 'oldPass', new: 'newPass', confirm: 'wrongPassword' };
    component.formPassword.patchValue(formData);
    component.changePassword();
    verify(mockSnackbarService.showError('Senhas não conferem.')).once();
    verify(mockProfileService.changeUserPassowrd(anything(), anything())).never();
    expect().nothing();
  });

  it('change info should update user info', () => {
    let formData = { email: 'newEmail', name: 'newName' };

    let data = {
      id: 1,
      email: 'teste@teste',
      password: '123',
      name: 'aaa'
    };
    component.formInfo.patchValue(formData);
    let spyDialog = spy(DialogConfirmationComponent);

    when(spyDialog.open(anything())).thenCall(data => {
      expect(data).toEqual({ title: 'Confirma a alteração das informações?', message: '' });
      return { afterClosed: () => of(true) };
    });
    when(mockAuthService.getUserData()).thenReturn(of(data));
    when(mockProfileService.changeUserInfo(anything())).thenReturn(of(true) as any);
    component.changeUserInfo();
    verify(mockAuthService.getUserData()).twice();
    verify(mockProfileService.changeUserInfo(anything())).once();
    expect(capture(mockProfileService.changeUserInfo).last()).toEqual([
      {
        id: 1,
        email: formData.email,
        password: '123',
        name: formData.name,
        photo: null
      }
    ]);
    verify(mockSnackbarService.showSuccess('Informações atualizadas com sucesso!')).once();
    reset(spyDialog);
  });

  it('change password without form valid should show message', () => {
    component.changeUserInfo();
    verify(mockProfileService.changeUserInfo(anything())).never();
    expect().nothing();
  });

  it('upload photo should transform in base64', done => {
    let myfile = new Blob([]);
    let files: FileList = [myfile] as any;
    spyOn(FileReader.prototype, 'readAsDataURL').and.callThrough();
    component.uploadFile(files);
    setTimeout(() => {
      expect(FileReader.prototype.readAsDataURL).toHaveBeenCalledOnceWith(myfile);
      expect(!!component.formInfo.value.photo).toBeTruthy();
      done();
    }, 200);
  });

  it('removePhoto should clear photo from form', () => {
    component.formInfo.controls.photo.setValue('myphoto');
    component.removePhoto();
    expect(!!component.formInfo.value.photo).toBeFalse();
  });

  it('inputFile should call upload file', () => {
    let data = {
      target: {
        files: 'myfiles'
      }
    };
    when(spyComponent.uploadFile(anything())).thenCall(() => {});
    component.inputFile(data);
    expect(!!component.formInfo.value.photo).toBeFalse();
    verify(spyComponent.uploadFile(data.target.files as any)).once();
  });
});
