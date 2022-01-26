import { Component, OnInit, OnDestroy } from "@angular/core"
import { Subscription } from "rxjs"
import { trigger, style, animate, transition } from "@angular/animations"
import { ToastService } from "../../service/toast.service"

@Component({
  selector: "toast",
  templateUrl: "toast.component.html",
  styleUrls: ["./toast.component.scss"],
  animations: [
    trigger("alert", [
      transition(":enter", [style({ top: -100 }), animate("200ms", style({ top: "1rem" }))]),
      transition(":leave", [animate("200ms", style({ top: -100 }))]),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  message: any

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.getAlert().subscribe(message => {
      switch (message && message.type) {
        case "success":
          message.cssClass = "toast alert alert-success"
          break
        case "error":
          message.cssClass = "toast alert alert-danger"
          break
      }

      this.message = message
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
