import { Component, Inject, OnInit } from "@angular/core"
import { trigger, style, animate, transition } from "@angular/animations"
import { Payment } from "src/app/models/payment"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

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
  payment!: Payment
  isEditModal!: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Payment,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.name !== null) this.isEditModal = true
    else this.isEditModal = false
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
