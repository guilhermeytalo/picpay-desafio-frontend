import { HomeTask } from "./homeTask.model";
import { API } from "./../../../share/constant/constants";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Page,
  QueryBuilder,
} from "src/app/components/table/paginator/paginator";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(queryBuilder: QueryBuilder): Observable<Page<HomeTask>> {
    return this.http
      .get<HomeTask[]>(`${API}/tasks?${queryBuilder.buildQueryString()}`, {
        observe: "response",
      })
      .pipe(map((response) => <Page<HomeTask>>Page.fromResponse(response)));
  }
}
