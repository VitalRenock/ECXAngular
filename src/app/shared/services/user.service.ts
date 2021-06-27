import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : User = {}

  // Morceau d'url pointant vers le contro
  private urlController : string = 'User/'

  constructor(

    // Déclaration d'un HttpClient pour communiquer avec l'API
    private httpClient : HttpClient

  ) { }

  // Méthode de Login d'un User
  login(email : string, password : string) : Observable<User> {
    
    // Paramètre à envoyé (Passage au format JSON)
    let user = { email : email, password : password }
    
    return this.httpClient.post<User>(environment.urlApi + this.urlController + 'Login', user)
  }

  getAll() : Observable<User[]> {

    return this.httpClient.get<User[]>(environment.urlApi + this.urlController + 'GetAll')
  }

  // TO DO
  // Essayer de faire une liste permettant de changer le role du user
  setRole() {

  }

}
