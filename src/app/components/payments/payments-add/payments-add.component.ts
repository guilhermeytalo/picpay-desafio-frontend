import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
