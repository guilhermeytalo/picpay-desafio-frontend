
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { RepositoryService } from '../../shared/repository.service';
import { Task } from '../../_interfaces/task';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['name', 'title', 'date', 'value', 'isPayed', ' '];
  
  public dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private repoService: RepositoryService, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.getAllTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllTasks = () => {
    this.repoService.getData('tasks')
    .subscribe(res => {
      this.dataSource.data = res as Task[];
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDeleteDialog(element): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '20%',
      data: {task: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(element): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '50%',
      data: {task: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public redirectToDetails = (id: string) => {
    
  }

  public redirectToUpdate = (id: string) => {
    
  }

  public redirectToDelete = (id: string) => {
    
  }
}