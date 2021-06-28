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
    
    // Formulaire à envoyé (Passage au format JSON)
    let form = { email : email, password : password }
    return this.httpClient.post<User>(environment.urlApi + this.urlController + 'Login', form)
  }

  getAll() : Observable<User[]> {

    return this.httpClient.get<User[]>(environment.urlApi + this.urlController + 'GetAll')
  }

  setRole(userId : number, roleName : string) {

    // Formulaire à envoyé (Passage au format JSON)
    let form = { user_Id: userId, role_Name: roleName };

    return this.httpClient.post(environment.urlApi + this.urlController + 'SetRole', form);
  }

}