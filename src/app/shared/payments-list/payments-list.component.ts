import { Component, OnInit } from "@angular/core"
import { PaymentsApiService } from "../../service/payments-api.service"
import { Payment } from "../../models/payment"
import { Router } from "@angular/router"
@Component({
  selector: "payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  private allPayments: any
  public shownPayments: any
  public apiError: boolean = false
  public modalTitle = "Adicionar pagamento"
  public page: number = 0

  payment: Payment = new Payment()

  constructor(private router: Router, private paymentsApiService: PaymentsApiService) {}

  ngOnInit(): void {
    this.paymentsApiService.getAllPayments(this.page).subscribe(
      payments => {
        this.allPayments = payments
        this.shownPayments = this.allPayments
      },
      error => {
        this.apiError = true
      }
    )
  }

  public editPayment(id: number) {
    if (id) {
      this.paymentsApiService.getPaymentById(id).subscribe(payment => {
        this.payment = payment
      })
    }
  }

  public searchPayments(value: string) {
    const filter = this.allPayments.filter((payment: any) => {
      return !payment.name.indexOf(value)
    })

    this.shownPayments = filter
  }

  onSubmit() {
    this.paymentsApiService.savePayment(this.payment).subscribe(payment => {
      this.payment = payment
      this.router.navigate([""])
    })
  }
}
