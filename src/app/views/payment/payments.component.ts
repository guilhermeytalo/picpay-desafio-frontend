import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

export interface UserData {
  user: string,
  title: string,
  date: string,
  value: string,
  paidOut: boolean,
}

@Component({
  selector: 'app-payment',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'paidOut'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {
    const isLoggedIn = JSON.parse(this.cookieService.get('is_logged_in'));
    !isLoggedIn && this.router.navigate(['/login']);

    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  return {
    user: 'Claudia',
    title: 'Professor',
    date: '23 Jun 2020',
    value: 'R$ 100,00',
    paidOut: true,
  };
}