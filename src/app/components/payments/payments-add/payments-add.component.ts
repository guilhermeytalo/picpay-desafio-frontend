import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {
  public title = 'Adicionar pagamento';

  constructor(
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditing: boolean }
  ) {
    if (data.isEditing) this.configureEdit();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  configureEdit(): void {
    this.title = 'Editar pagamento'
  }
}
