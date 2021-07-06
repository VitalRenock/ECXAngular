import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteResolver implements Resolve<Note> {

  constructor(
    
    private noteService : NoteService,
    private router : Router

  ) { }

  // Injection de 'ActivatedRouteSnapshot' dans la méthode resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> {
    
    let id = route.params['id'];

    // Si je veux connaitre de quel composant je viens...
    let previousUrl = ('../../' + this.router.url.split('/')[2]+ '/' + this.router.url.split('/')[3]);
    sessionStorage.setItem('previousRoute', previousUrl);

    if (this.router.url.split('/')[2] == 'user-notes') {
      return this.noteService.getNoteById(id);
    }
    else {
      return this.noteService.getNoteById(id);
    }

  }
}
