import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeTask } from 'src/app/pages/home/shared/homeTask.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: HomeTask) { }

  ngOnInit(): void {
    
    console.log(this.data)
  }

}
