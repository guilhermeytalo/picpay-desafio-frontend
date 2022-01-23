import { Component, OnInit } from "@angular/core"
import { PaymentsApiService } from "../../service/payments-api.service"
import { Payment } from "../../service/payment"
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

  paymentModal = {
    user: "",
    value: "",
    date: "",
    title: ""
  };


  payment: Payment = new Payment()
  page: number = 0

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

  public addNewPayment() {
    this.paymentsApiService.savePayment(this.payment).subscribe(payment => {
      console.log(payment)
      this.router.navigate([""])
    })
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
}
