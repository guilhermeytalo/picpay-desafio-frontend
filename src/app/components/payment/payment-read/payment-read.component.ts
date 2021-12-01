import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, delay, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-read',
  templateUrl: './payment-read.component.html',
  styleUrls: ['./payment-read.component.scss']
})
export class PaymentReadComponent implements OnInit, AfterViewInit {

  payments: Payment[];
  meses: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  displayedColumns: string[] = ['username', 'title', 'date', 'value', 'isPayed', 'actions'];
  dataSource: Payment[] = [] ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  nameFilter = new FormControl('');
  filterValues = {
    name: ''
  };


  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  constructor(
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.updateTable();
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
    };
    return filterFunction;
  }

  updateTable(): void {
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.paymentService.read(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize
        ).pipe(catchError(() => of(null)));
      }),
      delay(500),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        this.resultsLength = data.headers.get('X-Total-Count');

        data.body.map(res => {
          const date = new Date(res.date);
          const dataFormatada = `${date.getDate()} ${this.meses[(date.getMonth())]} ${date.getFullYear()}`;
          const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          res.formatDate = dataFormatada;
          res.time = time;
        });

        return data;
      }),
    )
    .subscribe(data => {
      this.dataSource = data.body;
    });
  }

  editProduct(cod: number): void {
    // this.router.navigate([`editar-produto/${cod}`]);
  }

  deleteProduct(id: number): void {
    this.paymentService.delete(id).subscribe(() => {
      this.updateTable();
    });
  }

  openDialog(id: number, productName: string) {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   width: '300px',
    //   data: {name: productName}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.deleteProduct(id);
    //   }
    // });
  }

}
