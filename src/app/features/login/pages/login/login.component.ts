import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserRequest } from '@/features/login/models/login.model';
import { LoginService } from '@/features/login/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  auth(user: AuthUserRequest): void {
    this.loginService.auth(user).subscribe({
      next: this.handleAuthSuccess.bind(this),
      error: this.handleAuthError.bind(this)
    });
  }

  handleAuthSuccess(data: Boolean): void {
    this.router.navigate(['/dashboard'])
  }

  handleAuthError(): void {
    console.log("Erro ao realizar login")
  }

}
