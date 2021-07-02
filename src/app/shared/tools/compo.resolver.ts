import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Compo } from '../models/compo';
import { CompoService } from '../services/compo.service';

@Injectable({
  providedIn: 'root'
})
export class CompoResolver implements Resolve<Compo> {

  constructor(

    private router : Router,
    private compoService : CompoService

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Compo> {

    let id = route.params['compoId'];

    // Si je veux connaitre de quel composant je viens...
    let previousUrl = ('../../' + this.router.url.split('/')[2]+ '/' + this.router.url.split('/')[3]);
    sessionStorage.setItem('previousRoute', previousUrl);

    // Add getUserCompo
    return this.compoService.getUserComponent(id);

  }
}
