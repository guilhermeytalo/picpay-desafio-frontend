import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddModalComponent } from '../../components/modal/add-modal/add-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}