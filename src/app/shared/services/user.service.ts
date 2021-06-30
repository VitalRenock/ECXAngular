import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Morceau d'url pointant vers le controller
  private urlController : string = 'User/'

  // Sauvegarde du User recu lors de la requete de Login
  private currentUser : User = {}
  // Event qui va émettre mon User aux composants abonnés
  currentUseSubject : Subject<User> = new Subject<User>(); 
  
  constructor(

    // Déclaration d'un HttpClient pour communiquer avec l'API
    private httpClient : HttpClient,
    private router : Router
  ) { }

  // Méthode de Login d'un User
  login(email : string, password : string) {
  
    // Formulaire à envoyé (Passage au format JSON)
    let form = { email : email, password : password };
    
    this.httpClient.post<User>(environment.urlApi + this.urlController + 'Login', form).subscribe(
      (u : User) => {
        this.currentUser = u;
        this.emitUser();
        this.router.navigate(['home']);

      }
    );
  }

  emitUser() {
    this.currentUseSubject.next(this.currentUser);
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