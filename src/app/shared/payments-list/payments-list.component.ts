import { Component, OnInit } from "@angular/core"
import { PaymentsApiService } from "../../service/payments-api.service"
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

  // error control
  public apiError: boolean = false

  constructor(
    private paymentsApiService: PaymentsApiService,
    public toastService: ToastService,
    public dialog: MatDialog
  ) {}

  selectForm: FormGroup

  ngOnInit(): void {
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
              title: payment.title,
              date: new Date(),
              value: payment.value,
            },
      panelClass: "custom-modalbox",
    })

    dialogRef.afterClosed().subscribe(result => this.handleAfterClosed(result))
  }

  handleAfterClosed(result: Payment) {
    if (result !== undefined) {
      console.log("✅ ~ result", result.id)
      const isEditPayment = this.payments.map((p: Payment) => p.id).includes(result.id)

      if (isEditPayment) {
        console.log("✅ ~ editPayment")
        this.paymentsApiService.editElement(result).subscribe((data: Payment) => {
          const index = this.payments.findIndex((p: Payment) => p.id === data.id)
          this.payments[index] = data
        })
      } else {
        console.log("✅ ~ createPayment")
        this.paymentsApiService.createPayment(result).subscribe((data: Payment) => {
          this.payments.push(data)
        })
      }
    }
  }

  deleteElement(id: number): void {
    this.paymentsApiService.deletePayment(id).subscribe(() => {
      this.payments = this.payments.filter(p => p.id !== id)
    })
  }

  // public searchPayments(value: string) {
  //   const filter = this.payments.filter((payment: any) => {
  //     return !payment.name.indexOf(value)
  //   })
  // }
}
