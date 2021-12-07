import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQueryBuild } from 'src/app/models/pagination/query-build';
import { ITask } from 'src/app/models/task/task';
import { Page } from 'src/app/util/page';

import { environment } from './../../../environments/environment';
import { CrudService } from './../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private endpoint = 'tasks';

  constructor(
    private _crudService: CrudService,
    private httpClient: HttpClient
  ) { }

  listar(queryBuilder: IQueryBuild): Observable<Page<ITask>> {

      return this.httpClient
      .get<ITask[]>(`${environment.BASE_URL}/${this.endpoint}?${queryBuilder.buildQueryString()}`, {observe: 'response'})
      .pipe(
          map(response => <Page<ITask>>Page.fromResponse(response))
      );

  }


  // getAll(queryBuilder: IQueryBuild): Observable<Page<ITask>> {

  //   const result = this._crudService
  //   .get<ITask[]>(`${this.endpoint}?${queryBuilder.buildQueryString()}`)
  //   .pipe(
  //       map(response => <Page<ITask>>Page.fromResponse(response))
  //   );

  //   console.log('PaymentService', result);

  //   return this._crudService
  //       .get<ITask[]>(`${this.endpoint}?${queryBuilder.buildQueryString()}`)
  //       .pipe(
  //           map(response => <Page<ITask>>Page.fromResponse(response))
  //       );
  // }
}
