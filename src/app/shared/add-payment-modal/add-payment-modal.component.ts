import { Component, OnInit } from "@angular/core";

@Component({
  selector: "add-payment-modal",
  templateUrl: "./add-payment-modal.component.html",
  styleUrls: ["./add-payment-modal.component.scss"],
})
export class AddPaymentModalComponent {
  constructor() {}

  public mostrar: boolean = false;

  public toggle() {
    this.mostrar = !this.mostrar;
  }
}
