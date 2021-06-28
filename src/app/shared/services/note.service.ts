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


  getCategories() : Observable<string[]> {

    return this.httpClient.get<string[]>(environment.urlApi + this.urlController + 'GetCategories');
  }

  getPublicNotesByCategory(category : string) : Observable<Note[]> {

    return this.httpClient.get<Note[]>(environment.urlApi + this.urlController + 'GetPublicNotesByCategory/' + category);
  }

}