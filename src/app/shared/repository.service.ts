import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }
  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
 
  public update = (route: string, id: number, body) => {
    return this.http.patch(`${this.createCompleteRoute(route, environment.urlAddress)}/${id}`, body, this.generateHeaders());
  }
 
  public delete = (route: string, id: number) => {
    return this.http.delete(`${this.createCompleteRoute(route, environment.urlAddress)}/${id}`);
  }
 
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
