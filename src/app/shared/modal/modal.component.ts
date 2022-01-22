import { Component, OnInit } from "@angular/core";

@Component({
  selector: "modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  constructor() {}

  public mostrar: boolean = false;

  public toggle() {
    this.mostrar = !this.mostrar;
  }
}
