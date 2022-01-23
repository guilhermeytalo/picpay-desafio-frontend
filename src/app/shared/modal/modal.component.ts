import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { PaymentsApiService } from "../../service/payments-api.service"
import { Payment } from "../../service/payment"

@Component({
  selector: "modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  public mostrar: boolean = false

  payment: Payment = new Payment()
  title: string

  constructor(private router: Router, private paymentsApiService: PaymentsApiService) {}

  ngOnInit() {}

  public toggle() {
    this.mostrar = !this.mostrar
  }
}
