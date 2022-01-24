import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title: string

  ngOnInit() {
    this.title = "Desafio Picpay Front-end"
  }
}
