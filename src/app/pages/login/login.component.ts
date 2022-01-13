import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  router: Router;

  constructor(private tokenStorage: TokenStorageService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
