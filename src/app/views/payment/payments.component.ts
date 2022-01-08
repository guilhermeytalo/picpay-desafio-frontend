import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild } from '@angular/core';
import { PaymentsAddComponent } from '../../components/payments/payments-add/payments-add.component';
import { PaymentsRemoveComponent } from '../../components/payments/payments-remove/payments-remove.component';

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
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'paidOut', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) {
    const isLoggedIn = JSON.parse(this.cookieService.get('is_logged_in'));
    !isLoggedIn && this.router.navigate(['/login']);

    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(users);
  }

  openAddDialog(settings: any = {}): void {
    const { edit } = settings;

    this.dialog.open(PaymentsAddComponent, {
      width: '772px',
      height: '395px',
    });
  }

  openRemoveDialog(): void {
    this.dialog.open(PaymentsRemoveComponent, {
      width: '405px',
      height: '325px',
    });
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