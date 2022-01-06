import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    const isLoggedIn = JSON.parse(this.cookieService.get('is_logged_in'));
    !isLoggedIn && this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}
