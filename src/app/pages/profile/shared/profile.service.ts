import { API } from './../../../share/constant/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  updateTask(id: number, profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>(`${API}/account/${id}`, profile);
  }
}
