import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Morceau d'url pointant vers le controller
  private urlController : string = 'User/'

  // Sauvegarde du User recu lors de la requete de Login
  private currentUser? : User
  // Event qui va émettre mon User aux composants abonnés
  currentUseSubject : Subject<User> = new Subject<User>(); 
  
  constructor(

    // Déclaration d'un HttpClient pour communiquer avec l'API
    private httpClient : HttpClient,
    private router : Router,
    private toaster : NbToastrService
  ) { }


  //#region GET Methods

  getAll() : Observable<User[]> {

    return this.httpClient.get<User[]>(environment.urlApi + this.urlController + 'GetAll')
  }

  getUserById(userId : number) : Observable<User> {

    return this.httpClient.get<User>(environment.urlApi + this.urlController + 'GetUserById/' + userId);
  }

  //#endregion

  //#region POST Methods

  // Méthode de Login d'un User
  login(email : string, password : string) {
  
    // Formulaire à envoyé (Passage au format JSON)
    let form = { email : email, password : password };
    
    this.httpClient.post<User>(environment.urlApi + this.urlController + 'Login', form).subscribe(
      (u : User) => {
        // On sauve le user
        this.currentUser = u;
        // Gestion du token
        localStorage.setItem('token', u.token ?? '')
        // On émet le User
        this.emitUser();
        // Création d'un Toaster
        this.toaster.success('', 'Connexion réussie', { position: NbGlobalLogicalPosition.BOTTOM_END });
        // Redirection vers la page d'accueil après la connexion
        this.router.navigate(['home']);
      }
    );
  }
  
  //#endregion
  
  //#region PUT Methods
  
  setRole(userId : number, roleName : string) {
    
    // Formulaire à envoyé (Passage au format JSON)
    let form = { user_Id: userId, role_Name: roleName };
    
    return this.httpClient.put(environment.urlApi + this.urlController + 'SetRole', form);
  }
  
  //#endregion
  
  //#region DELETE Methods
  
  
  
  //#endregion
  
  //#region HELPERS
  
  logout() {
    this.currentUser = undefined;
    localStorage.clear();
    this.emitUser();
  }

  decodeToken(token : string) : number {
    
    let decodedToken : any = jwt_decode(token);
    return Number.parseInt(decodedToken['UserId']);
  }

  emitUser() {

    // Si j'ai un token dans le localStorage, je récupère le profil de l'utilisateur
    if (this.currentUser == null && localStorage.getItem('token')) {
      this.getUserById(this.decodeToken(localStorage.getItem('token') ?? '')).subscribe(
        (user : User) => {
          this.currentUser = user;
          this.currentUseSubject.next(this.currentUser);
        }
      );
    }
    else {
      this.currentUseSubject.next(this.currentUser);
    }
  }

  //#endregion

}