import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { TokenStorageService } from '../../shared/token-storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  router: Router;
  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }

    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
