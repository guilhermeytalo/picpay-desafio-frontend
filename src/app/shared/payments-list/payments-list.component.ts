import { Component, ElementRef, OnInit, ViewChild } from "@angular/core"
import { PaymentsApiService } from "../../service/payments.service"
import { Payment } from "../../models/payment"
import { FormGroup } from "@angular/forms"
import { ToastService } from "src/app/service/toast.service"
import { MatDialog } from "@angular/material/dialog"
import { ModalComponent } from "../modal/modal.component"
import { fromEvent } from "rxjs"
import { debounceTime } from "rxjs/operators"
@Component({
  selector: "payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  // source data
  public payment: Payment = new Payment()
  public payments: any

  // pagination
  public currentPage: number = 1
  public itemsPerPage: number = 10
  public itemsPerPageCombo = [10, 15, 20]

  public apiError: boolean = false
  public loading: boolean = false

  // search
  search: string = ""
  @ViewChild("campoBusca") campoBusca: ElementRef<HTMLInputElement>

  // sort table
  key: string = "user"
  reverse: boolean = false

  constructor(
    private paymentsApiService: PaymentsApiService,
    public toastService: ToastService,
    public dialog: MatDialog
  ) {}

  selectForm: FormGroup

  ngOnInit(): void {
    this.getAllPayments()
  }

  ngAfterViewInit() {
    fromEvent(this.campoBusca.nativeElement, "keyup")
      .pipe(debounceTime(500))
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement
        this.search = target.value
      })
  }

  getAllPayments() {
    this.loading = true

    this.paymentsApiService.getPayments().subscribe(
      (payments: Payment[]) => {
        this.payments = payments
        this.loading = false
      },
      error => {
        this.toastService.error(error)
        this.apiError = true
        this.loading = false
      }
    )
  }

  openDialog(payment: Payment | null): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data:
        payment === null
          ? {
              name: null,
              title: "",
              date: new Date(),
              value: "",
            }
          : {
              id: payment.id,
              name: payment.name,
              username: payment.username,
              title: payment.title,
              date: new Date(),
              value: payment.value,
            },
      panelClass: "custom-modalbox",
    })

    dialogRef.afterClosed().subscribe(result => this.closeDialog(result))
  }

  closeDialog(result: Payment) {
    if (result !== undefined) {
      const isEditPayment = this.payments.map((p: Payment) => p.id).includes(result.id)

      if (isEditPayment) {
        this.loading = true

        this.paymentsApiService.editElement(result).subscribe(
          (data: Payment) => {
            const index = this.payments.findIndex((p: Payment) => p.id === data.id)
            this.payments[index] = data
            this.toastService.success("Edição de pagamento feita com sucesso!")
            this.getAllPayments()
            this.loading = false
          },
          () => {
            this.toastService.error("Erro ao editar pagamento")
            this.loading = false
          }
        )
      } else {
        this.loading = true

        const { name, title, username, value } = result

        if (name == null || title == "" || username == "" || value == null) {
          this.toastService.error("Erro ao registrar novo pagamento")
          this.loading = false
          return
        }

        this.paymentsApiService.createPayment(result).subscribe(
          (data: Payment) => {
            this.payments.push(data)
            this.toastService.success("Novo pagamento registrado com sucesso!")
            this.getAllPayments()
            this.loading = false
          },
          () => {
            this.toastService.error("Erro ao registrar novo pagamento")
            this.loading = false
          }
        )
      }
    }
  }

  deleteElement(id: number): void {
    this.loading = true

    this.paymentsApiService.deletePayment(id).subscribe(
      () => {
        this.payments = this.payments.filter(p => p.id !== id)
        this.toastService.success("Pagamento excluído com sucesso!")
        this.getAllPayments()
        this.loading = false
      },
      () => {
        this.toastService.error("Erro ao excluir pagamento")
        this.loading = false
      }
    )
  }

  sort(key) {
    this.key = key
    this.reverse = !this.reverse
  }
}
