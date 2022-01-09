import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";
import { FormatterService } from '../../../services/formatter/formatter.service';
import { Component, OnInit, Inject, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {
  @ViewChild("date", { read: ViewContainerRef }) public dateView;

  ownerForm;
  maskedInputController;
  dateMask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/];

  public dialogTitle = 'Adicionar pagamento';
  public currentPayment = {
    date: '',
    name: '',
    title: '',
    value: '',
  };

  constructor(
    public formatterService: FormatterService,
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEditing: boolean }
  ) {
    if (data.isEditing) this.configureEdit();
  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      value: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
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
    this.dialogTitle = 'Editar pagamento'
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.maskedInputController = textMask.maskInput({
        inputElement: this.dateView.element.nativeElement,
        mask: this.dateMask,
        showMask: true,
      });
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}
