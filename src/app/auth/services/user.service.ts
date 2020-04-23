import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models';
import { AppSettings } from 'src/app/shared/app-setting';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${AppSettings.API_ENDPOINT}auth/register`, user);
  }
}
