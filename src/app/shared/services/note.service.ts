import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

    // Morceau d'url pointant vers le controller de l'API
    private urlController : string = 'Note/'

  constructor(

    private httpClient : HttpClient

    ) { }
    

  //#region GET Methods

  getAllNotes() : Observable<Note[]> {

    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetAllNotes');
  }

  getAllUserNotes(userId : number) : Observable<Note[]> {

    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetAllUserNotes/' + userId);
  }

  getPublicUserNotes(userId : number) : Observable<Note[]> {

    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetPublicUserNotes/' + userId);
  }

  getCategories() : Observable<string[]> {

    return this.httpClient.get<string[]>(environment.urlApi + this.urlController + 'GetCategories');
  }
  
  getPublicNotesByCategory(category_id : number) : Observable<Note[]> {
    
    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetPublicNotesByCategory/' + category_id);
  }

  // getPublicNote(id : number) : Observable<Note> {

  //   return this.httpClient.get<Note>(environment.urlApi + this.urlController + 'GetPublicNote/' + id);
  // }

  getNoteById(id : number) : Observable<Note> {

    return this.httpClient.get<Note>(environment.urlApi + this.urlController + 'GetNoteById/' + id);
  }

  //#endregion

  //#region POST Methods

  postNewNote(newNote : Note) : Observable<number> {

    return this.httpClient.post<number>(environment.urlApi + this.urlController + 'Create', newNote);
  }

  //#endregion

  //#region PUT Methods

  updateNote(note : Note) {

    return this.httpClient.put(environment.urlApi + this.urlController + 'Update', note);
  }

  setVisibility(noteId : number, isPublic : boolean) {

    let form = { id: noteId, isPublic: isPublic }

    return this.httpClient.put(environment.urlApi + this.urlController + 'SetVisibility', form);
  }

  //#endregion

  //#region DELETE Methods

  deleteNote(noteId : number) {

    return this.httpClient.delete(environment.urlApi + this.urlController + 'Delete/' + noteId);
  }

  //#endregion

}