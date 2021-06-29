import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteResolver implements Resolve<Note> {

  constructor(
    
    private noteService : NoteService
    
  ) { }

  // Injection de 'ActivatedRouteSnapshot' dans la méthode resolve
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> {
    
    let id = route.params['id'];
    return this.noteService.getPublicNote(id);
  }
}
