import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentCreateComponent } from 'src/app/components/payment/payment-create/payment-create.component';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

import { MatDialog } from '@angular/material/dialog';
import { PaymentUpdateComponent } from 'src/app/components/payment/payment-update/payment-update.component';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    const userIsLogged = this.authService.userIsLogged;

    if (!userIsLogged) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }

  openCreatePaymentDialog(): void {
    const dialogRef = this.dialog.open(PaymentCreateComponent, {
      width: '772px'
    });
  }

  openUpdatePaymentDialog(cod: number): void {
    const dialogRef = this.dialog.open(PaymentUpdateComponent, {
      width: '772px',
      data: {
        id: cod
      }
    });
  }

}
