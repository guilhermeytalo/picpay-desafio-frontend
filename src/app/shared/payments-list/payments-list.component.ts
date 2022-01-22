import { Component, OnInit } from "@angular/core";
import { PaymentsApiService } from "src/app/service/payments-api.service";

@Component({
  selector: "payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  private allPayments: any;
  public shownPayments: any;
  public apiError: boolean = false;

  constructor(private paymentsApiService: PaymentsApiService) {}

  ngOnInit(): void {
    this.paymentsApiService.getPaymentsList.subscribe(
      (payments) => {
        this.allPayments = payments;
        this.shownPayments = this.allPayments;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this.allPayments.filter((payment: any) => {
      return !payment.name.indexOf(value);
    });

    this.shownPayments = filter;
  }
}
