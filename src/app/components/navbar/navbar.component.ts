import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  
  }

  goToDashboard(): void {
    this.router.navigate(['', 'dashboard']);
  }

  goToProfile(): void {
    this.router.navigate(['', 'profile']);
  }

  logout(): void {

  }

}
