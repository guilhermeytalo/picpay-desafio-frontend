import { Component, OnInit } from "@angular/core"
import { PaymentsApiService } from "../../service/payments.service"
import { Payment } from "../../models/payment"
import { FormGroup } from "@angular/forms"
import { ToastService } from "src/app/service/toast.service"
import { MatDialog } from "@angular/material/dialog"
import { ModalComponent } from "../modal/modal.component"
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
  search: string = ""

  constructor(
    private paymentsApiService: PaymentsApiService,
    public toastService: ToastService,
    public dialog: MatDialog
  ) {}

  selectForm: FormGroup

  ngOnInit(): void {
    this.getAllPayments()
  }

  getAllPayments() {
    this.paymentsApiService.getPayments().subscribe(
      (payments: Payment[]) => {
        this.payments = payments
      },
      error => {
        this.toastService.error(error)
        this.apiError = true
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
        this.paymentsApiService.editElement(result).subscribe(
          (data: Payment) => {
            const index = this.payments.findIndex((p: Payment) => p.id === data.id)
            this.payments[index] = data
            this.toastService.success("Edição de pagamento feita com sucesso!")
            this.getAllPayments()
          },
          () => {
            this.toastService.error("Erro ao editar pagamento")
          }
        )
      } else {
        this.paymentsApiService.createPayment(result).subscribe(
          (data: Payment) => {
            this.payments.push(data)
            this.toastService.success("Novo pagamento registrado com sucesso!")
            this.getAllPayments()
          },
          () => {
            this.toastService.error("Erro ao registrar novo pagamento")
          }
        )
      }
    }
  }

  deleteElement(id: number): void {
    this.paymentsApiService.deletePayment(id).subscribe(
      () => {
        this.payments = this.payments.filter(p => p.id !== id)
        this.toastService.success("Pagamento excluído com sucesso!")
        this.getAllPayments()
      },
      () => {
        this.toastService.error("Erro ao excluir pagamento")
      }
    )
  }
}
