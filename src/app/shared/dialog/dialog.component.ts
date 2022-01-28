import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { FormBuilder, Validators, FormGroup } from "@angular/forms"

@Component({
  selector: "dialog",
  templateUrl: "./dialog.component.html",
})
export class DialogComponent implements OnInit {
  dialogForm: FormGroup
  description: string

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) description
  ) {
    this.description = description

    this.dialogForm = this.formBuilder.group({
      description: [this.description],
    })
  }

  ngOnInit() {}

  get f() {
    return this.dialogForm.controls
  }

  save() {
    this.dialogRef.close(this.dialogForm.value)
  }

  close() {
    this.dialogRef.close()
  }
}
