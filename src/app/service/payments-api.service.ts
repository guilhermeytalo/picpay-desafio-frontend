import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//Observable
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PaymentsApiService {
  private page: number = 0;
  private url: string = `http://localhost:3000/tasks?_page=${this.page}&_limit=10`;

  constructor(private http: HttpClient) {}

  get getTaskList(): Observable<any> {
    return this.http.get<any>(this.url).pipe(tap((payments) => payments));
  }
}
