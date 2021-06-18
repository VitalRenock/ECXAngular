import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : User = {}

  constructor(
    private httpClient : HttpClient
  ) { }

  login(email : string, password : string) : Observable<User> {
    let user = { email : email, password : password }
    return this.httpClient.post<User>('urlAPI', user)
  }
}
