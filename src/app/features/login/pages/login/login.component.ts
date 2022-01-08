import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthRequest } from '@/features/auth/models/user-auth.model';
import { AuthService } from '@/features/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  auth(user: UserAuthRequest): void {
    this.authService.auth(user).subscribe({
      next: this.handleAuthSuccess.bind(this),
      error: this.handleAuthError.bind(this)
    });
  }

  handleAuthSuccess(data: boolean): void {
    this.router.navigate(['/payments']);
  }

  handleAuthError(): void {
    this.loginMessage = 'Erro ao realizar login. Revise suas credenciais';
  }

}
