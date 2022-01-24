import { SpinnerService } from "./components/spinner/spinner.service";
import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  title: string;

  constructor(private _loading: SpinnerService) {}

  ngOnInit() {
    this.title = "Desafio Picpay Front-end";
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) 
      .subscribe((loading) => {
        console.log(loading, "LOADING")
        this.loading = loading;
      });
  }
}
