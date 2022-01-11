import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatterService } from '../../../services/formatter/formatter.service';
import { Component, OnInit, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {
  @ViewChild("date", { read: ViewContainerRef }) public dateView;

  ownerForm;

  public dialogTitle = 'Adicionar pagamento';
  public currentPayment = {
    name: '',
    title: '',
    value: '',
    date: moment(),
    image: 'https://www.ecp.org.br/wp-content/uploads/2017/12/default-avatar-1-300x300.png',
  };

  constructor(
    public formatterService: FormatterService,
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditing: boolean, payment: any }
  ) {
    if (data.isEditing) this.configureEdit();
  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      value: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      title: new FormControl('', [Validators.maxLength(100)]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    this.dialogRef.close({
      image: '',
      username: '',
      isPayed: false,
      ...this.currentPayment,
    });
  }

  configureEdit(): void {
    this.dialogTitle = 'Editar pagamento';
    this.currentPayment = { ...this.data.payment };
  }

  ngAfterViewInit(): void {}
}
