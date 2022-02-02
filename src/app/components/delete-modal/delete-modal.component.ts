import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Payments} from '../../../models/payments';
import {FormBuilder} from '@angular/forms';
import {PaymentModalService} from '../payment-modal/payment-modal.service';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { payments: Payments, deleteData: boolean },
        private paymentModalService: PaymentModalService
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.data.deleteData = true;
        this.dialogRef.close();
    }

    onCancel() {
        this.data.deleteData = false;
        this.dialogRef.close();
    }

}
