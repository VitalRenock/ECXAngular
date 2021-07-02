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
export class ComposResolver implements Resolve<Compo[]> {

  constructor(

    private compoService : CompoService

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Compo[]> {

    if (route.params['noteId']) {
      return this.compoService.getPublicComponentsByNote(route.params['noteId']);
    }
    else {
      return this.compoService.getAllUserComponents(route.params['userId']);
    }
  }
}
