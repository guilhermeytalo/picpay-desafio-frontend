import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-payments-remove',
  templateUrl: './payments-remove.component.html',
  styleUrls: ['./payments-remove.component.scss']
})
export class PaymentsRemoveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentsRemoveComponent>,
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
