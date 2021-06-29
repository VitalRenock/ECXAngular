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
export class NotesResolver implements Resolve<Note[]> {

  constructor(

    private noteService : NoteService

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> {

    let category = route.params['category'];
    return this.noteService.getPublicNotesByCategory(category);
  }
}
