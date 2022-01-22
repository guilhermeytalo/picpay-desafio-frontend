import { Component, OnInit } from "@angular/core";
import { PaymentsApiService } from "src/app/service/payments-api.service";

@Component({
  selector: "payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  private setAllTasks: any;
  public getAllPayments: any;
  public apiError: boolean = false;

  constructor(private paymentsApiService: PaymentsApiService) {}

  ngOnInit(): void {
    this.paymentsApiService.getTaskList.subscribe(
      (tasks) => {
        this.setAllTasks = tasks;
        this.getAllPayments = this.setAllTasks;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    console.log("✅ ~ value", value);
    console.log("✅ ~ setAllTasks", this.setAllTasks);

    const filter = this.setAllTasks.filter((task: any) => {
      return !task.name.indexOf(value.toLowerCase());
    });
    console.log("✅ ~ filter", filter);

    this.getAllPayments = filter;
  }
}
