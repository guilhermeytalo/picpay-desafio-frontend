import { Component, Inject, OnInit } from "@angular/core"
import { trigger, style, animate, transition } from "@angular/animations"
import { Payment } from "src/app/models/payment"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FormBuilder, Validators } from "@angular/forms"
import { FormGroup } from "@angular/forms"

@Component({
  selector: "modal",
  templateUrl: "./modal.component.html",
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
  paymentsFormModal: FormGroup
  submitted = false
  loading = false

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Payment,
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.name !== null) this.isEditModal = true
    else this.isEditModal = false

    this.paymentsFormModal = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      title: [null, [Validators.required]],
      value: [null, [Validators.required]],
    })
  }

  get f() {
    return this.paymentsFormModal.controls
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSubmit() {
    this.submitted = true
    if (this.paymentsFormModal.invalid) return
  }
}
