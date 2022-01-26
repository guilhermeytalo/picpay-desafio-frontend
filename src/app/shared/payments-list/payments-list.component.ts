import { Component, OnInit } from "@angular/core"
import { PaymentsApiService } from "../../service/payments-api.service"
import { Payment } from "../../models/payment"
import { Router } from "@angular/router"
import { FormBuilder, FormControl, FormGroup } from "@angular/forms"
@Component({
  selector: "payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  public allPayments: any
  public shownPayments: []
  public apiError: boolean = false
  public modalTitle = "Adicionar pagamento"
  public payment: Payment = new Payment()
  public currentPage: number = 1
  public itemsPerPage: number = 10
  public itemsPerPageCombo = [10, 15, 20]

  constructor(private router: Router, private paymentsApiService: PaymentsApiService, private fb: FormBuilder) {}

  selectForm: FormGroup

  ngOnInit(): void {
    this.paymentsApiService.getAllPayments(0).subscribe(
      payments => {
        this.allPayments = payments
        this.shownPayments = this.allPayments
      },
      error => {
        this.apiError = true
      }
    )

    this.selectForm = new FormGroup({
      selectControl: new FormControl(),
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

  onSubmit() {
    this.paymentsApiService.savePayment(this.payment).subscribe(payment => {
      this.payment = payment
      this.router.navigate([""])
    })
  }
}
