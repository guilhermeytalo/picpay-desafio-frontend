import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    const userIsLogged = this.authService.userIsLogged;

    if (!userIsLogged) {
      console.log('não logado')
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }

}
