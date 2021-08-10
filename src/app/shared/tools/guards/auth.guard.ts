import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser : User = {}

  
  constructor(
    
    private router : Router

  ) {}
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Si il y a un token de connexion dans le localStorage on retourne vrai
      if (localStorage.getItem('token')) {
        return true;
      }
      // Sinon on redirige vers l'accueil.
      else {
        this.router.navigate(['home'])
        return true;
      }
  }
  
}
