import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Payments} from '../../../models/payments';
import {PaymentService} from '../../api/payment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {PaymentModalComponent} from '../../components/payment-modal/payment-modal.component';
import {PaymentModalService} from '../../components/payment-modal/payment-modal.service';
import {mergeMap} from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DeleteModalComponent} from '../../components/delete-modal/delete-modal.component';

const editIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 7.24002C22.0008 7.10841 21.9756 6.97795 21.9258 6.85611C21.876 6.73427 21.8027 6.62346 21.71 6.53002L17.47 2.29002C17.3766 2.19734 17.2658 2.12401 17.1439 2.07425C17.0221 2.02448 16.8916 1.99926 16.76 2.00002C16.6284 1.99926 16.4979 2.02448 16.3761 2.07425C16.2543 2.12401 16.1435 2.19734 16.05 2.29002L13.22 5.12002L2.29002 16.05C2.19734 16.1435 2.12401 16.2543 2.07425 16.3761C2.02448 16.4979 1.99926 16.6284 2.00002 16.76V21C2.00002 21.2652 2.10537 21.5196 2.29291 21.7071C2.48045 21.8947 2.7348 22 3.00002 22H7.24002C7.37994 22.0076 7.51991 21.9857 7.65084 21.9358C7.78176 21.8858 7.90073 21.8089 8.00002 21.71L18.87 10.78L21.71 8.00002C21.8013 7.9031 21.8757 7.79155 21.93 7.67002C21.9397 7.59031 21.9397 7.50973 21.93 7.43002C21.9347 7.38347 21.9347 7.33657 21.93 7.29002L22 7.24002ZM6.83002 20H4.00002V17.17L13.93 7.24002L16.76 10.07L6.83002 20ZM18.17 8.66002L15.34 5.83002L16.76 4.42002L19.58 7.24002L18.17 8.66002Z" fill="#333333"/>
</svg>
`;

const deleteIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.71 8.29002C15.617 8.19629 15.5064 8.1219 15.3845 8.07113C15.2627 8.02036 15.132 7.99422 15 7.99422C14.8679 7.99422 14.7372 8.02036 14.6154 8.07113C14.4935 8.1219 14.3829 8.19629 14.29 8.29002L12 10.59L9.70996 8.29002C9.52165 8.10171 9.26626 7.99593 8.99996 7.99593C8.73366 7.99593 8.47826 8.10171 8.28996 8.29002C8.10165 8.47832 7.99587 8.73372 7.99587 9.00002C7.99587 9.26632 8.10165 9.52171 8.28996 9.71002L10.59 12L8.28996 14.29C8.19623 14.383 8.12183 14.4936 8.07107 14.6154C8.0203 14.7373 7.99416 14.868 7.99416 15C7.99416 15.132 8.0203 15.2627 8.07107 15.3846C8.12183 15.5065 8.19623 15.6171 8.28996 15.71C8.38292 15.8037 8.49352 15.8781 8.61538 15.9289C8.73724 15.9797 8.86795 16.0058 8.99996 16.0058C9.13197 16.0058 9.26267 15.9797 9.38453 15.9289C9.50639 15.8781 9.61699 15.8037 9.70996 15.71L12 13.41L14.29 15.71C14.3829 15.8037 14.4935 15.8781 14.6154 15.9289C14.7372 15.9797 14.8679 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9797 15.3845 15.9289C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.6171 15.8781 15.5065 15.9288 15.3846C15.9796 15.2627 16.0058 15.132 16.0058 15C16.0058 14.868 15.9796 14.7373 15.9288 14.6154C15.8781 14.4936 15.8037 14.383 15.71 14.29L13.41 12L15.71 9.71002C15.8037 9.61705 15.8781 9.50645 15.9288 9.38459C15.9796 9.26274 16.0058 9.13203 16.0058 9.00002C16.0058 8.86801 15.9796 8.7373 15.9288 8.61544C15.8781 8.49358 15.8037 8.38298 15.71 8.29002ZM19.07 4.93002C18.1475 3.97492 17.044 3.21309 15.824 2.689C14.604 2.16491 13.2918 1.88905 11.964 1.87751C10.6362 1.86598 9.31938 2.11899 8.09042 2.6218C6.86145 3.12461 5.74493 3.86714 4.80601 4.80607C3.86708 5.745 3.12455 6.86151 2.62174 8.09048C2.11893 9.31944 1.86591 10.6362 1.87745 11.964C1.88899 13.2918 2.16485 14.604 2.68894 15.8241C3.21303 17.0441 3.97486 18.1476 4.92996 19.07C5.85243 20.0251 6.95587 20.7869 8.17591 21.311C9.39595 21.8351 10.7082 22.111 12.0359 22.1225C13.3637 22.1341 14.6805 21.881 15.9095 21.3782C17.1385 20.8754 18.255 20.1329 19.1939 19.194C20.1328 18.255 20.8754 17.1385 21.3782 15.9096C21.881 14.6806 22.134 13.3638 22.1225 12.036C22.1109 10.7082 21.8351 9.39601 21.311 8.17597C20.7869 6.95593 20.0251 5.85249 19.07 4.93002ZM17.66 17.66C16.352 18.9694 14.6305 19.7848 12.7888 19.9673C10.947 20.1498 9.09896 19.6881 7.55948 18.6608C6.02 17.6335 4.88432 16.1042 4.34593 14.3335C3.80754 12.5628 3.89976 10.6602 4.60687 8.9498C5.31398 7.23945 6.59223 5.82717 8.22385 4.95358C9.85546 4.07999 11.7395 3.79915 13.555 4.15889C15.3704 4.51863 17.005 5.49671 18.1802 6.92648C19.3554 8.35625 19.9985 10.1493 20 12C20.0035 13.0513 19.7985 14.0929 19.3969 15.0644C18.9952 16.0359 18.4049 16.9182 17.66 17.66Z" fill="#333333"/>
</svg>
`;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    data: Payments[] = [];
    dataSource;
    booleanAsc = false;
    profileImg = '../../../assets/img.png';

    paymentForm: Payments;

    displayedColumns: string[] = [
        'name',
        'title',
        'date',
        'value',
        'payment',
        'edit-delete',
    ];

    isDeleteData = false;

    constructor(
        private liveAnnouncer: LiveAnnouncer,
        private paymentService: PaymentService,
        public dialog: MatDialog,
        private paymentModalService: PaymentModalService,
        iconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        iconRegistry.addSvgIconLiteral(
            'edit', domSanitizer.bypassSecurityTrustHtml(editIcon),
        );
        iconRegistry.addSvgIconLiteral(
            'delete', domSanitizer.bypassSecurityTrustHtml(deleteIcon)
        );
    }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    ngOnInit() {
        this.getData();
    }

    ngAfterViewInit() {
        this.paginator._intl.itemsPerPageLabel = 'Exibir';
    }

    getData() {
        this.paymentService
            .getTasks()
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res);
                this.data = res;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            }, error => {
                console.log(error);
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    sortPayment(event: Sort) {
        if (event.active === 'payment') {
            this.dataSource.filteredData = this.dataSource
                .filteredData
                .sort((a: Payments, b: Payments) => compareBool(a.isPayed, b.isPayed, event.direction === 'asc'));

            function compareBool(a: boolean, b: boolean, isAsc: boolean) {
                return a === b ? 0 : isAsc ? (a ? -1 : 1) : a ? 1 : -1;
            }
        }
    }

    addPayment() {
        const dialogRef = this.dialog.open(PaymentModalComponent, {
            width: '772px',
            height: '395px',
            data: {payments: this.paymentForm},
        });

        dialogRef.afterClosed()
            .pipe(
                mergeMap(v => this.paymentModalService.subFormData()),
                mergeMap((p: Payments) => this.paymentService.createPaymentData(p)))
            .subscribe(result => {
                this.getData();
            });
    }

    editData(id: number) {
        this.paymentService.getTaskById(id).subscribe((payment) => {
            const dialogRef = this.dialog.open(PaymentModalComponent, {
                width: '772px',
                height: '395px',
                data: {payments: payment},
            });

            dialogRef.afterClosed()
                .pipe(
                    mergeMap(v => this.paymentModalService.subEditData()),
                    mergeMap((p: { payment: Payments, id: number }) => this.paymentService.editTaskById(p.id, p.payment)))
                .subscribe(result => {
                    this.getData();
                });
        });
    }

    deleteData(id: number) {
        this.paymentService.getTaskById(id).subscribe((payment) => {
            const dialogRef = this.dialog.open(DeleteModalComponent, {
                width: '405px',
                height: '325px',
                data: {payments: payment },
            });
            dialogRef.afterClosed()
                .subscribe((result: any) => {
                    if (result) {
                        this.paymentService.deleteTask(id).subscribe(() => {
                            this.getData();
                        });
                    }
                });
        });
    }
}
