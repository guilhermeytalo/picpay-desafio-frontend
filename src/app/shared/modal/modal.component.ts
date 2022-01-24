import { Component, OnInit } from "@angular/core"
import { trigger, style, animate, transition } from "@angular/animations"

@Component({
  selector: "modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  animations: [
    trigger("overlay", [
      transition(":enter", [style({ opacity: 0 }), animate("250ms", style({ opacity: 0.5 }))]),
      transition(":leave", [animate("500ms", style({ opacity: 0 }))]),
    ]),

    trigger("modal", [
      transition(":enter", [style({ top: -999 }), animate("500ms", style({ top: "50%" }))]),
      transition(":leave", [animate("250ms", style({ top: -999 }))]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  public mostrar: boolean = false

  ngOnInit() {}

  public toggle() {
    this.mostrar = !this.mostrar
  }
}
