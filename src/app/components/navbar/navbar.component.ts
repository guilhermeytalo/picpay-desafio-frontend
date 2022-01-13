import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../shared/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  router: Router;

  constructor(router: Router, private tokenStorage: TokenStorageService) {
    this.router = router;
  }

  goToDashboard(): void {
    this.router.navigate(['', 'dashboard']);
  }

  goToProfile(): void {
    this.router.navigate(['', 'profile']);
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
}
