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
export class NotesResolver implements Resolve<Note[]> {

  constructor(

    private noteService : NoteService

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> {

    if (route.params['categoryId']) {
      return this.noteService.getPublicNotesByCategory(route.params['categoryId']);
    }
    else {
      return this.noteService.getAllUserNotes(route.params['userId']);
    }

  }
}
