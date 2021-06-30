import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

    // Morceau d'url pointant vers le controller de l'API
    private urlController : string = 'Note/'

  constructor(

    private httpClient : HttpClient,
    private userService : UserService

  ) { }


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
  
  getPublicNotesByCategory(category : string) : Observable<Note[]> {
    
    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetPublicNotesByCategory/' + category);
  }

  getPublicNote(id : number) : Observable<Note> {

    return this.httpClient.get<Note>(environment.urlApi + this.urlController + 'GetPublicNote/' + id);
  }

  postNewNote(newNote : Note) {

    console.log(newNote);
    console.log()

    return this.httpClient.post(environment.urlApi + this.urlController + 'Create', newNote);
  }

}