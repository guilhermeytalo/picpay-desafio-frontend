import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  endpointApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  listarPagamentos(page, limit): Observable<any>{
    return this.http.get<any>(`${this.endpointApi}/tasks?_page=${page}&_limit=${limit}`, {observe: 'response'});
  }

  deletarPagamentos(){

  }

  atualizarPagamentos(){
    return this.http.get<any>(`${this.endpointApi}/tasks`);
  }

  cadastrarPagamentos(){

  }
}
