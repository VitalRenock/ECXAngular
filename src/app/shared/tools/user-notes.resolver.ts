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
export class UserNotesResolver implements Resolve<Note[]> {

  constructor(

    private noteService : NoteService

  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> {

    let userId = route.params['userId'];
    return this.noteService.getAllUserNotes(userId);
  }
}
