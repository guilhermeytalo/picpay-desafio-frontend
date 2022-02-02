import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Payments} from '../../../models/payments';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { payments: Payments, deleteData: boolean },
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.dialogRef.close(true);
    }

    onCancel() {
        this.data.deleteData = false;
        this.dialogRef.close(false);
    }

}
