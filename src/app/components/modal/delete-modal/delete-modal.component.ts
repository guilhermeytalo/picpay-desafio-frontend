import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogData } from '../../../_interfaces/dialogData';
import { RepositoryService } from'../../../shared/repository.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  router: Router;

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: RepositoryService,
    router: Router) {
      this.router = router;
    }

  ngOnInit(): void {
    let date: Date = new Date(this.data.task.date);
    this.data.task.date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTask() {
    this.service.delete("tasks", this.data.task.id).subscribe(res => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      this.dialogRef.close();
    });
  }
}
